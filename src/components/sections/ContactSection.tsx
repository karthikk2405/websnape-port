import React from 'react';
import { ArrowRight } from 'lucide-react';
import { DigitalCoreCanvas } from '../3d/DigitalCoreCanvas';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-16 px-6 md:px-12 overflow-hidden bg-[#0A0A0C]">
      {/* Background 3D Digital Core (Reused but zoomed/scaled differently if desired) */}
      <div className="absolute inset-0 z-0 opacity-60">
        <DigitalCoreCanvas />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent z-10 pointer-events-none" />

      {/* Center Copy Container */}
      <div className="relative z-20 max-w-4xl mx-auto text-center mt-20">
        <span className="text-xs font-bold uppercase tracking-widest text-[#00F0FF] mb-6 block font-mono">
          INITIATE SYSTEM
        </span>

        <h2 className="rynd-title text-white text-5xl sm:text-7xl md:text-8xl tracking-tighter mb-10 drop-shadow-2xl">
          YOUR IDEA.<br />
          <span className="gradient-text">BUILT INTO REALITY.</span>
        </h2>

        <a
          href="mailto:websnape.bussiness@gmail.com"
          className="inline-flex items-center justify-center gap-2 bg-white text-[#0A0A0C] font-bold text-base px-12 py-5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-[#00F0FF] hover:text-[#0A0A0C] hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          LET'S BUILD
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
