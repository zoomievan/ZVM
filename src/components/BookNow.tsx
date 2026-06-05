import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Clock, MapPin, ChevronLeft, ChevronRight, Star, Shield, CreditCard } from 'lucide-react';
import { Skeleton } from './Skeleton';
import { useCountUp } from '../hooks/useCountUp';

const plans = [
  {
    name: 'Trial Run',
    price: 49,
    period: 'per session',
    description: 'Perfect for first-timers.',
    features: ['Single 30-min session', 'Certified handler', 'Post-workout report', 'No commitment'],
    popular: false,
  },
  {
    name: 'Weekly Pack',
    price: 39,
    period: 'per session',
    description: 'Our most popular option.',
    features: ['Weekly recurring session', 'Auto-scheduled time slot', 'Live tracking', 'Progress analytics', 'Cancel 24hr before', 'Multi-dog discount'],
    popular: true,
  },
  {
    name: '8-Pack Bundle',
    price: 34,
    period: 'per session',
    description: 'Best value for committed owners.',
    features: ['8 pre-paid sessions', 'Priority dispatch', 'Same van each visit', 'Premium reports', 'Flexible scheduling', 'Best per-session rate'],
    popular: false,
  },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = [12, 13, 14, 15, 16, 17, 18];

const timeSlots = [
  { time: '8:00 AM', available: true, van: 'Thunder' },
  { time: '9:00 AM', available: false, van: 'Thunder' },
  { time: '10:00 AM', available: true, van: 'Storm' },
  { time: '11:00 AM', available: true, van: 'Storm' },
  { time: '1:00 PM', available: true, van: 'Bolt' },
  { time: '2:00 PM', available: true, van: 'Thunder' },
  { time: '3:00 PM', available: true, van: 'Storm' },
  { time: '4:00 PM', available: false, van: 'Bolt' },
  { time: '5:00 PM', available: true, van: 'Thunder' },
];

const trustSignals = [
  { number: '1,200+', label: 'Active Members' },
  { number: '4.9★', label: 'Average Rating' },
  { number: '15K+', label: 'Sessions Done' },
];

export default function BookNow() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setIsLoading(false), 1400);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  useEffect(() => {
    setIsLoading(true);
    setSelectedSlot(null);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [selectedDay]);

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="text-brand-500 font-semibold text-sm uppercase tracking-[0.15em] mb-3 block">
            Start Today
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Book Your <span className="text-gradient">First Session</span>
          </h2>
          <p className="mt-4 text-base text-dark-300">Choose a plan, pick a time, and we'll take it from there.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
              onClick={() => setSelectedPlan(index)}
              className={`relative cursor-pointer rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                selectedPlan === index
                  ? 'border-brand-500 bg-brand-500/10 shadow-lg shadow-brand-500/20'
                  : plan.popular
                  ? 'border-brand-500/50 bg-dark-800/60'
                  : 'border-dark-600 bg-dark-800/30 hover:border-dark-500'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-500 text-white text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-center">
                <h3 className="font-display text-lg font-bold text-white">{plan.name}</h3>
                <div className="mt-3">
                  <span className="font-display text-3xl font-bold text-white">${plan.price}</span>
                  <span className="text-dark-400 text-sm ml-1">{plan.period}</span>
                </div>
                <p className="text-xs text-dark-400 mt-1">{plan.description}</p>
              </div>
              <ul className="mt-5 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-dark-200">
                    <Check className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="max-w-lg mx-auto mb-8"
        >
          <div className="rounded-2xl border border-dark-600 bg-dark-800/50 overflow-hidden">
            <div className="p-4 border-b border-dark-600 flex items-center justify-between">
              <div>
                <h3 className="font-display text-sm font-semibold text-white">Pick a Time</h3>
                <p className="text-xs text-dark-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> Zone M5V — GTA Downtown
                </p>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 rounded-lg hover:bg-dark-700 text-dark-300 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-dark-700 text-dark-300 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 p-3 border-b border-dark-600">
              {days.map((day, i) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(i)}
                  className={`flex flex-col items-center py-1.5 rounded-lg transition-all ${
                    selectedDay === i
                      ? 'bg-brand-500 text-white'
                      : 'text-dark-300 hover:bg-dark-700'
                  }`}
                >
                  <span className="text-[10px] font-medium">{day}</span>
                  <span className="text-sm font-bold mt-0.5">{dates[i]}</span>
                </button>
              ))}
            </div>

            <div className="p-3 space-y-1.5 max-h-[240px] overflow-y-auto">
              {isLoading ? (
                <div className="space-y-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                timeSlots.map((slot, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: i * 0.03 }}
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(i)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border transition-all text-sm ${
                      selectedSlot === i
                        ? 'bg-brand-500/10 border-brand-500/40 text-brand-400'
                        : slot.available
                        ? 'bg-dark-700/50 border-dark-600 hover:border-dark-500 text-white'
                        : 'bg-dark-800/30 border-dark-700 text-dark-500 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{slot.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-dark-400">{slot.van}</span>
                      {slot.available ? (
                        <span className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded">
                          {selectedSlot === i ? 'Selected' : 'Avail'}
                        </span>
                      ) : (
                        <span className="text-[10px] bg-dark-600 text-dark-400 px-1.5 py-0.5 rounded">Taken</span>
                      )}
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/signup')}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-xl shadow-brand-500/25 hover:-translate-y-0.5"
          >
            <Shield className="w-4 h-4" />
            Create Your Free Account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-3 text-xs text-dark-400">
            No credit card required · Cancel anytime · <span className="text-brand-400">Start with a trial session</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-8 flex justify-center gap-6"
        >
          {trustSignals.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-lg font-bold text-white">{s.number}</p>
              <p className="text-[10px] text-dark-400">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
