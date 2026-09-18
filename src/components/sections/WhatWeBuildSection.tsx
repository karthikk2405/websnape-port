import React from 'react';
import { CafeCanvas } from '../3d/CafeCanvas';

export const WhatWeBuildSection: React.FC = () => {
  const steps = [
    { title: 'IDEA', desc: 'Strategy & Architecture' },
    { title: 'DESIGN', desc: 'UX/UI & 3D Visualization' },
    { title: 'DEVELOPMENT', desc: 'React, Node, & WebGL' },
    { title: 'AUTOMATION', desc: 'Systems & Workflows' },
    { title: 'DEPLOYMENT', desc: 'Cloud & Infrastructure' },
    { title: 'GROWTH', desc: 'SEO & Analytics' },
  ];

  return (
    <section id="work" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/5">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#00F0FF] mb-4 block font-mono">
          THE WEBSNAPE PROCESS
        </span>
        <h2 className="rynd-title text-4xl sm:text-6xl text-white mb-6">
          How we build <span className="gradient-text">the future.</span>
        </h2>
        <p className="text-[#A9B1BD] text-lg leading-relaxed font-medium">
          A seamless, end-to-end digital engineering pipeline designed to turn ambitious concepts into high-performance realities.
        </p>
      </div>

      {/* 3D Horizontal Pipeline */}
      <div className="relative w-full rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.05)]">
        
        {/* The 3D Canvas - Full Width Local Model */}
        <div className="w-full border-b border-white/5 relative">
          <CafeCanvas className="w-full h-[400px] md:h-[500px] bg-transparent cursor-grab active:cursor-grabbing" />
        </div>

        {/* The Text Labels */}
        <div className="grid grid-cols-2 md:grid-cols-6 divide-x divide-y md:divide-y-0 divide-white/5 bg-[#0A0A0C]/80">
          {steps.map((step, idx) => (
            <div key={step.title} className="p-6 text-center group hover:bg-white/5 transition-colors">
              <span className="text-[10px] font-mono text-[#8A8D93] mb-2 block">0{idx + 1}</span>
              <h4 className="text-white font-bold tracking-widest text-sm mb-1 group-hover:text-[#00F0FF] transition-colors">{step.title}</h4>
              <p className="text-xs text-[#8A8D93]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
