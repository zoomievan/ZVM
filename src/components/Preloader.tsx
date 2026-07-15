import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const LOADER_DURATION_MS = 3000;

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let done = false;
    let completionTimer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      if (done) return;
      done = true;
      setProgress(100);
      completionTimer = setTimeout(onComplete, 400);
    };

    if (shouldReduceMotion) {
      finish();
      return () => clearTimeout(completionTimer);
    }

    const v = videoRef.current;
    if (!v) return;

    const syncTimeline = () => {
      if (v.duration > 0) v.playbackRate = v.duration / (LOADER_DURATION_MS / 1000);
    };
    const onTime = () => {
      if (v.duration) setProgress((v.currentTime / v.duration) * 100);
    };
    const onEnd = () => finish();

    if (v.readyState >= 1) syncTimeline();
    v.addEventListener('loadedmetadata', syncTimeline);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('ended', onEnd);

    const timer = setTimeout(finish, LOADER_DURATION_MS);

    return () => {
      clearTimeout(timer);
      clearTimeout(completionTimer);
      v.removeEventListener('loadedmetadata', syncTimeline);
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('ended', onEnd);
    };
  }, [onComplete, shouldReduceMotion]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex flex-col items-center justify-start bg-[#071A3D] motion-reduce:justify-center lg:justify-center"
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-x-0 top-0 flex h-44 justify-center overflow-hidden bg-[#0B2860] motion-reduce:hidden lg:inset-0 lg:h-auto lg:items-center lg:bg-transparent">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="h-full w-full max-w-[340px] object-contain opacity-75 lg:max-w-none lg:object-cover lg:opacity-25 lg:[clip-path:polygon(0_0,100%_0,100%_85%,82%_85%,82%_100%,0_100%)]"
            style={{ objectPosition: 'center 35%' }}
          >
            <source src="/loader2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,26,61,0.05),rgba(7,26,61,0.76))] lg:bg-[radial-gradient(ellipse_at_center,rgba(15,61,145,0.35),rgba(7,26,61,0.98)_70%)]" />
        </div>

        <div className="relative z-10 flex w-full max-w-[248px] flex-col items-center px-4 pt-52 text-center motion-reduce:pt-0 lg:hidden">
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
