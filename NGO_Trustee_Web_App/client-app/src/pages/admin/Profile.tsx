import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { userAPI } from '@/api/endpoints';
import { User, Shield, Mail, Calendar, Phone, MapPin, QrCode, Building, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AdminProfile = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await userAPI.getMe();
                setProfile(res.data.data.user);
            } catch (error) {
                console.error("Failed to fetch profile", error);
                toast.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

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
                            <h1 className="text-3xl font-display font-bold tracking-tight">{profile.username || 'Admin User'}</h1>
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
                                    <CardTitle>Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                        <Mail className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase">Email Address</p>
                                            <p className="text-sm font-semibold">{profile.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                        <Phone className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase">Phone</p>
                                            <p className="text-sm font-semibold">Not Provided</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                        <MapPin className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase">Location</p>
                                            <p className="text-sm font-semibold">HQ Office</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card variant="glass">
                                <CardHeader>
                                    <CardTitle>Role Permissions</CardTitle>
                                    <CardDescription>Active access levels for your account</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
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
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="id-card">
                        <div className="grid place-items-center py-10">
                            {/* ID CARD DESIGN */}
                            <div className="relative w-[350px] h-[550px] rounded-[20px] overflow-hidden shadow-2xl bg-black text-white transform hover:scale-105 transition-transform duration-500 group">
                                {/* Background Effects */}
                                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black z-0"></div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full mix-blend-screen"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full mix-blend-screen"></div>
                                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay z-0"></div>

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col items-center p-8 text-center border border-white/10 rounded-[20px]">
                                    {/* Header */}
                                    <div className="flex items-center gap-2 mb-8 w-full justify-center">
                                        <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                            <Building className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-xs font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase">NGO Trustee</h3>
                                            <p className="text-[8px] font-medium tracking-widest text-neutral-400">OFFICIAL IDENTIFICATION</p>
                                        </div>
                                    </div>

                                    {/* Photo */}
                                    <div className="w-40 h-40 rounded-2xl bg-neutral-800 border-2 border-white/10 p-1 mb-6 shadow-inner relative group-hover:border-primary/50 transition-colors">
                                        <div className="w-full h-full rounded-xl bg-neutral-900 flex items-center justify-center overflow-hidden">
                                            <User className="w-20 h-20 text-neutral-700" />
                                        </div>
                                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-neutral-900 border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-xl flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                            Active
                                        </div>
                                    </div>

                                    {/* Name & Role */}
                                    <h2 className="text-2xl font-black tracking-tight mb-1 text-white">{profile.username || 'Admin'}</h2>
                                    <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-200 uppercase tracking-widest mb-8">{profile.role}</p>

                                    {/* Details */}
                                    <div className="w-full space-y-3 mb-8">
                                        <div className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                            <span className="text-[10px] uppercase text-neutral-500 font-bold">ID No.</span>
                                            <span className="text-xs font-mono text-neutral-300">ADMIN-{profile.id.substring(0, 8).toUpperCase()}</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                            <span className="text-[10px] uppercase text-neutral-500 font-bold">Joined</span>
                                            <span className="text-xs font-mono text-neutral-300">{new Date(profile.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {/* Footer / QR */}
                                    <div className="mt-auto w-full pt-6 border-t border-white/10 flex justify-between items-end">
                                        <div className="text-left">
                                            <p className="text-[8px] text-neutral-600 uppercase tracking-widest mb-1">Authorization</p>
                                            <div className="h-6 w-20 bg-white/10 rounded"></div>
                                        </div>
                                        <div className="bg-white p-1 rounded">
                                            <QrCode className="w-10 h-10 text-black" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button variant="outline" className="mt-8" onClick={() => window.print()}>Download / Print Card</Button>
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
