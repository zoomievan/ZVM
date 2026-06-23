import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Activity, CalendarCheck, ClipboardCheck, Home, MapPin, MessageSquareText, Truck } from 'lucide-react';

const steps = [
  {
    icon: MapPin,
    title: 'Check your area',
    description: 'Tell us where you are and we confirm whether a ZoomieVan route can reach your neighbourhood.',
    image: '/images/how-route-check.jpg',
  },
  {
    icon: ClipboardCheck,
    title: 'Share your dog profile',
    description: 'Add age, breed, weight, temperament, and vaccine details so the first session starts thoughtfully.',
    image: '/images/how-dog-profile.jpg',
  },
  {
    icon: Truck,
    title: 'We arrive at your curb',
    description: 'A handler brings the mobile dog gym to you, introduces the setup, and eases your dog in calmly.',
    image: '/images/how-van-arrival.jpg',
  },
  {
    icon: Activity,
    title: 'Your dog runs at their pace',
    description: 'The slatmill is dog-powered, supervised, and followed by simple notes you can actually use.',
    image: '/images/how-slatmill-run.jpg',
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#fff7eb] py-16 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ead8c6] to-transparent" />
      <div className="absolute left-1/2 top-24 hidden h-1 w-[76%] -translate-x-1/2 rounded-full bg-[#f0dfcf] lg:block" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-600 shadow-sm">
            <CalendarCheck className="h-4 w-4" />
            Four simple steps
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight text-[#2b1d16] sm:text-4xl lg:text-5xl">
            From booking to a happily tired dog.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#6f5848]">
            The whole service is designed to feel easy for owners and calm for dogs.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description, image }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="friendly-card relative overflow-hidden rounded-3xl border border-[#ead8c6] bg-white"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={image} alt={title} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b1d16]/65 to-transparent" />
                <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-lg">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#5f493b]">
                  Step {index + 1}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-[#2b1d16]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6f5848]">{description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="mt-8 grid gap-4 rounded-3xl border border-[#ead8c6] bg-white p-5 shadow-xl shadow-[#513a2a]/5 md:grid-cols-3"
        >
          {[
            { icon: Home, label: 'Door-to-door convenience', text: 'No car rides, waiting rooms, or packed dog parks.' },
            { icon: MessageSquareText, label: 'Useful session notes', text: 'See how your dog did and what the handler noticed.' },
            { icon: Activity, label: 'Fitness without force', text: 'The dog-powered slatmill lets your dog control the pace.' },
          ].map(({ icon: Icon, label, text }) => (
            <div key={label} className="flex gap-3 rounded-2xl bg-[#fffaf2] p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f7ec] text-[#16743c]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2b1d16]">{label}</h4>
                <p className="mt-1 text-xs leading-relaxed text-[#6f5848]">{text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
