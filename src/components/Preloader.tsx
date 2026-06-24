import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [contentLoaded, setContentLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setContentLoaded(true);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (contentLoaded) {
      setTimeout(onComplete, 400);
    }
  }, [contentLoaded, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#071A3D]"
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 hidden items-center justify-center overflow-hidden lg:flex">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-25"
            style={{ objectPosition: 'center 35%' }}
          >
            <source src="/loader-clean.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,26,61,0.96),rgba(15,61,145,0.74),rgba(249,115,22,0.18))]" />
        </div>

        <div className="relative z-10 flex w-full max-w-[220px] flex-col items-center px-4 text-center lg:hidden">
          <img src="/images/zvm_companyname_logo.png" alt="ZoomieVan" className="h-14 w-auto" />
          <p className="mt-4 text-sm font-medium text-white/82">Getting tails moving...</p>
          <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/20">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>

        <div className="relative z-10 hidden flex-col items-center gap-8 lg:flex">
          <div className="flex flex-col items-center gap-3">
            <img src="/images/zvm_companyname_logo.png" alt="ZoomieVan" className="h-20 w-auto" />
            <p className="text-sm font-medium text-white/82">Getting tails moving...</p>
          </div>
          <div className="h-1.5 w-48 overflow-hidden rounded-full bg-white shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
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
