import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxDividerProps {
  image: string;
  quote: string;
  author: string;
  height?: string;
}

export default function ParallaxDivider({ image, quote, author, height = 'h-[50vh]' }: ParallaxDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className={`relative ${height} overflow-hidden`}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-32 -bottom-32"
      >
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-900/70" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative h-full flex items-center justify-center px-8"
      >
        <div className="text-center max-w-2xl">
          <svg className="w-10 h-10 text-brand-500/30 mx-auto mb-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight italic">
            "{quote}"
          </p>
          <p className="mt-6 text-brand-400 font-medium">{author}</p>
        </div>
      </motion.div>
    </div>
  );
}
