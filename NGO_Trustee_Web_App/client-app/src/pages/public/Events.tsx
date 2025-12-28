import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  Users,
  ArrowRight
} from 'lucide-react';
import { publicAPI } from '@/api/endpoints';

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await publicAPI.getEvents();
        // Map Notice objects to Event UI model if needed, or just use as is
        // Backend returns notices with notice_type = 'event'
        // Fields: id, title, content (desc), published_at, expiry_date (event date), attachments
        setEvents(res.data.data.events);
      } catch (error) {
        console.error("Failed to load events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Helpers to process event data
  const getEventDate = (dateStr: string) => {
    if (!dateStr) return 'TBA';
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getEventTime = (dateStr: string) => {
    if (!dateStr) return 'TBA';
    return new Date(dateStr).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading events...</div>;
  }

  const upcomingEvents = events.filter(e => !e.expiry_date || new Date(e.expiry_date) > new Date());
  const pastEvents = events.filter(e => e.expiry_date && new Date(e.expiry_date) <= new Date());

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-slate-200 text-slate-700">Our Events</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900">
              Join Us at Our
              <span className="block text-indigo-600">Upcoming Events</span>
            </h1>
            <p className="text-lg text-slate-600">
              Be part of our community gatherings, workshops, and initiatives that bring people together for change.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge variant="outline" className="mb-2 border-indigo-200 text-indigo-700 bg-indigo-50">Upcoming</Badge>
              <h2 className="text-2xl font-display font-bold text-slate-900">Don't Miss Out</h2>
            </div>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center py-10 text-slate-500">No upcoming events at the moment. Check back soon!</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 bg-white border-slate-100">
                  <div className="p-1">
                    <div className="aspect-[16/10] rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                      <Calendar className="w-16 h-16 text-white/30" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                          Event
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3 text-slate-900">{event.title}</h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                        <span>{getEventDate(event.expiry_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4 text-indigo-600" />
                        <span>{getEventTime(event.expiry_date)}</span>
                      </div>
                      {/* Location not in basic model, maybe in content or custom field. Omitting for now */}
                    </div>

                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">{event.content}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Users className="w-4 h-4" />
                        <span>Open for all</span>
                      </div>
                      {/* Registration link could be in attachments */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge variant="outline" className="mb-2 text-slate-500">Completed</Badge>
              <h2 className="text-2xl font-display font-bold text-slate-900">Past Events</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <Card key={event.id} className="bg-slate-50 border-slate-100 opacity-80 hover:opacity-100 transition-opacity">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3 bg-slate-200 text-slate-600">Completed</Badge>
                  <h3 className="text-lg font-semibold mb-3 text-slate-900">{event.title}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      <span>{getEventDate(event.expiry_date)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2">{event.content}</p>
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
              Want to Volunteer at Events?
            </h2>
            <p className="text-lg text-slate-600 mb-10">
              Join our volunteer team and help make our events successful while gaining valuable experience.
            </p>
            <Button size="xl" className="font-semibold shadow-lg hover:shadow-xl transition-all" asChild>
              <Link to="/login">
                Join as Volunteer <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
