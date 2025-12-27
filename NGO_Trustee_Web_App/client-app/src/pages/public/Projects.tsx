import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles,
  Heart,
  Users,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Filter
} from 'lucide-react';
import { projects } from '@/data/mockData';

const Projects = () => {
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
              <Link to="/projects" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Projects</Link>
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
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="glass" className="mb-6">Our Projects</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Creating Impact Through
              <span className="block gradient-text">Meaningful Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our active initiatives and see how your support is transforming lives across communities.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Badge variant="premium" className="cursor-pointer">All Projects</Badge>
              <Badge variant="glass" className="cursor-pointer">Education</Badge>
              <Badge variant="glass" className="cursor-pointer">Healthcare</Badge>
              <Badge variant="glass" className="cursor-pointer">Environment</Badge>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} variant="glass" className="overflow-hidden group">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="active">{project.status}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{Math.round((project.raised / project.goal) * 100)}%</span>
                    </div>
                    <Progress value={(project.raised / project.goal) * 100} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">₹{(project.raised / 1000).toFixed(0)}K raised</span>
                      <span className="text-muted-foreground">of ₹{(project.goal / 1000).toFixed(0)}K goal</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{project.supporters} supporters</span>
                    </div>
                    <Button variant="premium" size="sm">
                      Donate <Heart className="w-4 h-4 ml-1" />
                    </Button>
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Want to Start a Project?
            </h2>
            <p className="text-lg opacity-90 mb-10">
              Have an idea that can make a difference? Partner with us to bring your vision to life.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/login">
                Submit Proposal <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
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

export default Projects;
