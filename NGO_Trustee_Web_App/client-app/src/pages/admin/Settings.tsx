import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const AdminSettings = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Settings</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card variant="glass">
          <CardHeader><CardTitle>Organization Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Organization Name</Label><Input defaultValue="Trust Flow" /></div>
            <div><Label>Contact Email</Label><Input defaultValue="info@trustflow.app" /></div>
            <div><Label>Phone</Label><Input defaultValue="+91 98765 43210" /></div>
            <Button variant="premium">Save Changes</Button>
          </CardContent>
        </Card>
        <Card variant="glass">
          <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {['Email notifications', 'SMS alerts', 'Push notifications', 'Weekly reports'].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <Label>{item}</Label>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  </DashboardLayout>
);
export default AdminSettings;
