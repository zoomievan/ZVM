import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Skeleton } from './Skeleton';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = [12, 13, 14, 15, 16, 17, 18];

const timeSlots = [
  { time: '8:00 AM', available: true, van: 'Thunder' },
  { time: '9:00 AM', available: false, van: 'Thunder' },
  { time: '10:00 AM', available: true, van: 'Storm' },
  { time: '11:00 AM', available: true, van: 'Storm' },
  { time: '12:00 PM', available: false, van: 'Lightning' },
  { time: '1:00 PM', available: true, van: 'Bolt' },
  { time: '2:00 PM', available: true, van: 'Thunder' },
  { time: '3:00 PM', available: true, van: 'Storm' },
  { time: '4:00 PM', available: false, van: 'Bolt' },
  { time: '5:00 PM', available: true, van: 'Thunder' },
];

export default function SchedulePreview() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedDay, setSelectedDay] = useState(2); // Wednesday
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setIsLoading(false), 1400);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  useEffect(() => {
    setIsLoading(true);
    setSelectedSlot(null);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [selectedDay]);

  return (
    <section className="relative py-24 lg:py-32 bg-dark-800/20 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:w-5/12 space-y-6"
          >
            <span className="text-brand-500 font-semibold text-sm uppercase tracking-[0.15em] block">
              Smart Scheduling
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Real-Time <span className="text-gradient">Calendar</span>
            </h2>
            <p className="text-dark-300 text-lg leading-relaxed">
              Our scheduling engine displays only viable time slots by actively calculating 
              whether local vans are operating within your neighbourhood zone on that specific day.
            </p>
            <div className="space-y-3">
              {[
                'Skeleton shimmers until data loads',
                'Zone-aware slot availability',
                'Instant cancel/reschedule up to 24hrs',
                'Auto-scheduling for weekly subscribers',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  <span className="text-sm text-dark-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Calendar preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-7/12 w-full"
          >
            <div className="rounded-2xl border border-dark-600 bg-dark-800/80 overflow-hidden shadow-2xl">
              {/* Calendar header */}
              <div className="p-5 border-b border-dark-600 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">January 2025</h3>
                  <p className="text-xs text-dark-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> Zone M5V — GTA Downtown
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 rounded-lg hover:bg-dark-700 text-dark-300 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-dark-700 text-dark-300 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day selector */}
              <div className="grid grid-cols-7 gap-1 p-3 border-b border-dark-600">
                {days.map((day, i) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(i)}
                    className={`flex flex-col items-center py-2 rounded-xl transition-all ${
                      selectedDay === i
                        ? 'bg-brand-500 text-white'
                        : 'text-dark-300 hover:bg-dark-700'
                    }`}
                  >
                    <span className="text-xs font-medium">{day}</span>
                    <span className="text-lg font-bold mt-0.5">{dates[i]}</span>
                  </button>
                ))}
              </div>

              {/* Time slots */}
              <div className="p-4 space-y-2 max-h-[320px] overflow-y-auto">
                {isLoading ? (
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-14 w-full rounded-xl" />
                    ))}
                  </div>
                ) : (
                  timeSlots.map((slot, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot(i)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                        selectedSlot === i
                          ? 'bg-brand-500/10 border-brand-500/40 text-brand-400'
                          : slot.available
                          ? 'bg-dark-700/50 border-dark-600 hover:border-dark-500 text-white'
                          : 'bg-dark-800/30 border-dark-700 text-dark-500 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{slot.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-dark-400">Van: {slot.van}</span>
                        {slot.available ? (
                          <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded">
                            {selectedSlot === i ? 'Selected' : 'Available'}
                          </span>
                        ) : (
                          <span className="text-xs bg-dark-600 text-dark-400 px-2 py-0.5 rounded">Booked</span>
                        )}
                      </div>
                    </motion.button>
                  ))
                )}
              </div>

              {/* Book button */}
              {selectedSlot !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border-t border-dark-600"
                >
                  <button className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all">
                    Confirm {timeSlots[selectedSlot].time} — {days[selectedDay]}, Jan {dates[selectedDay]}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
