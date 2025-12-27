import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { adminAPI, transparencyAPI } from '@/api/endpoints';
import { DollarSign, TrendingUp, TrendingDown, Wallet, Loader2, PieChart as PieIcon, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--success))', 'hsl(var(--warning))'];

const AdminFinance = () => {
  const [loading, setLoading] = useState(true);
  const [financeData, setFinanceData] = useState<any>(null);
  const [breakdown, setBreakdown] = useState<any[]>([]);

  const fetchFinanceData = async () => {
    setLoading(true);
    try {
      const [summaryRes, breakdownRes] = await Promise.all([
        adminAPI.getFundsSummary(),
        transparencyAPI.getFinancialBreakdown()
      ]);
      setFinanceData(summaryRes.data.data.summary);
      setBreakdown(breakdownRes.data.data.breakdown || []);
    } catch (error) {
      console.error('Failed to load financial data');
      toast.error('Financial data sync failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinanceData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  const statCards = [
    { label: 'Total Funds Received', value: `₹${(financeData?.totalDonations || 0).toLocaleString()}`, icon: TrendingUp, color: 'from-success to-primary' },
    { label: 'Total Expenses', value: `₹${(financeData?.totalExpenses || 0).toLocaleString()}`, icon: TrendingDown, color: 'from-destructive to-warning' },
    { label: 'Available Balance', value: `₹${(financeData?.netBalance || 0).toLocaleString()}`, icon: Wallet, color: 'from-primary to-secondary' },
    { label: 'Avg Donation', value: `₹${(financeData?.averageDonation || 0).toLocaleString()}`, icon: DollarSign, color: 'from-warning to-accent' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Financial Treasury</h1>
          <Button variant="outline" size="sm" onClick={fetchFinanceData}>
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh Data
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <Card key={s.label} variant="glass" className="hover:shadow-premium transition-all">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                  <s.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-bold">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Expenditure Breakdown */}
          <Card variant="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Expenditure Breakdown</CardTitle>
              <PieIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdown.length > 0 ? breakdown : [{ name: 'Operational', value: 1 }]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={5}
                      label
                    >
                      {breakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {breakdown.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Over Time */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg">Donation Velocity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financeData?.monthlyStats || []}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                    <XAxis dataKey="month" className="text-[10px]" />
                    <YAxis className="text-[10px]" />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                    />
                    <Bar dataKey="donations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-[10px] text-muted-foreground mt-4 italic">
                * Real-time contribution flow across the last 6 months.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminFinance;
