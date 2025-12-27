import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { adminAPI } from '@/api/endpoints';
import { Loader2, ShieldCheck, User } from 'lucide-react';
import { toast } from 'sonner';

const AdminAuditLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await adminAPI.getAuditLogs(50);
        setLogs(res.data.data.logs || []);
      } catch (error) {
        toast.error('Failed to load audit logs');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) return <DashboardLayout><div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-display font-bold">System Audit Trail</h1>
        </div>
        <Card variant="glass">
          <CardHeader><CardTitle className="text-sm font-bold uppercase text-muted-foreground">Activity Timeline</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/10 border border-border/50 hover:bg-muted/20 transition-all">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{log.action}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{log.user?.email || 'System'} • {log.ip_address || 'Internal'}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="glass" className="bg-primary/5 text-primary text-[10px]">{log.entity_type}</Badge>
                    <p className="text-[10px] text-muted-foreground mt-1">{new Date(log.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="text-center py-20 text-muted-foreground italic">No audit records found.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
export default AdminAuditLogs;
