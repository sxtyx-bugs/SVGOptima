import React from 'react';
import { motion } from 'framer-motion';

// Note: This component assumes TailwindCSS is configured in your app build.
// Fonts: Add your licensed font files with @font-face in your global CSS, e.g.:
// @font-face { font-family: 'Neue Haas Grotesk Display Pro'; src: url('/fonts/NHaasGrotesk-65Md.woff2') format('woff2'); font-weight: 500 700; font-style: normal; font-display: swap; }
// @font-face { font-family: 'Europa Grotesk No 2 SH'; src: url('/fonts/EuropaGroteskNo2SH-Bold.woff2') format('woff2'); font-weight: 700; font-style: normal; font-display: swap; }

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function GlassPanel({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={[
      'rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl shadow-[0_10px_60px_rgba(0,0,0,0.35)]',
      className,
    ].join(' ')}>
      {children}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-24 text-center text-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <h1
          className="
            text-4xl leading-tight sm:text-6xl md:text-7xl
            font-[500]
          "
          style={{ fontFamily: 'Neue Haas Grotesk Display Pro, ui-sans-serif, system-ui' }}
        >
          Optimize SVGs. Preserve Privacy. Accelerate Performance.
        </h1>
        <p
          className="mt-4 text-base text-zinc-300 sm:text-lg"
          style={{ fontFamily: 'Europa Grotesk No 2 SH, ui-sans-serif, system-ui' }}
        >
          Compress massive vector files in seconds — without ever storing your data.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            Try Optimizer
          </a>
          <a
            href="#learn"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white/80 underline underline-offset-4 transition hover:text-white"
          >
            Learn More
          </a>
        </div>
      </motion.div>

      {/* Subtle background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute right-0 top-20 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <motion.div variants={item}>
      <GlassPanel className="p-6">
        <div className="mb-4 text-white/90">{icon}</div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-zinc-300">{text}</p>
      </GlassPanel>
    </motion.div>
  );
}

function Features() {
  return (
    <section id="learn" className="mx-auto mt-14 max-w-6xl px-6">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" className="text-white"><path fill="currentColor" d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z"/></svg>
          }
          title="Ultra‑Fast Compression"
          text="Optimized algorithms process large SVGs instantly."
        />
        <FeatureCard
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" className="text-white"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4Zm0 11.5l7-4.03v2.53c0 4.42-2.88 8.44-7 9.72c-4.12-1.28-7-5.3-7-9.72V8.47l7 4.03Z"/></svg>
          }
          title="Zero Data Storage"
          text="Your files never leave your browser — total privacy guaranteed."
        />
        <FeatureCard
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" className="text-white"><path fill="currentColor" d="M3 7h18v2H3V7Zm0 4h18v2H3v-2Zm0 4h18v2H3v-2Z"/></svg>
          }
          title="Enterprise Ready"
          text="Built for design teams, agencies, and dev pipelines."
        />
      </motion.div>
    </section>
  );
}

function DemoZone() {
  return (
    <section id="demo" className="mx-auto mt-16 max-w-6xl px-6">
      <GlassPanel>
        <div className="grid items-center gap-6 p-6 md:grid-cols-2">
          <div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-8 text-center text-zinc-300">
              <div className="mx-auto mb-3 h-20 w-20 rounded-full border border-white/10 bg-white/5" />
              <p className="font-medium text-white">Drop your SVGs here</p>
              <p className="text-sm text-zinc-400">Mock preview · drag & drop</p>
            </div>
          </div>
          <div className="text-zinc-300">
            <h3 className="text-xl font-semibold text-white">No uploads. No waiting.</h3>
            <p className="mt-2 text-sm">Just pure client‑side optimization. Your vectors remain yours.</p>
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}

function TrustedBy() {
  return (
    <section className="mx-auto mt-16 max-w-6xl px-6">
      <GlassPanel>
        <div className="flex flex-col items-center gap-6 px-6 py-10">
          <p className="text-center text-sm uppercase tracking-widest text-zinc-400">Trusted by leading design teams and enterprise developers</p>
          <div className="grid w-full grid-cols-2 gap-6 opacity-80 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex h-12 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-400">
                LOGO
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-16 max-w-6xl px-6">
      <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-6 py-5 text-zinc-400 backdrop-blur">
        <span>© 2025 SVGOptimizer. All rights reserved.</span>
        <nav className="flex items-center gap-4 text-sm">
          <a className="hover:text-white" href="#">Privacy Policy</a>
          <a className="hover:text-white" href="#">Docs</a>
          <a className="hover:text-white" href="#">GitHub</a>
        </nav>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute right-0 top-20 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
      </div>

      <HeroSection />
      <Features />
      <DemoZone />
      <TrustedBy />
      <Footer />
    </div>
  );
}


