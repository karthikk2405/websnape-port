import React from 'react';
import { DemoProvider } from './context/DemoContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { WhatWeBuildSection } from './components/sections/WhatWeBuildSection';
import { WebServicesSection } from './components/sections/WebServicesSection';
import { SmartOrderingSection } from './components/sections/SmartOrderingSection';
import { DemoLaboratorySection } from './components/sections/DemoLaboratorySection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <DemoProvider>
      <div className="min-h-screen bg-[#050505] text-[#f6f6f4] relative selection:bg-[#4deaff] selection:text-black">
        {/* Sticky Glass Navbar */}
        <Navbar />

        {/* Main Sections */}
        <main>
          <HeroSection />
          <WhatWeBuildSection />
          <WebServicesSection />
          <SmartOrderingSection />
          <DemoLaboratorySection />
          <AboutSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </DemoProvider>
  );
};

export default App;
