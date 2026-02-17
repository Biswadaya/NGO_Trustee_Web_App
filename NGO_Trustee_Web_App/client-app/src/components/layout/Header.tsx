import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import nhrdLogo from '@/assets/nhrd-logo-transparent.png';
import { useAuth } from '@/contexts/AuthContext';
import { DEFAULT_USER_AVATAR } from '@/utils/constants';

const Header = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { isAuthenticated, user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const isHomePage = location.pathname === '/';

    // Determine dashboard path
    const getDashboardPath = () => {
        if (!user) return '/login';
        if (['ADMIN', 'SUPER_ADMIN', 'MANAGER'].includes(user.role)) return '/admin/dashboard';
        if (user.role === 'VOLUNTEER') return '/volunteer/dashboard';
        return '/user/dashboard';
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/', label: t('nav.home', 'Home') },
        { path: '/about', label: t('nav.about', 'About') },
        { path: '/what-we-do', label: t('nav.whatWeDo', 'What We Do') },
        { path: '/stories', label: t('nav.stories', 'Stories') },
        { path: '/campaigns', label: t('nav.campaigns', 'Campaigns') },
        { path: '/events', label: t('nav.events', 'Events') },
        { path: '/get-involved', label: t('nav.getInvolved', 'Get Involved') },
        { path: '/contact', label: t('nav.contact', 'Contact') },
    ];

    const isActive = (path: string) => location.pathname === path;

    // Dynamic header styles based on scroll and page
    const headerBg = isHomePage && !isScrolled
        ? 'bg-transparent'
        : 'bg-card/80 backdrop-blur-lg border-b border-border/50';

    const textColor = isHomePage && !isScrolled
        ? 'text-white'
        : 'text-foreground';


    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src={nhrdLogo}
                            alt="NHRD Logo"
                            className="w-12 h-12 md:w-14 md:h-14 object-contain transition-transform group-hover:scale-105"
                        />
                        <div className="hidden sm:block">
                            <span className={`text-lg md:text-xl font-bold ${textColor}`}>NHRD</span>
                        </div>
                    </Link>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <LanguageSwitcher isTransparent={isHomePage && !isScrolled} />


                        {/* Auth Buttons - Desktop */}
                        {!isAuthenticated ? (
                            <Link to="/login" className="hidden md:block">
                                <Button
                                    variant="ghost"
                                    className={isHomePage && !isScrolled
                                        ? "text-white hover:text-white hover:bg-white/20"
                                        : "text-foreground hover:bg-accent/10 hover:text-accent"
                                    }
                                >
                                    {t('nav.signIn', 'Sign In')}
                                </Button>
                            </Link>
                        ) : (
                            <div className="hidden md:flex items-center gap-4">
                                {/* Dashboard Button */}
                                <Link to={getDashboardPath()}>
                                    <Button
                                        variant="ghost"
                                        className={isHomePage && !isScrolled
                                            ? "text-white hover:text-white hover:bg-white/20"
                                            : "text-foreground hover:bg-accent/10 hover:text-accent"
                                        }
                                    >
                                        {t('nav.dashboard', 'Dashboard')}
                                    </Button>
                                </Link>

                                {/* User Profile */}
                                <div className="flex items-center gap-3 pl-4 border-l border-border/20">
                                    <div className="flex flex-col items-end">
                                        <span className={`text-base font-semibold leading-none ${isHomePage && !isScrolled ? 'text-white' : 'text-foreground'}`}>
                                            {user?.name || user?.fullname || 'User'}
                                        </span>
                                        <span className={`text-xs uppercase tracking-wider mt-1 ${isHomePage && !isScrolled ? 'text-white/80' : 'text-muted-foreground'}`}>
                                            {user?.role}
                                        </span>
                                    </div>
                                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white/20 ring-1 ring-black/5 shadow-sm">
                                        <img
                                            src={user?.avatar || DEFAULT_USER_AVATAR}
                                            alt={user?.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Donate Button - Desktop */}
                        <Link to="/donate" className="hidden md:block">
                            <Button
                                variant={isHomePage && !isScrolled ? "hero" : "cta"}
                                size="lg"
                                className="gap-2"
                            >
                                <Heart className="w-4 h-4" />
                                {t('nav.donate', 'Donate')}
                            </Button>
                        </Link>

                        {/* Menu Toggle - Visible on ALL screens now */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className={`p-2 rounded-lg transition-colors touch-target ${isHomePage && !isScrolled
                                ? 'hover:bg-white/10 text-white'
                                : 'hover:bg-muted text-foreground'
                                }`}
                            aria-label="Open menu"
                        >
                            <Menu className="w-8 h-8" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Overlay/Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-[100dvh] w-full max-w-sm bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl z-[100] flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-border/50">
                                <span className="text-lg font-bold">{t('nav.navigation', 'Navigation')}</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 rounded-full hover:bg-muted transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <nav className="flex-1 overflow-y-auto py-6 px-6 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block px-4 py-4 rounded-xl text-lg font-medium transition-all ${isActive(link.path)
                                            ? 'bg-primary/10 text-primary translate-x-2'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:translate-x-1'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                <div className="mt-8 pt-8 border-t border-border/50 space-y-4">
                                    {!isAuthenticated ? (
                                        <Link
                                            to="/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block"
                                        >
                                            <Button variant="outline" size="lg" className="w-full justify-center">
                                                {t('nav.signIn', 'Sign In')}
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link
                                            to={getDashboardPath()}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block"
                                        >
                                            <Button variant="outline" size="lg" className="w-full justify-center">
                                                {t('nav.dashboard', 'Dashboard')}
                                            </Button>
                                        </Link>
                                    )}

                                    <Link
                                        to="/donate"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block"
                                    >
                                        <Button variant="cta" size="lg" className="w-full gap-2 shadow-lg shadow-primary/20">
                                            <Heart className="w-4 h-4" />
                                            {t('nav.donate', 'Donate')}
                                        </Button>
                                    </Link>
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
