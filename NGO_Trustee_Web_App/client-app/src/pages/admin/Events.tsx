import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { noticeAPI } from '@/api/endpoints';
import { Plus, Calendar, MapPin, Users, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AdminEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await noticeAPI.list();
        // Filter for events only
        const allNotices = res.data.data.notices || [];
        setEvents(allNotices.filter((n: any) => n.notice_type === 'event' || n.notice_type === 'Event'));
      } catch (error) {
        toast.error('Failed to load events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <DashboardLayout><div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Events Management</h1>
          <Button variant="premium"><Plus className="w-4 h-4 mr-2" />Create Event</Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e) => (
            <Card key={e.id} variant="glass" className="hover:shadow-premium transition-all">
              <CardContent className="p-6">
                <Badge variant={e.is_active ? 'active' : 'inactive'} className="mb-3">
                  {e.is_active ? 'Upcoming' : 'Past'}
                </Badge>
                <h3 className="font-semibold mb-2">{e.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{new Date(e.created_at).toLocaleDateString()}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />Online / Physical</div>
                  <div className="flex items-center gap-2 font-medium text-primary"><Users className="w-4 h-4" />{e.target_audience || 'All Volunteers'}</div>
                  <p className="text-xs mt-2 line-clamp-3">{e.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          {events.length === 0 && (
            <div className="col-span-full text-center py-20 text-muted-foreground border-2 border-dashed rounded-2xl">
              No active events found. Click "Create Event" to start one.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
export default AdminEvents;
