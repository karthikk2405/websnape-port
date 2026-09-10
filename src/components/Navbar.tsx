import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setActiveDemoView } = useDemo();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Web Services', href: '#services' },
    { label: 'Smart Ordering System', href: '#ordering' },
    { label: 'SEO Management', href: '#seo' },
    { label: 'Demo Sandbox', href: '#lab' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#ECEAE2]/90 backdrop-blur-xl border-b border-black/10 py-3.5 shadow-md'
          : 'bg-transparent py-5 border-b border-black/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="font-extrabold text-2xl tracking-tighter text-[#121212] font-['Syne'] uppercase">
            WEBSNAPE
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#C87A4B] shadow-[0_0_12px_#C87A4B] group-hover:scale-125 transition-transform duration-300" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-[13px] font-semibold text-[#55544E]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-[#121212] transition-colors py-1 relative group whitespace-nowrap"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C87A4B] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#lab"
            onClick={() => setActiveDemoView('customer')}
            className="text-xs uppercase tracking-wider font-bold text-[#C87A4B] border border-[#C87A4B]/40 px-3.5 py-1.5 rounded-full hover:bg-[#C87A4B]/10 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Live Café Demo
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden text-[#121212] p-2 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#ECEAE2]/98 backdrop-blur-2xl border-b border-black/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-lg font-bold text-[#121212] py-2"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 border-t border-black/10 flex flex-col gap-3">
            <a
              href="#lab"
              onClick={() => {
                setActiveDemoView('customer');
                setMobileOpen(false);
              }}
              className="w-full text-center text-sm font-bold text-[#C87A4B] border border-[#C87A4B]/40 py-3 rounded-full"
            >
              Open Live Café Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
