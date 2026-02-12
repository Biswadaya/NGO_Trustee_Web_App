import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userAPI } from '@/api/endpoints';
import { User, Shield, QrCode, Loader2, Edit2, Save, X, Calendar, Download } from 'lucide-react';
import { toast } from 'sonner';
import NHRDLogo from '@/assets/nhrd-logo.png';

const AdminProfile = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    const fetchProfile = async () => {
        try {
            const res = await userAPI.getMe();
            const user = res.data.data.user;
            // Merge user data and volunteer profile data if available for editing
            const mergedData = {
                ...user,
                phone: user.volunteer_profile?.phone || '',
                bio: user.volunteer_profile?.bio || '',
                address: user.volunteer_profile?.address || '', // Assuming address might be in volunteer profile or just simulated
                // Add more fields if needed
            };
            setProfile(mergedData);
            setFormData(mergedData);
        } catch (error) {
            console.error("Failed to fetch profile", error);
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!formData) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!formData) return;
        setSaving(true);
        try {
            // Call updateMe
            await userAPI.updateMe(formData);
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

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-[60vh]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </DashboardLayout>
        );
    }

    if (!profile) return null;

    return (
        <DashboardLayout>
            <div className="space-y-8 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-4 border-background shadow-xl">
                            <span className="text-3xl font-bold text-primary">
                                {profile.username ? profile.username[0].toUpperCase() : 'A'}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-display font-bold tracking-tight">{profile.full_name || profile.username || 'Admin User'}</h1>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant="premium" className="px-3 py-1">
                                    <Shield className="w-3 h-3 mr-1" />
                                    {profile.role}
                                </Badge>
                                <span className="text-muted-foreground text-sm flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Joined {new Date(profile.created_at).getFullYear()}
                                </span>
                            </div>
                        </div>
                    </div>
                    {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)} variant="outline">
                            <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={() => { setIsEditing(false); setFormData(profile); }}>
                                <X className="w-4 h-4 mr-2" /> Cancel
                            </Button>
                            <Button variant="premium" onClick={handleSave} disabled={saving}>
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
                            </Button>
                        </div>
                    )}
                </div>

                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="bg-muted/50 p-1 rounded-xl">
                        <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
                        <TabsTrigger value="id-card" className="rounded-lg">ID Card</TabsTrigger>
                        <TabsTrigger value="settings" className="rounded-lg">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card variant="glass">
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>Update your personal details here.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label>Full Name</Label>
                                        <Input
                                            name="full_name"
                                            value={formData?.full_name || ''}
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Username</Label>
                                        <Input
                                            name="username"
                                            value={formData?.username || ''}
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            placeholder="Enter your username"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Phone Number</Label>
                                        <Input
                                            name="phone"
                                            value={formData?.phone || ''}
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Bio / Designation</Label>
                                        <Input
                                            name="bio"
                                            value={formData?.bio || ''}
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            placeholder="Enter your bio or role description"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card variant="glass">
                                <CardHeader>
                                    <CardTitle>Contact & Role</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label>Email Address</Label>
                                        <Input
                                            name="email"
                                            value={profile.email || ''}
                                            disabled={true}
                                            className="bg-muted/50"
                                        />
                                        <p className="text-[10px] text-muted-foreground">Email cannot be changed directly.</p>
                                    </div>

                                    <div className="grid gap-2 pt-4">
                                        <Label>System Permissions</Label>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {profile.manager_permissions ? (
                                                Object.entries(profile.manager_permissions)
                                                    .filter(([key, val]) => key.startsWith('can_') && val)
                                                    .map(([key]) => (
                                                        <Badge key={key} variant="outline" className="capitalize">
                                                            {key.replace('can_', '').replace('_', ' ')}
                                                        </Badge>
                                                    ))
                                            ) : (
                                                <Badge variant="outline">Full System Access</Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="id-card">
                        <div className="flex flex-col items-center py-10 space-y-8">
                            {/* INDUSTRY GRADE ID CARD DESIGN */}
                            <div className="relative w-[340px] h-[520px] rounded-[16px] overflow-hidden bg-white shadow-2xl transition-all duration-300 hover:shadow-[0_20px_60px_-10px_rgba(0,180,160,0.3)] group print:shadow-none print:w-[340px] print:h-[520px] border border-slate-100">

                                {/* 1. Header with Gradient & Logo - Professional Look */}
                                <div className="h-[180px] w-full bg-gradient-to-br from-[#006056] to-[#008ba3] relative p-4 flex flex-col items-center justify-center text-center z-10">
                                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

                                    <div className="bg-white p-2 rounded-lg shadow-sm mb-2">
                                        <img
                                            src={NHRDLogo}
                                            alt="NHRD Logo"
                                            className="h-8 w-auto object-contain"
                                        />
                                    </div>
                                    <h3 className="text-[12px] font-bold tracking-widest text-white uppercase leading-tight font-sans opacity-90 max-w-[90%]">
                                        National Humanity And Rural Development (NHRD)
                                    </h3>
                                </div>

                                {/* 2. Content Body */}
                                <div className="flex flex-col items-center relative z-20 -mt-10 px-2">

                                    {/* Photo Container */}
                                    <div className="w-24 h-24 rounded-full bg-white p-1.5 shadow-lg mb-3">
                                        <div className="w-full h-full rounded-full bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center">
                                            {profile.profile_photo ? (
                                                <img src={profile.profile_photo} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-12 h-12 text-slate-300" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Name & Role */}
                                    <div className="text-center mb-6 w-full">
                                        <h2 className="text-lg font-bold text-slate-800 leading-tight mb-1 truncate">
                                            {profile.full_name || profile.username || 'Administrator'}
                                        </h2>
                                        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                            <Shield className="w-3 h-3" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">{profile.role}</span>
                                        </div>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="w-full grid grid-cols-2 gap-y-4 gap-x-2 text-left bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                                        <div>
                                            <p className="text-[9px] uppercase text-slate-400 font-bold tracking-wider mb-0.5">Admin ID</p>
                                            <p className="text-xs font-mono font-semibold text-slate-700">
                                                NHRD-{profile.id?.substring(0, 6).toUpperCase() || '0000'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] uppercase text-slate-400 font-bold tracking-wider mb-0.5">Valid Thru</p>
                                            <p className="text-xs font-mono font-semibold text-slate-700">LIFETIME</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-[9px] uppercase text-slate-400 font-bold tracking-wider mb-0.5">Department / Role</p>
                                            <p className="text-xs font-semibold text-slate-700">
                                                {profile.bio || 'Board of Trustees & Administration'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Footer */}
                                <div className="absolute bottom-0 w-full h-[60px] bg-slate-50 border-t border-slate-100 flex items-center justify-between px-6">
                                    <div className="flex flex-col justify-center">
                                        <div className="h-4 w-20 mb-1 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png')] bg-contain bg-no-repeat bg-left"></div>
                                        <div className="h-[1px] w-24 bg-slate-300"></div>
                                        <p className="text-[7px] uppercase text-slate-400 font-bold tracking-widest mt-0.5">Authorized Signatory</p>
                                    </div>
                                    <div className="bg-white p-1 rounded border border-slate-100">
                                        <QrCode className="w-8 h-8 text-slate-800" />
                                    </div>
                                </div>

                                {/* Watermark */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-[0.03] pointer-events-none grayscale">
                                    <img src={NHRDLogo} alt="" className="w-full h-full object-contain" />
                                </div>
                            </div>

                            <Button onClick={() => window.print()} variant="outline" className="gap-2">
                                <Download className="w-4 h-4" /> Download Identity Card
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="settings">
                        <Card variant="glass">
                            <CardContent className="p-8 text-center text-muted-foreground">
                                Settings configuration available in standalone Settings page.
                                <br />
                                <Button variant="link" className="mt-2 text-primary" onClick={() => { }}>Go to Settings</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default AdminProfile;
