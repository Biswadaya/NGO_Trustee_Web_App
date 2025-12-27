import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Mail,
  Phone
} from 'lucide-react';
import { events } from '@/data/mockData';

const Events = () => {
  const upcomingEvents = events.filter(e => e.status === 'Upcoming');
  const pastEvents = events.filter(e => e.status === 'Completed');

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
              <Link to="/events" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Events</Link>
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
            <Badge variant="glass" className="mb-6">Our Events</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Join Us at Our
              <span className="block gradient-text">Upcoming Events</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Be part of our community gatherings, workshops, and initiatives that bring people together for change.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge variant="premium" className="mb-2">Upcoming</Badge>
              <h2 className="text-2xl font-display font-bold">Don't Miss Out</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} variant="glass" className="overflow-hidden group hover:shadow-premium-lg transition-all duration-300">
                <div className="p-1">
                  <div className="aspect-[16/10] rounded-lg gradient-hero flex items-center justify-center relative overflow-hidden">
                    <Calendar className="w-16 h-16 text-primary-foreground/30" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="glass" className="bg-primary-foreground/20 text-primary-foreground border-0">
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{event.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                    <Button variant="premium" size="sm">
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge variant="glass" className="mb-2">Completed</Badge>
              <h2 className="text-2xl font-display font-bold">Past Events</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <Card key={event.id} variant="glass" className="opacity-80">
                <CardContent className="p-6">
                  <Badge variant="inactive" className="mb-3">Completed</Badge>
                  <h3 className="text-lg font-semibold mb-3">{event.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} attended</span>
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
              Want to Volunteer at Events?
            </h2>
            <p className="text-lg opacity-90 mb-10">
              Join our volunteer team and help make our events successful while gaining valuable experience.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/login">
                Join as Volunteer <ArrowRight className="w-5 h-5 ml-2" />
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

export default Events;
