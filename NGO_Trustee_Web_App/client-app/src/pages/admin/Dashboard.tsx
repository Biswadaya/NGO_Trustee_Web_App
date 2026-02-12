import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Users,
  DollarSign,
  Calendar,
  FileText,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Loader2,
} from 'lucide-react';
import { dashboardAPI, adminAPI } from '@/api/endpoints';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { toast } from 'sonner';
import ReportGenerationModal from '@/components/admin/ReportGenerationModal';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // ... existing fetch ...
      try {
        const [overviewRes, logsRes, analyticsRes] = await Promise.all([
          dashboardAPI.getOverview(),
          adminAPI.getAuditLogs(10),
          dashboardAPI.getAnalytics('30d')
        ]);
        console.log('Overview Response:', overviewRes.data);
        console.log('Logs Response:', logsRes.data);
        setData(overviewRes.data.data);
        setRecentLogs(logsRes.data.data.logs || []);
        setAnalytics(analyticsRes.data.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('Could not load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
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

  // Process stats for display
  const stats = data?.stats || data || {};

  const statCards = [
    {
      title: 'Total Donors',
      value: stats?.totalDonors?.toLocaleString() || '0',
      change: '+12%', // Static for now as not calculated
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Total Members',
      value: stats?.totalMembers?.toLocaleString() || '0',
      change: `+2.4%`,
      trend: 'up',
      icon: Users,
      color: 'from-primary to-secondary'
    },
    {
      title: 'Total Donations',
      value: `₹${((stats?.totalDonationAmount || 0)).toLocaleString()}`,
      change: '+12.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-accent to-warning'
    },
  ];

  // Process chart data
  const memberGrowthData = analytics?.volunteersTrend?.map((v: any) => ({
    name: new Date(v.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    members: v.count
  })) || [];

  const donationTrendData = analytics?.donationsTrend?.map((d: any) => ({
    name: new Date(d.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    donations: d.amount
  })) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Real-time NGO management is synchronized.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Dec 2025
            </Button>
            <Button variant="premium" onClick={() => setIsReportOpen(true)}>
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statCards.map((stat, index) => (
            <Card key={stat.title} variant="glass" className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <Badge variant={stat.trend === 'up' ? 'success' : 'warning'} className="flex items-center gap-1">
                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card variant="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">System Growth</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={memberGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="members"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Donation Insights</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={donationTrendData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="donations" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audit Logs Row */}
        <Card variant="glass">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Audit Logs</CardTitle>
            <Button variant="ghost" size="sm">View All Logs</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLogs.length > 0 ? (
                recentLogs.map((log: any) => (
                  <div key={log.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bell className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{log.action}</p>
                      <p className="text-xs text-muted-foreground truncate">{log.details}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Badge variant="outline" className="text-[10px]">{log.entity_type}</Badge>
                      <p className="text-[10px] text-muted-foreground mt-1">{new Date(log.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">No recent activity found</div>
              )}
            </div>
          </CardContent>
        </Card>
        <ReportGenerationModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
