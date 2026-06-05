import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20 -bottom-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-dark-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
        {/* Pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </motion.div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-brand-500/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-medium text-white/80">Limited spots available this month</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Ready to Transform Your Dog's{' '}
            <span className="text-gradient">Fitness Journey?</span>
          </h2>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Join thousands of happy dog owners across Canada. Book your first trial session 
            and see why dogs love ZoomieVan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="#coverage"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-dark-900 bg-white rounded-2xl hover:bg-brand-100 transition-all shadow-2xl hover:-translate-y-0.5"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white border-2 border-white/20 rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              View Pricing
            </a>
          </div>

          <p className="text-sm text-white/40">
            No commitments required. Cancel anytime. 🇨🇦 100% Canadian operated.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
