import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Check, Sparkles, Info } from 'lucide-react';
import { PricingSkeleton } from './Skeleton';

const plans = [
  {
    name: 'Trial Run',
    price: 49,
    period: 'per session',
    description: 'Perfect for first-timers. See what your dog thinks of slatmill training.',
    features: [
      'Single 30-min slatmill session',
      'Professional certified handler',
      'Full van sanitization',
      'Post-workout report card',
      'No commitment required',
    ],
    cta: 'Book Trial Session',
    popular: false,
    accent: 'border-dark-500',
  },
  {
    name: 'Weekly Pack',
    price: 39,
    period: 'per session',
    description: 'Our most popular option. Consistent weekly training builds results.',
    features: [
      'Weekly recurring 30-min session',
      'Auto-scheduled preferred time slot',
      'Priority van dispatch',
      'Live session tracking in-app',
      'Detailed progress analytics',
      'Cancel/reschedule 24hr before',
      'Multi-dog family discount',
    ],
    cta: 'Start Weekly Plan',
    popular: true,
    accent: 'border-brand-500',
    save: 'Save $40/mo',
  },
  {
    name: '8-Pack Bundle',
    price: 34,
    period: 'per session',
    description: 'Buy in bulk and save. 8 sessions to use at your convenience.',
    features: [
      '8 pre-paid 30-min sessions',
      'Use anytime within 90 days',
      'Flexible scheduling',
      'All standard session features',
      'Progress tracking included',
      'Transferable between dogs',
    ],
    cta: 'Get 8-Pack',
    popular: false,
    accent: 'border-dark-500',
    save: 'Save $120 total',
  },
];

export default function Pricing() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate skeleton loading
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section id="pricing" className="relative py-24 lg:py-32 bg-dark-800/30 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[150px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-brand-500 font-semibold text-sm uppercase tracking-[0.15em] mb-4 block">
            Transparent Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Simple, Honest <span className="text-gradient">Pricing</span>
          </h2>
          <p className="mt-6 text-lg text-dark-300 leading-relaxed">
            No hidden fees. Regional travel surcharges and applicable taxes (GST/PST/HST) 
            are transparently itemized at checkout based on your province.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {isLoading ? (
            <>
              <PricingSkeleton />
              <PricingSkeleton />
              <PricingSkeleton />
            </>
          ) : (
            plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative rounded-2xl border ${plan.accent} bg-dark-800 p-8 flex flex-col ${
                  plan.popular ? 'lg:-mt-4 lg:mb-[-16px] shadow-2xl shadow-brand-500/10' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-brand-600 to-brand-500 rounded-full flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span className="text-xs font-semibold text-white">Most Popular</span>
                  </div>
                )}

                <div className="space-y-4 mb-8">
                  <h3 className="font-display text-xl font-semibold text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-5xl font-bold text-white">${plan.price}</span>
                    <span className="text-dark-400 text-sm">/{plan.period}</span>
                  </div>
                  {plan.save && (
                    <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full">
                      {plan.save}
                    </span>
                  )}
                  <p className="text-dark-300 text-sm leading-relaxed">{plan.description}</p>
                </div>

                <button
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5'
                      : 'bg-dark-700 text-white hover:bg-dark-600 border border-dark-500 hover:-translate-y-0.5'
                  }`}
                >
                  {plan.cta}
                </button>

                <div className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-dark-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Tax Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="flex items-start gap-3 p-4 rounded-xl bg-dark-800/50 border border-dark-600">
            <Info className="w-5 h-5 text-brand-400 mt-0.5 shrink-0" />
            <p className="text-xs text-dark-400 leading-relaxed">
              Prices shown are base session rates. Applicable provincial taxes (GST 5%, PST varies, or HST) 
              and regional travel tier surcharges are calculated and fully disclosed in the itemized checkout 
              summary before payment. All billing processed securely via Stripe.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
