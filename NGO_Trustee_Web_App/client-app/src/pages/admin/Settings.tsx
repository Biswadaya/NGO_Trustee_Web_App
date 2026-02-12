
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';
import { getOrganizationSettings, updateOrganizationSettings, type OrganizationSettings } from '@/services/settings.service';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState<OrganizationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getOrganizationSettings();
      setSettings(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    try {
      const updated = await updateOrganizationSettings(settings);
      setSettings(updated);
      toast({
        title: "Success",
        description: "Organization settings updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!settings) return;
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold">Settings</h1>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card variant="glass">
            <CardHeader><CardTitle>Organization Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <Label htmlFor="org_name">Organization Name</Label>
                    <Input
                      id="org_name"
                      name="org_name"
                      value={settings?.org_name || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_email">Contact Email</Label>
                    <Input
                      id="contact_email"
                      name="contact_email"
                      value={settings?.contact_email || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={settings?.phone || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={settings?.website || ''}
                      onChange={handleChange}
                      placeholder="https://example.org"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={settings?.address || ''}
                      onChange={handleChange}
                      placeholder="123 Main St, City"
                    />
                  </div>
                  <Button variant="premium" type="submit" disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </Button>
                </form>
              )}
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
};

export default AdminSettings;
