import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { memberAPI } from '@/api/endpoints';
import { toast } from 'sonner';
import { Loader2, Save, X, Edit2 } from 'lucide-react';

interface MemberProfileData {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  dob: string;
  adhar_number: string;
  bank_name?: string;
  account_number?: string;
  ifsc_code?: string;
  nominee_name?: string;
  nominee_relation?: string;
}

const UserProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<MemberProfileData | null>(null);
  const [formData, setFormData] = useState<MemberProfileData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await memberAPI.getMyProfile();
      // Backend returns { status, data: { member: {...}, user: {...} } } based on my updated controller
      // Or might be just data: { ... } depending on old controller, let's check structure safe access
      const memberData = res.data.data.member || res.data.data;

      setProfile(memberData);
      setFormData(memberData);
    } catch (error) {
      console.error("Failed to fetch profile", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData) return;
    setSaving(true);
    try {
      await memberAPI.updateProfile(formData);
      setProfile(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <DashboardLayout><div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-display font-bold">My Profile</h1>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline"><Edit2 className="w-4 h-4 mr-2" /> Edit Profile</Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => { setIsEditing(false); setFormData(profile); }}><X className="w-4 h-4 mr-2" /> Cancel</Button>
              <Button variant="premium" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
              </Button>
            </div>
          )}
        </div>

        {/* Header Card */}
        <Card variant="glass" className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/80 to-primary/40 relative"></div>
          <CardContent className="relative pt-0 px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-12">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-3xl bg-secondary text-primary font-bold">{profile?.full_name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 mb-2">
                <h2 className="text-2xl font-bold">{profile?.full_name}</h2>
                <p className="text-muted-foreground">{profile?.email}</p>
                <div className="flex gap-2 mt-2">
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                    {user?.role || 'MEMBER'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Details */}
          <Card>
            <CardHeader><CardTitle>Personal Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input name="full_name" value={formData?.full_name || ''} disabled={!isEditing} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label>Date of Birth</Label>
                <Input type="date" name="dob" value={formData?.dob ? new Date(formData.dob).toISOString().split('T')[0] : ''} disabled={!isEditing} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label>Phone Number</Label>
                <Input name="phone" value={formData?.phone || ''} disabled={!isEditing} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label>Address</Label>
                <Input name="address" value={formData?.address || ''} disabled={!isEditing} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label>Occupation</Label>
                <Input name="occupation" value={formData?.occupation || ''} disabled={!isEditing} onChange={handleChange} />
              </div>
            </CardContent>
          </Card>

          {/* Banking & Nominee */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Banking Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Bank Name</Label>
                  <Input name="bank_name" value={formData?.bank_name || ''} disabled={!isEditing} onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label>Account Number</Label>
                  <Input name="account_number" value={formData?.account_number || ''} disabled={!isEditing} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>IFSC Code</Label>
                    <Input name="ifsc_code" value={formData?.ifsc_code || ''} disabled={!isEditing} onChange={handleChange} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Nominee Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Nominee Name</Label>
                  <Input name="nominee_name" value={formData?.nominee_name || ''} disabled={!isEditing} onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label>Relationship</Label>
                  <Input name="nominee_relation" value={formData?.nominee_relation || ''} disabled={!isEditing} onChange={handleChange} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
export default UserProfile;
