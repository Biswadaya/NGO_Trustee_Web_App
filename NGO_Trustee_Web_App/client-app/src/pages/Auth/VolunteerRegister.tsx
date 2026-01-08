import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { volunteerAPI } from '@/api/endpoints';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Shield, ArrowRight, Sparkles, Mail, Lock, User, Phone, BookOpen, Clock, Heart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const VolunteerRegister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        phone: '',
        bio: '',
        skills: '',
        availability: '',
        motivation: '',
        emergency_contact: ''
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await volunteerAPI.register(formData);
            const userRole = response.data?.data?.user?.role;
            const status = response.data?.data?.volunteer?.status;

            if (userRole === 'ADMIN' || status === 'ACTIVE') {
                toast.success('Registration successful! You are the System Administrator.');
            } else if (userRole === 'DONOR' || userRole === 'USER') {
                toast.success('Registration successful! Welcome to the platform.');
            } else {
                toast.success('Registration successful! Please wait for admin approval.');
            }
            navigate('/login');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center py-12 px-4">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-hero-pattern opacity-5" />
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />

            <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10 glass-card">
                {/* Left Side: Info (Visible on desktop) */}
                <div className="hidden md:flex md:col-span-2 bg-primary/10 p-10 flex-col justify-between border-r border-white/5">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                            <Heart className="w-3 h-3" />
                            Join the Cause
                        </div>
                        <h2 className="text-3xl font-display font-bold leading-tight">
                            Start Your <span className="gradient-text">Impact</span> Journey
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Become a vital part of Trust Flow. Your skills and dedication can change lives in our community.
                        </p>

                        <div className="space-y-4 pt-4">
                            {[
                                { icon: Shield, title: "Verified Platform", desc: "Secure NGO network" },
                                { icon: Sparkles, title: "Skill Growth", desc: "Gain real-world experience" },
                                { icon: Clock, title: "Flexible", desc: "Volunteer on your schedule" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center text-primary shadow-sm">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">{item.title}</div>
                                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8">
                        <p className="text-xs text-muted-foreground">
                            Already a volunteer? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                        </p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="md:col-span-3 bg-background/60 p-8 md:p-12">
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-display font-bold">Volunteer Registration</h1>
                            <p className="text-sm text-muted-foreground">Complete the form below to apply as a volunteer.</p>
                        </div>

                        {step === 1 ? (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="full_name">Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="full_name"
                                                placeholder="John Doe"
                                                className="pl-10"
                                                value={formData.full_name}
                                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="phone"
                                                placeholder="+1 234 567 890"
                                                className="pl-10"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            className="pl-10"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-10"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button type="button" onClick={() => setStep(2)} className="w-full h-11 btn-premium">
                                    Next Step <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="space-y-2">
                                    <Label htmlFor="skills">Key Skills (e.g., Teaching, Design, Coordination)</Label>
                                    <div className="relative">
                                        <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="skills"
                                            placeholder="Your expertise..."
                                            className="pl-10"
                                            value={formData.skills}
                                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Brief Bio</Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Tell us a bit about yourself..."
                                        className="min-h-[80px]"
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="motivation">Why do you want to join Trust Flow?</Label>
                                    <Textarea
                                        id="motivation"
                                        placeholder="Your motivation..."
                                        className="min-h-[80px]"
                                        value={formData.motivation}
                                        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button type="button" variant="ghost" onClick={() => setStep(1)} disabled={loading}>
                                        Back
                                    </Button>
                                    <Button type="submit" className="flex-1 h-11 btn-premium" disabled={loading}>
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Complete Signup"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VolunteerRegister;
