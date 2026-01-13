import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Heart, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import nhrdLogoTransparent from '@/assets/nhrd-logo-transparent.png';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = location.pathname === '/';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/programs', label: t('nav.programs') },
    { path: '/campaigns', label: t('nav.campaigns', 'Campaigns') },
    { path: '/events', label: t('nav.events', 'Events') },
    { path: '/get-involved', label: t('nav.getInvolved') },
    { path: '/contact', label: t('nav.contact') },
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
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={nhrdLogoTransparent} 
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
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors touch-target ${
                  isActive(link.path)
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

            {/* Sign In Button - Desktop */}
            <Link to="/auth" className="hidden md:block">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`gap-2 ${
                  isHomePage && !isScrolled 
                    ? 'text-white hover:bg-white/10' 
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <LogIn className="w-4 h-4" />
                {t('nav.signIn', 'Sign In')}
              </Button>
            </Link>

            {/* Donate Button - Desktop */}
            <Link to="/donate" className="hidden md:block">
              <Button 
                variant={isHomePage && !isScrolled ? "hero" : "cta"} 
                size="lg" 
                className="gap-2"
              >
                <Heart className="w-4 h-4" />
                {t('nav.donate')}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors touch-target ${
                isHomePage && !isScrolled
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
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors touch-target ${
                    isActive(link.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mt-4"
              >
                <Button variant="outline" size="lg" className="w-full gap-2">
                  <LogIn className="w-4 h-4" />
                  {t('nav.signIn', 'Sign In')}
                </Button>
              </Link>
              <Link
                to="/donate"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mt-2"
              >
                <Button variant="cta" size="lg" className="w-full gap-2">
                  <Heart className="w-4 h-4" />
                  {t('nav.donate')}
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