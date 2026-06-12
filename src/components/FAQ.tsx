import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What exactly is a slatmill, and is it safe for my dog?',
    answer: 'A slatmill is a non-motorized, dog-powered treadmill. Unlike electric treadmills, the slats only move when your dog runs on them, and stop immediately when your dog stops. This makes them exceptionally safe because your dog is always in complete control of the pace. Our certified handlers supervise every second of every session, and the equipment is veterinary-approved for canine use.',
  },
  {
    question: 'How do I know if my neighbourhood is covered?',
    answer: 'Simply enter your postal code in our Coverage Checker above. We use the first three characters (your Forward Sortation Area) to instantly determine if our fleet operates in your zone. We\'re actively expanding across major Canadian metros including Toronto (GTA), Vancouver (Metro), Montreal, Calgary, Ottawa, and more.',
  },
  {
    question: 'What vaccinations does my dog need?',
    answer: 'All dogs must have current Rabies and DHPP (Distemper, Hepatitis, Parainfluenza, and Parvovirus) vaccinations. You\'ll upload proof of these during onboarding, and our team will verify them before approving your profile. This is a strict safety requirement to protect all dogs in our program.',
  },
  {
    question: 'Can I cancel or reschedule a session?',
    answer: 'Absolutely. Our self-service scheduling system lets you cancel or reschedule any session up to 24 hours before the scheduled time—no phone calls or emails needed. Just open the app and make the change. Cancellations within 24 hours may be subject to a late cancellation fee.',
  },
  {
    question: 'How does billing work? What about taxes?',
    answer: 'Pricing shown on the site is a base estimate. Production checkout, payment processing, taxes, surcharges, cancellation fees, and receipts still need to be finalized before paid bookings go live.',
  },
  {
    question: 'What if my dog is reactive or has behavioural issues?',
    answer: 'During onboarding, you\'ll flag any reactivity or behavioral concerns in your dog\'s biometric profile. Our handlers are trained to work with reactive dogs and will adjust their approach accordingly. If your dog has severe behavioral challenges, we may recommend a preliminary assessment session to determine the best training approach.',
  },
  {
    question: 'Is the van sanitized between sessions?',
    answer: 'Yes, without exception. Every van undergoes a full sanitization protocol between sessions using veterinary-grade cleaning products. We follow strict commercial vehicle sanitization rules that exceed industry standards. The health and safety of every dog is our top priority.',
  },
  {
    question: 'Can I add multiple dogs to my account?',
    answer: 'Yes! Our Customer Command Hub allows you to create profiles for multiple family dogs. Each dog gets their own biometric profile, vaccine records, and session history. We also offer multi-dog family discounts on our Weekly Pack plan.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-dark-600 last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-base sm:text-lg font-semibold text-white group-hover:text-brand-400 transition-colors pr-8">
          {faq.question}
        </span>
        <div className={`w-8 h-8 rounded-full border ${isOpen ? 'bg-brand-500 border-brand-500' : 'border-dark-500'} flex items-center justify-center shrink-0 transition-all`}>
          {isOpen ? (
            <Minus className="w-4 h-4 text-white" />
          ) : (
            <Plus className="w-4 h-4 text-dark-300" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-dark-300 leading-relaxed text-sm sm:text-base pr-16">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="faq" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-brand-500 font-semibold text-sm uppercase tracking-[0.15em] mb-4 block">
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Questions? <span className="text-gradient">Answered.</span>
          </h2>
          <p className="mt-6 text-lg text-dark-300 leading-relaxed">
            Everything you need to know about ZoomieVan's mobile dog gym service.
          </p>
        </motion.div>

        <div className="rounded-2xl border border-dark-600 bg-dark-800/30 p-6 sm:p-8 divide-y-0">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
