import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { noticeAPI } from '@/api/endpoints';
import { Bell, Loader2, Info } from 'lucide-react';
import { toast } from 'sonner';

const VolunteerNotices = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await noticeAPI.getMyNotices();
        setNotices(res.data.data.notices || []);
      } catch (error) {
        toast.error('Failed to load notices');
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  if (loading) return <DashboardLayout><div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Bell className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-display font-bold">Volunteer Notices</h1>
        </div>
        <Card variant="glass" className="overflow-hidden">
          <CardHeader className="bg-muted/5 border-b border-border/50">
            <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Organizational Updates</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {notices.map((n) => (
                <div key={n.id} className="p-5 rounded-2xl bg-muted/10 border border-border/50 hover:bg-muted/20 transition-all">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Info className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-bold">{n.title}</h3>
                    </div>
                    <Badge variant={n.notice_type === 'urgent' ? 'destructive' : 'glass'} className="uppercase text-[10px] tracking-widest px-2 py-0.5">
                      {n.notice_type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{n.content}</p>
                  <p className="text-[10px] text-muted-foreground uppercase opacity-70">{new Date(n.created_at).toLocaleDateString()}</p>
                </div>
              ))}
              {notices.length === 0 && (
                <div className="text-center py-20 text-muted-foreground italic border-2 border-dashed rounded-3xl">
                  No specific volunteer notices at this time.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
export default VolunteerNotices;
