import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold">My Profile</h1>
        <Card variant="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="w-24 h-24"><AvatarImage src={user?.avatar} /><AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback></Avatar>
              <div><h2 className="text-xl font-semibold">{user?.name}</h2><p className="text-muted-foreground">{user?.email}</p></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label>Full Name</Label><Input defaultValue={user?.name} /></div>
              <div><Label>Email</Label><Input defaultValue={user?.email} /></div>
              <div><Label>Phone</Label><Input defaultValue="+91 98765 43210" /></div>
              <div><Label>Address</Label><Input defaultValue="New Delhi, India" /></div>
            </div>
            <Button variant="premium" className="mt-6">Update Profile</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
export default UserProfile;
