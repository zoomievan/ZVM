import { motion } from 'framer-motion';
import { ArrowRight, CalendarHeart, CheckCircle2, PawPrint } from 'lucide-react';

export default function CTA() {
  return (
    <section className="cta-section relative overflow-hidden bg-[#071A3D] py-16 lg:py-24">
      <div className="absolute inset-y-0 right-0 hidden w-2/5 lg:block">
        <img
          src="/images/van-exterior.jpg"
          alt="ZoomieVan mobile dog gym vehicle"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A3D] via-[#071A3D]/55 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F3D91] shadow-sm">
            <CalendarHeart className="h-4 w-4" />
            A healthier routine, delivered
          </div>

          <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            More movement. Less mischief.{' '}
            <span className="text-[#FFB24B]">Happier days.</span>
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/78">
            Give your dog a focused workout without rearranging your whole day.
            We bring the gym, the handler, and the energy outlet to you.
          </p>

          <div className="mt-7 grid gap-3 text-sm font-semibold text-white/86 sm:grid-cols-2">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#FFB24B]" /> Supervised sessions</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#FFB24B]" /> Built around your dog</div>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#book-now"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-brand-500/20 transition hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Check availability
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#why-zoomievan"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white px-7 py-3.5 font-bold text-[#071A3D] transition hover:border-brand-300"
            >
              <PawPrint className="h-5 w-5 text-brand-500" />
              Explore the service
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
