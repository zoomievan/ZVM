import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { MapPin, ClipboardCheck, Truck, Activity } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <MapPin className="w-7 h-7" />,
    title: 'Check Your Zone',
    description: 'Enter your postal code to confirm our mobile gym fleet operates in your neighborhood. We\'re rapidly expanding across Canada\'s major metro areas.',
    detail: 'Our FSA-based gatekeeper instantly validates your forward sortation area against our active service zones.',
    image: 'https://images.pexels.com/photos/7363197/pexels-photo-7363197.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
  {
    number: '02',
    icon: <ClipboardCheck className="w-7 h-7" />,
    title: 'Build Your Profile',
    description: 'Complete our guided onboarding flow: verify your address, build your dog\'s biometric profile, upload vaccine records, and sign our digital liability release.',
    detail: 'Our linear onboarding captures breed, weight, age, behavioral markers, rabies & DHPP credentials, and clickwrap agreement.',
    image: 'https://images.pexels.com/photos/28683175/pexels-photo-28683175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    number: '03',
    icon: <Truck className="w-7 h-7" />,
    title: 'We Come to You',
    description: 'Our custom-built gym van arrives at your door at your scheduled time. Our certified handler sets up the slatmill and preps the sanitized workout space.',
    detail: 'Every van is GPS-tracked and sanitized between sessions with veterinary-grade cleaners.',
    image: '/images/van-exterior.jpg',
  },
  {
    number: '04',
    icon: <Activity className="w-7 h-7" />,
    title: 'Watch Them Thrive',
    description: 'Your dog gets a tailored 30-minute power session on our professional slatmill. Track metrics live from the app and receive a detailed post-workout report.',
    detail: 'Real-time streaming shows pace, distance, duration, and behavioral notes from the handler.',
    image: '/images/slatmill.jpg',
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <div className="relative rounded-3xl overflow-hidden group">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
          <div className="absolute top-6 left-6 w-14 h-14 rounded-2xl bg-brand-500/90 backdrop-blur-sm flex items-center justify-center">
            <span className="font-display text-lg font-bold text-white">{step.number}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 space-y-4">
        <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400">
          {step.icon}
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">{step.title}</h3>
        <p className="text-dark-200 text-lg leading-relaxed">{step.description}</p>
        <div className="flex items-start gap-3 p-4 rounded-xl bg-dark-800 border border-dark-600">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
          <p className="text-sm text-dark-300">{step.detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="how-it-works" ref={containerRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Parallax background element */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-20 right-0 w-96 h-96 bg-brand-500/3 rounded-full blur-[120px]"
      />
      <motion.div
        style={{ y: bgY2 }}
        className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/3 rounded-full blur-[100px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-brand-500 font-semibold text-sm uppercase tracking-[0.15em] mb-4 block">
            The Process
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            How <span className="text-gradient">ZoomieVan</span> Works
          </h2>
          <p className="mt-6 text-lg text-dark-300 leading-relaxed">
            From postal code verification to post-workout reports—here's the complete journey for you and your dog.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-20 lg:space-y-32">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
