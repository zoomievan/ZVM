import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './lib/auth';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboard from './pages/UserDashboard';

const Hero = lazy(() => import('./components/Hero'));
const ValueProps = lazy(() => import('./components/ValueProps'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Stats = lazy(() => import('./components/Stats'));
const Pricing = lazy(() => import('./components/Pricing'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const PostalCodeChecker = lazy(() => import('./components/PostalCodeChecker'));
const GetStarted = lazy(() => import('./components/GetStarted'));
const AdminPreview = lazy(() => import('./components/AdminPreview'));
const SchedulePreview = lazy(() => import('./components/SchedulePreview'));
const ParallaxDivider = lazy(() => import('./components/ParallaxDivider'));
const CTA = lazy(() => import('./components/CTA'));
const FAQ = lazy(() => import('./components/FAQ'));
const Footer = lazy(() => import('./components/Footer'));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/hero-bg.jpg';
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <div className="relative bg-dark-900 min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ScrollProgress />
          <Navbar />

          <div className="fixed top-16 lg:top-20 left-0 right-0 z-40 bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-sm">
              <span className="text-amber-400">⚠️</span>
              <span className="text-amber-300 text-xs sm:text-sm">
                <strong>Weather Advisory:</strong> Some routes in Greater Vancouver may experience 30-min delays today due to road conditions.
              </span>
            </div>
          </div>

          <Suspense fallback={<SectionLoader />}><Hero /></Suspense>
          <Suspense fallback={<SectionLoader />}><ValueProps /></Suspense>
          <Suspense fallback={<SectionLoader />}><HowItWorks /></Suspense>
          <Suspense fallback={<SectionLoader />}><Stats /></Suspense>
          <Suspense fallback={<SectionLoader />}><PostalCodeChecker /></Suspense>
          <Suspense fallback={<SectionLoader />}>
            <ParallaxDivider
              image="https://images.pexels.com/photos/5749781/pexels-photo-5749781.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              quote="Since starting with ZoomieVan, my dog is calmer, healthier, and happier than ever. It's not just exercise—it's transformation."
              author="— Dr. Amanda Liu, Veterinarian & Client"
            />
          </Suspense>
          <Suspense fallback={<SectionLoader />}><SchedulePreview /></Suspense>
          <Suspense fallback={<SectionLoader />}><Pricing /></Suspense>
          <Suspense fallback={<SectionLoader />}><GetStarted /></Suspense>
          <Suspense fallback={<SectionLoader />}><Testimonials /></Suspense>
          <Suspense fallback={<SectionLoader />}>
            <ParallaxDivider
              image="/images/van-exterior.jpg"
              quote="We built ZoomieVan because every dog deserves access to professional fitness—regardless of their owner's schedule or location."
              author="— ZoomieVan Founding Team"
            />
          </Suspense>
          <Suspense fallback={<SectionLoader />}><AdminPreview /></Suspense>
          <Suspense fallback={<SectionLoader />}><FAQ /></Suspense>
          <Suspense fallback={<SectionLoader />}><CTA /></Suspense>
          <Suspense fallback={<SectionLoader />}><Footer /></Suspense>
        </motion.div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </AuthProvider>
  );
}
