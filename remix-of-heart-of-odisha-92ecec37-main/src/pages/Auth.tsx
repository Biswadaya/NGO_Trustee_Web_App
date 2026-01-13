import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import authBackground from '@/assets/auth-background.jpg';
import nhrdLogo from '@/assets/nhrd-logo.png';

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Check if already logged in
    const user = localStorage.getItem('nhrd_user');
    if (user) {
      navigate(redirectTo);
    }
  }, [navigate, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!isLogin) {
      // Sign up validation
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        setIsLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }
    }

    // Store user data (simulated - in real app would call backend)
    const userData = {
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      loggedInAt: new Date().toISOString(),
    };
    
    localStorage.setItem('nhrd_user', JSON.stringify(userData));
    
    toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
    
    // Check for event registration intent
    const eventIntent = localStorage.getItem('register_event_intent');
    if (eventIntent) {
      localStorage.removeItem('register_event_intent');
      navigate('/events');
    } else {
      navigate(redirectTo);
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Background Image Side */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src={authBackground} 
          alt="Odisha landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg text-white"
          >
            <Link to="/" className="inline-flex items-center gap-3 mb-8">
              <img src={nhrdLogo} alt="NHRD" className="w-16 h-16 object-contain" />
              <div>
                <h2 className="text-2xl font-bold">NHRD</h2>
                <p className="text-white/80 text-sm">Rural Development</p>
              </div>
            </Link>
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Join us in transforming rural Odisha
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Create an account to register for events, track your donations, 
              and stay connected with our community development initiatives.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-white/80 text-sm">
                Join 5,000+ supporters making a difference
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
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

          {/* Toggle */}
          <div className="flex bg-muted rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                isLogin ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              {t('auth.login', 'Log In')}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                !isLogin ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              {t('auth.signup', 'Sign Up')}
            </button>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">
            {isLogin ? t('auth.welcomeBack', 'Welcome back!') : t('auth.createAccount', 'Create your account')}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isLogin 
              ? t('auth.loginSubtitle', 'Enter your credentials to access your account')
              : t('auth.signupSubtitle', 'Fill in your details to get started')
            }
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field (signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('auth.fullName', 'Full Name')}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('auth.enterName', 'Enter your full name')}
                    className="h-12 pl-12"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('auth.email', 'Email Address')}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('auth.enterEmail', 'Enter your email')}
                  className="h-12 pl-12"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('auth.password', 'Password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={t('auth.enterPassword', 'Enter your password')}
                  className="h-12 pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('auth.confirmPassword', 'Confirm Password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder={t('auth.reenterPassword', 'Re-enter your password')}
                    className="h-12 pl-12"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Forgot Password (login only) */}
            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-sm text-primary hover:underline">
                  {t('auth.forgotPassword', 'Forgot password?')}
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="cta"
              size="xl"
              className="w-full gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? t('auth.loginButton', 'Log In') : t('auth.signupButton', 'Create Account')}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social Login */}
          <Button variant="outline" className="w-full h-12 gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t('auth.continueGoogle', 'Continue with Google')}
          </Button>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2">
              <Heart className="w-4 h-4" />
              {t('auth.backToHome', 'Back to NHRD Home')}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;