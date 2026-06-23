import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock, Heart, MapPin, ShieldCheck } from 'lucide-react';
import { Skeleton } from './Skeleton';

const plans = [
  {
    name: 'First Run',
    price: 49,
    period: 'trial session',
    description: 'A gentle first visit to see how your dog takes to the setup.',
    features: ['30-minute supervised run', 'Handler introduction', 'Post-session notes', 'No subscription needed'],
    accent: 'bg-[#dff3ff]',
    popular: false,
  },
  {
    name: 'Weekly Routine',
    price: 39,
    period: 'per session',
    description: 'A steady energy outlet for dogs who thrive with consistency.',
    features: ['Recurring weekly slot', 'Progress notes', 'Priority rescheduling', 'Multi-dog savings'],
    accent: 'bg-[#e8f7ec]',
    popular: true,
  },
  {
    name: 'Run Pack',
    price: 34,
    period: 'per session',
    description: 'Flexible prepaid visits for busy owners and changing schedules.',
    features: ['8 prepaid sessions', 'Flexible booking', 'Same route preference', 'Best session rate'],
    accent: 'bg-[#fff2de]',
    popular: false,
  },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = [12, 13, 14, 15, 16, 17, 18];

const timeSlots = [
  { time: '8:00 AM', available: true, van: 'Sunny' },
  { time: '9:00 AM', available: false, van: 'Sunny' },
  { time: '10:00 AM', available: true, van: 'Scout' },
  { time: '11:00 AM', available: true, van: 'Scout' },
  { time: '1:00 PM', available: true, van: 'Dash' },
  { time: '2:00 PM', available: true, van: 'Sunny' },
  { time: '3:00 PM', available: true, van: 'Scout' },
  { time: '4:00 PM', available: false, van: 'Dash' },
  { time: '5:00 PM', available: true, van: 'Sunny' },
];

const trustSignals = [
  { number: '1,200+', label: 'active members' },
  { number: '4.9/5', label: 'owner rating' },
  { number: '15K+', label: 'sessions run' },
];

export default function BookNow() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [selectedDay, setSelectedDay] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(2);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setIsLoading(false), 900);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  useEffect(() => {
    setIsLoading(true);
    setSelectedSlot(null);
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, [selectedDay]);

  return (
    <section id="book-now" className="relative overflow-hidden py-16 lg:py-24" ref={ref}>
      <div className="absolute bottom-10 left-0 h-80 w-80 rounded-full bg-[#e8f7ec] blur-3xl" />
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-[#dff3ff] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-600 shadow-sm">
            <Heart className="h-4 w-4" />
            Start with one happy run
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight text-[#2b1d16] sm:text-4xl lg:text-5xl">
            Pick the routine that fits your dog.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#6f5848]">
            Start with a trial or build a weekly outlet for the dog who always has a little more to give.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid gap-4 md:grid-cols-3 lg:grid-cols-1"
          >
            {plans.map((plan, index) => (
              <button
                key={plan.name}
                type="button"
                onClick={() => setSelectedPlan(index)}
                className={`friendly-card relative overflow-hidden rounded-3xl border bg-white p-5 text-left transition hover:-translate-y-1 ${
                  selectedPlan === index ? 'border-brand-400 ring-4 ring-brand-500/10' : 'border-[#ead8c6]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-4 top-4 rounded-full bg-brand-500 px-3 py-1 text-xs font-black uppercase tracking-[0.1em] text-white">
                    Most loved
                  </div>
                )}
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${plan.accent} text-[#2b1d16]`}>
                  <CalendarDays className="h-6 w-6" />
                </div>
                <div className="flex items-end gap-3">
                  <h3 className="font-display text-xl font-bold text-[#2b1d16]">{plan.name}</h3>
                  <div className="mb-0.5 text-sm text-[#8d7565]">
                    <span className="font-display text-3xl font-bold text-brand-600">${plan.price}</span> {plan.period}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#6f5848]">{plan.description}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs font-semibold text-[#4d392d]">
                      <Check className="h-4 w-4 shrink-0 text-[#16a34a]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="friendly-card overflow-hidden rounded-3xl border border-[#ead8c6] bg-white shadow-xl shadow-[#513a2a]/5"
          >
            <div className="border-b border-[#ead8c6] bg-[#fffaf2] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#2b1d16]">Preview a pickup window</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-[#6f5848]">
                    <MapPin className="h-4 w-4 text-brand-500" /> Example route: M5V, GTA Downtown
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className="rounded-xl border border-[#ead8c6] bg-white p-2 text-[#6f5848] transition hover:text-brand-600" aria-label="Previous week">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="rounded-xl border border-[#ead8c6] bg-white p-2 text-[#6f5848] transition hover:text-brand-600" aria-label="Next week">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 border-b border-[#ead8c6] p-3">
              {days.map((day, index) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(index)}
                  className={`flex flex-col items-center rounded-xl py-2 transition ${
                    selectedDay === index
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                      : 'text-[#6f5848] hover:bg-[#fff2de]'
                  }`}
                >
                  <span className="text-[10px] font-bold">{day}</span>
                  <span className="mt-0.5 text-sm font-black">{dates[index]}</span>
                </button>
              ))}
            </div>

            <div className="max-h-[300px] space-y-2 overflow-y-auto p-4">
              {isLoading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} className="h-12 w-full rounded-xl" />
                  ))}
                </div>
              ) : (
                timeSlots.map((slot, index) => (
                  <motion.button
                    key={`${slot.time}-${slot.van}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: index * 0.03 }}
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(index)}
                    className={`w-full rounded-2xl border p-3 text-left transition ${
                      selectedSlot === index
                        ? 'border-brand-400 bg-brand-50 text-[#2b1d16]'
                        : slot.available
                          ? 'border-[#ead8c6] bg-white text-[#4d392d] hover:border-brand-300'
                          : 'cursor-not-allowed border-[#ead8c6] bg-[#f7eee4] text-[#a08b7b]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-brand-500" />
                        <span className="text-sm font-bold">{slot.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#8d7565]">{slot.van} route</span>
                        <span className={`rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] ${
                          slot.available ? 'bg-[#e8f7ec] text-[#16743c]' : 'bg-[#ead8c6] text-[#8d7565]'
                        }`}>
                          {slot.available ? (selectedSlot === index ? 'Selected' : 'Open') : 'Booked'}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <button
            onClick={() => navigate('/signup')}
            className="group inline-flex items-center gap-2.5 rounded-2xl bg-brand-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-brand-500/25 transition hover:-translate-y-0.5 hover:bg-brand-600"
          >
            <ShieldCheck className="h-4 w-4" />
            Book a first run
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-3 text-sm text-[#6f5848]">
            No credit card required to create an account. Start with a trial session.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-6">
            {trustSignals.map((signal) => (
              <div key={signal.label} className="text-center">
                <p className="font-display text-2xl font-bold text-[#2b1d16]">{signal.number}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8d7565]">{signal.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
