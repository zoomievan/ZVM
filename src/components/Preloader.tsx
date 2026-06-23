import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Activity, MapPin, Truck } from 'lucide-react';

const loadingSteps = [
  { icon: MapPin, label: 'Route' },
  { icon: Truck, label: 'Van' },
  { icon: Activity, label: 'Run' },
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [contentLoaded, setContentLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.5;
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
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#fffaf2]"
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 hidden items-center justify-center overflow-hidden lg:flex">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="h-full w-full object-cover opacity-25"
            style={{ objectPosition: 'center 35%' }}
          >
            <source src="/loader.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,250,242,0.96),rgba(255,250,242,0.68),rgba(223,243,255,0.72))]" />
        </div>

        <div className="relative z-10 mx-4 flex w-full max-w-xs flex-col items-center rounded-3xl border border-[#ead8c6] bg-white/90 px-6 py-7 text-center shadow-2xl shadow-[#513a2a]/10 backdrop-blur lg:hidden">
          <img src="/images/zvm_companyname_logo.png" alt="ZoomieVan" className="h-14 w-auto sm:h-16" />
          <p className="mt-4 text-sm font-semibold text-[#4d392d]">Getting tails moving...</p>

          <div className="mt-5 grid w-full grid-cols-3 gap-2">
            {loadingSteps.map(({ icon: Icon, label }, index) => (
              <motion.div
                key={label}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.16, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-1 rounded-2xl bg-[#fffaf2] px-2 py-3 text-[#6f5848]"
              >
                <Icon className="h-4 w-4 text-brand-500" />
                <span className="text-[11px] font-black uppercase tracking-[0.12em]">{label}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-[#fff0dc] shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          <p className="mt-3 text-xs font-medium text-[#8d7565]">Preparing a smoother first visit.</p>
        </div>

        <div className="relative z-10 hidden flex-col items-center gap-8 lg:flex">
          <div className="flex flex-col items-center gap-3">
            <img src="/images/zvm_companyname_logo.png" alt="ZoomieVan" className="h-20 w-auto" />
            <p className="text-sm font-medium text-[#6f5848]">Getting tails moving...</p>
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
