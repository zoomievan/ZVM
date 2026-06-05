import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { TestimonialSkeleton } from './Skeleton';

const testimonials = [
  {
    name: 'Sarah Chen',
    location: 'Vancouver, BC',
    dog: 'Max — German Shepherd, 3yr',
    avatar: 'https://images.pexels.com/photos/31734355/pexels-photo-31734355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 5,
    text: 'Max used to destroy furniture from pent-up energy. After 4 weeks of ZoomieVan sessions, he\'s a completely different dog. Calm, happy, and actually sleeps through the night now. The van showing up at our door is such a game-changer.',
  },
  {
    name: 'James Okafor',
    location: 'Toronto, ON',
    dog: 'Bella — Pit Bull Mix, 5yr',
    avatar: 'https://images.pexels.com/photos/14234151/pexels-photo-14234151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 5,
    text: 'I was skeptical about a mobile dog gym, but the professionalism blew me away. The handler knew exactly how to work with Bella\'s reactive tendencies. The real-time tracking app is amazing—I can watch her pace from my couch.',
  },
  {
    name: 'Marie Tremblay',
    location: 'Montreal, QC',
    dog: 'Hugo — Belgian Malinois, 2yr',
    avatar: 'https://images.pexels.com/photos/34658892/pexels-photo-34658892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 5,
    text: 'Hugo is extremely high-energy—like, Malinois-level crazy. The slatmill sessions are the only thing that truly tires him out. The weekly subscription auto-schedules so I never have to think about it. Worth every single penny.',
  },
  {
    name: 'David Park',
    location: 'Calgary, AB',
    dog: 'Luna — Husky, 4yr',
    avatar: 'https://images.pexels.com/photos/19757897/pexels-photo-19757897.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    rating: 5,
    text: 'Living in a condo with a Husky? ZoomieVan literally saved my sanity. Luna gets her exercise without me braving -30° weather. The post-workout reports showing her progress are such a nice touch.',
  },
  {
    name: 'Priya Sharma',
    location: 'Mississauga, ON',
    dog: 'Bruno — Rottweiler, 6yr',
    avatar: 'https://images.pexels.com/photos/5749781/pexels-photo-5749781.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    rating: 5,
    text: 'Our vet recommended more exercise for Bruno\'s weight management. After 2 months of weekly sessions, he\'s lost 8 lbs and his joints are noticeably better. The team is so caring and professional.',
  },
  {
    name: 'Alex Dubois',
    location: 'Ottawa, ON',
    dog: 'Koda — Lab Mix, 1yr',
    avatar: 'https://images.pexels.com/photos/5482854/pexels-photo-5482854.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    rating: 5,
    text: 'Got the 8-pack bundle and it was amazing value. Koda is a puppy tornado and these sessions channel all that energy so beautifully. The vaccine upload process was super smooth too.',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-brand-500 text-brand-500" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setIsLoading(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-brand-500 font-semibold text-sm uppercase tracking-[0.15em] mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Loved by <span className="text-gradient">Dogs & Owners</span>
          </h2>
          <p className="mt-6 text-lg text-dark-300 leading-relaxed">
            Don't just take our word for it. Here's what our community says about their ZoomieVan experience.
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? [...Array(6)].map((_, i) => <TestimonialSkeleton key={i} />)
            : testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-2xl border border-dark-600 bg-dark-800/50 p-6 hover:border-dark-500 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <Quote className="w-8 h-8 text-brand-500/20 mb-4" />
                  <StarRating rating={testimonial.rating} />
                  <p className="mt-4 text-dark-200 text-sm leading-relaxed flex-1">
                    "{testimonial.text}"
                  </p>
                  <div className="mt-6 pt-4 border-t border-dark-600 flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                      <p className="text-xs text-dark-400">{testimonial.location}</p>
                      <p className="text-xs text-brand-400">{testimonial.dog}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
