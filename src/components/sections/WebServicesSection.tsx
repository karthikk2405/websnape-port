import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Globe, Layout, Smartphone } from 'lucide-react';

interface IndustryShot {
  title: string;
  category: string;
  tagline: string;
  description: string;
  bgGradient: string;
  highlight: string;
}

const SHOTS: IndustryShot[] = [
  {
    title: 'Artisanal Cafés & Roasteries',
    category: 'Coffee Shops, Bakeries & Espresso Bars',
    tagline: 'Menus, stories, and warm aesthetics that make guests want to visit before finishing scrolling.',
    description: 'High-converting café websites featuring online table reservations, seasonal coffee & pastry menus, smooth animations, and high-impact food photography.',
    bgGradient: 'from-[#2A1F1A] to-[#141210]',
    highlight: '#C87A4B'
  },
  {
    title: 'Fine Dining & Modern Restaurants',
    category: 'Bistros, Fine Dining & Gastropubs',
    tagline: 'Turn dining into a memorable event from online reservation to table checkout.',
    description: 'Bespoke restaurant websites with table booking integration, chef specials showcase, and wine pairing digital menus.',
    bgGradient: 'from-[#19241F] to-[#0D1411]',
    highlight: '#4A6B5D'
  },
  {
    title: 'Boutique Food & Retail Brands',
    category: 'Gourmet Shops, Confectionery & Goods',
    tagline: 'A tactile digital storefront for objects and treats worth discovering, collecting and coming back for.',
    description: 'Ultra-fast storefronts designed for smooth mobile browsing, sleek product galleries, instant cart checkout, and brand storytelling.',
    bgGradient: 'from-[#261E1A] to-[#14100E]',
    highlight: '#D46A43'
  }
];

const PREVIEW_PAGES: Record<string, { eyebrow: string; title: string; body: string; cta: string }> = {
  Home: {
    eyebrow: 'HOME / WELCOME',
    title: 'Good food. Good energy.',
    body: 'A warm place for slow mornings, artisanal coffee, and late-night conversations in the heart of the city.',
    cta: 'Explore Our Story'
  },
  Menu: {
    eyebrow: 'MENU / TODAY',
    title: 'Made fresh for the moment.',
    body: 'Hand-crafted sourdough panini, pistachio oat latte, cold brew, and house-made crostata.',
    cta: 'View Full Café Menu'
  },
  About: {
    eyebrow: 'ABOUT / OUR STORY',
    title: 'A little more local.',
    body: 'Founded in 2019 with a simple promise: exceptional local ingredients, warm light, and a reason to stay.',
    cta: 'Meet The Barista Team'
  },
  Gallery: {
    eyebrow: 'GALLERY / THE SPACE',
    title: 'Look around.',
    body: 'A visual glimpse of the corners, textures, wood grain, and warm atmosphere inside our cafe.',
    cta: 'View Photo Gallery'
  },
  Contact: {
    eyebrow: 'CONTACT / FIND US',
    title: 'Come say hello.',
    body: 'Open daily from 8:00 to 22:00. Located at 142 Artisan Avenue. Walk-ins always welcome.',
    cta: 'Get Directions'
  },
  Reservation: {
    eyebrow: 'RESERVATION / BOOK A TABLE',
    title: 'Your table awaits.',
    body: 'Planning a weekend brunch or evening dinner? Reserve your table online in seconds with instant confirmation.',
    cta: 'Confirm Table Booking'
  }
};

export const WebServicesSection: React.FC = () => {
  const [shotIndex, setShotIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Home');

  const currentShot = SHOTS[shotIndex];
  const currentPage = PREVIEW_PAGES[activeTab];

  return (
    <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C87A4B] mb-2 block">
            CAFÉ WEB SERVICES / PRODUCT 01
          </span>
          <h2 className="rynd-title text-4xl sm:text-6xl text-[#121212]">
            Your café deserves<br />
            <span className="gradient-text">more than a website.</span>
          </h2>
        </div>
        <p className="text-[#55544E] max-w-md text-base leading-relaxed font-medium">
          Strategy, bespoke design, and modern web engineering — without the agency theatre. A website your café can confidently grow into.
        </p>
      </div>

      {/* Industry Portfolio Carousel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-center">
        {/* Left Interactive Mockup Device */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-4 md:p-6 shadow-xl relative bg-white border-black/10">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/10 text-xs text-[#666560]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff6f76]" />
                <span className="w-3 h-3 rounded-full bg-[#ffcf6b]" />
                <span className="w-3 h-3 rounded-full bg-[#7dffbb]" />
              </div>
              <span className="font-mono bg-[#ECEAE2] px-3 py-1 rounded-full text-[#121212] font-semibold border border-black/10">
                https://demo.websnape.com/{currentShot.title.toLowerCase().replace(/ /g, '-')}
              </span>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#C87A4B]" />
              </div>
            </div>

            {/* Simulated Live Website Content */}
            <div className={`rounded-xl p-8 md:p-12 bg-gradient-to-br ${currentShot.bgGradient} min-h-[340px] flex flex-col justify-between border border-black/10 shadow-inner`}>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-white/70">
                  {currentShot.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight">
                  {currentShot.title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed max-w-lg mb-6">
                  {currentShot.tagline}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/15">
                <span
                  className="px-4 py-2 rounded-full font-bold text-xs bg-[#ECEAE2] text-[#121212] shadow-md inline-flex items-center gap-2"
                >
                  Explore Showcase Website →
                </span>
                <span className="text-xs text-white/70">100% Mobile Responsive</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Carousel Controls & Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-8 rounded-2xl bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C87A4B]">
                PORTFOLIO SHOWCASE 0{shotIndex + 1} / 03
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShotIndex((shotIndex - 1 + SHOTS.length) % SHOTS.length)}
                  className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:bg-[#ECEAE2] text-[#121212] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShotIndex((shotIndex + 1) % SHOTS.length)}
                  className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:bg-[#ECEAE2] text-[#121212] transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h4 className="text-2xl font-bold text-[#121212] mb-2">{currentShot.title}</h4>
            <p className="text-sm text-[#55544E] leading-relaxed mb-6 font-medium">
              {currentShot.description}
            </p>
            <div className="pt-4 border-t border-black/10 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentShot.highlight }} />
              <span className="text-xs text-[#121212] font-semibold">Custom design system included</span>
            </div>
          </div>

          {/* 5-Step Process Timeline */}
          <div className="glass-card p-6 rounded-2xl space-y-3 bg-white">
            <span className="text-xs font-mono font-bold uppercase text-[#4A6B5D] tracking-widest block">
              OUR 5-STEP DELIVERY PROCESS
            </span>
            <div className="grid grid-cols-5 gap-2 text-center text-[11px] pt-2">
              <div className="p-2 rounded bg-[#ECEAE2] border border-black/10">
                <strong className="block text-[#121212]">01 Discover</strong>
                <span className="text-[#666560]">Research</span>
              </div>
              <div className="p-2 rounded bg-[#ECEAE2] border border-black/10">
                <strong className="block text-[#121212]">02 Design</strong>
                <span className="text-[#666560]">Prototypes</span>
              </div>
              <div className="p-2 rounded bg-[#C87A4B] border border-[#C87A4B] text-white">
                <strong className="block text-white">03 Build</strong>
                <span className="text-white/80">Code</span>
              </div>
              <div className="p-2 rounded bg-[#ECEAE2] border border-black/10">
                <strong className="block text-[#121212]">04 Launch</strong>
                <span className="text-[#666560]">Deploy</span>
              </div>
              <div className="p-2 rounded bg-[#ECEAE2] border border-black/10">
                <strong className="block text-[#121212]">05 Grow</strong>
                <span className="text-[#666560]">Optimize</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Website Sandbox Browser */}
      <div className="glass-panel p-8 md:p-12 bg-white">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C87A4B] block mb-2 font-mono">
            INTERACTIVE BROWSER SANDBOX
          </span>
          <h3 className="rynd-title text-3xl sm:text-4xl text-[#121212]">
            Click tabs to test café website pages.
          </h3>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {Object.keys(PREVIEW_PAGES).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-[#121212] text-[#F7F5EF] shadow-md'
                  : 'bg-[#ECEAE2] hover:bg-[#E2DFC2] text-[#55544E] border border-black/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Browser Sandbox Frame */}
        <div className="max-w-4xl mx-auto bg-[#141414] border border-black/15 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-[#1C1C1C] px-4 py-3 border-b border-white/10 flex items-center justify-between text-xs text-[#9696a0]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff6f76]" />
              <span className="w-3 h-3 rounded-full bg-[#ffcf6b]" />
              <span className="w-3 h-3 rounded-full bg-[#7dffbb]" />
              <span className="ml-3 font-mono text-white/90">ryndcafe.com/{activeTab.toLowerCase()}</span>
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <Layout className="w-3.5 h-3.5" />
              <Smartphone className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="p-8 md:p-14 bg-[#ECEAE2] text-[#121212]">
            <span className="text-xs font-bold tracking-widest text-[#C87A4B] uppercase bg-[#121212] px-3.5 py-1 rounded-full text-[#F7F5EF] inline-block mb-4">
              {currentPage.eyebrow}
            </span>
            <h4 className="rynd-title text-4xl sm:text-5xl text-[#121212] mb-4">
              {currentPage.title}
            </h4>
            <p className="text-base text-[#44433E] max-w-xl mb-8 leading-relaxed font-medium">
              {currentPage.body}
            </p>
            <button className="bg-[#121212] text-[#F7F5EF] font-bold text-sm px-6 py-3 rounded-full hover:bg-[#C87A4B] transition-colors shadow-md">
              {currentPage.cta} →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
