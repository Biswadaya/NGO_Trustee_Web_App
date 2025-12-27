import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { idCardData } from '@/data/mockData';
import { Download, Sparkles } from 'lucide-react';

const UserIdCard = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">My ID Card</h1>
      <div className="max-w-md mx-auto">
        <Card variant="premium" className="overflow-hidden">
          <div className="p-6 gradient-hero text-primary-foreground">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6" />
              <span className="text-xl font-display font-bold">Trust Flow</span>
            </div>
            <Badge variant="glass" className="bg-primary-foreground/20 border-0">{idCardData.memberType} Member</Badge>
          </div>
          <CardContent className="p-6">
            <div className="flex gap-6">
              <img src={idCardData.qrCode} alt="QR Code" className="w-24 h-24 rounded-lg" />
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">ID:</span> {idCardData.memberId}</p>
                <p><span className="text-muted-foreground">Name:</span> {idCardData.name}</p>
                <p><span className="text-muted-foreground">Valid:</span> {idCardData.validFrom} - {idCardData.validUntil}</p>
                <p><span className="text-muted-foreground">Blood:</span> {idCardData.bloodGroup}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button variant="premium" className="w-full mt-4"><Download className="w-4 h-4 mr-2" />Download ID Card</Button>
      </div>
    </div>
  </DashboardLayout>
);
export default UserIdCard;
