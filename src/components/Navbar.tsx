import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Settings, LogIn, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../lib/auth';

const navLinks = [
  { label: 'How It Works', href: '/#how-it-works', page: false },
  { label: 'Pricing', href: '/#book-now', page: false },
  { label: 'Testimonials', href: '/#testimonials', page: false },
  { label: 'Coverage', href: '/coverage', page: true },
  { label: 'FAQ', href: '/faq', page: true },
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
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/15 bg-[#071A3D]/95 backdrop-blur-xl transition-all duration-300 ${
          isScrolled ? 'shadow-lg shadow-black/20' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img src="/images/zvm_companyname_logo.png" alt="ZoomieVan" className="h-8 w-auto" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                link.page ? (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.href)}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-white/78 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-white/78 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </a>
                )
              ))}
              {user?.role === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white/78 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Admin
                </button>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white/78 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-white/70 transition-colors hover:text-brand-300"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white/78 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="group relative px-5 py-2.5 text-sm font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition-all shadow-md shadow-brand-500/20"
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
              className="p-2 text-white transition-colors hover:text-brand-300 lg:hidden"
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
            className="fixed inset-0 z-40 bg-[#071A3D]/98 pt-20 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center gap-2 p-6">
              {navLinks.map((link, i) => (
                link.page ? (
                  <motion.button
                    key={link.label}
                    onClick={() => { setIsMobileOpen(false); navigate(link.href); }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="w-full text-center py-4 text-lg text-dark-100 hover:text-brand-400 transition-colors border-b border-dark-700"
                  >
                    {link.label}
                  </motion.button>
                ) : (
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
                )
              ))}
              {user?.role === 'admin' && (
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
              )}

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
