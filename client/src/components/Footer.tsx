import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mx-auto mt-16 max-w-6xl px-6 pb-12">
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="SVG Optima" className="h-8 w-8" />
            <div>
              <h3 className="text-xl font-semibold">SVG Optima</h3>
              <p className="mt-2 text-sm text-zinc-300">Fast, private, in‑browser SVG compression.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#demo" className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10">Try Optimizer</a>
            <a href="#learn" className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10">Learn More</a>
            <a href="#" className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10">Docs</a>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-zinc-300">
          <div>
            <p className="text-zinc-400">Product</p>
            <ul className="mt-2 space-y-1">
              <li><a href="#demo" className="hover:text-white">Optimizer</a></li>
              <li><a href="#learn" className="hover:text-white">Features</a></li>
            </ul>
          </div>
          <div>
            <p className="text-zinc-400">Resources</p>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-white">Docs</a></li>
              <li><a href="#" className="hover:text-white">GitHub</a></li>
            </ul>
          </div>
          <div>
            <p className="text-zinc-400">Company</p>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
          <div>
            <p className="text-zinc-400">Contact</p>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-white">support@svgoptimizer.app</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between text-zinc-400">
          <p className="text-sm">© 2025 SVGOptimizer. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Twitter" className="hover:text-white">TW</a>
            <a href="#" aria-label="GitHub" className="hover:text-white">GH</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


