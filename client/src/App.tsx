import React from 'react';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import DemoZone from './components/DemoZone';
import Footer from './components/Footer';
import Squares from './components/Squares';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Modern animated background with squares */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Squares 
          direction="right"
          speed={0.5}
          borderColor="#271e37"
          squareSize={40}
          hoverFillColor="#222222"
        />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <DemoZone />
        <Features />
        <Footer />
      </div>
    </div>
  );
};

export default App;


