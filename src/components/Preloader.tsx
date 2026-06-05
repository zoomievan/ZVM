import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-dark-900"
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="road">
            <div className="dog">
              <div className="body">
                <div className="head">
                  <div className="ear" />
                </div>
                <div className="tail" />
                <div className="leg leg1" />
                <div className="leg leg2" />
                <div className="leg leg3" />
                <div className="leg leg4" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">
              Zoomie<span className="text-brand-500">Van</span>
            </h2>
            <p className="text-dark-300 text-sm">Loading your experience...</p>
          </div>
          <div className="w-48 h-1 bg-dark-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
