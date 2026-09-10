import React from 'react';
import { ArrowRight, Sparkles, QrCode, CheckCircle2, ShieldCheck } from 'lucide-react';
import { HeroOrbCanvas } from '../3d/HeroOrbCanvas';
import { useDemo } from '../../context/DemoContext';

export const HeroSection: React.FC = () => {
  const { setActiveDemoView } = useDemo();

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden bg-[#ECEAE2]">
      {/* 3D WebGL Globe Canvas */}
      <HeroOrbCanvas />

      {/* Floating Badge 1 - Left */}
      <div className="hidden lg:block absolute left-8 top-1/3 z-10 animate-float" style={{ animationDelay: '0s' }}>
        <div className="glass-panel p-4 max-w-[240px] shadow-xl border-black/10">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C87A4B] animate-ping" />
            <strong className="text-[#121212] text-xs font-bold uppercase tracking-wider">New order received</strong>
          </div>
          <p className="text-sm font-extrabold text-[#121212]">Table 07 · ₹784</p>
          <div className="flex items-center gap-1.5 text-[11px] text-[#4A6B5D] font-bold mt-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Sent to Kitchen Screen</span>
          </div>
        </div>
      </div>

      {/* Floating Badge 2 - Right Top */}
      <div className="hidden lg:block absolute right-10 top-1/4 z-10 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="glass-panel p-4 max-w-[220px] shadow-xl border-black/10">
          <div className="flex items-center justify-between mb-2">
            <strong className="text-[#121212] text-xs font-bold">websnape.menu</strong>
            <span className="text-[10px] bg-[#C87A4B]/15 text-[#C87A4B] font-bold px-2 py-0.5 rounded-full">QR Ready</span>
          </div>
          <div className="w-12 h-12 bg-[#121212] rounded-lg border border-black/20 flex items-center justify-center mb-1">
            <QrCode className="w-7 h-7 text-[#ECEAE2]" />
          </div>
          <span className="text-[11px] text-[#666560]">Scan table QR to view menu</span>
        </div>
      </div>

      {/* Floating Badge 3 - Right Bottom */}
      <div className="hidden lg:block absolute right-14 bottom-1/4 z-10 animate-float" style={{ animationDelay: '3s' }}>
        <div className="glass-panel p-4 max-w-[210px] shadow-xl border-black/10">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#4A6B5D]" />
            <span className="text-[#4A6B5D] font-bold text-xs">Barista Status</span>
          </div>
          <p className="text-sm font-extrabold text-[#121212]">Order #1042 · Ready</p>
          <p className="text-[11px] text-[#666560] mt-0.5">Table 07 served in 6 mins</p>
        </div>
      </div>

      {/* Center Copy Container */}
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-black/10 backdrop-blur-md mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C87A4B]" />
          <span className="text-xs font-extrabold tracking-widest text-[#C87A4B] uppercase">
            DIGITAL SYSTEMS FOR CAFÉS & RESTAURANTS
          </span>
        </div>

        {/* Main RYND Editorial Headline */}
        <h1 className="rynd-title text-[#F7F5EF] text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight mb-6 drop-shadow-xl">
          Make your café<br />
          <span className="gradient-text-coffee">feel alive.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-[#44433E] max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          WebSnape builds cinematic 3D websites and connected smart QR table ordering experiences designed specifically for ambitious cafés, restaurants, and food venues.
        </p>

        {/* Hero CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#121212] text-[#F7F5EF] font-bold text-base px-8 py-4 rounded-full shadow-[0_10px_30px_rgba(18,18,18,0.2)] hover:bg-[#C87A4B] hover:shadow-[0_12px_40px_rgba(200,122,75,0.4)] hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Explore Café Systems
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#lab"
            onClick={() => setActiveDemoView('customer')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white border border-black/15 text-[#121212] font-bold text-base px-8 py-4 rounded-full shadow-sm transition-all duration-200"
          >
            Open demo laboratory →
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-8 border-t border-black/10 flex flex-wrap items-center justify-center gap-8 text-xs text-[#55544E] font-semibold">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#4A6B5D]" />
            <span>Zero App Download for Guests</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C87A4B]" />
            <span>Instant Kitchen & Barista Sync</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4A6B5D]" />
            <span>Table QR Code Generator</span>
          </div>
        </div>
      </div>
    </section>
  );
};
