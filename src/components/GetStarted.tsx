import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Clock, CreditCard, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Create Your Account',
    description: 'Set up your profile and dog health details in a guided flow. Production storage is being prepared for the client-owned backend.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Book Your Session',
    description: 'Choose a time that works for you. Our vans operate 7 days a week across active service zones with morning, afternoon, and evening slots.',
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'We Come to You',
    description: 'A fully-equipped mobile gym arrives at your door. Your dog gets a professional slatmill workout while you watch - no driving, no waiting.',
  },
];

const trustSignals = [
  { number: '1,200+', label: 'Interested Members' },
  { number: '98%', label: 'Target Retention' },
  { number: '4.9', label: 'Target Rating' },
  { number: '15K+', label: 'Session Goal' },
];

export default function GetStarted() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const navigate = useNavigate();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-brand-500 font-semibold text-sm uppercase tracking-[0.15em] mb-4 block">
            Start Today
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Get Started in{' '}
            <span className="text-gradient">3 Simple Steps</span>
          </h2>
          <p className="mt-6 text-lg text-dark-300 leading-relaxed">
            Join Canada's mobile dog fitness service. No contracts,
            no hidden fees - just expert care for your dog.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="h-full rounded-2xl border border-dark-600 bg-dark-800/50 backdrop-blur-sm p-8 hover:border-brand-500/30 transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 shrink-0 group-hover:bg-brand-500/20 transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-sm font-mono text-dark-400 font-bold tracking-wider">
                    STEP {index + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-3 group-hover:text-brand-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-dark-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 text-dark-500">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/signup')}
            className="group inline-flex items-center gap-3 px-10 py-4 text-base font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-xl shadow-brand-500/25 hover:-translate-y-0.5"
          >
            <CheckCircle className="w-5 h-5" />
            Create Your Free Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-4 text-sm text-dark-400">
            No credit card required &bull; Cancel anytime &bull;{' '}
            <span className="text-brand-400">Start with a trial session</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {trustSignals.map((signal) => (
            <div
              key={signal.label}
              className="text-center p-4 rounded-xl bg-dark-800/30 border border-dark-600/50"
            >
              <p className="font-display text-2xl font-bold text-white">{signal.number}</p>
              <p className="text-xs text-dark-400 mt-1">{signal.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
