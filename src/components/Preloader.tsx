import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
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
    if (contentLoaded && videoEnded) {
      setTimeout(onComplete, 400);
    }
  }, [contentLoaded, videoEnded, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#fffaf2]"
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="h-[42vh] w-[82vw] max-w-md rounded-[28px] object-cover opacity-25 shadow-2xl shadow-[#513a2a]/10 sm:h-[55vh] sm:w-[70vw] lg:h-full lg:w-full lg:max-w-none lg:rounded-none lg:opacity-35 lg:shadow-none"
            style={{ objectPosition: 'center 35%' }}
            onEnded={() => setVideoEnded(true)}
            onError={() => setVideoEnded(true)}
          >
            <source src="/loader.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,250,242,0.96),rgba(255,250,242,0.68),rgba(223,243,255,0.72))]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-5 px-4 sm:gap-8">
          <div className="flex flex-col items-center gap-3">
            <img src="/images/zvm_companyname_logo.png" alt="ZoomieVan" className="h-14 w-auto sm:h-20" />
            <p className="text-[#6f5848] text-sm font-medium">Getting tails moving...</p>
          </div>
          <div className="h-1.5 w-36 overflow-hidden rounded-full bg-white shadow-inner sm:w-48">
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
