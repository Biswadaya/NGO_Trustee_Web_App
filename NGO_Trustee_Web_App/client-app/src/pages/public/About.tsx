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
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-slate-200 text-slate-700">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900">
              Our Mission to Create
              <span className="block text-indigo-600">Lasting Change</span>
            </h1>
            <p className="text-lg text-slate-600">
              Since 2010, Trust Flow has been dedicated to transforming lives through sustainable
              development programs focused on education, healthcare, and community empowerment.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-indigo-200 text-indigo-700 bg-indigo-50">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-slate-900">
                A Journey of Impact & Compassion
              </h2>
              <p className="text-slate-600 mb-4">
                Trust Flow was founded with a simple yet powerful vision: to create opportunities
                for those who need them most. What started as a small community initiative has
                grown into a movement that touches thousands of lives every year.
              </p>
              <p className="text-slate-600 mb-6">
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
                      className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-500">Led by dedicated professionals</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {impactStats.map((stat) => (
                <Card key={stat.label} className="text-center p-6 bg-white border-slate-100 shadow-sm">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
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
            <Badge variant="outline" className="mb-4 text-amber-600 border-amber-200 bg-amber-50">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-900">
              Guiding Principles
            </h2>
            <p className="text-slate-600">
              Our values shape every decision we make and every program we launch.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Compassion', description: 'We lead with empathy and understanding in everything we do.' },
              { icon: Target, title: 'Impact', description: 'Every initiative is designed for measurable, lasting change.' },
              { icon: Users, title: 'Community', description: 'We believe in the power of people coming together.' },
            ].map((value) => (
              <Card key={value.title} className="text-center p-8 bg-white border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-slate-700">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-900">
              Meet Our Leadership
            </h2>
            <p className="text-slate-600">
              Dedicated professionals committed to making a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="text-center p-6 group bg-white border-slate-100">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-indigo-50 group-hover:ring-indigo-100 transition-all bg-slate-200">
                  {/* Fallback for missing image */}
                  {(member.image) ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 text-xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="font-semibold mb-1 text-slate-900">{member.name}</h3>
                <p className="text-sm text-indigo-600 mb-2">{member.role}</p>
                <p className="text-xs text-slate-500">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-white">

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-slate-900">
              Join Our Mission
            </h2>
            <p className="text-lg text-slate-600 mb-10">
              Whether you donate, volunteer, or spread the word, every action counts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" className="font-semibold shadow-lg hover:shadow-xl transition-all" asChild>
                <Link to="/donate">
                  Donate Now <Heart className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="text-slate-700 border-slate-200 hover:bg-slate-50">
                <Link to="/login">
                  Become a Member <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
