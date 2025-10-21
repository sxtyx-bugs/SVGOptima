import React from 'react';

type GlassPanelProps = {
  className?: string;
  children: React.ReactNode;
};

const GlassPanel: React.FC<GlassPanelProps> = ({ className = '', children }) => {
  const base =
    'rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_10px_60px_rgba(0,0,0,0.35)] backdrop-filter';
  return <div className={`${base} ${className}`.trim()}>{children}</div>;
};

export default GlassPanel;


