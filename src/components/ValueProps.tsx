import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Truck, Heart, ShieldCheck, Zap, Gauge, CalendarCheck } from 'lucide-react';

const values = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: 'Mobile Convenience',
    description: 'Our fully-equipped gym vans come directly to your door. No commute, no hassle—just professional canine fitness at your curb.',
    color: 'from-brand-500 to-orange-400',
    bgColor: 'bg-brand-500/10',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Slatmill Workouts',
    description: 'Manual, dog-powered treadmills that provide a natural running gait. No motors—your dog sets the pace for a safe, effective workout.',
    color: 'from-yellow-500 to-amber-400',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Tailored Programs',
    description: 'Every session is customized to your dog\'s breed, weight, age, and energy level. From puppies to seniors, we meet them where they are.',
    color: 'from-rose-500 to-pink-400',
    bgColor: 'bg-rose-500/10',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Safety First',
    description: 'Certified handlers, sanitized equipment after every session, and comprehensive liability coverage. Your dog\'s safety is non-negotiable.',
    color: 'from-emerald-500 to-green-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: <Gauge className="w-6 h-6" />,
    title: 'Real-Time Tracking',
    description: 'Track your dog\'s session live from our app. See distance covered, calories burned, and get post-workout reports delivered instantly.',
    color: 'from-blue-500 to-cyan-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: <CalendarCheck className="w-6 h-6" />,
    title: 'Flexible Scheduling',
    description: 'Book, reschedule, or cancel up to 24 hours before your session—no calls needed. Weekly subscriptions auto-schedule for convenience.',
    color: 'from-violet-500 to-purple-400',
    bgColor: 'bg-violet-500/10',
  },
];

export default function ValueProps() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="relative py-24 lg:py-32 bg-dark-900 overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[150px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="text-brand-500 font-semibold text-sm uppercase tracking-[0.15em] mb-4 block">
            Why ZoomieVan
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Everything Your Dog Needs.{' '}
            <span className="text-gradient">Delivered.</span>
          </h2>
          <p className="mt-6 text-lg text-dark-300 leading-relaxed">
            We've reimagined canine fitness from the ground up—bringing a fully-equipped, professionally-staffed 
            mobile gym right to your neighborhood.
          </p>
        </motion.div>

        {/* Value Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-dark-600 bg-dark-800/50 p-8 hover:border-dark-500 hover:bg-dark-700/50 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                }}
              />
              
              <div className={`w-12 h-12 rounded-xl ${value.bgColor} flex items-center justify-center mb-6`}>
                <div className={`bg-gradient-to-r ${value.color} bg-clip-text`}>
                  <div className="text-white">{value.icon}</div>
                </div>
              </div>
              
              <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-brand-400 transition-colors">
                {value.title}
              </h3>
              <p className="text-dark-300 leading-relaxed text-sm">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
