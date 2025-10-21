import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

const HeroSection: React.FC = () => {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-24 text-center text-white">
      <SpotlightCard className="p-8" spotlightColor="rgba(255, 255, 255, 0.15)">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <h1 className="font-neue text-4xl font-medium leading-tight sm:text-6xl md:text-7xl">
          Optimize SVGs. Preserve Privacy. Accelerate Performance.
        </h1>
        <p className="font-europa mx-auto mt-4 max-w-2xl text-base text-zinc-300 sm:text-lg">
          Compress massive vector files in seconds — without ever storing your data.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="#demo"
            className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Try Optimizer
          </a>
          <a href="#learn" className="text-sm text-zinc-300 underline underline-offset-4 hover:text-white">
            Learn More
          </a>
        </div>
      </motion.div>
      </SpotlightCard>

      {/* background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-12 left-1/3 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
      </div>
    </section>
  );
};

export default HeroSection;


