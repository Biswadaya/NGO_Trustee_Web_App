import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, Users, Ticket, X, CheckCircle, 
  ChevronLeft, ChevronRight, Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import eventsCulturalImage from '@/assets/events-cultural.jpg';
import campaignHealthImage from '@/assets/campaign-health.jpg';
import campaignEducationImage from '@/assets/campaign-education.jpg';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: 'cultural' | 'health' | 'education' | 'fundraiser';
  capacity: number;
  registered: number;
  isFree: boolean;
}

const events: Event[] = [
  {
    id: 'annual-gala-2025',
    title: 'NHRD Annual Gala 2025',
    description: 'Join us for an evening of celebration, cultural performances, and fundraising for rural development initiatives in Odisha.',
    date: '2025-02-15',
    time: '18:00 - 22:00',
    location: 'Kalinga Stadium, Bhubaneswar',
    image: eventsCulturalImage,
    category: 'fundraiser',
    capacity: 500,
    registered: 342,
    isFree: false,
  },
  {
    id: 'health-camp-jan',
    title: 'Free Health Camp - Ganjam',
    description: 'Free medical checkups, eye tests, and distribution of essential medicines for villagers in Ganjam district.',
    date: '2025-01-25',
    time: '09:00 - 17:00',
    location: 'Berhampur Community Center',
    image: campaignHealthImage,
    category: 'health',
    capacity: 300,
    registered: 210,
    isFree: true,
  },
  {
    id: 'education-workshop',
    title: 'Teacher Training Workshop',
    description: 'Capacity building workshop for rural school teachers on modern teaching methodologies and child psychology.',
    date: '2025-01-20',
    time: '10:00 - 16:00',
    location: 'NHRD Training Center, Puri',
    image: campaignEducationImage,
    category: 'education',
    capacity: 100,
    registered: 78,
    isFree: true,
  },
  {
    id: 'cultural-fest',
    title: 'Rural Odisha Cultural Festival',
    description: 'Experience the rich cultural heritage of rural Odisha through traditional dance, music, and handicraft exhibitions.',
    date: '2025-03-08',
    time: '16:00 - 21:00',
    location: 'Ekamra Haat, Bhubaneswar',
    image: eventsCulturalImage,
    category: 'cultural',
    capacity: 1000,
    registered: 456,
    isFree: true,
  },
];

interface TicketData {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  ticketNumber: string;
  userName: string;
}

const Events = () => {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cultural': return 'bg-accent text-accent-foreground';
      case 'health': return 'bg-primary text-primary-foreground';
      case 'education': return 'bg-secondary text-secondary-foreground';
      case 'fundraiser': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(e => e.date === dateStr);
  };

  const handleRegister = (event: Event) => {
    // Check if user is logged in (simulated - in real app would check auth)
    const isLoggedIn = localStorage.getItem('nhrd_user');
    
    if (!isLoggedIn) {
      // Store intent and redirect to login
      localStorage.setItem('register_event_intent', event.id);
      window.location.href = '/auth?redirect=/events';
      return;
    }

    // Generate ticket
    const ticket: TicketData = {
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      ticketNumber: `NHRD-${Date.now().toString(36).toUpperCase()}`,
      userName: JSON.parse(isLoggedIn).name || 'Guest',
    };
    
    setTicketData(ticket);
    setShowRegistrationModal(false);
    setSelectedEvent(null);
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={eventsCulturalImage} 
            alt="Cultural event" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-accent/80 via-accent/70 to-accent/90" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-accent-foreground"
          >
            <Calendar className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('events.title', 'Upcoming Events')}
            </h1>
            <p className="text-xl md:text-2xl text-accent-foreground/90 max-w-3xl mx-auto">
              {t('events.subtitle', 'Join us in our mission through workshops, camps, and cultural celebrations')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl shadow-lg p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <h2 className="text-xl font-bold text-foreground">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
              
              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              
              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
                const dayEvents = getEventsForDate(date);
                const isToday = date.toDateString() === new Date().toDateString();
                
                return (
                  <div 
                    key={i} 
                    className={`aspect-square p-1 rounded-lg border ${
                      isToday ? 'border-primary bg-primary/5' : 'border-transparent'
                    } ${dayEvents.length > 0 ? 'cursor-pointer hover:bg-muted' : ''}`}
                    onClick={() => dayEvents.length > 0 && setSelectedEvent(dayEvents[0])}
                  >
                    <div className={`text-sm ${isToday ? 'font-bold text-primary' : 'text-foreground'}`}>
                      {i + 1}
                    </div>
                    {dayEvents.length > 0 && (
                      <div className="mt-1">
                        {dayEvents.map(e => (
                          <div 
                            key={e.id} 
                            className={`text-xs px-1 py-0.5 rounded truncate ${getCategoryColor(e.category)}`}
                          >
                            {e.title.substring(0, 10)}...
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">All Events</h2>
            <p className="text-muted-foreground">Register for events and be part of our community</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-card rounded-2xl shadow-lg overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                  </div>
                  {event.isFree && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
                        Free Entry
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      {new Date(event.date).toLocaleDateString('en-IN', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      {event.registered}/{event.capacity} registered
                    </div>
                  </div>

                  <Button 
                    variant="cta" 
                    className="w-full gap-2"
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowRegistrationModal(true);
                    }}
                    disabled={event.registered >= event.capacity}
                  >
                    <Ticket className="w-4 h-4" />
                    {event.registered >= event.capacity ? 'Fully Booked' : 'Register Now'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegistrationModal && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowRegistrationModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">Register for Event</h3>
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-muted/50 rounded-xl p-4">
                  <h4 className="font-semibold text-foreground mb-2">{selectedEvent.title}</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedEvent.date).toLocaleDateString('en-IN')}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {selectedEvent.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {selectedEvent.location}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  By registering, you'll receive a digital ticket that serves as your entry pass. 
                  Please login or create an account to complete registration.
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="cta" 
                  className="flex-1 gap-2"
                  onClick={() => handleRegister(selectedEvent)}
                >
                  <Ticket className="w-4 h-4" />
                  Confirm Registration
                </Button>
                <Button variant="outline" onClick={() => setShowRegistrationModal(false)}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticket Modal */}
      <AnimatePresence>
        {ticketData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setTicketData(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ticket Header */}
              <div className="bg-primary p-6 text-center">
                <CheckCircle className="w-16 h-16 text-primary-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-primary-foreground mb-2">Registration Successful!</h3>
                <p className="text-primary-foreground/80">Your ticket has been generated</p>
              </div>

              {/* Ticket Body */}
              <div className="p-6">
                <div className="border-2 border-dashed border-muted rounded-xl p-4 space-y-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">TICKET NUMBER</p>
                    <p className="text-xl font-mono font-bold text-primary">{ticketData.ticketNumber}</p>
                  </div>
                  
                  <div className="border-t border-dashed border-muted pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{ticketData.eventTitle}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(ticketData.eventDate).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {ticketData.eventTime}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {ticketData.eventLocation}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-muted pt-4 text-center">
                    <p className="text-xs text-muted-foreground">ATTENDEE</p>
                    <p className="font-semibold text-foreground">{ticketData.userName}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Download className="w-4 h-4" />
                    Download Ticket
                  </Button>
                  <Button variant="cta" onClick={() => setTicketData(null)}>
                    Done
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Events;