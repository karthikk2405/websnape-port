import React from 'react';
import { Search, TrendingUp, BarChart3, Globe, Star, CheckCircle, ArrowRight, Zap, Eye, Target } from 'lucide-react';

const SEO_FEATURES = [
  {
    icon: Search,
    color: '#C87A4B',
    title: 'On-Page Keyword Optimization',
    desc: 'We optimize every page title, meta description, header tag and content block with search-intent keywords for your café or restaurant.',
  },
  {
    icon: Globe,
    color: '#4A6B5D',
    title: 'Local SEO & Google Business',
    desc: 'Dominate "café near me" searches. We set up and optimize your Google Business Profile, citations, and local schema markup.',
  },
  {
    icon: TrendingUp,
    color: '#D46A43',
    title: 'Content & Blog Strategy',
    desc: 'Monthly SEO blog posts targeting food, lifestyle and local keywords that bring organic traffic and build domain authority.',
  },
  {
    icon: BarChart3,
    color: '#C87A4B',
    title: 'Analytics & Monthly Reports',
    desc: 'Clear, jargon-free monthly reports showing your ranking positions, traffic growth, click-through rates, and conversion data.',
  },
  {
    icon: Zap,
    color: '#4A6B5D',
    title: 'Core Web Vitals & Speed',
    desc: 'We optimize your website load time and Core Web Vitals score — both critical Google ranking factors for 2025.',
  },
  {
    icon: Target,
    color: '#D46A43',
    title: 'Competitor Gap Analysis',
    desc: 'We audit your top local competitors and identify exactly which keywords and strategies you need to outrank them.',
  },
];

const RESULTS = [
  { label: 'Avg. Ranking Improvement', value: '#1–5', sub: 'local pack within 90 days' },
  { label: 'Organic Traffic Growth', value: '3x', sub: 'average in 6 months' },
  { label: 'Google Business Views', value: '+280%', sub: 'after profile optimization' },
];

export const SEOSection: React.FC = () => {
  return (
    <section id="seo" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10 relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C87A4B] mb-3 block">
          SEO MANAGEMENT / PRODUCT 03
        </span>
        <h2 className="rynd-title text-5xl sm:text-7xl text-[#121212] mb-6">
          Get found.<br />
          <span className="gradient-text-coffee">Stay found.</span>
        </h2>
        <p className="text-lg text-[#55544E] leading-relaxed font-medium">
          Your café could be serving 3× more customers — if they could find you online. WebSnape's SEO Management puts you at the top of Google for every relevant local search.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        {RESULTS.map((r, i) => (
          <div key={i} className="glass-panel p-8 text-center bg-white border-black/10 hover:border-[#C87A4B]/30 transition-all duration-300">
            <p className="text-5xl font-bold text-[#C87A4B] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{r.value}</p>
            <p className="text-sm font-bold text-[#121212] mb-1">{r.label}</p>
            <p className="text-xs text-[#666560]">{r.sub}</p>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {SEO_FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="glass-card p-6 rounded-2xl border border-black/10 bg-white group">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300"
                style={{ background: `${f.color}18` }}
              >
                <Icon className="w-6 h-6" style={{ color: f.color }} />
              </div>
              <h4 className="text-base font-bold text-[#121212] mb-2">{f.title}</h4>
              <p className="text-sm text-[#55544E] leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>

      {/* CTA Panel */}
      <div className="rounded-[22px] p-10 md:p-14 relative overflow-hidden" style={{ background: '#1a1a1a', color: '#fff', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 70px rgba(0,0,0,0.25)' }}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #C87A4B 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #4A6B5D 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-mono text-[#C87A4B] font-bold uppercase tracking-widest mb-3 block">
              FREE SEO AUDIT
            </span>
            <h3 className="rynd-title text-3xl sm:text-5xl text-white mb-4">
              See where you stand<br />
              <span className="gradient-text-coffee">in 24 hours.</span>
            </h3>
            <p className="text-[#a8a49c] text-sm leading-relaxed font-medium max-w-md">
              Submit your café website URL and we'll send a detailed, no-cost SEO audit report showing exactly what's holding you back from the top of Google.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              'Full keyword gap analysis vs. your competitors',
              'Technical SEO issues & Core Web Vitals score',
              'Local SEO profile rating & opportunities',
              'Priority action list to start ranking in 30 days',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#C87A4B] shrink-0 mt-0.5" />
                <span className="text-sm text-[#e0dcd4] font-medium">{item}</span>
              </div>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-2 bg-[#C87A4B] text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-[#D46A43] hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg w-fit"
            >
              Request Free SEO Audit
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
