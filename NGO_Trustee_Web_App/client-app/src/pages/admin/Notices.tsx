import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { noticeAPI } from '@/api/endpoints';
import { Send, Users, Heart, User, Clock, Loader2, Megaphone } from 'lucide-react';
import { toast } from 'sonner';

const AdminNotices = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', notice_type: 'general', target_role: 'ALL' });

  const fetchHistory = async () => {
    try {
      const response = await noticeAPI.getHistory();
      setNotices(response.data.data.notices || []);
    } catch (error) {
      console.error('Failed to load notices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSend = async () => {
    if (!formData.title || !formData.content) {
      return toast.error('Please fill in both title and content');
    }
    setSending(true);
    try {
      await noticeAPI.create(formData);
      toast.success('Notice published successfully!');
      setFormData({ title: '', content: '', notice_type: 'general', target_role: 'ALL' });
      fetchHistory();
    } catch (error) {
      toast.error('Failed to publish notice');
    } finally {
      setSending(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Megaphone className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-display font-bold">Announcements & Notices</h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Notice Creation */}
          <Card variant="glass" className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Publish New Notice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Subject</label>
                <Input
                  placeholder="e.g., Annual General Meeting 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="glass-card h-12"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Message Body</label>
                <Textarea
                  placeholder="Detailed announcement content..."
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="glass-card resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Target Audience</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={formData.target_role === 'ALL' ? 'premium' : 'outline'}
                    size="sm"
                    onClick={() => setFormData({ ...formData, target_role: 'ALL' })}
                  >
                    <Users className="w-4 h-4 mr-2" /> All Users
                  </Button>
                  <Button
                    variant={formData.target_role === 'DONOR' ? 'premium' : 'outline'}
                    size="sm"
                    onClick={() => setFormData({ ...formData, target_role: 'DONOR' })}
                  >
                    <User className="w-4 h-4 mr-2" /> Members/Donors
                  </Button>
                  <Button
                    variant={formData.target_role === 'VOLUNTEER' ? 'premium' : 'outline'}
                    size="sm"
                    onClick={() => setFormData({ ...formData, target_role: 'VOLUNTEER' })}
                  >
                    <Heart className="w-4 h-4 mr-2" /> Volunteers
                  </Button>
                </div>
              </div>

              <Button variant="premium" className="w-full h-12 font-bold shadow-lg" onClick={handleSend} disabled={sending}>
                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4 mr-2" />Broadcast Notice</>}
              </Button>
            </CardContent>
          </Card>

          {/* History List */}
          <Card variant="glass" className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Sent History</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto px-1 custom-scrollbar">
                  {notices.map((n) => (
                    <div key={n.id} className="p-4 rounded-xl bg-muted/40 border border-border/50 hover:border-primary/30 transition-all group">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-bold text-sm group-hover:text-primary transition-colors">{n.title}</p>
                        <Badge variant="glass" className="text-[8px] uppercase">{n.target_role}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2 italic">"{n.content}"</p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(n.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                  {notices.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground italic text-sm">
                      No broadcast history.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminNotices;
