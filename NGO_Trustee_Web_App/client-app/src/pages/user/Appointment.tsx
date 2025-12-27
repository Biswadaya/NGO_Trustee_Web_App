import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const UserAppointment = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold">Appointment Letter</h1>
        <Card variant="glass" className="max-w-2xl mx-auto shadow-premium">
          <CardContent className="p-12">
            <div className="text-center border-b border-border pb-10 mb-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-10 h-10 text-primary" />
                <span className="text-3xl font-display font-bold gradient-text">Trust Flow</span>
              </div>
              <p className="text-muted-foreground uppercase tracking-widest text-sm">Certificate of Appointment</p>
            </div>
            <div className="space-y-6 text-center">
              <p className="text-muted-foreground italic">This is to officially certify that</p>
              <h2 className="text-4xl font-display font-bold text-foreground">{user?.name || 'Valued Member'}</h2>
              <p className="text-muted-foreground">has been appointed as a</p>
              <Badge variant="premium" className="text-xl px-8 py-3 rounded-full shadow-lg">
                {user?.role?.replace('_', ' ') || 'Volunteer Member'}
              </Badge>
              <p className="text-muted-foreground">of the Trust Flow Organization</p>
              <div className="pt-8 flex flex-col items-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Issue Date</p>
                <p className="text-sm font-semibold">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-border flex justify-center">
              <Button variant="premium" className="px-8"><Download className="w-5 h-5 mr-2" />Download Appointment Letter</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
export default UserAppointment;
