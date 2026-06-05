import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle, ArrowRight, Mail, Loader2 } from 'lucide-react';

// Simulated active FSA zones
const ACTIVE_FSAS = [
  'M1B','M1C','M1E','M1G','M1H','M1J','M1K','M1L','M1M','M1N','M1P','M1R','M1S','M1T','M1V','M1W','M1X',
  'M2H','M2J','M2K','M2L','M2M','M2N','M2P','M2R','M3A','M3B','M3C','M3H','M3J','M3K','M3L','M3M','M3N',
  'M4A','M4B','M4C','M4E','M4G','M4H','M4J','M4K','M4L','M4M','M4N','M4P','M4R','M4S','M4T','M4V','M4W','M4X','M4Y',
  'M5A','M5B','M5C','M5E','M5G','M5H','M5J','M5K','M5L','M5M','M5N','M5P','M5R','M5S','M5T','M5V','M5W','M5X',
  'M6A','M6B','M6C','M6E','M6G','M6H','M6J','M6K','M6L','M6M','M6N','M6P','M6R','M6S',
  'M9A','M9B','M9C','M9L','M9M','M9N','M9P','M9R','M9V','M9W',
  'V5A','V5B','V5C','V5E','V5G','V5H','V5J','V5K','V5L','V5M','V5N','V5P','V5R','V5S','V5T','V5V','V5W','V5X','V5Y','V5Z',
  'V6A','V6B','V6C','V6E','V6G','V6H','V6J','V6K','V6L','V6M','V6N','V6P','V6R','V6S','V6T','V6V','V6W','V6X','V6Y','V6Z',
  'V7A','V7B','V7C','V7E','V7G','V7H','V7J','V7K','V7L','V7M','V7N','V7P','V7R','V7S','V7T','V7V','V7W','V7X','V7Y',
  'V3A','V3B','V3C','V3E','V3G','V3H','V3J','V3K','V3L','V3M','V3N','V3R','V3S','V3T','V3V','V3W','V3X','V3Y','V3Z',
  'H1A','H1B','H1C','H1E','H1G','H1H','H1J','H1K','H1L','H1M','H1N','H1P','H1R','H1S','H1T','H1V','H1W','H1X','H1Y','H1Z',
  'H2A','H2B','H2C','H2E','H2G','H2H','H2J','H2K','H2L','H2M','H2N','H2P','H2R','H2S','H2T','H2V','H2W','H2X','H2Y','H2Z',
  'H3A','H3B','H3C','H3E','H3G','H3H','H3J','H3K','H3L','H3M','H3N','H3P','H3R','H3S','H3T','H3V','H3W','H3X','H3Y','H3Z',
  'T2A','T2B','T2C','T2E','T2G','T2H','T2J','T2K','T2L','T2M','T2N','T2P','T2R','T2S','T2T','T2V','T2W','T2X','T2Y','T2Z',
  'T3A','T3B','T3C','T3E','T3G','T3H','T3J','T3K','T3L','T3M','T3N','T3P','T3R',
  'K1A','K1B','K1C','K1E','K1G','K1H','K1J','K1K','K1L','K1M','K1N','K1P','K1R','K1S','K1T','K1V','K1W','K1X','K1Y','K1Z',
  'K2A','K2B','K2C','K2E','K2G','K2H','K2J','K2K',
];

type Status = 'idle' | 'loading' | 'serviceable' | 'unserviceable';

export default function PostalCodeChecker() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [postalCode, setPostalCode] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleCheck = () => {
    if (postalCode.length < 3) return;

    setStatus('loading');
    const fsa = postalCode.toUpperCase().replace(/\s/g, '').slice(0, 3);

    // Simulate API call
    setTimeout(() => {
      if (ACTIVE_FSAS.includes(fsa)) {
        setStatus('serviceable');
      } else {
        setStatus('unserviceable');
      }
    }, 1200);
  };

  const handleWaitlist = () => {
    if (!email) return;
    setWaitlistSubmitted(true);
  };

  return (
    <section id="coverage" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/50 to-dark-900" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[200px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <span className="text-brand-500 font-semibold text-sm uppercase tracking-[0.15em]">
            Coverage Check
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Are We In Your <span className="text-gradient">Neighbourhood?</span>
          </h2>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto">
            Enter your Canadian postal code below. We'll instantly check if our mobile gym fleet 
            services your area.
          </p>
        </motion.div>

        {/* Postal Code Input */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 max-w-lg mx-auto"
        >
          <div className="relative">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type="text"
                  placeholder="Enter postal code (e.g., M5V 2T6)"
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value.toUpperCase());
                    if (status !== 'idle') setStatus('idle');
                    setWaitlistSubmitted(false);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                  className="w-full pl-12 pr-4 py-4 bg-dark-800 border border-dark-500 rounded-2xl text-white placeholder:text-dark-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all text-lg"
                  maxLength={7}
                />
              </div>
              <button
                onClick={handleCheck}
                disabled={postalCode.length < 3 || status === 'loading'}
                className="px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-2xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Check
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {status === 'serviceable' && (
              <motion.div
                key="serviceable"
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mt-6"
              >
                <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="font-semibold text-green-400">Great news! We're in your area!</p>
                      <p className="text-sm text-green-400/70 mt-1">
                        Zone <span className="font-mono font-bold">{postalCode.slice(0, 3)}</span> is actively serviced by our fleet.
                      </p>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-400 transition-colors flex items-center justify-center gap-2">
                    Sign Up & Book Your First Session
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {status === 'unserviceable' && (
              <motion.div
                key="unserviceable"
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mt-6"
              >
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-amber-400" />
                    <div>
                      <p className="font-semibold text-amber-400">We're not there yet—but we're growing fast!</p>
                      <p className="text-sm text-amber-400/70 mt-1">
                        Zone <span className="font-mono font-bold">{postalCode.slice(0, 3)}</span> isn't covered yet. Join the waitlist to be first to know.
                      </p>
                    </div>
                  </div>
                  {!waitlistSubmitted ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-500 rounded-xl text-white placeholder:text-dark-400 text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <button
                        onClick={handleWaitlist}
                        className="px-6 py-3 bg-amber-500 text-white font-semibold text-sm rounded-xl hover:bg-amber-400 transition-colors"
                      >
                        Join Waitlist
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-medium">You're on the list! We'll notify you when we expand to your area.</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Active Cities */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-dark-400 mb-6">Currently active in major Canadian metros:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Toronto (GTA)', 'Vancouver (Metro)', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Mississauga', 'Brampton', 'Hamilton', 'Surrey'].map((city) => (
              <span key={city} className="px-4 py-2 bg-dark-800 border border-dark-600 rounded-full text-sm text-dark-200">
                📍 {city}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
