import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { certificateAPI } from '@/api/endpoints';
import { useAuth } from '@/contexts/AuthContext';
import { Award, Download, Eye, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const UserCertificates = () => {
  const { user } = useAuth();
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        if (!user?.id) return;
        const res = await certificateAPI.getEntityCertificates(user.id);
        setCerts(res.data.data.certificates || []);
      } catch (error) {
        toast.error('Failed to load certificates');
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, [user?.id]);

  if (loading) return <DashboardLayout><div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-display font-bold">My Certificates</h1>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert) => (
            <Card key={cert.id} variant="glass" className="group overflow-hidden">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold mb-1 text-lg">{cert.certificate_type}</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4">Issued: {new Date(cert.issue_date).toLocaleDateString()}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => window.open(cert.certificate_url, '_blank')}>
                    <Eye className="w-4 h-4 mr-1.5" /> View
                  </Button>
                  <Button variant="premium" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1.5" /> Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {certs.length === 0 && (
            <div className="col-span-full text-center py-20 text-muted-foreground border-2 border-dashed rounded-3xl">
              No certificates issued yet. Keep contributing to earn awards!
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
export default UserCertificates;
