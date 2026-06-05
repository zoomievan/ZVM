import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Settings, LogIn, UserPlus, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../lib/auth';

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMobileOpen(false);
    navigate('/');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass shadow-2xl shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                    <path d="M4.5 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm15 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM3 14c0-3.87 3.13-7 7-7h4c3.87 0 7 3.13 7 7v2c0 1.1-.9 2-2 2h-2.5l-1.5 3h-5l-1.5-3H5c-1.1 0-2-.9-2-2v-2z" />
                  </svg>
                </div>
              </div>
              <span className="font-display text-xl font-bold text-white">
                Zoomie<span className="text-brand-500">Van</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm text-dark-200 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-dark-200 hover:text-brand-400 transition-colors rounded-lg hover:bg-white/5"
              >
                <Settings className="w-3.5 h-3.5" />
                Admin
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-dark-200 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-dark-300 hover:text-red-400 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-dark-200 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="group relative px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40"
                  >
                    <span className="flex items-center gap-1.5">
                      Get Started
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-dark-200 hover:text-white transition-colors"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dark-900/98 backdrop-blur-xl pt-20"
          >
            <div className="flex flex-col items-center gap-2 p-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="w-full text-center py-4 text-lg text-dark-100 hover:text-brand-400 transition-colors border-b border-dark-700"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => { setIsMobileOpen(false); navigate('/admin'); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="w-full text-center py-4 text-lg text-dark-100 hover:text-brand-400 transition-colors border-b border-dark-700"
              >
                <span className="flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" /> Admin
                </span>
              </motion.button>

              {user ? (
                <>
                  <motion.button
                    onClick={() => { setIsMobileOpen(false); navigate('/dashboard'); }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full text-center py-4 text-lg text-dark-100 hover:text-brand-400 transition-colors border-b border-dark-700"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </span>
                  </motion.button>
                  <motion.button
                    onClick={handleLogout}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.48 }}
                    className="w-full text-center py-4 text-lg text-dark-300 hover:text-red-400 transition-colors"
                  >
                    Sign Out
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => { setIsMobileOpen(false); navigate('/login'); }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full text-center py-4 text-lg text-dark-100 hover:text-brand-400 transition-colors border-b border-dark-700"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <LogIn className="w-4 h-4" /> Sign In
                    </span>
                  </motion.button>
                  <motion.button
                    onClick={() => { setIsMobileOpen(false); navigate('/signup'); }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.48 }}
                    className="mt-6 w-full py-4 text-center text-lg font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl"
                  >
                    Get Started
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
