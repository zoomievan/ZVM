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
import CoveragePage from './pages/CoveragePage';
import FAQPage from './pages/FAQPage';
import LegalPage from './pages/LegalPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProductionReadinessGate from './components/ProductionReadinessGate';
import { isProductionBackendReady, isProductionBuild } from './lib/runtime';

const Hero = lazy(() => import('./components/Hero'));
const WhyZoomieVan = lazy(() => import('./components/WhyZoomieVan'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const BookNow = lazy(() => import('./components/BookNow'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/hero-dog-van.jpg';
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  useEffect(() => {
    if (showContent && window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [showContent]);

  return (
    <div className="public-site relative bg-dark-900 min-h-screen">
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

          <Suspense fallback={<SectionLoader />}><Hero /></Suspense>
          <Suspense fallback={<SectionLoader />}><WhyZoomieVan /></Suspense>
          <Suspense fallback={<SectionLoader />}><HowItWorks /></Suspense>
          <Suspense fallback={<SectionLoader />}><BookNow /></Suspense>
          <Suspense fallback={<SectionLoader />}><Testimonials /></Suspense>
          <Suspense fallback={<SectionLoader />}><CTA /></Suspense>
          <Suspense fallback={<SectionLoader />}><Footer /></Suspense>
        </motion.div>
      )}
    </div>
  );
}

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-dark-900 min-h-screen">
      <ScrollProgress />
      <Navbar />
      {children}
    </div>
  );
}

function PublicPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="public-site relative bg-dark-900 min-h-screen">
      <ScrollProgress />
      <Navbar />
      {children}
    </div>
  );
}

function BackendRequired({ children }: { children: React.ReactNode }) {
  if (isProductionBuild && !isProductionBackendReady) {
    return <ProductionReadinessGate />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<BackendRequired><PageLayout><ProtectedRoute requireAdmin><AdminPage /></ProtectedRoute></PageLayout></BackendRequired>} />
        <Route path="/login" element={<BackendRequired><PublicPageLayout><LoginPage /></PublicPageLayout></BackendRequired>} />
        <Route path="/signup" element={<BackendRequired><PublicPageLayout><SignupPage /></PublicPageLayout></BackendRequired>} />
        <Route path="/dashboard" element={<BackendRequired><PageLayout><ProtectedRoute><UserDashboard /></ProtectedRoute></PageLayout></BackendRequired>} />
        <Route path="/coverage" element={<PublicPageLayout><CoveragePage /></PublicPageLayout>} />
        <Route path="/faq" element={<PublicPageLayout><FAQPage /></PublicPageLayout>} />
        <Route path="/legal/:page" element={<PageLayout><LegalPage /></PageLayout>} />
      </Routes>
    </AuthProvider>
  );
}
