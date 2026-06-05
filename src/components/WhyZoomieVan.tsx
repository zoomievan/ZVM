import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Truck, Heart, ShieldCheck, Zap, Gauge, CalendarCheck,
  MapPin, ClipboardCheck, Activity,
  BarChart3, Users, Star, Map
} from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';

type Tab = 'values' | 'steps' | 'stats';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'values', label: 'Why Us', icon: <Star className="w-4 h-4" /> },
  { id: 'steps', label: 'How It Works', icon: <Activity className="w-4 h-4" /> },
  { id: 'stats', label: 'By the Numbers', icon: <BarChart3 className="w-4 h-4" /> },
];

const values = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: 'Mobile Convenience',
    description: 'Our fully-equipped gym vans come directly to your door. No commute, no hassle—just professional canine fitness at your curb.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Slatmill Workouts',
    description: 'Manual, dog-powered treadmills that provide a natural running gait. No motors—your dog sets the pace for a safe, effective workout.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Tailored Programs',
    description: 'Every session is customized to your dog\'s breed, weight, age, and energy level. From puppies to seniors, we meet them where they are.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Safety First',
    description: 'Certified handlers, sanitized equipment after every session, and comprehensive liability coverage.',
  },
  {
    icon: <Gauge className="w-6 h-6" />,
    title: 'Real-Time Tracking',
    description: 'Track your dog\'s session live from our app. See distance covered, calories burned, and get post-workout reports.',
  },
  {
    icon: <CalendarCheck className="w-6 h-6" />,
    title: 'Flexible Scheduling',
    description: 'Book, reschedule, or cancel up to 24 hours before your session. Weekly subscriptions auto-schedule for convenience.',
  },
];

const steps = [
  {
    number: '01', icon: <MapPin className="w-6 h-6" />, title: 'Check Your Zone',
    description: 'Enter your postal code to confirm our mobile gym fleet operates in your neighborhood.',
  },
  {
    number: '02', icon: <ClipboardCheck className="w-6 h-6" />, title: 'Build Your Profile',
    description: 'Complete our guided onboarding: address, dog biometrics, vaccine records, and digital liability release.',
  },
  {
    number: '03', icon: <Truck className="w-6 h-6" />, title: 'We Come to You',
    description: 'Our custom-built gym van arrives at your door at your scheduled time with a certified handler.',
  },
  {
    number: '04', icon: <Activity className="w-6 h-6" />, title: 'Watch Them Thrive',
    description: 'Your dog gets a tailored 30-minute slatmill session. Track metrics live and get a detailed post-workout report.',
  },
];

const statData = [
  { value: 2847, suffix: '+', label: 'Dogs Trained' },
  { value: 140, suffix: '+', label: 'Active Zones' },
  { value: 15000, suffix: '+', label: 'Sessions Completed' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
];

function StatItem({ stat }: { stat: typeof statData[0] }) {
  const { count, ref } = useCountUp(stat.value, 2500);
  return (
    <div ref={ref} className="text-center space-y-1">
      <div className="font-display text-3xl sm:text-4xl font-bold text-white">
        {count.toLocaleString()}<span className="text-brand-500">{stat.suffix}</span>
      </div>
      <p className="text-sm text-dark-300">{stat.label}</p>
    </div>
  );
}

export default function WhyZoomieVan() {
  const [activeTab, setActiveTab] = useState<Tab>('values');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="why-zoomievan" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="text-brand-500 font-semibold text-sm uppercase tracking-[0.15em] mb-3 block">
            Why ZoomieVan
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Everything Your Dog Needs. <span className="text-gradient">Delivered.</span>
          </h2>
          <p className="mt-4 text-base text-dark-300 leading-relaxed">
            We've reimagined canine fitness from the ground up—bringing a fully-equipped, professionally-staffed mobile gym right to your neighborhood.
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                  : 'bg-dark-800 text-dark-300 border border-dark-600 hover:border-dark-500 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'values' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group rounded-2xl border border-dark-600 bg-dark-800/50 p-6 hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-4 group-hover:bg-brand-500/20 transition-colors">
                  {value.icon}
                </div>
                <h3 className="font-display text-base font-semibold text-white mb-2 group-hover:text-brand-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-dark-300 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'steps' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto space-y-4"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-5 p-5 rounded-2xl border border-dark-600 bg-dark-800/30 hover:border-brand-500/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 shrink-0">
                  {step.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono text-brand-400 font-bold">STEP {step.number}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-white">{step.title}</h3>
                  <p className="text-dark-300 text-sm mt-1">{step.description}</p>
                </div>
              </motion.div>
            ))}
            <p className="text-center text-xs text-dark-400 pt-2">
              <a href="/coverage" className="text-brand-400 hover:underline">Check your zone →</a>
            </p>
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-2xl border border-dark-600 bg-dark-800/30">
              {statData.map((stat) => (
                <StatItem key={stat.label} stat={stat} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
