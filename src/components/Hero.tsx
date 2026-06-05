import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, MapPin, Shield, Clock, Star } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Dog running on slatmill"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/80 to-dark-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/50" />
      </motion.div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 z-[1]" style={{
        backgroundImage: 'linear-gradient(rgba(249,115,22,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.03) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
        style={{ opacity }}
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
            </span>
            <span className="text-sm font-medium text-brand-400">Now serving Greater Toronto & Vancouver</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
          >
            A Professional{' '}
            <span className="text-gradient">Dog Gym</span>{' '}
            That Comes to{' '}
            <span className="relative inline-block">
              You
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8 Q50 2 100 6 T198 4" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 text-lg sm:text-xl text-dark-200 leading-relaxed max-w-2xl"
          >
            Canada's first mobile canine fitness service. Our custom-built gym vans bring professional slatmill 
            workouts directly to your neighborhood—keeping your dog fit, focused, and fulfilled.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#coverage"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-2xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5"
            >
              Check Your Area
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold text-white border border-dark-500 rounded-2xl hover:bg-white/5 hover:border-dark-400 transition-all hover:-translate-y-0.5"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 ml-0.5" fill="white">
                  <path d="M4 2 L14 8 L4 14 Z" />
                </svg>
              </div>
              See How It Works
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-14 flex flex-wrap gap-6 lg:gap-10"
          >
            {[
              { icon: <Shield className="w-4 h-4 text-brand-400" />, label: 'Fully Insured & Certified' },
              { icon: <MapPin className="w-4 h-4 text-brand-400" />, label: 'Door-to-Door Service' },
              { icon: <Clock className="w-4 h-4 text-brand-400" />, label: '30-Min Power Sessions' },
              { icon: <Star className="w-4 h-4 text-brand-400" />, label: '4.9/5 Avg Rating' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-dark-300">
                {badge.icon}
                <span>{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Stats Card */}
      <motion.div
        initial={{ opacity: 0, x: 60, y: 40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden xl:block absolute right-12 bottom-32 z-10"
      >
        <div className="glass rounded-3xl p-6 space-y-5 w-72 float-animation">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center">
              <span className="text-2xl">🐕</span>
            </div>
            <div>
              <p className="text-sm text-dark-300">Dogs Trained</p>
              <p className="text-2xl font-bold text-white">2,847+</p>
            </div>
          </div>
          <div className="h-px bg-dark-600" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <span className="text-2xl">📍</span>
            </div>
            <div>
              <p className="text-sm text-dark-300">Active Zones</p>
              <p className="text-2xl font-bold text-white">140+</p>
            </div>
          </div>
          <div className="h-px bg-dark-600" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
            <div>
              <p className="text-sm text-dark-300">Average Rating</p>
              <p className="text-2xl font-bold text-white">4.9/5.0</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-dark-400 uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-6 h-10 border-2 border-dark-500 rounded-full flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-brand-500 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
