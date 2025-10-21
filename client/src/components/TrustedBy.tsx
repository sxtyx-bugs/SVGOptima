import React from 'react';
import GlassPanel from './GlassPanel';

const TrustedBy: React.FC = () => {
  return (
    <section className="mx-auto mt-16 max-w-6xl px-6">
      <GlassPanel>
        <div className="flex flex-col items-center gap-6 px-6 py-10">
          <p className="text-center text-sm uppercase tracking-widest text-zinc-400">
            Trusted by leading design teams and enterprise developers
          </p>
          <div className="grid w-full grid-cols-2 gap-6 opacity-80 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex h-12 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-400"
              >
                LOGO
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </section>
  );
};

export default TrustedBy;


