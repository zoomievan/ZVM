import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, CheckCircle2, HeartPulse, ShieldCheck, Snowflake, Truck } from 'lucide-react';

const principles = [
  'Dog-led movement, never forced running',
  'One-on-one supervised sessions',
  'Climate-controlled comfort year-round',
  'Workouts adapted to age, breed, energy, and goals',
];

const safetyNotes = [
  {
    icon: ShieldCheck,
    title: 'Controlled environment',
    text: 'A session can be paused, shortened, or stopped when a handler believes continuing is not right for the dog.',
  },
  {
    icon: HeartPulse,
    title: 'Personalized pace',
    text: 'The goal is a positive outlet, not a race. Sessions are shaped around comfort, stamina, and confidence.',
  },
  {
    icon: Snowflake,
    title: 'Weather-independent',
    text: 'The van is climate-controlled, so exercise is less dependent on rain, snow, heat, or crowded parks.',
  },
];

export default function AboutPage() {
  return (
    <main className="public-site min-h-screen overflow-hidden bg-[#071A3D] pt-28">
      <section className="relative px-4 pb-14 pt-4 sm:px-6 lg:px-8 lg:pb-20">
        <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-brand-500/22 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#1557B7]/42 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F3D91] shadow-sm">
              About ZoomieVan
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Mobile canine fitness, built around your dog.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/78">
              ZoomieVan Inc. brings professional canine fitness directly to your home with
              fully equipped mobile fitness vans. Our mission is to help dogs live healthier,
              happier, and more active lives through convenient, supervised exercise.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/#book-now"
                className="keep-white inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-600"
              >
                Find a session
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/coverage"
                className="inline-flex items-center justify-center rounded-2xl border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/18"
              >
                Check coverage
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="friendly-card overflow-hidden rounded-3xl bg-white"
          >
            <img
              src="/images/about-bg.jpg"
              alt="A happy dog near a ZoomieVan mobile fitness setup"
              className="h-72 w-full object-cover sm:h-96"
            />
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              {principles.map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-2xl bg-[#F7FBFF] p-3 text-sm font-bold text-[#071A3D]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-white px-4 py-14 text-[#071A3D] sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <span className="mb-3 inline-flex rounded-full bg-[#FFF7ED] px-4 py-2 text-sm font-bold text-brand-700">
              Why a slat mill?
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              It moves when your dog moves.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#315B96]">
              A slat mill is a non-motorized treadmill designed for dogs. Unlike a motorized
              treadmill, the belt is not powered by a machine. Your dog controls the movement,
              the speed, and the stop. That makes the experience more natural and easier to
              shape around each dog's comfort.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {safetyNotes.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-[#D6E6FF] bg-[#F7FBFF] p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#0F3D91]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#315B96]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="keep-white rounded-3xl bg-[#071A3D] p-7 text-white sm:p-9">
            <div className="mb-5 inline-flex rounded-2xl bg-white/10 p-3 text-[#ffcf8a]">
              <Truck className="h-7 w-7" />
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              Fitness that fits your schedule.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/76">
              No driving. No waiting. No crowded facilities. ZoomieVan comes directly to your
              home, making it easier to give your dog a structured outlet while keeping your day intact.
            </p>
          </div>

          <div className="friendly-card rounded-3xl bg-white p-6 text-[#071A3D]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF7ED] text-brand-600">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl font-bold">Built for health. Born to zoom.</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#315B96]">
              By combining expert care, premium equipment, and personalized exercise programs,
              ZoomieVan makes canine fitness more accessible for dogs and easier for owners.
            </p>
            <Link
              to="/#how-it-works"
              className="mt-5 inline-flex items-center gap-2 text-sm font-black text-brand-600 hover:text-brand-700"
            >
              See how it works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
