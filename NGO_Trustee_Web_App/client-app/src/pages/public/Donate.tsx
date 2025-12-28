import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Heart,
  Shield,
  CreditCard,
  Wallet,
  Building,
  CheckCircle,
  User,
  Lock
} from 'lucide-react';
import { campaignAPI } from '@/api/endpoints';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Donate = () => {
  const { user, isAuthenticated } = useAuth();
  // State for donation amount
  const [amount, setAmount] = useState('1000');
  const [selectedProject, setSelectedProject] = useState('general');
  const [projects, setProjects] = useState<any[]>([]);
  const [mode, setMode] = useState<'anonymous' | 'authenticated'>('anonymous');

  // Custom form state for anonymous donors
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  useEffect(() => {
    // Fetch active campaigns for the dropdown
    const fetchProjects = async () => {
      try {
        const res = await campaignAPI.list();
        // create a safe fallback if data structure is unexpected
        const campaigns = res?.data?.data?.campaigns || [];
        setProjects(campaigns);
      } catch (err) {
        console.error("Failed to fetch campaigns", err);
        setProjects([]);
      }
    };
    fetchProjects();
  }, []);

  // Update mode if user logs in
  useEffect(() => {
    if (isAuthenticated) {
      setMode('authenticated');
    }
  }, [isAuthenticated]);

  const presetAmounts = ['500', '1000', '2500', '5000', '10000'];

  const handleDonate = () => {
    // In a real app, this would integrate with Razorpay/Stripe
    toast.success(`Processing donation of ₹${amount} for ${selectedProject === 'general' ? 'General Fund' : 'Specific Project'}!`);

    if (mode === 'authenticated') {
      toast.info("Certificate will be generated automatically.");
    } else {
      toast.info("Thank you for your anonymous contribution!");
    }

    // Here you would call donationAPI.create({ ... })
    // For now, we simulate success
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-amber-200 text-amber-700 bg-amber-50">
              <Heart className="w-3 h-3 mr-1 fill-current" />
              Make a Difference
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900">
              Your Donation
              <span className="block text-indigo-600">Changes Lives</span>
            </h1>
            <p className="text-lg text-slate-600">
              Every contribution, no matter the size, helps us continue our mission to create lasting impact.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Donation Form */}
            <div className="space-y-6">

              {/* Mode Selection */}
              <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="anonymous">Donate Anonymously</TabsTrigger>
                  <TabsTrigger value="authenticated">Donate & Get Certificate</TabsTrigger>
                </TabsList>

                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900">
                      {mode === 'anonymous' ? 'Anonymous Donation' : 'Authenticated Donation'}
                    </CardTitle>
                    <CardDescription>
                      {mode === 'anonymous'
                        ? 'Simple, quick, and optional details. No certificate provided.'
                        : 'Log in to track your donations and receive tax certificates.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">

                    {/* Auth Check for Authenticated Mode */}
                    {mode === 'authenticated' && !isAuthenticated && (
                      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 mb-6">
                        <h4 className="font-semibold text-indigo-900 mb-2 flex items-center">
                          <Lock className="w-4 h-4 mr-2" />
                          Login Required
                        </h4>
                        <p className="text-sm text-indigo-700 mb-4">
                          Please sign in or create an account to receive your donation certificate.
                        </p>
                        <Tabs defaultValue="login" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                          </TabsList>
                          <div className="mt-4">
                            <TabsContent value="login">
                              <LoginForm />
                            </TabsContent>
                            <TabsContent value="register">
                              <RegisterForm />
                            </TabsContent>
                          </div>
                        </Tabs>
                      </div>
                    )}

                    {/* Valid Auth State or Anonymous */}
                    {(mode === 'anonymous' || isAuthenticated) && (
                      <>
                        {/* Amount Selection */}
                        <div>
                          <Label className="mb-3 block text-slate-700">Select Amount</Label>
                          <div className="grid grid-cols-5 gap-2 mb-3">
                            {presetAmounts.map((preset) => (
                              <Button
                                key={preset}
                                variant={amount === preset ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setAmount(preset)}
                                className={amount === preset ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "border-slate-200 text-slate-600"}
                              >
                                ₹{preset}
                              </Button>
                            ))}
                          </div>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                            <Input
                              type="number"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="pl-8 border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                              placeholder="Enter custom amount"
                            />
                          </div>
                        </div>

                        {/* Project Selection */}
                        <div>
                          <Label className="mb-3 block text-slate-700">Donate To</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant={selectedProject === 'general' ? 'default' : 'outline'}
                              className={`h-auto py-3 justify-start ${selectedProject === 'general' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'border-slate-200 text-slate-600'}`}
                              onClick={() => setSelectedProject('general')}
                            >
                              <Heart className="w-4 h-4 mr-2" />
                              General Fund
                            </Button>
                            {projects.slice(0, 3).map((project: any) => (
                              <Button
                                key={project.id}
                                variant={selectedProject === project.id.toString() ? 'default' : 'outline'}
                                className={`h-auto py-3 justify-start ${selectedProject === project.id.toString() ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'border-slate-200 text-slate-600'}`}
                                onClick={() => setSelectedProject(project.id.toString())}
                              >
                                <span className="truncate">{project.title}</span>
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Donor Details (Only if Anonymous or Authenticated User confirms) */}
                        {mode === 'authenticated' ? (
                          <div className="bg-slate-50 p-4 rounded-lg flex items-center gap-3 border border-slate-200">
                            <div className="bg-indigo-100 p-2 rounded-full">
                              <User className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">Logged in as {user?.full_name || user?.email}</p>
                              <p className="text-xs text-slate-500">Certificate will be issued to this account.</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <Label className="block text-slate-700">Your Details (Optional)</Label>
                            <Input
                              placeholder="Full Name"
                              className="border-slate-200 bg-slate-50 text-slate-900"
                              value={donorName}
                              onChange={(e) => setDonorName(e.target.value)}
                            />
                            <Input
                              placeholder="Email Address (for receipt)"
                              type="email"
                              className="border-slate-200 bg-slate-50 text-slate-900"
                              value={donorEmail}
                              onChange={(e) => setDonorEmail(e.target.value)}
                            />
                          </div>
                        )}

                        {/* Payment Methods */}
                        <div>
                          <Label className="mb-3 block text-slate-700">Payment Method</Label>
                          <div className="grid grid-cols-3 gap-3">
                            <Button variant="outline" className="h-auto py-4 flex-col border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600">
                              <CreditCard className="w-6 h-6 mb-2" />
                              <span className="text-xs">Card</span>
                            </Button>
                            <Button variant="outline" className="h-auto py-4 flex-col border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600">
                              <Wallet className="w-6 h-6 mb-2" />
                              <span className="text-xs">UPI</span>
                            </Button>
                            <Button variant="outline" className="h-auto py-4 flex-col border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600">
                              <Building className="w-6 h-6 mb-2" />
                              <span className="text-xs">Net Banking</span>
                            </Button>
                          </div>
                        </div>

                        <Button size="xl" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold" onClick={handleDonate}>
                          Donate ₹{amount || '0'}
                          <Heart className="w-5 h-5 ml-2 fill-current" />
                        </Button>

                        <p className="text-xs text-center text-slate-500">
                          By donating, you agree to our terms and conditions. All donations are tax-deductible under 80G.
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Tabs>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-6">
              <Card className="overflow-hidden bg-indigo-600 border-indigo-500 text-white">
                <div className="p-8">
                  <h3 className="text-2xl font-display font-bold mb-4">Why Donate to Trust Flow?</h3>
                  <ul className="space-y-4">
                    {[
                      '100% of donations go directly to our programs',
                      'Tax benefits under Section 80G',
                      'Transparent reporting and impact tracking',
                      'Registered and audited non-profit organization',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-indigo-200" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              <Card className="bg-white border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Secure Payments</h4>
                      <p className="text-sm text-slate-500">256-bit SSL encryption</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">
                    Your payment information is processed securely. We do not store credit card details.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4 text-slate-900">Other Ways to Give</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span>Monthly recurring donation</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <Building className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span>Corporate partnerships</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span>In-kind donations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
