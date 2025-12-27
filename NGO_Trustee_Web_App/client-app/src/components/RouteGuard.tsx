import { Navigate } from 'react-router-dom';
import { useAuth, type UserRole } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Shield, ArrowRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

const RouteGuard = ({ children, allowedRoles }: RouteGuardProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20" />
          <p className="text-muted-foreground animate-pulse">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card variant="glass" className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle>Access Restricted</CardTitle>
            <CardDescription>
              This section is reserved for {allowedRoles.map(r => r.toLowerCase()).join(', ')} roles.
              <br />
              Your current role is <span className="font-bold text-foreground">{user.role}</span>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/')}
            >
              Return to Website
            </Button>
            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={() => navigate('/login')}
            >
              Sign in with a different account
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Final check for Volunteer status
  if (user && user.role === 'VOLUNTEER' && user.status === 'PENDING' && !allowedRoles.includes('ADMIN' as any)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card variant="glass" className="max-w-md w-full text-center">
          <CardHeader>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <CardTitle>Registration Pending</CardTitle>
            <CardDescription>
              Thank you for registering! Your volunteer account is currently under review by our administration team.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg text-sm text-left">
              <p className="font-semibold mb-2 text-primary">Next Steps:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Admin will verify your details</li>
                <li>Account will be activated within 24-48 hours</li>
                <li>You will receive full portal access upon approval</li>
              </ul>
            </div>
            <Button variant="premium" className="w-full" onClick={() => navigate('/')}>
              Back to Home <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteGuard;
