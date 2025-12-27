import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Shield, Users, Heart, ArrowRight, Sparkles, Mail, Lock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
      toast.success('Login successful!');

      // Redirect based on role (Note: Backend roles are uppercase)
      const user = JSON.parse(localStorage.getItem('user') || '{}');
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
      setLoading(false);
    }
  };

  const handleRoleHint = (email: string) => {
    setFormData({ ...formData, email, password: 'password' });
    toast.info(`Set credentials for ${email}`);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-4xl px-4 grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side: Info */}
        <div className="hidden md:block space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Premium NGO Platform</span>
          </div>
          <h1 className="text-5xl font-display font-bold leading-tight">
            Empowering <span className="gradient-text">Trust</span> & <span className="gradient-text">Transparency</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Welcome back to Trust Flow. Manage your NGO operations, track donations, and coordinate volunteers with our state-of-the-art digital ecosystem.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl glass-card">
              <Shield className="w-6 h-6 text-primary mb-2" />
              <div className="font-bold text-xl">Secure</div>
              <div className="text-xs text-muted-foreground">JWT Protected</div>
            </div>
            <div className="p-4 rounded-xl glass-card">
              <Users className="w-6 h-6 text-secondary mb-2" />
              <div className="font-bold text-xl">Unified</div>
              <div className="text-xs text-muted-foreground">Multi-role Access</div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <Card variant="glass" className="w-full shadow-2xl border-white/20 animate-scale-in">
          <CardHeader className="space-y-1">
            <div className="flex md:hidden items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-2xl gradient-text">Trust Flow</span>
            </div>
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    className="pl-10 h-11"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10 h-11"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-11 btn-premium font-bold text-white shadow-lg" disabled={loading}>
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="ml-2 w-4 h-4" /></>}
              </Button>
              <div className="flex justify-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link to="/register" className="ml-1 text-primary font-bold hover:underline">
                  Register now
                </Link>
              </div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-muted-foreground">Or continue as</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" size="sm" className="h-20 flex-col gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all" onClick={() => handleRoleHint('admin@trustflow.app')}>
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-[10px] font-bold">ADMIN</span>
              </Button>
              <Button variant="outline" size="sm" className="h-20 flex-col gap-2 hover:bg-secondary/5 hover:border-secondary/50 transition-all" onClick={() => handleRoleHint('volunteer@trustflow.app')}>
                <Heart className="w-5 h-5 text-secondary" />
                <span className="text-[10px] font-bold">VOLUNTEER</span>
              </Button>
              <Button variant="outline" size="sm" className="h-20 flex-col gap-2 hover:bg-accent/5 hover:border-accent/50 transition-all" onClick={() => handleRoleHint('donor@trustflow.app')}>
                <Users className="w-5 h-5 text-accent" />
                <span className="text-[10px] font-bold">DONOR</span>
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
