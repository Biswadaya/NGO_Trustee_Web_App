import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { adminAPI } from '@/api/endpoints';
import { CheckCircle, XCircle, Loader2, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

const AdminVerification = () => {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await adminAPI.getPendingVolunteers();
      setVolunteers(res.data.data.volunteers || res.data.data || []);
    } catch (error) {
      toast.error('Failed to load pending volunteers');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      if (action === 'approve') await adminAPI.approveVolunteer(id);
      else await adminAPI.rejectVolunteer(id);

      toast.success(`Volunteer ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
      setVolunteers(prev => prev.filter(v => v.id !== id));
    } catch (error) {
      toast.error(`Failed to ${action} volunteer`);
    }
  };

  if (loading) return <DashboardLayout><div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <UserCheck className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-display font-bold">Volunteer Verification</h1>
        </div>
        <Card variant="glass">
          <CardHeader><CardTitle className="text-sm font-bold uppercase text-muted-foreground">Pending Applications</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {volunteers.map((v) => (
                <div key={v.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-muted/10 border border-border/50 hover:bg-muted/20 transition-all gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${v.email}`}
                      className="w-12 h-12 rounded-full border border-border/50"
                    />
                    <div>
                      <p className="font-bold">{v.full_name}</p>
                      <p className="text-xs text-muted-foreground">{v.email}</p>
                      <p className="text-[10px] text-primary mt-1">
                        {Array.isArray(v.skills) ? v.skills.join(', ') : (typeof v.skills === 'string' ? v.skills : 'General')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="premium" size="sm" onClick={() => handleAction(v.id, 'approve')}>
                      <CheckCircle className="w-4 h-4 mr-1.5" /> Approve
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-destructive hover:text-white border-destructive/20" onClick={() => handleAction(v.id, 'reject')}>
                      <XCircle className="w-4 h-4 mr-1.5" /> Reject
                    </Button>
                  </div>
                </div>
              ))}
              {volunteers.length === 0 && (
                <div className="text-center py-20 text-muted-foreground italic border-2 border-dashed rounded-2xl">
                  No pending volunteer applications at this time.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
export default AdminVerification;
