import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mx-auto mt-16 max-w-6xl px-6 pb-8">
      <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-6 py-5 text-zinc-400 backdrop-blur">
        <p className="text-sm">© 2025 SVGOptimizer. All rights reserved.</p>
        <nav className="flex items-center gap-4 text-sm">
          <a href="#" className="transition hover:text-white">Privacy Policy</a>
          <a href="#" className="transition hover:text-white">Docs</a>
          <a href="#" className="transition hover:text-white">GitHub</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;


