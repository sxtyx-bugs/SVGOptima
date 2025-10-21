import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from './GlassPanel';

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, text }) => {
  return (
    <motion.div variants={item}>
      <GlassPanel className="p-6">
        <div className="mb-4 text-white/90">{icon}</div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-zinc-300">{text}</p>
      </GlassPanel>
    </motion.div>
  );
};

export default FeatureCard;


