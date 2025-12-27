import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles,
  Heart,
  Target,
  Users,
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Quote
} from 'lucide-react';
import { teamMembers, impactStats } from '@/data/mockData';

const About = () => {
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
              <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">About</Link>
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
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="glass" className="mb-6">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Our Mission to Create
              <span className="block gradient-text">Lasting Change</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Since 2010, Trust Flow has been dedicated to transforming lives through sustainable 
              development programs focused on education, healthcare, and community empowerment.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="premium" className="mb-4">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                A Journey of Impact & Compassion
              </h2>
              <p className="text-muted-foreground mb-4">
                Trust Flow was founded with a simple yet powerful vision: to create opportunities 
                for those who need them most. What started as a small community initiative has 
                grown into a movement that touches thousands of lives every year.
              </p>
              <p className="text-muted-foreground mb-6">
                Our approach combines grassroots involvement with strategic partnerships to ensure 
                that every program we launch creates sustainable, long-term impact in the communities we serve.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {teamMembers.slice(0, 4).map((member) => (
                    <img 
                      key={member.id}
                      src={member.image} 
                      alt={member.name}
                      className="w-10 h-10 rounded-full border-2 border-background"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Led by dedicated professionals</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {impactStats.map((stat, index) => (
                <Card key={stat.label} variant="glass" className="text-center p-6">
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gold" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Guiding Principles
            </h2>
            <p className="text-muted-foreground">
              Our values shape every decision we make and every program we launch.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Compassion', description: 'We lead with empathy and understanding in everything we do.' },
              { icon: Target, title: 'Impact', description: 'Every initiative is designed for measurable, lasting change.' },
              { icon: Users, title: 'Community', description: 'We believe in the power of people coming together.' },
            ].map((value) => (
              <Card key={value.title} variant="glass" className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="premium" className="mb-4">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-muted-foreground">
              Dedicated professionals committed to making a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} variant="glass" className="text-center p-6 group">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
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
              Join Our Mission
            </h2>
            <p className="text-lg opacity-90 mb-10">
              Whether you donate, volunteer, or spread the word, every action counts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/donate">
                  Donate Now <Heart className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/login">
                  Become a Member <ArrowRight className="w-5 h-5 ml-2" />
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

export default About;
