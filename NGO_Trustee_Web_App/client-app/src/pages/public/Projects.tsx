import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Filter
} from 'lucide-react';
import { projects } from '@/data/mockData';

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-slate-200 text-slate-700">Our Impact</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900">
              Transforming Lives Through
              <span className="block text-indigo-600">Sustainable Projects</span>
            </h1>
            <p className="text-lg text-slate-600">
              Explore our ongoing initiatives designed to create lasting positive change in communities across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-slate-100 bg-white sticky top-16 z-40 backdrop-blur-md bg-white/90">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex overflow-x-auto gap-4 pb-2 md:pb-0 justify-start md:justify-center no-scrollbar">
              {['All', 'Education', 'Health', 'Community', 'Environment'].map((cat) => (
                <Button
                  key={cat}
                  variant={filter === cat ? 'default' : 'outline'}
                  onClick={() => setFilter(cat)}
                  className={`rounded-full px-6 transition-all ${filter === cat ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="hidden md:flex border-slate-200 text-slate-600">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden group bg-white border-slate-100 hover:shadow-lg transition-all duration-300">
                <div className="aspect-video overflow-hidden relative">
                  <Badge className="absolute top-4 right-4 z-10 bg-white/90 text-slate-900 backdrop-blur-sm shadow-sm hover:bg-white">{project.status}</Badge>
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

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Button variant="secondary" className="w-full bg-white text-slate-900 hover:bg-slate-100">View Details</Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="border-indigo-100 text-indigo-600 bg-indigo-50">{project.category}</Badge>
                    <div className="flex items-center text-xs text-slate-500 ml-auto">
                      <MapPin className="w-3 h-3 mr-1" />
                      {project.location}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-slate-900 group-hover:text-indigo-600 transition-colors">{project.name}</h3>
                  <p className="text-sm text-slate-600 mb-6 line-clamp-2">{project.description}</p>

                  <div className="space-y-4">
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
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                      <div>
                        <div className="text-lg font-bold text-slate-900">₹{(project.raised / 1000).toFixed(1)}k</div>
                        <div className="text-xs text-slate-500">raised of ₹{(project.goal / 1000).toFixed(0)}k</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900">{project.supporters}</div>
                        <div className="text-xs text-slate-500">supporters</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
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
              Have a Project in Mind?
            </h2>
            <p className="text-lg text-slate-600 mb-10">
              We're always looking to partner with organizations and individuals who share our vision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" className="font-semibold shadow-lg hover:shadow-xl transition-all" asChild>
                <Link to="/contact">
                  Partner With Us <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
