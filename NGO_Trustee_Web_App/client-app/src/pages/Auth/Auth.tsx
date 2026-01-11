
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Heart, Loader2, Phone, BookOpen, Clock, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { volunteerAPI } from '@/api/endpoints';
import authBackground from '@/assets/auth-background.jpg';
import nhrdLogo from '@/assets/nhrd-logo.png';

interface AuthProps {
    initialMode?: 'login' | 'register';
}

const Auth = ({ initialMode = 'login' }: AuthProps) => {
    const navigate = useNavigate();
    const { login } = useAuth();

    // Derived state from prop, but allows toggling
    const [isLogin, setIsLogin] = useState(initialMode === 'login');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Update state if prop changes (e.g. navigation)
    useEffect(() => {
        setIsLogin(initialMode === 'login');
    }, [initialMode]);

    // Login State
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    // Register State (Volunteer)
    const [currStep, setCurrStep] = useState(1);
    const [regData, setRegData] = useState({
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

    // Login Handle
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(loginData);
            toast.success('Login successful!');

            const userStr = localStorage.getItem('user');
            const user = userStr ? JSON.parse(userStr) : {};
            const role = user.role;

            if (['ADMIN', 'SUPER_ADMIN', 'MANAGER'].includes(role)) {
                navigate('/admin/dashboard');
            } else if (role === 'VOLUNTEER') {
                navigate('/volunteer/dashboard');
            } else if (role === 'DONOR') {
                navigate('/user/dashboard');
            } else {
                navigate('/');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    // Register Handle
    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await volunteerAPI.register(regData);
            const userRole = response.data?.data?.user?.role;
            const status = response.data?.data?.volunteer?.status;

            if (userRole === 'ADMIN' || status === 'ACTIVE') {
                toast.success('Registration successful! You are the System Administrator.');
            } else if (userRole === 'DONOR' || userRole === 'USER') {
                toast.success('Registration successful! Welcome to the platform.');
            } else {
                toast.success('Registration successful! Please wait for admin approval.');
            }
            // Switch to login after success
            setIsLogin(true);
            setCurrStep(1);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRoleHint = (email: string) => {
        setLoginData({ ...loginData, email, password: 'password' });
        toast.info(`Set credentials for ${email}`);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image & Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <img
                    src={authBackground}
                    alt="Odisha landscape"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 backdrop-blur-[2px]" />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-lg text-white"
                    >
                        <Link to="/" className="inline-flex items-center gap-3 mb-8 hover:opacity-90 transition-opacity">
                            <img src={nhrdLogo} alt="NHRD" className="w-16 h-16 object-contain bg-white/10 rounded-lg p-2 backdrop-blur-sm" />
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">NHRD</h2>
                                <p className="text-white/80 text-sm font-medium tracking-wide">Rural Development</p>
                            </div>
                        </Link>
                        <h1 className="text-5xl font-bold mb-6 leading-tight">
                            {isLogin
                                ? "Welcome back to the movement."
                                : "Join us in transforming rural Lives."}
                        </h1>
                        <p className="text-lg text-white/90 mb-10 leading-relaxed font-light">
                            {isLogin
                                ? "Manage your contributions, track impact, and coordinate with the community through our unified dashboard."
                                : "Create an account to register for events, track your donations, and stay connected with our community development initiatives."}
                        </p>

                        <div className="flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-11 h-11 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-sm font-medium backdrop-blur-sm">
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-white font-semibold text-lg">5,000+ Supporters</p>
                                <p className="text-white/70 text-sm">Making a difference daily</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md space-y-8"
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <img src={nhrdLogo} alt="NHRD" className="w-12 h-12 object-contain" />
                            <div className="text-left">
                                <h2 className="text-xl font-bold text-foreground">NHRD</h2>
                                <p className="text-muted-foreground text-xs">Rural Development</p>
                            </div>
                        </Link>
                    </div>

                    {/* Auth Toggle */}
                    <div className="flex bg-muted p-1 rounded-xl">
                        <button
                            onClick={() => {
                                setIsLogin(true);
                                navigate('/login');
                            }}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${isLogin ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => {
                                setIsLogin(false);
                                navigate('/register');
                            }}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${!isLogin ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight">
                            {isLogin ? 'Welcome back' : 'Create an account'}
                        </h2>
                        <p className="text-muted-foreground">
                            {isLogin
                                ? 'Enter your credentials to access your account'
                                : 'Complete the form below to apply as a volunteer'}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            /* Login Form */
                            <motion.form
                                key="login"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleLoginSubmit}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            placeholder="name@example.com"
                                            className="pl-10 h-11"
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <button type="button" className="text-xs text-primary font-medium hover:underline">Forgot password?</button>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            className="pl-10 pr-10 h-11"
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full h-11 font-semibold text-md gap-2" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
                                </Button>

                                {/* Role Hints (Dev Only/Demo) */}
                                <div className="pt-6">
                                    <div className="relative mb-4">
                                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Quick Login (Demo)</span></div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { role: 'ADMIN', email: 'admin@trustflow.app', icon: Shield, color: 'text-primary' },
                                            { role: 'VOLUNTEER', email: 'volunteer@trustflow.app', icon: Heart, color: 'text-rose-500' },
                                            { role: 'DONOR', email: 'donor@trustflow.app', icon: User, color: 'text-blue-500' }
                                        ].map(h => (
                                            <button
                                                key={h.role}
                                                type="button"
                                                onClick={() => handleRoleHint(h.email)}
                                                className="flex flex-col items-center justify-center p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors gap-2"
                                            >
                                                <h.icon className={`w-5 h-5 ${h.color}`} />
                                                <span className="text-[10px] font-bold">{h.role}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.form>
                        ) : (
                            /* Register Form (Multi-step) */
                            <motion.form
                                key="register"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleRegisterSubmit}
                                className="space-y-6"
                            >
                                {currStep === 1 ? (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="full_name">Full Name</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="full_name"
                                                    placeholder="John Doe"
                                                    className="pl-10 h-11"
                                                    value={regData.full_name}
                                                    onChange={(e) => setRegData({ ...regData, full_name: e.target.value })}
                                                    required
                                                />
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
                                                    className="pl-10 h-11"
                                                    value={regData.email}
                                                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone</Label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="phone"
                                                        placeholder="+91..."
                                                        className="pl-10 h-11"
                                                        value={regData.phone}
                                                        onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
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
                                                        placeholder="••••••"
                                                        className="pl-10 h-11"
                                                        value={regData.password}
                                                        onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <Button type="button" onClick={() => setCurrStep(2)} className="w-full h-11 gap-2">
                                            Next Step <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="skills">Key Skills</Label>
                                            <div className="relative">
                                                <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="skills"
                                                    placeholder="Teaching, Medical, Design..."
                                                    className="pl-10 h-11"
                                                    value={regData.skills}
                                                    onChange={(e) => setRegData({ ...regData, skills: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Brief Bio</Label>
                                            <Textarea
                                                id="bio"
                                                placeholder="Tell us a bit about yourself..."
                                                className="min-h-[80px]"
                                                value={regData.bio}
                                                onChange={(e) => setRegData({ ...regData, bio: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="motivation">Motivation</Label>
                                            <Textarea
                                                id="motivation"
                                                placeholder="Why do you want to join?"
                                                className="min-h-[80px]"
                                                value={regData.motivation}
                                                onChange={(e) => setRegData({ ...regData, motivation: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Button type="button" variant="outline" onClick={() => setCurrStep(1)} className="h-11">
                                                Back
                                            </Button>
                                            <Button type="submit" className="h-11 gap-2" disabled={isLoading}>
                                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Signup"}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {/* Footer */}
                    <div className="text-center pt-6">
                        <Link to="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2 transition-colors">
                            <Heart className="w-4 h-4" />
                            Return to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Auth;
