import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Heart,
  Users,
  Target,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { impactStats, projects } from '@/data/mockData';

const PublicHome = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 opacity-30" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 border-slate-200 text-slate-600 bg-white">
              <Sparkles className="w-3 h-3 mr-2 text-indigo-500" />
              Empowering Communities Since 2010
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-slate-900">
              Building a Better
              <span className="block text-indigo-600">Tomorrow Together</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Join thousands of changemakers in our mission to create lasting impact through education, healthcare, and community development.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" className="font-semibold shadow-lg hover:shadow-xl transition-all" asChild>
                <Link to="/donate">
                  Start Giving <Heart className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="text-slate-700 border-slate-200 hover:bg-slate-50">
                <Link to="/about">
                  Learn More <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20 max-w-4xl mx-auto">
            {impactStats.map((stat) => (
              <Card
                key={stat.label}
                className="text-center p-6 bg-white border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-emerald-700 border-emerald-200 bg-emerald-50">What We Do</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-900">
              Our Core Initiatives
            </h2>
            <p className="text-slate-600">
              We focus on sustainable development through education, healthcare, and community empowerment programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Education', description: 'Providing quality education to underprivileged children across rural areas.' },
              { icon: Heart, title: 'Healthcare', description: 'Free medical camps and healthcare facilities for those in need.' },
              { icon: Users, title: 'Community', description: 'Building stronger communities through skill development and empowerment.' },
            ].map((feature) => (
              <Card
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-slate-100"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 mb-4">{feature.description}</p>
                  <Button variant="ghost" className="p-0 h-auto text-indigo-600 hover:text-indigo-700 hover:bg-transparent px-0">
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge variant="outline" className="mb-4 text-amber-700 border-amber-200 bg-amber-50">Active Projects</Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">
                Making Real Impact
              </h2>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex border-slate-200 text-slate-600">
              <Link to="/projects">View All Projects <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project) => (
              <Card key={project.id} className="overflow-hidden group bg-white border-slate-100 hover:shadow-lg transition-all duration-300">
                <div className="aspect-video overflow-hidden relative">
                  {/* Image Fallback */}
                  {(project.image) ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/600x400/indigo/white?text=${encodeURIComponent(project.name)}`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-300">
                      <Sparkles className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100">{project.status}</Badge>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">{project.name}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-medium text-slate-700">{Math.round((project.raised / project.goal) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${(project.raised / project.goal) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-semibold">₹{(project.raised / 1000).toFixed(0)}K raised</span>
                      <span className="text-slate-500">{project.supporters} supporters</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild className="w-full border-slate-200 text-slate-600">
              <Link to="/projects">View All Projects <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-slate-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-slate-900">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-slate-600 mb-10">
              Join our community of changemakers and help us create lasting impact in the lives of thousands.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" className="font-semibold shadow-lg hover:shadow-xl transition-all" asChild>
                <Link to="/donate">
                  Donate Now <Heart className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="text-slate-700 border-slate-200 bg-white hover:bg-slate-50">
                <Link to="/register">
                  Become a Volunteer <Users className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicHome;
