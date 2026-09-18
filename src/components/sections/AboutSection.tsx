import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Abstract 3D Representation Placeholder (Node Mesh) */}
        <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-[#0A0A0C] border border-white/5 rounded-3xl overflow-hidden flex items-center justify-center group shadow-[0_0_50px_rgba(0,240,255,0.05)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0%,transparent_70%)]" />
          
          <div className="relative z-10 flex gap-8 items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-700">
            {/* Node 1 */}
            <div className="w-16 h-16 rounded-full bg-black border-2 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center animate-pulse-dot" style={{ animationDelay: '0s' }}>
               <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            {/* Node 2 */}
            <div className="w-24 h-24 rounded-full bg-black border-2 border-[#00F0FF]/40 shadow-[0_0_50px_rgba(0,240,255,0.4)] flex items-center justify-center animate-pulse-dot" style={{ animationDelay: '0.5s' }}>
               <div className="w-3 h-3 rounded-full bg-[#00F0FF]" />
            </div>
            {/* Node 3 */}
            <div className="w-16 h-16 rounded-full bg-black border-2 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center animate-pulse-dot" style={{ animationDelay: '1s' }}>
               <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
          
          {/* Luminous data paths */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />
          <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </div>

        {/* Copy */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#00F0FF] mb-4 block font-mono">
            THE ENGINE
          </span>
          <h2 className="rynd-title text-4xl sm:text-6xl text-white mb-8 tracking-tight">
            THREE MINDS.<br />
            <span className="text-[#8A8D93]">ONE DIGITAL ENGINE.</span>
          </h2>
          <p className="text-[#A9B1BD] text-lg leading-relaxed font-medium mb-10">
            Design, technology, and execution working together to turn ambitious ideas into real digital products. We are a specialized collective of engineers and designers building the next generation of the internet.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-[#00F0FF]" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-widest mb-1">UNCOMPROMISING QUALITY</h4>
                <p className="text-xs text-[#8A8D93] leading-relaxed">No templates. No bloated code. Every line of code and pixel is meticulously crafted for maximum performance and visual impact.</p>
              </div>
            </div>
          </div>

          <a href="#contact" className="mt-12 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#00F0FF] transition-colors border-b border-[#00F0FF]/30 pb-1">
            Work with us
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
