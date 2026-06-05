import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 origin-left z-[100]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
