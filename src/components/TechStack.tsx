import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Layers, Shield, Zap, Globe, Database, Lock } from 'lucide-react';

const techFeatures = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Convex-Ready Backend',
    description: 'The production data model is prepared for Convex so bookings, fleet status, CMS settings, vaccine records, and user profiles can move off demo browser storage.',
    tag: 'CONVEX',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Stable UI Loading',
    description: 'Skeleton states and section loaders keep the interface steady while backend queries and route-level content load.',
    tag: 'UX',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Privacy-Ready Data Model',
    description: 'Customer, dog, booking, vaccine, and admin audit records are separated in the schema so retention, access, deletion, and review workflows can be enforced before launch.',
    tag: 'SECURITY',
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: 'Operational Reporting',
    description: 'Admin reporting is structured around bookings, vans, service zones, session fees, and surcharges so finance workflows can be validated before payments go live.',
    tag: 'REPORTS',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Vercel Deployment',
    description: 'The frontend is ready for Vercel preview and production deployments with repeatable build, typecheck, and dependency-audit gates.',
    tag: 'RELEASE',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Role-Aware Access',
    description: 'Customer and admin routes are separated in the UI now, with backend-enforced roles planned for the Convex production migration.',
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
            The frontend is being prepared for a production backend, safer release gates,
            and clearer operational ownership before real customer data is collected.
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 p-6 rounded-2xl border border-dark-600 bg-dark-800/50"
        >
          <p className="text-xs text-dark-400 uppercase tracking-[0.15em] text-center mb-6">Technology Stack</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'React 19', color: 'text-cyan-400' },
              { name: 'Vite', color: 'text-yellow-400' },
              { name: 'Convex', color: 'text-red-400' },
              { name: 'Tailwind CSS', color: 'text-cyan-400' },
              { name: 'Framer Motion', color: 'text-purple-400' },
              { name: 'React Router', color: 'text-blue-400' },
              { name: 'Vercel', color: 'text-white' },
              { name: 'GitHub Actions', color: 'text-white' },
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
