import React from 'react';
import { DemoProvider } from './context/DemoContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { WhatWeBuildSection } from './components/sections/WhatWeBuildSection';
import { WebServicesSection } from './components/sections/WebServicesSection';
import { SmartOrderingSection } from './components/sections/SmartOrderingSection';
import { ProjectShowcaseSection } from './components/sections/ProjectShowcaseSection';
import { DemoLaboratorySection } from './components/sections/DemoLaboratorySection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/Footer';
import { FloatingRocketTour } from './components/FloatingRocketTour';

export const App: React.FC = () => {
  return (
    <DemoProvider>
      <div className="min-h-screen bg-[#0A0A0C] text-white relative selection:bg-[#00F0FF] selection:text-black">
        {/* Floating rocket that tours around the site */}
        <FloatingRocketTour />

        {/* Sticky Glass Navbar */}
        <Navbar />

        {/* Main Sections */}
        <main>
          <HeroSection />
          <WhatWeBuildSection />
          <WebServicesSection />
          <SmartOrderingSection />
          <ProjectShowcaseSection />
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
