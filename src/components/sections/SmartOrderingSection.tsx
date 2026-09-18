import React from 'react';
import { QrCode, Smartphone, Layers, ShoppingBag, Send, CheckCircle2, Zap, Utensils, Shield, Sparkles } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { CafeCanvas } from '../3d/CafeCanvas';

export const SmartOrderingSection: React.FC = () => {
  const { setActiveDemoView } = useDemo();

  const steps = [
    { icon: QrCode, title: '1. Scan Table QR', desc: 'Guest sits at Table 07 & scans table QR code.' },
    { icon: Smartphone, title: '2. Browse Menu', desc: 'Digital menu opens instantly without app download.' },
    { icon: Layers, title: '3. Customize', desc: 'Select options, extra shots & add-ons.' },
    { icon: ShoppingBag, title: '4. Review Cart', desc: 'Review items, subtotal & table number.' },
    { icon: Send, title: '5. Place Order', desc: 'Order is sent directly to the kitchen screen.' },
    { icon: CheckCircle2, title: '6. Live Status', desc: 'Staff accepts order & guest receives live progress.' }
  ];

  return (
    <section id="ordering" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00F0FF] mb-2 block">
          SMART ORDERING SYSTEM / PRODUCT 02
        </span>
        <h2 className="rynd-title text-5xl sm:text-7xl text-white mb-6">
          Scan. Order.<br />
          <span className="gradient-text">Done.</span>
        </h2>
        <p className="text-lg text-[#A9B1BD] leading-relaxed font-medium">
          Turn every table into an autonomous digital ordering point. No waiting for staff, no order entry errors, and direct real-time integration.
        </p>
      </div>

      {/* 3D Restaurant Table Scene Card */}
      <div className="glass-panel p-8 md:p-12 mb-20 relative overflow-hidden bg-white/5 border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.05)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 bg-[#00F0FF]/10 text-[#00F0FF] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#00F0FF]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship Hospitality Technology</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Hospitality without the bottleneck.
            </h3>
            <p className="text-sm text-[#8A8D93] leading-relaxed font-medium">
              Every table receives a unique, durable QR code. When scanned, the system automatically detects the table number (e.g. Table 07), loading the menu with zero friction.
            </p>
            <div className="pt-2 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs text-[#A9B1BD] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                <span>Instant kitchen screen dispatch</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#A9B1BD] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#0044FF]" />
                <span>Live order status tracking for guests</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#A9B1BD] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span>Live menu availability & price updates</span>
              </div>
            </div>
            <div className="pt-4">
              <a
                href="#lab"
                onClick={() => setActiveDemoView('customer')}
                className="inline-flex items-center gap-2 bg-white text-[#0A0A0C] font-bold text-sm px-6 py-3 rounded-full hover:bg-[#00F0FF] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all"
              >
                Try Live Ordering Demo →
              </a>
            </div>
          </div>

          {/* Right 3D Model Column */}
          <div className="lg:col-span-7 relative w-full flex items-center justify-center">
            <div className="sketchfab-embed-wrapper w-full relative" style={{ aspectRatio: '4/3' }}>
              <iframe 
                title="Street cafe objects" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; fullscreen; xr-spatial-tracking" 
                xr-spatial-tracking="true" 
                execution-while-out-of-viewport="true" 
                execution-while-not-rendered="true" 
                web-share="true" 
                src="https://sketchfab.com/models/c38ce78842634352a50b7e66c4408795/embed?autostart=1&ui_theme=dark&dnt=1"
                className="absolute inset-0 w-full h-full rounded-[28px] shadow-[0_0_40px_rgba(0,240,255,0.1)] border border-white/5"
              /> 
            </div>
          </div>
        </div>
      </div>

      {/* 6-Step Customer Journey Timeline */}
      <div className="mb-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00F0FF] mb-1 block">
            THE GUEST JOURNEY
          </span>
          <h3 className="text-3xl font-extrabold text-white">
            6 seamless steps from seat to service.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="glass-card p-5 rounded-xl border border-white/5 hover:border-[#00F0FF]/40 transition-all flex flex-col justify-between bg-white/5 group"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00F0FF] mb-4 group-hover:bg-[#00F0FF]/10 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-[#8A8D93] leading-relaxed">{step.desc}</p>
                </div>
                <span className="text-[10px] font-mono text-[#4A4B50] mt-4 block font-bold">STEP 0{index + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Value Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-8 bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 flex items-center justify-center mb-6">
            <Zap className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Faster Table Turnover</h4>
          <p className="text-sm text-[#8A8D93] leading-relaxed font-medium">
            Guests order as soon as they sit down without waiting for staff. Orders reach the table up to 6 minutes faster.
          </p>
        </div>

        <div className="glass-panel p-8 bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 flex items-center justify-center mb-6">
            <Shield className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Zero Order Misunderstandings</h4>
          <p className="text-sm text-[#8A8D93] leading-relaxed font-medium">
            Guests specify exact choices, modifier shots, and dietary notes directly, eliminating verbal mistakes.
          </p>
        </div>

        <div className="glass-panel p-8 bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 flex items-center justify-center mb-6">
            <Utensils className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Calm Kitchen Operations</h4>
          <p className="text-sm text-[#8A8D93] leading-relaxed font-medium">
            Kitchen staff receive incoming digital tickets categorized by table number with real-time status alerts.
          </p>
        </div>
      </div>
    </section>
  );
};
