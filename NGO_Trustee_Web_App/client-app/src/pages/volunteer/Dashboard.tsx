import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Progress } from '@/components/ui/progress';
import {
  Star,
  CheckCircle,
  TrendingUp,
  Award,
  ArrowRight,
  Users,
  Loader2,
} from 'lucide-react';
import { volunteerAPI } from '@/api/endpoints';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const statsRes = await volunteerAPI.getStats();
        setStats(statsRes.data.data.stats);
        // Using getMyTasks if available or fallback
        const tasksRes = await volunteerAPI.list(); // simplified for demo
        setTasks(tasksRes.data.data.volunteers || []);
      } catch (error) {
        console.error('Failed to fetch volunteer data');
        toast.error('Syncing volunteer records failed');
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerData();
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
    { title: 'Points Earned', value: stats?.totalPoints || 0, icon: Star, suffix: 'pts', color: 'from-primary to-secondary' },
    { title: 'Tasks Done', value: stats?.tasksCompleted || 0, icon: CheckCircle, color: 'from-success to-primary' },
    { title: 'Status', value: stats?.status || 'Active', icon: TrendingUp, color: 'from-accent to-warning' },
    { title: 'Certificates', value: stats?.totalCertificates || 0, icon: Award, color: 'from-secondary to-primary' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">Volunteer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}! Your impact is real.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="gold" className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              Silver Volunteer
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statCards.map((stat, index) => (
            <Card key={stat.title} variant="glass" className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">{stat.title}</p>
                    <p className="text-xl font-bold">
                      {stat.value}
                      {stat.suffix && <span className="text-xs font-normal text-muted-foreground ml-1">{stat.suffix}</span>}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Progress */}
        <Card variant="premium" className="overflow-hidden shadow-2xl">
          <div className="p-8 gradient-hero relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="relative z-10">
              <h3 className="text-2xl font-display font-bold mb-2">Performance & Goals</h3>
              <p className="text-primary-foreground/80 text-sm mb-6 max-w-md">Your monthly contribution target is within reach. {stats?.tasksCompleted || 0} tasks finished this month.</p>
              <div className="space-y-6 max-w-2xl">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>Task Completion (Goal: 10)</span>
                    <span>{stats?.tasksCompleted || 0}/10 tasks</span>
                  </div>
                  <Progress value={((stats?.tasksCompleted || 0) / 10) * 100} className="h-3 bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Secondary Info */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card variant="glass">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/30 pb-4">
              <CardTitle className="text-lg">Open Mission Tasks</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">
                Apply for more <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center py-10">
                <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Check the 'Tasks' tab to find and join new campaigns.</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/30 pb-4">
              <CardTitle className="text-lg">Recent Rewards</CardTitle>
              <Award className="w-5 h-5 text-accent" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-accent/5 to-warning/5 border border-accent/10 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">System Onboarding</p>
                    <p className="text-[10px] text-muted-foreground">Verified Member Badge</p>
                  </div>
                  <Badge variant="glass" className="bg-accent/20 text-accent">CLAIMED</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VolunteerDashboard;
