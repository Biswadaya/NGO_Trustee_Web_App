import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Heart, Loader2, Phone, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { AuthAPI } from '@/api/endpoints';
import authBackground from '@/assets/auth-background.jpg';
import nhrdLogo from '@/assets/nhrd-logo.png';
import { DEFAULT_USER_AVATAR } from '@/utils/constants';

interface AuthProps {
    initialMode?: 'login' | 'register';
}

const Auth = ({ initialMode = 'login' }: AuthProps) => {
    const { setAuth } = useAuth();

    const [isLogin, setIsLogin] = useState(initialMode === 'login');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setIsLogin(initialMode === 'login');
    }, [initialMode]);

    // Login & Register State
    const [loginData, setLoginData] = useState({ email: '', password: '', otp: '' });
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [registerData, setRegisterData] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        profile_photo: ''
    });

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!showOtpInput) {
                // Step 1: Send Credentials
                const response = await AuthAPI.login({ email: loginData.email, password: loginData.password });

                if (response.data.status === 'OTP_REQUIRED') {
                    setShowOtpInput(true);
                    toast.info('Verification code sent to your email.');
                } else {
                    // Fallback for direct login (if OTP disabled)
                    await completeLogin(response.data);
                }
            } else {
                // Step 2: Verify OTP
                const response = await AuthAPI.verifyOtp({ email: loginData.email, otp: loginData.otp });
                await completeLogin(response.data);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    const completeLogin = async (data: any) => {
        // Manually update context (since useAuth.login normally handles API call, we bypass it here to set state directly or we need to expose setAuth)
        // Wait, useAuth().login calls adminAPI.login. We need to update useAuth to just set state.
        // Actually, easiest way: 
        // 1. We already updated AuthContext to use AuthAPI, BUT AuthContext.login expects the API call to return the token.
        // 2. Since we are handling the API call here in the component (for 2-step), we should use `setAuth` from context.
        // Let's check if `setAuth` is exposed. Yes it is from my memory of AuthContext.tsx verification.


        const { token, data: userData } = data;
        console.log('Login Response Data:', userData);

        const userObj = {
            id: userData.user.id,
            name: userData.user.full_name || userData.user.name || userData.user.username || userData.user.email?.split('@')[0] || 'User',
            fullname: userData.user.full_name,
            email: userData.user.email,
            role: userData.user.role,
            status: userData.user.status,
            avatar: userData.user.profile_photo || userData.user.avatar || DEFAULT_USER_AVATAR,
        };

        // Call context setter
        // @ts-ignore - setAuth might need to be destructured from hook
        // note: I need to Make sure `setAuth` is returned by useAuth hook. I checked AuthContext.tsx earlier, it IS returned.
        loginSuccess(token, userObj);
    };

    // Helper to handle context and redirect

    const loginSuccess = (token: string, user: any) => {
        setAuth(token, user);
        toast.success('Welcome back!');

        if (['ADMIN', 'SUPER_ADMIN', 'MANAGER'].includes(user.role)) {
            window.location.href = '/admin/dashboard';
        } else if (user.role === 'VOLUNTEER') {
            window.location.href = '/volunteer/dashboard';
        } else if (['DONOR', 'MEMBER'].includes(user.role)) {
            window.location.href = '/user/dashboard';
        } else {
            window.location.href = '/';
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await AuthAPI.register(registerData);
            toast.success('Account created successfully! Please login.');
            toast.success('Account created successfully! Please login.');
            setLoginData({ email: registerData.email, password: '', otp: '' });
            setRegisterData({ full_name: '', email: '', phone: '', password: '', profile_photo: '' });
            setIsLogin(true);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black">
                <img
                    src={authBackground}
                    alt="Background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-12 text-white z-10">
                    <div className="flex items-center gap-3">
                        <img src={nhrdLogo} alt="Logo" className="w-12 h-12 bg-white/20 p-2 rounded-lg backdrop-blur" />
                        <span className="text-xl font-bold tracking-wider">NHRD TRUST</span>
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold mb-6 leading-tight">
                            {isLogin ? "Welcome Back." : "Join the Movement."}
                        </h1>
                        <p className="text-xl text-white/80 max-w-md">
                            Together we can transform lives and build a sustainable future for our communities.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                        <span>© 2026 NHRD</span>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">
                            {isLogin ? 'Sign in to account' : 'Create an account'}
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            {isLogin ? 'Enter your email below to access your account' : 'Enter your details below to get started'}
                        </p>
                    </div>

                    <div className="flex bg-muted p-1 rounded-lg">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isLogin ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isLogin ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <motion.form
                                key="login"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleLoginSubmit}
                                className="space-y-4"
                            >
                                {!showOtpInput ? (
                                    <>
                                        <div className="space-y-2">
                                            <Label>Email</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="name@example.com"
                                                    className="pl-10"
                                                    value={loginData.email}
                                                    onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <Label>Password</Label>
                                                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
                                            </div>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    className="pl-10 pr-10"
                                                    value={loginData.password}
                                                    onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                                                    required
                                                />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground">
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                        <div className="bg-primary/10 p-4 rounded-lg text-sm text-primary mb-4">
                                            We sent a 6-digit code to <strong>{loginData.email}</strong>. Please enter it below.
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Verification Code</Label>
                                            <div className="relative">
                                                <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="123456"
                                                    className="pl-10 text-center tracking-widest text-lg"
                                                    value={loginData.otp}
                                                    onChange={e => setLoginData({ ...loginData, otp: e.target.value })}
                                                    maxLength={6}
                                                    required
                                                    autoFocus
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button
                                                type="button"
                                                onClick={() => setShowOtpInput(false)}
                                                className="text-xs text-muted-foreground hover:text-primary hover:underline"
                                            >
                                                Use a different email
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (showOtpInput ? "Verify & Login" : "Sign In")}
                                </Button>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="register"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleRegisterSubmit}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="John Doe"
                                            className="pl-10"
                                            value={registerData.full_name}
                                            onChange={e => setRegisterData({ ...registerData, full_name: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="email"
                                            placeholder="name@example.com"
                                            className="pl-10"
                                            value={registerData.email}
                                            onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="+91..."
                                            className="pl-10"
                                            value={registerData.phone}
                                            onChange={e => setRegisterData({ ...registerData, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="password"
                                            className="pl-10"
                                            value={registerData.password}
                                            onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Profile Image URL (Optional)</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="https://..."
                                            className="pl-10"
                                            value={registerData.profile_photo}
                                            onChange={e => setRegisterData({ ...registerData, profile_photo: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
                                </Button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    <div className="text-center">
                        <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-2">
                            <Heart className="w-4 h-4" /> Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
