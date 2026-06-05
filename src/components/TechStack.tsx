import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Layers, Shield, Zap, Globe, Database, Lock } from 'lucide-react';

const techFeatures = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Real-Time Data Streaming',
    description: 'Powered by Convex\'s permanent WebSocket pipeline. Every schedule change, session update, and fleet status syncs to your screen in milliseconds—zero polling, zero stale data.',
    tag: 'CONVEX',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Zero Layout Shifts',
    description: 'Skeleton shimmers match exact layout dimensions and disappear the millisecond data loads. No content jumping, no flickering—just seamless, professional transitions.',
    tag: 'UX',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'PIPEDA Compliant',
    description: 'All sensitive client data is stored exclusively on AWS Canada Central (Montreal). We maintain full compliance with Canadian federal privacy regulations.',
    tag: 'SECURITY',
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: 'Smart Tax Engine',
    description: 'Our itemized invoice calculator reviews your province code and applies correct GST, PST, or HST line items alongside regional delivery fees—automatically.',
    tag: 'BILLING',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Edge-Optimized Delivery',
    description: 'Frontend deployed on Vercel\'s global edge network for sub-100ms page loads. Combined with server-side rendering for maximum local SEO performance.',
    tag: 'PERFORMANCE',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Enterprise Auth',
    description: 'Multi-tenant authentication with role-based access control. Separate dashboards for dog owners, fleet administrators, and company operators.',
    tag: 'AUTH',
  },
];

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 bg-dark-800/20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(249,115,22,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-brand-500 font-semibold text-sm uppercase tracking-[0.15em] mb-4 block">
            Built Different
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Powered by <span className="text-gradient">Modern Tech</span>
          </h2>
          <p className="mt-6 text-lg text-dark-300 leading-relaxed">
            We don't cut corners on infrastructure. Here's what's running under the hood 
            to deliver a flawless experience for you and your dog.
          </p>
        </motion.div>

        <motion.div
          style={{ perspective: 1000 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {techFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ rotateX }}
              className="group rounded-2xl border border-dark-600 bg-dark-800/80 backdrop-blur-sm p-7 hover:border-brand-500/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500/20 transition-colors">
                  {feature.icon}
                </div>
                <span className="px-2.5 py-1 bg-dark-700 text-dark-300 text-[10px] font-mono font-bold tracking-wider rounded-md">
                  {feature.tag}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-3 group-hover:text-brand-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-dark-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 p-6 rounded-2xl border border-dark-600 bg-dark-800/50"
        >
          <p className="text-xs text-dark-400 uppercase tracking-[0.15em] text-center mb-6">Technology Stack</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Next.js 14+', color: 'text-white' },
              { name: 'Convex', color: 'text-red-400' },
              { name: 'Tailwind CSS', color: 'text-cyan-400' },
              { name: 'Shadcn/ui', color: 'text-white' },
              { name: 'Framer Motion', color: 'text-purple-400' },
              { name: 'Clerk Auth', color: 'text-violet-400' },
              { name: 'Stripe', color: 'text-indigo-400' },
              { name: 'Vercel', color: 'text-white' },
              { name: 'AWS Canada', color: 'text-yellow-400' },
            ].map((tech) => (
              <span
                key={tech.name}
                className={`px-4 py-2 bg-dark-700 border border-dark-500 rounded-lg text-sm font-mono font-medium ${tech.color} hover:border-brand-500/30 transition-colors cursor-default`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
