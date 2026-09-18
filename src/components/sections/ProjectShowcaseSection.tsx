import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'DIGITAL EXPERIENCES',
    desc: 'Premium cinematic web applications designed for conversion and authority.',
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'SMART BUSINESS SYSTEMS',
    desc: 'Interactive business automation dashboards and autonomous workflows.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'CONNECTED COMMERCE',
    desc: 'QR ordering and seamless digital fulfillment ecosystems.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
  }
];

export const ProjectShowcaseSection: React.FC = () => {
  return (
    <section id="showcase" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#00F0FF] mb-4 block font-mono">
            PROJECT SHOWCASE
          </span>
          <h2 className="rynd-title text-4xl sm:text-6xl text-white mb-2">
            Selected <span className="text-[#8A8D93]">Works.</span>
          </h2>
        </div>
        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#00F0FF] transition-colors border-b border-[#00F0FF]/30 pb-1">
          View all case studies
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <div className="flex flex-col gap-12">
        {projects.map((project, idx) => (
          <div key={idx} className="group relative w-full aspect-[21/9] md:aspect-[21/7] rounded-3xl overflow-hidden bg-[#111114] border border-white/5 cursor-pointer">
            {/* Image Background */}
            <div className="absolute inset-0 z-0">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-10 p-8 md:p-16 flex flex-col justify-end">
              <span className="text-xs font-mono text-[#00F0FF] mb-3 block">0{idx + 1} // CASE STUDY</span>
              <h3 className="rynd-title text-3xl md:text-5xl text-white mb-4 group-hover:text-[#00F0FF] transition-colors">{project.title}</h3>
              <p className="text-[#A9B1BD] max-w-lg text-sm md:text-base">{project.desc}</p>
            </div>
            
            {/* Hover Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F0FF]/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};
