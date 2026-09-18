import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white border-t border-white/5 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-extrabold text-2xl tracking-tighter text-white font-['Syne'] uppercase mb-2">
            WEBSNAPE
          </span>
          <span className="text-xs text-[#8A8D93] font-mono tracking-widest uppercase">
            Websites • AI • Automation • Digital Systems
          </span>
        </div>
        
        <div className="text-[#8A8D93] text-xs flex flex-col md:flex-row items-center gap-6 font-medium">
          <a href="mailto:websnape.bussiness@gmail.com" className="hover:text-[#00F0FF] transition-colors flex items-center gap-1">
            websnape.bussiness@gmail.com <ArrowUpRight className="w-3 h-3" />
          </a>
          <a href="tel:8309790949" className="hover:text-[#00F0FF] transition-colors">
            +91 83097 90949
          </a>
          <span>© 2026 WebSnape. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
