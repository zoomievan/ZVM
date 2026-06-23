import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { HelpCircle, Minus, Plus, ShieldCheck } from 'lucide-react';

const faqs = [
  {
    question: 'What exactly is a slatmill, and is it safe for my dog?',
    answer: 'A slatmill is a non-motorized, dog-powered treadmill. The belt moves only when your dog chooses to move, and stops when your dog stops. A handler supervises every session and keeps the pace calm, safe, and dog-led.',
  },
  {
    question: 'How do I know if my neighbourhood is covered?',
    answer: 'Use the coverage checker with your Canadian postal code. We use the first three characters, called the Forward Sortation Area, to see whether your address is on an active ZoomieVan route.',
  },
  {
    question: 'What vaccinations does my dog need?',
    answer: 'Dogs need current Rabies and DHPP vaccinations. You can add proof during onboarding so the team can verify everything before your dog joins a session.',
  },
  {
    question: 'Can I cancel or reschedule a session?',
    answer: 'Yes. The scheduling flow is designed for busy owners, with self-service changes up to 24 hours before a scheduled session. Late cancellations may be subject to a fee once paid bookings are active.',
  },
  {
    question: 'How does billing work?',
    answer: 'The public site shows estimated plan pricing. Production checkout, taxes, surcharges, cancellation fees, and receipts should be finalized before accepting paid bookings.',
  },
  {
    question: 'What if my dog is reactive or nervous?',
    answer: 'You can flag reactivity, anxiety, or handling notes during onboarding. Handlers can slow down introductions and adjust the session plan. Severe concerns may require an assessment before regular sessions.',
  },
  {
    question: 'Is the van sanitized between sessions?',
    answer: 'Yes. Equipment and van surfaces are cleaned between sessions with dog-safe, veterinary-grade products. Cleanliness and health requirements are part of the service promise.',
  },
  {
    question: 'Can I add multiple dogs to my account?',
    answer: 'Yes. Each dog can have a separate profile with their own health information, temperament notes, and session history. Multi-dog pricing can be offered through account plans.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="border-b border-[#ead8c6] last:border-b-0"
    >
      <button onClick={() => setIsOpen(!isOpen)} className="group flex w-full items-center justify-between gap-6 py-6 text-left">
        <span className="text-base font-bold text-[#2b1d16] transition group-hover:text-brand-600 sm:text-lg">
          {faq.question}
        </span>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
          isOpen ? 'border-brand-500 bg-brand-500 text-white' : 'border-[#d6bdab] bg-[#fffaf2] text-[#6f5848]'
        }`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 text-sm leading-relaxed text-[#6f5848] sm:text-base">
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
    <section id="faq" className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24">
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-[#dff3ff] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#fff2de] blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-600 shadow-sm">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight text-[#2b1d16] sm:text-5xl">
            Questions before your dog's first run?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#6f5848]">
            Here are the practical answers owners usually want before booking a supervised mobile dog gym session.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="friendly-card mt-10 rounded-3xl border border-[#ead8c6] bg-white p-5 shadow-xl shadow-[#513a2a]/5 sm:p-8"
        >
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} faq={faq} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="keep-white mt-6 rounded-3xl bg-[#2b1d16] p-6 text-white sm:p-8"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-white/10 p-3 text-[#ffcf8a]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">Still unsure?</h2>
                <p className="mt-1 text-sm leading-relaxed text-white/75">Start with a first run. Your dog controls the pace, and the session is supervised the whole time.</p>
              </div>
            </div>
            <a href="/#book-now" className="keep-white rounded-2xl bg-brand-500 px-6 py-3 text-center text-sm font-bold transition hover:bg-brand-600">
              See plans
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
