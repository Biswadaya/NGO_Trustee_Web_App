import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { adminAPI, donationAPI } from '@/api/endpoints';
import { DollarSign, TrendingUp, TrendingDown, Wallet, Loader2, PieChart as PieIcon, RefreshCw } from 'lucide-react';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const COLORS: Record<string, string> = {
  "Donation": "#0088FE", // Blue
  "Membership fee": "#00C49F", // Teal/Green
  "Grants": "#FFBB28", // Yellow
  "CSR Comittments": "#FF8042", // Orange
  "Investment": "#8884d8", // Purple
  "Projects": "#FF6B6B", // Red
  "Salary": "#4ECDC4", // Teal
  "EPF": "#45B7D1", // Blue
  "GST": "#96CEB4", // Light Green
  "Others": "#FFEEAD" // Pale Yellow
};
const DEFAULT_COLOR = "#cccccc";

const AdminFinance = () => {
  const [loading, setLoading] = useState(true);
  const [financeData, setFinanceData] = useState<any>(null);
  const [breakdown, setBreakdown] = useState<any>({ income: [], expenditure: [] });
  const [donations, setDonations] = useState<any[]>([]);

  /* 
  Updated to use getFinanceStats for accurate Income/Expense breakdown
  */
  const fetchFinanceData = async () => {
    setLoading(true);
    try {
      const [summaryRes, statsRes, donationsRes] = await Promise.all([
        adminAPI.getFundsSummary(),
        adminAPI.getFinanceStats(),
        donationAPI.listAll()
      ]);
      setFinanceData(summaryRes.data.data);

      // Process Income Data for Pie Chart
      const incomeData = Object.entries(statsRes.data.data.income).map(([name, value]) => ({ name, value: Number(value) }));
      // Process Expenditure Data for Pie Chart
      const expenditureData = Object.entries(statsRes.data.data.expenditure).map(([name, value]) => ({ name, value: Number(value) }));

      setBreakdown({ income: incomeData, expenditure: expenditureData });
      setDonations(donationsRes.data.data.donations || []);
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

  const renderPieChart = (title: string, data: any[]) => (
    <Card variant="glass">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <PieIcon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.every(d => d.value === 0) ? [{ name: 'No Data', value: 1 }] : data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50}
                paddingAngle={2}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
                  if (!percent || percent < 0.05) return null; // Hide small labels
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return (
                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[10px] font-bold">
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {data.every(d => d.value === 0)
                  ? <Cell fill="#e5e7eb" />
                  : data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.name] || COLORS[Object.keys(COLORS)[index % Object.keys(COLORS).length]] || DEFAULT_COLOR}
                    />
                  ))
                }
              </Pie>
              <Tooltip
                formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Amount']}
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
              />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ fontSize: '12px', fontWeight: 500 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Custom Legend removed in favor of Recharts Legend, or can be kept as additional detail if desired, but user asked for "Legend to show which colour belongs to whom" which Recharts Legend does well. Removing manual list to avoid clutter if Recharts Legend is used, OR keeping it as valid detail list. I will comment it out or remove it to rely on the chart legend as requested. */}
      </CardContent>
    </Card>
  );

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
          {renderPieChart("Income Breakdown", (breakdown as any).income || [])}
          {renderPieChart("Expenditure Breakdown", (breakdown as any).expenditure || [])}
        </div>

        {/* Donations List */}
        <Card variant="glass">
          <CardHeader className="bg-muted/30 border-b border-border/50">
            <CardTitle className="text-lg">All Donations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="premium-table w-full">
                <thead>
                  <tr className="bg-muted/20">
                    <th className="px-6 py-4 text-left font-display uppercase tracking-wider text-xs">Donor</th>
                    <th className="px-6 py-4 text-left font-display uppercase tracking-wider text-xs">Amount</th>
                    <th className="px-6 py-4 text-left font-display uppercase tracking-wider text-xs">Campaign</th>
                    <th className="px-6 py-4 text-left font-display uppercase tracking-wider text-xs">Tx ID / Bank</th>
                    <th className="px-6 py-4 text-left font-display uppercase tracking-wider text-xs">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {donations.map((d: any) => (
                    <tr key={d.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-sm group-hover:text-primary transition-colors">{d.donor_name || 'Anonymous'}</p>
                        <p className="text-[10px] text-muted-foreground">{d.email || d.donor_email || '-'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-success text-sm">₹{d.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] bg-muted px-2 py-1 rounded-full">{d.campaign?.title || 'General Fund'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-mono text-muted-foreground uppercase">{d.transaction_id?.slice(0, 12)}...</p>
                        <p className="text-[10px] text-muted-foreground">{d.payment_method}</p>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        {new Date(d.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {donations.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-20 text-center text-muted-foreground">
                        No donation records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminFinance;
