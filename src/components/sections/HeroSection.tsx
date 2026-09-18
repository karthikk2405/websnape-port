import React from 'react';
import { ArrowRight, Sparkles, Code2, Cpu, Globe } from 'lucide-react';
import { DigitalCoreCanvas } from '../3d/DigitalCoreCanvas';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-16 px-6 md:px-12 overflow-hidden bg-[#0A0A0C]">
      {/* 3D Digital Core Environment */}
      <div className="absolute inset-0 z-0">
        <DigitalCoreCanvas />
      </div>

      {/* Subtle overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/80 via-transparent to-[#0A0A0C] z-10 pointer-events-none" />

      {/* Center Copy Container */}
      <div className="relative z-20 max-w-5xl mx-auto text-center mt-20">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(0,240,255,0.1)] animate-fade-in-up">
          <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span className="text-xs font-extrabold tracking-widest text-[#00F0FF] uppercase">
            PREMIUM DIGITAL SOLUTIONS
          </span>
        </div>

        {/* Main RYND Editorial Headline */}
        <h1 className="rynd-title text-white text-5xl sm:text-7xl md:text-8xl lg:text-[140px] tracking-tighter mb-8 drop-shadow-2xl animate-fade-in-up delay-200">
          WE BUILD<br />
          <span className="gradient-text">WHAT'S NEXT.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl text-[#A9B1BD] max-w-3xl mx-auto mb-12 leading-relaxed font-medium animate-fade-in-up delay-300">
          Websites. AI. Automation. Digital systems built for ambitious businesses.
        </p>

        {/* Hero CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-400">
          <a
            href="#work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#0A0A0C] font-bold text-base px-10 py-5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-[#00F0FF] hover:text-[#0A0A0C] hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            EXPLORE OUR WORK
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-base px-10 py-5 rounded-full shadow-sm hover:border-[#00F0FF]/50 transition-all duration-300 backdrop-blur-sm"
          >
            START A PROJECT
          </a>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-1/2 -left-20 transform -translate-y-1/2 hidden xl:flex flex-col gap-8 opacity-40 animate-fade-in-up delay-500">
          <Globe className="w-8 h-8 text-[#00F0FF]" />
          <Code2 className="w-8 h-8 text-[#00F0FF]" />
        </div>
        <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 hidden xl:flex flex-col gap-8 opacity-40 animate-fade-in-up delay-500">
          <Cpu className="w-8 h-8 text-[#00F0FF]" />
          <div className="w-8 h-8 rounded-full border-2 border-[#00F0FF]" />
        </div>
      </div>
    </section>
  );
};
