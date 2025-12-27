import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold text-slate-900">Trust Flow</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <Link to="/" className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors">Home</Link>
                            <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">About</Link>
                            <Link to="/projects" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Projects</Link>
                            <Link to="/events" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Events</Link>
                            <Link to="/donate" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Donate</Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="ghost" asChild className="text-slate-700 hover:text-slate-900 hover:bg-slate-50">
                                <Link to="/login">Sign In</Link>
                            </Button>
                            <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all" asChild>
                                <Link to="/donate">Donate Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-16 min-h-[calc(100vh-theme(spacing.16))]">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 py-16 text-slate-200">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-display font-bold text-white">Trust Flow</span>
                            </div>
                            <p className="text-slate-400 text-sm">
                                Empowering communities through sustainable development and social change since 2010.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                {['About Us', 'Projects', 'Events', 'Donate'].map((link) => (
                                    <li key={link}>
                                        <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-4">Get Involved</h4>
                            <ul className="space-y-2">
                                {['Volunteer', 'Partner With Us', 'Careers', 'Newsletter'].map((link) => (
                                    <li key={link}>
                                        <Link to="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-slate-400">
                                    <Mail className="w-4 h-4" />
                                    info@trustflow.app
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-400">
                                    <Phone className="w-4 h-4" />
                                    +91 98765 43210
                                </li>
                                <li className="flex items-start gap-2 text-sm text-slate-400">
                                    <MapPin className="w-4 h-4 mt-0.5" />
                                    123 NGO Street, New Delhi, India
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-500">
                            © 2024 Trust Flow. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link to="#" className="text-sm text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="#" className="text-sm text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
