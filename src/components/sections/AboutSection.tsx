import React from 'react';
import { Award, Zap, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Editorial Heading Column */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C87A4B]">
            A STUDIO WITH A SHARP LENS
          </span>
          <h2 className="rynd-title text-4xl sm:text-6xl text-[#121212]">
            Built for the places<br />
            that make a <span className="gradient-text">city.</span>
          </h2>
          <p className="text-base text-[#55544E] leading-relaxed font-medium">
            WebSnape partners with café owners, head chefs, artisan roasters, and local hospitality teams who care about every detail. We engineer digital products that feel as thoughtful as the physical spaces they represent.
          </p>
          <div className="space-y-3 pt-2 text-sm text-[#121212] font-semibold">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C87A4B]" />
              <span>No slow generic templates — 100% custom engineered</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#4A6B5D]" />
              <span>Direct table-to-kitchen & barista QR synchronization</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#D46A43]" />
              <span>Continuous long-term support & performance monitoring</span>
            </div>
          </div>
        </div>

        {/* Right Values Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-panel p-6 bg-white border-black/10">
            <div className="w-10 h-10 rounded-xl bg-[#C87A4B]/15 text-[#C87A4B] flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#121212] text-lg mb-2">High Speed</h3>
            <p className="text-xs text-[#666560] leading-relaxed">
              Fast page loads under 0.6s and instant QR menu rendering with zero customer delay.
            </p>
          </div>

          <div className="glass-panel p-6 bg-white border-black/10">
            <div className="w-10 h-10 rounded-xl bg-[#4A6B5D]/15 text-[#4A6B5D] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#121212] text-lg mb-2">3D Aesthetics</h3>
            <p className="text-xs text-[#666560] leading-relaxed">
              Cinematic visual identity, warm glass materials, smooth animations, and high-impact typography.
            </p>
          </div>

          <div className="glass-panel p-6 bg-white border-black/10">
            <div className="w-10 h-10 rounded-xl bg-[#D46A43]/15 text-[#D46A43] flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#121212] text-lg mb-2">Precision</h3>
            <p className="text-xs text-[#666560] leading-relaxed">
              Table-level QR tracking ensures kitchen staff always know which table placed which order.
            </p>
          </div>

          <div className="glass-panel p-6 bg-white border-black/10">
            <div className="w-10 h-10 rounded-xl bg-[#121212]/10 text-[#121212] flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#121212] text-lg mb-2">Reliability</h3>
            <p className="text-xs text-[#666560] leading-relaxed">
              Built on modern edge infrastructure designed to handle weekend brunch rush without failing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
