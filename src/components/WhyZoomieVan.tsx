import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Building2,
  CloudRain,
  HeartPulse,
  Home,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

const useCases = [
  {
    icon: Building2,
    title: 'Apartment dogs',
    description: 'A focused outlet when elevators, sidewalks, and busy streets make long runs hard.',
  },
  {
    icon: Zap,
    title: 'High-energy breeds',
    description: 'Structured movement for dogs who need more than a quick lap around the block.',
  },
  {
    icon: CloudRain,
    title: 'Bad-weather days',
    description: 'Keep the routine going through rain, heat, snow, and packed owner schedules.',
  },
  {
    icon: HeartPulse,
    title: 'Weight and wellness',
    description: 'Consistent low-impact sessions that support healthier habits over time.',
  },
];

const reassurance = [
  'No forced running',
  'Dog sets the pace',
  'Always supervised',
  'Sanitized equipment',
  'Session notes included',
  'Great for nervous dogs',
];

export default function WhyZoomieVan() {
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });

  return (
    <section id="why-zoomievan" className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute bottom-8 right-0 h-80 w-80 rounded-full bg-[#1557B7]/45 blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F3D91] shadow-sm">
              <Sparkles className="h-4 w-4" />
              Designed for real dog energy
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              For dogs who need more than another walk around the block.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/78">
              ZoomieVan gives owners a calm, professional way to help dogs burn energy,
              build confidence, and come home ready to settle.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl shadow-black/10 backdrop-blur"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-brand-500/18 p-3 text-[#FFB24B]">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  Safe, kind, and built around your dog.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Each session is handled at your dog's pace with human supervision,
                  calm introductions, and clear post-session notes.
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {reassurance.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-center text-xs font-bold text-white/86"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.18 + index * 0.06 }}
              className="friendly-card group rounded-2xl border border-white/15 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-300"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF2FF] text-[#0F3D91] transition group-hover:bg-brand-500 group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#071A3D]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#315B96]">{description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="keep-white mt-8 overflow-hidden rounded-3xl border border-white/15 bg-[#071A3D] text-white shadow-2xl shadow-black/20"
        >
          <div className="grid lg:grid-cols-[1fr_0.75fr]">
            <div className="p-7 sm:p-9">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#ffcf8a]">
                <Home className="h-4 w-4" />
                The owner promise
              </div>
              <p className="mt-5 max-w-2xl font-display text-2xl font-bold leading-snug sm:text-3xl">
                We bring the energy outlet to your curb, so your dog gets a
                better day without your day falling apart.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-white/80">
                <span className="rounded-full bg-white/10 px-4 py-2">Less pent-up energy</span>
                <span className="rounded-full bg-white/10 px-4 py-2">More predictable routines</span>
                <span className="rounded-full bg-white/10 px-4 py-2">Happier evenings at home</span>
              </div>
            </div>
            <img
              src="/images/van-exterior.jpg"
              alt="ZoomieVan vehicle ready for a neighborhood dog fitness visit"
              className="h-72 w-full object-cover lg:h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
