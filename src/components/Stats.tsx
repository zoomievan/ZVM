import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useCountUp } from '../hooks/useCountUp';

const stats = [
  { value: 2847, suffix: '+', label: 'Dogs Trained', description: 'Happy, healthy, and fit' },
  { value: 140, suffix: '+', label: 'Active Zones', description: 'Across Canada' },
  { value: 15000, suffix: '+', label: 'Sessions Completed', description: 'And counting daily' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', description: 'Based on 1,200+ reviews' },
];

function StatItem({ stat }: { stat: typeof stats[0] }) {
  const { count, ref } = useCountUp(stat.value, 2500);

  return (
    <div ref={ref} className="text-center space-y-2">
      <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
        {count.toLocaleString()}<span className="text-brand-500">{stat.suffix}</span>
      </div>
      <p className="text-lg font-semibold text-white">{stat.label}</p>
      <p className="text-sm text-dark-400">{stat.description}</p>
    </div>
  );
}

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={containerRef} className="relative py-20 lg:py-28 overflow-hidden">
      {/* Parallax background image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-20 -bottom-20"
      >
        <img
          src="/images/about-bg.jpg"
          alt="Neighborhood"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-900/90" />
      </motion.div>

      {/* Border lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
