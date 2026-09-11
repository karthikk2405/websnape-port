import React from 'react';
import { ArrowUp, Globe, Shield, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#E4E2DA] border-t border-black/10 pt-16 pb-12 text-[#666560]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <a href="#home" className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tighter text-[#121212] font-['Syne'] uppercase">
                WEBSNAPE
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#C87A4B] shadow-[0_0_12px_#C87A4B]" />
            </a>
            <p className="text-sm text-[#44433E] leading-relaxed">
              Digital experiences and connected smart QR ordering systems built for modern cafés, bakeries, restaurants, and local hospitality venues.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#121212]">
              <div className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:border-[#C87A4B] hover:text-[#C87A4B] transition-colors cursor-pointer bg-white">
                <Globe className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:border-[#4A6B5D] hover:text-[#4A6B5D] transition-colors cursor-pointer bg-white">
                <Zap className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:border-[#D46A43] hover:text-[#D46A43] transition-colors cursor-pointer bg-white">
                <Shield className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Offerings Col */}
          <div>
            <h4 className="text-[#121212] font-bold text-sm tracking-wider uppercase mb-4">
              Products & Systems
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-[#C87A4B] transition-colors">
                  Café & Restaurant Websites
                </a>
              </li>
              <li>
                <a href="#ordering" className="hover:text-[#C87A4B] transition-colors">
                  Smart QR Table Ordering
                </a>
              </li>
              <li>
                <a href="#lab" className="hover:text-[#C87A4B] transition-colors">
                  Barista & Kitchen Display
                </a>
              </li>
              <li>
                <a href="#lab" className="hover:text-[#C87A4B] transition-colors">
                  Café Table Floor Plan
                </a>
              </li>
              <li>
                <a href="#lab" className="hover:text-[#C87A4B] transition-colors">
                  Sales Analytics
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 className="text-[#121212] font-bold text-sm tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-[#121212] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#121212] transition-colors">
                  Hospitality Showcase
                </a>
              </li>
              <li>
                <a href="#lab" className="hover:text-[#121212] transition-colors">
                  Demo Laboratory
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#121212] transition-colors">
                  Studio Story
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#121212] transition-colors">
                  Start a Project
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Summary Col */}
          <div>
            <h4 className="text-[#121212] font-bold text-sm tracking-wider uppercase mb-4">
              Connect
            </h4>
            <p className="text-sm text-[#44433E] mb-2">
              Ready to give your café or restaurant a world-class digital experience?
            </p>
            <a href="mailto:websnape.services@gmail.com" className="text-sm font-bold text-[#C87A4B] hover:underline">websnape.services@gmail.com</a>
            <a href="tel:+918309790949" className="text-xs text-[#666560] mt-1 block hover:text-[#C87A4B] transition-colors">+91 83097 90949</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#44433E]">
            <span>© 2026 WebSnape Technologies Ltd. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="text-[#C87A4B] font-bold">Build better. Order smarter.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#121212] hover:text-[#C87A4B] transition-colors bg-white px-4 py-2 rounded-full border border-black/10 shadow-sm"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
