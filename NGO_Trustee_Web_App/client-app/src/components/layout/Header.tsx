import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import nhrdLogo from '@/assets/nhrd-logo.png';
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

    const mutedTextColor = isHomePage && !isScrolled
        ? 'text-white/80'
        : 'text-muted-foreground';

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
                            <p className={`text-xs ${mutedTextColor} leading-tight`}>Rural Development</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors touch-target ${isActive(link.path)
                                    ? isHomePage && !isScrolled
                                        ? 'bg-white/20 text-white'
                                        : 'bg-primary text-primary-foreground'
                                    : isHomePage && !isScrolled
                                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

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
                                    Sign In
                                </Button>
                            </Link>
                        ) : (
                            <div className="hidden md:flex items-center gap-3">
                                {/* Dashboard Button */}
                                <Link to={getDashboardPath()}>
                                    <Button
                                        variant="ghost"
                                        className={isHomePage && !isScrolled
                                            ? "text-white hover:text-white hover:bg-white/20"
                                            : "text-foreground hover:bg-accent/10 hover:text-accent"
                                        }
                                    >
                                        Dashboard
                                    </Button>
                                </Link>

                                {/* User Profile */}
                                <div className="flex items-center gap-2 pl-2 border-l border-border/20">
                                    <div className="flex flex-col items-end">
                                        <span className={`text-sm font-medium ${isHomePage && !isScrolled ? 'text-white' : 'text-foreground'}`}>
                                            {user?.name || user?.fullname || 'User'}
                                        </span>
                                        <span className={`text-[10px] uppercase tracking-wider ${isHomePage && !isScrolled ? 'text-white/70' : 'text-muted-foreground'}`}>
                                            {user?.role}
                                        </span>
                                    </div>
                                    <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-white/20 ring-1 ring-black/5">
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

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`lg:hidden p-2 rounded-lg transition-colors touch-target ${isHomePage && !isScrolled
                                ? 'hover:bg-white/10 text-white'
                                : 'hover:bg-muted text-foreground'
                                }`}
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden border-t border-border bg-card/95 backdrop-blur-lg"
                    >
                        <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors touch-target ${isActive(link.path)
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {!isAuthenticated ? (
                                <Link
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block mt-4"
                                >
                                    <Button variant="ghost" className="w-full justify-start text-muted-foreground">Sign In</Button>
                                </Link>
                            ) : (
                                <Link
                                    to={getDashboardPath()}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block mt-4"
                                >
                                    <Button variant="ghost" className="w-full justify-start text-muted-foreground">Dashboard</Button>
                                </Link>
                            )}

                            <Link
                                to="/donate"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block mt-4"
                            >
                                <Button variant="cta" size="lg" className="w-full gap-2">
                                    <Heart className="w-4 h-4" />
                                    {t('nav.donate', 'Donate')}
                                </Button>
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
