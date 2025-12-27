import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Sparkles,
  Heart,
  Shield,
  CreditCard,
  Wallet,
  Building,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { projects } from '@/data/mockData';

const Donate = () => {
  const [amount, setAmount] = useState('1000');
  const [selectedProject, setSelectedProject] = useState('general');

  const presetAmounts = ['500', '1000', '2500', '5000', '10000'];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold gradient-text">Trust Flow</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/projects" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Projects</Link>
              <Link to="/events" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Events</Link>
              <Link to="/donate" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Donate</Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="gold" className="mb-6">
              <Heart className="w-3 h-3 mr-1" />
              Make a Difference
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Your Donation
              <span className="block gradient-text">Changes Lives</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Every contribution, no matter the size, helps us continue our mission to create lasting impact.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Donation Form */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-xl">Make a Donation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <Label className="mb-3 block">Select Amount</Label>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {presetAmounts.map((preset) => (
                      <Button
                        key={preset}
                        variant={amount === preset ? 'premium' : 'outline'}
                        size="sm"
                        onClick={() => setAmount(preset)}
                      >
                        ₹{preset}
                      </Button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8"
                      placeholder="Enter custom amount"
                    />
                  </div>
                </div>

                {/* Project Selection */}
                <div>
                  <Label className="mb-3 block">Donate To</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={selectedProject === 'general' ? 'premium' : 'outline'}
                      className="h-auto py-3 justify-start"
                      onClick={() => setSelectedProject('general')}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      General Fund
                    </Button>
                    {projects.slice(0, 3).map((project) => (
                      <Button
                        key={project.id}
                        variant={selectedProject === project.id.toString() ? 'premium' : 'outline'}
                        className="h-auto py-3 justify-start"
                        onClick={() => setSelectedProject(project.id.toString())}
                      >
                        <span className="truncate">{project.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Donor Details */}
                <div className="space-y-4">
                  <Label className="block">Your Details</Label>
                  <Input placeholder="Full Name" />
                  <Input placeholder="Email Address" type="email" />
                  <Input placeholder="Phone Number" />
                  <Input placeholder="PAN Number (for 80G receipt)" />
                </div>

                {/* Payment Methods */}
                <div>
                  <Label className="mb-3 block">Payment Method</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" className="h-auto py-4 flex-col">
                      <CreditCard className="w-6 h-6 mb-2" />
                      <span className="text-xs">Card</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col">
                      <Wallet className="w-6 h-6 mb-2" />
                      <span className="text-xs">UPI</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col">
                      <Building className="w-6 h-6 mb-2" />
                      <span className="text-xs">Net Banking</span>
                    </Button>
                  </div>
                </div>

                <Button variant="premium" size="xl" className="w-full">
                  Donate ₹{amount || '0'}
                  <Heart className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By donating, you agree to our terms and conditions. All donations are tax-deductible under 80G.
                </p>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="space-y-6">
              <Card variant="premium" className="overflow-hidden">
                <div className="p-8 gradient-hero text-primary-foreground">
                  <h3 className="text-2xl font-display font-bold mb-4">Why Donate to Trust Flow?</h3>
                  <ul className="space-y-4">
                    {[
                      '100% of donations go directly to our programs',
                      'Tax benefits under Section 80G',
                      'Transparent reporting and impact tracking',
                      'Registered and audited non-profit organization',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              <Card variant="glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Secure Payments</h4>
                      <p className="text-sm text-muted-foreground">256-bit SSL encryption</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is processed securely. We do not store credit card details.
                  </p>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Other Ways to Give</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-primary" />
                      </div>
                      <span>Monthly recurring donation</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building className="w-4 h-4 text-primary" />
                      </div>
                      <span>Corporate partnerships</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-primary" />
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

      {/* Footer */}
      <footer className="bg-sidebar py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-display font-bold text-sidebar-foreground">Trust Flow</span>
              </div>
              <p className="text-sidebar-foreground/70 text-sm">
                Empowering communities through sustainable development.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-sidebar-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['About Us', 'Projects', 'Events', 'Donate'].map((link) => (
                  <li key={link}>
                    <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-sidebar-foreground mb-4">Get Involved</h4>
              <ul className="space-y-2">
                {['Volunteer', 'Partner With Us', 'Careers', 'Newsletter'].map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-sidebar-foreground mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-sidebar-foreground/70">
                  <Mail className="w-4 h-4" />
                  info@trustflow.app
                </li>
                <li className="flex items-center gap-2 text-sm text-sidebar-foreground/70">
                  <Phone className="w-4 h-4" />
                  +91 98765 43210
                </li>
                <li className="flex items-start gap-2 text-sm text-sidebar-foreground/70">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  123 NGO Street, New Delhi, India
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-sidebar-border pt-8 text-center">
            <p className="text-sm text-sidebar-foreground/50">
              © 2024 Trust Flow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Donate;
