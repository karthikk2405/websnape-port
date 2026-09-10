import React from 'react';
import { DemoProvider } from './context/DemoContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { WhatWeBuildSection } from './components/sections/WhatWeBuildSection';
import { WebServicesSection } from './components/sections/WebServicesSection';
import { SmartOrderingSection } from './components/sections/SmartOrderingSection';
import { SEOSection } from './components/sections/SEOSection';
import { DemoLaboratorySection } from './components/sections/DemoLaboratorySection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/Footer';
import { FloatingRocketTour } from './components/FloatingRocketTour';

export const App: React.FC = () => {
  return (
    <DemoProvider>
      <div className="min-h-screen bg-[#ECEAE2] text-[#121212] relative selection:bg-[#C87A4B] selection:text-white">
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
          <SEOSection />
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
