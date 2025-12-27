import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  User,
  CreditCard,
  Award,
  Bell,
  Heart,
  Loader2,
  DownloadCloud
} from 'lucide-react';
import { donationAPI, noticeAPI } from '@/api/endpoints';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [notices, setNotices] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [donationsRes, noticesRes] = await Promise.all([
          donationAPI.list(), // Filtered by user on backend usually
          noticeAPI.getHistory()
        ]);
        setDonations(donationsRes.data.data.donations || []);
        setNotices(noticesRes.data.data.notices || []);

        // Mocking stats aggregate for the summary cards
        const total = donationsRes.data.data.donations?.reduce((acc: number, d: any) => acc + d.amount, 0) || 0;
        setData({
          totalDonated: total,
          membershipStatus: 'ACTIVE',
          noticesCount: noticesRes.data.data.notices?.length || 0
        });
      } catch (error) {
        console.error('User data sync failed');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
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

  const quickActions = [
    { icon: User, label: 'Profile', path: '/user/profile' },
    { icon: CreditCard, label: 'Members', path: '/user/membership' },
    { icon: Heart, label: 'Donate', path: '/donate' },
    { icon: Award, label: 'Certs', path: '/user/certificates' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">Member Portal</h1>
            <p className="text-muted-foreground">Namaste, {user?.name}! Your support drives our mission.</p>
          </div>
          <Badge variant="premium" className="self-start md:self-auto py-1 shadow-lg">
            <Award className="w-3 h-3 mr-1" />
            Active Patron
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card variant="glass" className="hover:shadow-premium transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-success to-primary flex items-center justify-center shadow-md">
                  <CreditCard className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Membership Status</p>
                  <p className="text-lg font-bold text-success">{data?.membershipStatus}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" className="hover:shadow-premium transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-warning flex items-center justify-center shadow-md">
                  <Heart className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Life Impact</p>
                  <p className="text-lg font-bold">₹{data?.totalDonated?.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" className="hover:shadow-premium transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-md">
                  <Bell className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Announcements</p>
                  <p className="text-lg font-bold">{data?.noticesCount} Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card variant="glass" className="lg:col-span-1">
            <CardHeader><CardTitle className="text-sm uppercase text-primary font-bold">Quick Nave</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  asChild
                  className="h-24 flex-col gap-2 glass-card hover:bg-primary/5 hover:border-primary/50"
                >
                  <Link to={action.path}>
                    <div className="p-2 rounded-lg bg-primary/10">
                      <action.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-semibold">{action.label}</span>
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Notices Feed */}
          <Card variant="glass" className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/30">
              <CardTitle className="text-lg">Organization Feed</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/user/notices">Read All</Link>
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {notices.map((notice) => (
                  <div key={notice.id} className="p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-primary/30 transition-all">
                    <div className="flex justify-between gap-2 mb-2">
                      <h4 className="font-bold text-sm">{notice.title}</h4>
                      <Badge variant="glass" className="text-[8px]">{new Date(notice.created_at).toLocaleDateString()}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{notice.content}</p>
                  </div>
                ))}
                {notices.length === 0 && (
                  <div className="text-center py-10 text-muted-foreground italic text-sm">No new notices.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card variant="glass">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Contributions</CardTitle>
            <Button variant="premium" size="sm" asChild>
              <Link to="/user/receipts">Tax Receipts</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="premium-table w-full">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="px-6 py-4 text-left text-[10px] uppercase font-bold">Campaign</th>
                    <th className="px-6 py-4 text-left text-[10px] uppercase font-bold">Amount</th>
                    <th className="px-6 py-4 text-left text-[10px] uppercase font-bold">Tx ID</th>
                    <th className="px-6 py-4 text-left text-[10px] uppercase font-bold">Status</th>
                    <th className="px-6 py-4 text-right text-[10px] uppercase font-bold">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {donations.slice(0, 5).map((d) => (
                    <tr key={d.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">{d.campaign?.title || 'General Donation'}</td>
                      <td className="px-6 py-4 text-sm font-bold text-success">₹{d.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-[10px] font-mono text-muted-foreground">{d.transaction_id?.slice(0, 16)}...</td>
                      <td className="px-6 py-4"><Badge variant="success">PAID</Badge></td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                          <DownloadCloud className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {donations.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-20 text-center text-muted-foreground italic text-sm">No donations recorded yet.</td>
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

export default UserDashboard;
