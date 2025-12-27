import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Heart, 
  Users, 
  Target, 
  Award,
  Globe,
  Shield,
  Sparkles,
  ChevronRight,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { impactStats, projects, events, teamMembers } from '@/data/mockData';

const PublicHome = () => {
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
              <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/projects" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Projects</Link>
              <Link to="/events" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Events</Link>
              <Link to="/donate" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Donate</Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="premium" asChild>
                <Link to="/donate">Donate Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="glass" className="mb-6 px-4 py-2 animate-fade-in">
              <Sparkles className="w-3 h-3 mr-2 text-accent" />
              Empowering Communities Since 2010
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in-up">
              Building a Better
              <span className="block gradient-text">Tomorrow Together</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
              Join thousands of changemakers in our mission to create lasting impact through education, healthcare, and community development.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-200">
              <Button variant="premium" size="xl" asChild>
                <Link to="/donate">
                  Start Giving <Heart className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <Link to="/about">
                  Learn More <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20 max-w-4xl mx-auto">
            {impactStats.map((stat, index) => (
              <Card 
                key={stat.label} 
                variant="glass" 
                className="text-center p-6 animate-fade-in-up"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="premium" className="mb-4">What We Do</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our Core Initiatives
            </h2>
            <p className="text-muted-foreground">
              We focus on sustainable development through education, healthcare, and community empowerment programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Education', description: 'Providing quality education to underprivileged children across rural areas.' },
              { icon: Heart, title: 'Healthcare', description: 'Free medical camps and healthcare facilities for those in need.' },
              { icon: Users, title: 'Community', description: 'Building stronger communities through skill development and empowerment.' },
            ].map((feature, index) => (
              <Card 
                key={feature.title} 
                variant="glass" 
                className="group hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button variant="ghost" className="p-0 h-auto text-primary">
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge variant="gold" className="mb-4">Active Projects</Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Making Real Impact
              </h2>
            </div>
            <Button variant="outline" asChild>
              <Link to="/projects">View All Projects <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project) => (
              <Card key={project.id} variant="glass" className="overflow-hidden group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="active" className="mb-3">{project.status}</Badge>
                  <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{Math.round((project.raised / project.goal) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${(project.raised / project.goal) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">₹{(project.raised / 1000).toFixed(0)}K raised</span>
                      <span className="text-muted-foreground">{project.supporters} supporters</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg opacity-90 mb-10">
              Join our community of changemakers and help us create lasting impact in the lives of thousands.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/donate">
                  Donate Now <Heart className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/login">
                  Become a Volunteer <Users className="w-5 h-5 ml-2" />
                </Link>
              </Button>
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
                Empowering communities through sustainable development and social change since 2010.
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
          
          <div className="border-t border-sidebar-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-sidebar-foreground/50">
              © 2024 Trust Flow. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="#" className="text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicHome;
