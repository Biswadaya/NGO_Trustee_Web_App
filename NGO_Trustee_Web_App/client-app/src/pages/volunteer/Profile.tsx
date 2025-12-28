import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { userAPI } from '@/api/endpoints';
import { User, Award, Mail, Calendar, Phone, QrCode, Heart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const VolunteerProfile = () => {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await userAPI.getMe();
                setUser(res.data.data.user);
                setProfile(res.data.data.user.volunteer_profile);
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

    if (!user) return null;

    // Use profile data if available, fall back to user data
    const fullName = profile?.full_name || user.username || 'Volunteer';
    const email = profile?.email || user.email;
    const joinedDate = profile?.created_at || user.created_at;
    const uniqueId = profile?.unique_id || 'PENDING';
    const status = profile?.status || 'PENDING';

    return (
        <DashboardLayout>
            <div className="space-y-8 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-600/20 flex items-center justify-center border-4 border-background shadow-xl overflow-hidden">
                            {profile?.profile_photo ? (
                                <img src={profile.profile_photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-3xl font-bold text-emerald-600">
                                    {fullName[0].toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-display font-bold tracking-tight">{fullName}</h1>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant={status === 'ACTIVE' ? 'default' : 'secondary'} className="px-3 py-1">
                                    <Heart className="w-3 h-3 mr-1" />
                                    {status}
                                </Badge>
                                <span className="text-muted-foreground text-sm flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Since {new Date(joinedDate).getFullYear()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="bg-muted/50 p-1 rounded-xl">
                        <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
                        <TabsTrigger value="id-card" className="rounded-lg">ID Card</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card variant="glass">
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                        <Mail className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase">Email Address</p>
                                            <p className="text-sm font-semibold">{email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                        <Phone className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase">Phone</p>
                                            <p className="text-sm font-semibold">{profile?.phone || 'Not Provided'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                        <Award className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase">Unique ID</p>
                                            <p className="text-sm font-semibold">{uniqueId}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card variant="glass">
                                <CardHeader>
                                    <CardTitle>About</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {profile?.bio || "No bio provided yet."}
                                    </p>

                                    {profile?.skills && (
                                        <div className="mt-6">
                                            <p className="text-xs font-bold uppercase text-muted-foreground mb-2">Skills</p>
                                            <div className="flex flex-wrap gap-2">
                                                {Array.isArray(profile.skills) ? profile.skills.map((skill: string) => (
                                                    <Badge key={skill} variant="secondary">{skill}</Badge>
                                                )) : <span className="text-sm text-muted-foreground">No skills listed</span>}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="id-card">
                        <div className="grid place-items-center py-10">
                            {/* ID CARD DESIGN */}
                            <div className="relative w-[350px] h-[550px] rounded-[20px] overflow-hidden shadow-2xl bg-white text-neutral-900 transform hover:scale-105 transition-transform duration-500 group border border-neutral-200">
                                {/* Background Design */}
                                <div className="absolute top-0 inset-x-0 h-32 bg-emerald-600"></div>
                                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500 rounded-full blur-[50px] opacity-50"></div>

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col items-center p-8 text-center">
                                    {/* Header */}
                                    <div className="flex items-center gap-2 mb-6 w-full justify-center text-white">
                                        <div className="text-center">
                                            <h3 className="text-sm font-black tracking-widest uppercase">Global Empowerment</h3>
                                            <p className="text-[8px] font-medium tracking-widest opacity-80">ALLIANCE NGO</p>
                                        </div>
                                    </div>

                                    {/* Photo */}
                                    <div className="w-40 h-40 rounded-full bg-white border-4 border-white shadow-lg mb-4 overflow-hidden relative z-20">
                                        {profile?.profile_photo ? (
                                            <img src={profile.profile_photo} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                                                <User className="w-20 h-20 text-neutral-300" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Name & Role */}
                                    <h2 className="text-2xl font-black tracking-tight mb-1 text-neutral-900">{fullName}</h2>
                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-6 uppercase tracking-widest text-[10px]">Volunteer</Badge>

                                    {/* Details */}
                                    <div className="w-full space-y-3 mb-8 text-left">
                                        <div className="flex justify-between items-center bg-neutral-50 px-4 py-2 rounded-lg border border-neutral-100">
                                            <span className="text-[10px] uppercase text-neutral-500 font-bold">ID No.</span>
                                            <span className="text-xs font-mono font-bold text-neutral-800">{uniqueId}</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-neutral-50 px-4 py-2 rounded-lg border border-neutral-100">
                                            <span className="text-[10px] uppercase text-neutral-500 font-bold">Valid Thru</span>
                                            <span className="text-xs font-mono font-bold text-neutral-800">12/2026</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-neutral-50 px-4 py-2 rounded-lg border border-neutral-100">
                                            <span className="text-[10px] uppercase text-neutral-500 font-bold">Blood Group</span>
                                            <span className="text-xs font-mono font-bold text-neutral-800">B+</span>
                                        </div>
                                    </div>

                                    {/* Footer / QR */}
                                    <div className="mt-auto w-full pt-4 border-t border-neutral-100 flex justify-between items-center">
                                        <div className="text-left">
                                            <QrCode className="w-12 h-12 text-black" />
                                        </div>
                                        <div className="text-right">
                                            <div className="h-8 w-16 mb-1 ml-auto">
                                                {/* Signature placeholder */}
                                                <svg viewBox="0 0 100 40" className="w-full h-full opacity-50">
                                                    <path d="M10,20 Q30,5 50,20 T90,20" fill="none" stroke="black" strokeWidth="2" />
                                                </svg>
                                            </div>
                                            <p className="text-[8px] text-neutral-400 uppercase tracking-widest">Authorized Signature</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button variant="outline" className="mt-8" onClick={() => window.print()}>Download / Print Card</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default VolunteerProfile;
