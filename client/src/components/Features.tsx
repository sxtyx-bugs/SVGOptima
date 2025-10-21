import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';
import SpotlightCard from './SpotlightCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const Features: React.FC = () => {
  return (
    <section id="learn" className="mx-auto mt-14 max-w-6xl px-6">
      <SpotlightCard className="p-6 mb-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
        <FeatureCard
          icon={(
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          )}
          title="Ultra-Fast Compression"
          text="Optimized algorithms process large SVGs instantly."
        />
        <FeatureCard
          icon={(
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          )}
          title="Zero Data Storage"
          text="Your files never leave your browser — total privacy guaranteed."
        />
        <FeatureCard
          icon={(
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          )}
          title="Enterprise Ready"
          text="Built for design teams, agencies, and dev pipelines."
        />
      </motion.div>
      </SpotlightCard>
    </section>
  );
};

export default Features;


