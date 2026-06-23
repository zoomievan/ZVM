import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, MapPin, ShieldCheck, Clock3, Star, Heart, PawPrint } from 'lucide-react';

const trustItems = [
  { icon: ShieldCheck, label: 'Insured handlers' },
  { icon: MapPin, label: 'Door-to-door service' },
  { icon: Clock3, label: '30-minute sessions' },
];

const fitTags = ['High-energy dogs', 'Apartment dogs', 'Rainy days', 'Busy owners'];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={containerRef} className="hero-section relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src="/images/hero-bg.jpg"
          alt="Happy dog exercising safely inside the ZoomieVan mobile dog gym"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,23,14,0.88)_0%,rgba(37,23,14,0.62)_48%,rgba(37,23,14,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.38)_0%,transparent_30%,rgba(37,23,14,0.44)_100%)]" />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8"
        style={{ opacity }}
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-sm font-semibold text-[#5b3824] shadow-lg"
          >
            <Heart className="h-4 w-4 fill-[#f97316] text-[#f97316]" />
            Fitness that fits your dog's life
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-display text-5xl font-bold leading-[1.03] text-white sm:text-6xl lg:text-7xl"
          >
            Happy dogs start with a{' '}
            <span className="text-[#ffb24b]">great run.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl"
          >
            ZoomieVan brings a safe, supervised dog gym right to your neighbourhood,
            giving busy owners an easier way to keep energetic dogs healthy and fulfilled.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#book-now"
              className="keep-white group inline-flex items-center gap-2 rounded-xl bg-brand-500 px-7 py-3.5 text-base font-bold shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Find a session
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/12 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <PawPrint className="h-5 w-5" />
              How it works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3"
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-medium text-white/80">
                <Icon className="h-4 w-4 text-[#ffb24b]" />
                {label}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.82 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {fitTags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.85 }}
        className="friendly-card absolute bottom-10 right-8 z-10 hidden w-72 rounded-2xl border border-white/70 bg-white/94 p-5 text-[#2b1d16] shadow-2xl backdrop-blur lg:block"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d7565]">Dog-approved care</p>
            <p className="mt-1 font-display text-xl font-bold">Built around their pace</p>
          </div>
          <div className="rounded-xl bg-[#e8f7ec] p-2.5 text-[#16803a]">
            <PawPrint className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#fff2de] p-3">
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((value) => (
              <Star key={value} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
            ))}
          </div>
          <span className="text-sm font-semibold">Friendly, focused sessions</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[#6f5848]">
          Dog-powered movement, calm handling, and no pressure to go faster than they are ready for.
        </p>
      </motion.div>
    </section>
  );
}
