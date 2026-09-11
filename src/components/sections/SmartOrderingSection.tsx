import React from 'react';
import { QrCode, Smartphone, Layers, ShoppingBag, Send, CheckCircle2, Zap, Utensils, Shield, Sparkles } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const SmartOrderingSection: React.FC = () => {
  const { setActiveDemoView } = useDemo();

  const steps = [
    { icon: QrCode, title: '1. Scan Table QR', desc: 'Guest sits at Table 07 & scans table QR code.' },
    { icon: Smartphone, title: '2. Browse Menu', desc: 'Digital café menu opens instantly without app download.' },
    { icon: Layers, title: '3. Customize', desc: 'Select milk options, extra shots & pastry add-ons.' },
    { icon: ShoppingBag, title: '4. Review Cart', desc: 'Review items, subtotal & table number.' },
    { icon: Send, title: '5. Place Order', desc: 'Order is sent directly to the barista & kitchen screen.' },
    { icon: CheckCircle2, title: '6. Live Status', desc: 'Barista accepts order & guest receives live progress.' }
  ];

  return (
    <section id="ordering" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10 relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C87A4B] mb-2 block">
          SMART ORDERING SYSTEM / PRODUCT 02
        </span>
        <h2 className="rynd-title text-5xl sm:text-7xl text-[#121212] mb-6">
          Scan. Order.<br />
          <span className="gradient-text-coffee">Done.</span>
        </h2>
        <p className="text-lg text-[#55544E] leading-relaxed font-medium">
          Turn every café table into an autonomous digital ordering point. No waiting for staff, no order entry errors, and direct real-time barista integration.
        </p>
      </div>

      {/* 3D Restaurant Table Scene Card */}
      <div className="glass-panel p-8 md:p-12 mb-20 relative overflow-hidden bg-white border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 bg-[#C87A4B]/15 text-[#C87A4B] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#C87A4B]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship Hospitality Technology</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#121212] tracking-tight">
              Hospitality without the bottleneck.
            </h3>
            <p className="text-sm text-[#55544E] leading-relaxed font-medium">
              Every café table receives a unique, durable QR code. When scanned, the system automatically detects the table number (e.g. Table 07), loading the café's menu with zero friction.
            </p>
            <div className="pt-2 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs text-[#121212] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#C87A4B]" />
                <span>Instant barista & kitchen screen dispatch</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#121212] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#4A6B5D]" />
                <span>Live order status tracking for guests</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#121212] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#D46A43]" />
                <span>Live menu availability & price updates</span>
              </div>
            </div>
            <div className="pt-4">
              <a
                href="#lab"
                onClick={() => setActiveDemoView('customer')}
                className="inline-flex items-center gap-2 bg-[#121212] text-[#F7F5EF] font-bold text-sm px-6 py-3 rounded-full hover:bg-[#C87A4B] shadow-md transition-all"
              >
                Try Live Ordering Demo →
              </a>
            </div>
          </div>

          {/* Right 3D Model Column */}
          <div className="lg:col-span-7 relative w-full flex items-center justify-center">
            <div className="sketchfab-embed-wrapper" style={{ position: 'relative', width: '100%', maxWidth: 600, aspectRatio: '4 / 3', borderRadius: 28, overflow: 'hidden', boxShadow: '0 12px 40px rgba(74,107,93,0.22), 0 2px 12px rgba(0,0,0,0.08)' }}>
              <iframe
                title="Cafe-Misti"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
                src="https://sketchfab.com/models/419c3293b0e54313be4b1f02845d606a/embed?autospin=0.2&autostart=1&ui_theme=dark&dnt=1&ui_infos=0&ui_controls=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0&ui_hint=0&ui_ar=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_fullscreen=0&ui_annotations=0&ui_vr=0&scrollwheel=0&transparent=1"
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
              {/* Overlays to hide Sketchfab attribution & branding */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 90, background: 'linear-gradient(to bottom, rgba(212,204,186,1) 0%, rgba(212,204,186,1) 30%, rgba(212,204,186,0.85) 60%, rgba(212,204,186,0) 100%)', pointerEvents: 'none', borderRadius: '28px 28px 0 0', zIndex: 2 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 80, background: 'linear-gradient(to top, rgba(212,204,186,1) 0%, rgba(212,204,186,1) 30%, rgba(212,204,186,0.85) 55%, rgba(212,204,186,0) 100%)', pointerEvents: 'none', borderRadius: '0 0 28px 28px', zIndex: 2 }} />
            </div>
          </div>
        </div>
      </div>

      {/* 6-Step Customer Journey Timeline */}
      <div className="mb-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#4A6B5D] mb-1 block">
            THE GUEST JOURNEY
          </span>
          <h3 className="text-3xl font-extrabold text-[#121212]">
            6 seamless steps from seat to coffee.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="glass-card p-5 rounded-xl border border-black/10 hover:border-[#C87A4B]/40 transition-all flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#ECEAE2] border border-black/10 flex items-center justify-center text-[#C87A4B] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#121212] mb-2">{step.title}</h4>
                  <p className="text-xs text-[#666560] leading-relaxed">{step.desc}</p>
                </div>
                <span className="text-[10px] font-mono text-[#666560] mt-4 block font-bold">STEP 0{index + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Value Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-8 bg-white border-black/10">
          <div className="w-12 h-12 rounded-xl bg-[#C87A4B]/15 text-[#C87A4B] flex items-center justify-center mb-6">
            <Zap className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-[#121212] mb-3">Faster Table Turnover</h4>
          <p className="text-sm text-[#55544E] leading-relaxed font-medium">
            Guests order as soon as they sit down without waiting for staff. Coffee and food reach the table up to 6 minutes faster.
          </p>
        </div>

        <div className="glass-panel p-8 bg-white border-black/10">
          <div className="w-12 h-12 rounded-xl bg-[#4A6B5D]/15 text-[#4A6B5D] flex items-center justify-center mb-6">
            <Shield className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-[#121212] mb-3">Zero Order Misunderstandings</h4>
          <p className="text-sm text-[#55544E] leading-relaxed font-medium">
            Guests specify exact coffee milk choices (oat, almond), syrup shots, and dietary notes directly, eliminating verbal mistakes.
          </p>
        </div>

        <div className="glass-panel p-8 bg-white border-black/10">
          <div className="w-12 h-12 rounded-xl bg-[#D46A43]/15 text-[#D46A43] flex items-center justify-center mb-6">
            <Utensils className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-[#121212] mb-3">Calm Barista Operations</h4>
          <p className="text-sm text-[#55544E] leading-relaxed font-medium">
            Barista and kitchen staff receive incoming digital tickets categorized by table number with audible status alerts.
          </p>
        </div>
      </div>
    </section>
  );
};
