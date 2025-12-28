import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300 group-hover:scale-105">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold text-slate-800 tracking-tight">Trust Flow</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            {['Home', 'About', 'Projects', 'Events', 'Donate'].map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors relative group"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button variant="ghost" asChild className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50">
                                <Link to="/login">Sign In</Link>
                            </Button>
                            <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5" asChild>
                                <Link to="/donate">Donate Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-20 min-h-[calc(100vh-theme(spacing.16))] bg-slate-50/50">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 py-20 text-slate-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-2xl font-display font-bold text-white tracking-tight">Trust Flow</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                                Empowering communities through sustainable development and social change since 2010. Join us in making a difference.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Organization</h4>
                            <ul className="space-y-3">
                                {['About Us', 'Projects', 'Events', 'Donate'].map((link) => (
                                    <li key={link}>
                                        <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                                            <span className="w-1 h-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Get Involved</h4>
                            <ul className="space-y-3">
                                {['Volunteer', 'Partner With Us', 'Careers', 'Newsletter'].map((link) => (
                                    <li key={link}>
                                        <Link to="#" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                                            <span className="w-1 h-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Contact Us</h4>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-sm text-slate-400 group cursor-pointer hover:text-white transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    info@trustflow.app
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-400 group cursor-pointer hover:text-white transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    +91 98765 43210
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-400 group cursor-pointer hover:text-white transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 transition-colors flex-shrink-0">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="mt-1">123 NGO Street, New Delhi, India</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-sm text-slate-500">
                            © 2024 Trust Flow. All rights reserved.
                        </p>
                        <div className="flex items-center gap-8">
                            <Link to="#" className="text-sm text-slate-500 hover:text-indigo-400 transition-colors">Privacy Policy</Link>
                            <Link to="#" className="text-sm text-slate-500 hover:text-indigo-400 transition-colors">Terms of Service</Link>
                            <Link to="#" className="text-sm text-slate-500 hover:text-indigo-400 transition-colors">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
