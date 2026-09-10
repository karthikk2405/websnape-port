import React from 'react';
import { ArrowRight, Monitor, Smartphone, Layers, CheckCircle } from 'lucide-react';
import { EcosystemCanvas } from '../3d/EcosystemCanvas';

export const WhatWeBuildSection: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C87A4B] mb-2 block font-mono">
            ONE CONNECTED CAFÉ ECOSYSTEM
          </span>
          <h2 className="rynd-title text-4xl sm:text-6xl text-[#121212]">
            Two products.<br />
            <span className="gradient-text">One digital ecosystem.</span>
          </h2>
        </div>
        <p className="text-[#55544E] max-w-md text-base leading-relaxed font-medium">
          Everything your café guest sees and your barista team needs to move faster — designed as one considered high-performance experience.
        </p>
      </div>

      {/* Two Product Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Card 01: Web Services */}
        <div className="glass-panel p-8 md:p-10 relative overflow-hidden group hover:border-[#C87A4B]/40 transition-all duration-500">
          <div className="relative z-10 flex flex-col justify-between h-full min-h-[380px]">
            <div>
              <span className="text-xs font-mono text-[#C87A4B] tracking-wider uppercase mb-2 block font-bold">
                01 / CAFÉ WEB SERVICES
              </span>
              <h3 className="text-3xl font-extrabold text-[#121212] mb-4 tracking-tight">
                Be impossible<br />to scroll past.
              </h3>
              <p className="text-[#55544E] text-sm leading-relaxed max-w-sm mb-6">
                Modern, high-converting websites crafted around your café's story, local neighborhood, and signature coffee menu.
              </p>
              <ul className="space-y-2 text-xs text-[#121212] font-semibold mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C87A4B]" />
                  <span>Bespoke Visual Identity & Mobile Engineering</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C87A4B]" />
                  <span>High-Speed Performance & SEO Optimization</span>
                </li>
              </ul>
            </div>
            <a
              href="#services"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#121212] group-hover:text-[#C87A4B] transition-colors"
            >
              Explore Café Websites
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Interactive Browser Art Mockup */}
          <div className="absolute right-[-20px] bottom-[-20px] w-64 md:w-80 h-52 bg-[#121212] border border-black/20 rounded-xl shadow-2xl p-3 transform rotate-[-8deg] group-hover:rotate-[-2deg] group-hover:translate-y-[-10px] transition-all duration-500">
            <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff6f76]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffcf6b]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#7dffbb]" />
              <span className="text-[10px] text-[#9696a0] ml-2">ryndcafe.com</span>
            </div>
            <div className="bg-[#ECEAE2] text-[#121212] p-4 rounded-lg h-32 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold tracking-widest text-[#C87A4B] uppercase">EST. 2024</span>
                <p className="font-extrabold text-base leading-tight mt-1">Good food. Good energy.</p>
              </div>
              <div className="w-16 h-2 bg-[#C87A4B] rounded" />
            </div>
          </div>
        </div>

        {/* Card 02: Smart Ordering */}
        <div className="glass-panel p-8 md:p-10 relative overflow-hidden group hover:border-[#4A6B5D]/40 transition-all duration-500">
          <div className="relative z-10 flex flex-col justify-between h-full min-h-[380px]">
            <div>
              <span className="text-xs font-mono text-[#4A6B5D] tracking-wider uppercase mb-2 block font-bold">
                02 / SMART QR ORDERING SYSTEM
              </span>
              <h3 className="text-3xl font-extrabold text-[#121212] mb-4 tracking-tight">
                Less waiting.<br />More returning.
              </h3>
              <p className="text-[#55544E] text-sm leading-relaxed max-w-sm mb-6">
                Table QR code ordering that feels effortless for café guests and gives your barista team a calm real-time command center.
              </p>
              <ul className="space-y-2 text-xs text-[#121212] font-semibold mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#4A6B5D]" />
                  <span>Unique Table-Associated QR Codes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#4A6B5D]" />
                  <span>Real-Time Kitchen Screen & Dashboard</span>
                </li>
              </ul>
            </div>
            <a
              href="#ordering"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#121212] group-hover:text-[#4A6B5D] transition-colors"
            >
              Explore Smart Ordering
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Interactive Phone Art Mockup */}
          <div className="absolute right-6 bottom-[-20px] w-40 h-64 bg-[#141414] border-4 border-[#333] rounded-[24px] p-3 shadow-2xl transform rotate-[10deg] group-hover:rotate-[2deg] group-hover:translate-y-[-10px] transition-all duration-500">
            <div className="w-12 h-1.5 bg-[#333] rounded-full mx-auto mb-3" />
            <div className="bg-[#24201D] p-3 rounded-xl border border-[#C87A4B]/40">
              <span className="text-[10px] text-[#C87A4B] font-bold">Table 07 Active</span>
              <p className="text-xs font-bold text-white mt-1">Pistachio Oat Latte</p>
              <p className="text-[11px] text-[#7dffbb] mt-2 font-semibold">Order #1042 Sent ✓</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Ecosystem Connected Nodes */}
      <div className="glass-panel p-8 md:p-12 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto mb-6">
          <span className="text-xs font-mono text-[#4A6B5D] font-bold uppercase tracking-widest mb-1 block">
            INTERCONNECTED ARCHITECTURE
          </span>
          <h4 className="text-2xl font-extrabold text-[#121212]">
            From table scan to kitchen screen in milliseconds.
          </h4>
        </div>

        {/* 3D Nodes Canvas */}
        <EcosystemCanvas />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-black/10 text-left">
          <div className="p-4 rounded-xl bg-white border border-black/10">
            <div className="flex items-center gap-2 text-[#C87A4B] font-bold text-sm mb-1">
              <Smartphone className="w-4 h-4" />
              <span>Café Guest Scan</span>
            </div>
            <p className="text-xs text-[#55544E]">Guest scans table QR, views digital coffee & food menu, customizes order, and pays instantly.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-black/10">
            <div className="flex items-center gap-2 text-[#D46A43] font-bold text-sm mb-1">
              <Layers className="w-4 h-4" />
              <span>WebSnape Engine</span>
            </div>
            <p className="text-xs text-[#55544E]">Validates table identity, calculates totals, updates floorplan, and dispatches order live.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-black/10">
            <div className="flex items-center gap-2 text-[#4A6B5D] font-bold text-sm mb-1">
              <Monitor className="w-4 h-4" />
              <span>Barista & Kitchen Display</span>
            </div>
            <p className="text-xs text-[#55544E]">Kitchen screen chimes, displays exact items for Table 07, and updates customer status live.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
