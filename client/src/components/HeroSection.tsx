import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import './SvgMaskEffect.css';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLHeadingElement | null>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--x', `${x}px`);
    el.style.setProperty('--y', `${y}px`);

    const m = maskRef.current;
    if (m) {
      const mr = m.getBoundingClientRect();
      const mx = e.clientX - mr.left;
      const my = e.clientY - mr.top;
      m.style.setProperty('--mask-x', `${mx}px`);
      m.style.setProperty('--mask-y', `${my}px`);
    }
  };

  return (
    <section ref={sectionRef} onMouseMove={handleMouseMove} className="relative mx-auto max-w-6xl px-6 pt-24 text-center text-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-[#0b0714] to-black" />
      <SpotlightCard className="p-12" spotlightColor="rgba(255, 255, 255, 0.08)">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="mx-auto mb-6 flex items-center justify-center gap-3">
            <img src="/logo.svg" alt="SVG Optima" className="h-10 w-10" />
            <span className="text-2xl font-semibold">SVG Optima</span>
          </div>
          <div className="mask-wrap">
            <h1 className="font-neue text-4xl font-medium leading-tight sm:text-6xl md:text-7xl opacity-20">
              Optimize SVGs. Preserve Privacy. Accelerate Performance.
            </h1>
            <h1 ref={maskRef} className="font-neue text-4xl font-medium leading-tight sm:text-6xl md:text-7xl mask-reveal">
              Optimize SVGs. Preserve Privacy. Accelerate Performance.
            </h1>
          </div>
          <p className="font-europa mx-auto mt-4 max-w-2xl text-base text-zinc-300 sm:text-lg">
            Compress massive vector files in seconds — processed entirely on your device.
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
      <div className="cursor-glow" />
    </section>
  );
};

export default HeroSection;


