import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { memberAPI } from '@/api/endpoints';
import { Loader2, CreditCard, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

import { useAuth } from '@/contexts/AuthContext';

const UserMembership = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await memberAPI.getMyProfile();
      console.log("DEBUG: Full Profile Response:", res.data); // Inspect the full structure
      setProfile(res.data.data.member); // Ensure we are extracting the member object correctly
    } catch (error) {
      console.log("No membership profile found");
      // Optionally redirect or just stay null to show "Apply" state
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  // State: No Membership Profile -> Show CTA
  if (!profile) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-2xl font-display font-bold">Membership Status</h1>

          <Card className="text-center p-12 border-dashed border-2">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
            </div>

            {user?.role === 'MEMBER' ? (
              <>
                <h2 className="text-2xl font-bold mb-2 text-green-600">You are already a Member</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  Your membership is active. You can view your details in the profile section or access member-specific features from the sidebar.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-2">You are not a Member yet</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  Join our NGO as an official member to participate in decision making, access exclusive features, and secure your family's future.
                </p>
                <Button size="lg" variant="premium" onClick={() => navigate('/become-member')}>
                  Apply for Membership
                </Button>
              </>
            )}
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // State: Active/Pending Profile
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">My Membership</h1>
          <Badge variant={profile.user?.is_active ? "success" : "warning"} className="text-sm px-3 py-1">
            {profile.user?.is_active ? "ACTIVE MEMBER" : "VERIFICATION PENDING"}
          </Badge>
        </div>

        {/* Status Banner */}
        {/* {!profile.user?.is_active && (
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="flex items-center gap-4 p-4 text-amber-800">
              <Clock className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-semibold">Application Under Review</p>
                <p className="text-sm opacity-90">Your membership application is currently being verified by the admin team. You will be notified once approved.</p>
              </div>
            </CardContent>
          </Card>
        )} */}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bank Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Banking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Bank Name</p>
                  <p className="font-medium">{profile.bank_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Account Type</p>
                  <p className="font-medium">{profile.account_type || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Account Number</p>
                  <p className="font-medium">{profile.account_number ? `•••• •••• ${profile.account_number.slice(-4)}` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">IFSC Code</p>
                  <p className="font-medium">{profile.ifsc_code || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nominee Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-success" /> Nominee Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Nominee Name</p>
                  <p className="font-medium">{profile.nominee_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Relationship</p>
                  <p className="font-medium">{profile.nominee_relation || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Contact</p>
                  <p className="font-medium">{profile.nominee_phone || 'N/A'}</p>
                </div>
              </div>

              {profile.nominee_bank_name && (
                <>
                  <Separator />
                  <div className="pt-2">
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Nominee Banking</p>
                    <p className="text-sm">{profile.nominee_bank_name} - {profile.nominee_account_number ? `••••${profile.nominee_account_number.slice(-4)}` : 'N/A'}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Family Members */}
        {profile.family_members && profile.family_members.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Family Members</CardTitle>
              <CardDescription>Registered dependents and family details.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium text-muted-foreground">Name</th>
                      <th className="text-left py-2 font-medium text-muted-foreground">Relationship</th>
                      <th className="text-left py-2 font-medium text-muted-foreground">Occupation</th>
                      <th className="text-left py-2 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.family_members.map((fam: any) => (
                      <tr key={fam.id} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="py-3 font-medium">{fam.full_name}</td>
                        <td className="py-3">{fam.relationship}</td>
                        <td className="py-3">{fam.occupation || '-'}</td>
                        <td className="py-3">
                          {fam.is_dependent && <Badge variant="outline" className="text-[10px]">Dependent</Badge>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};
export default UserMembership;
