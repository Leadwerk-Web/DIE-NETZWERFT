import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import TitleBand from './sections/TitleBand';
import SupportBand from './sections/SupportBand';
import ServiceGrid from './sections/ServiceGrid';
import CapabilityMatrix from './sections/CapabilityMatrix';
import ClientShowcase from './sections/ClientShowcase';
import PartnerSection from './sections/PartnerSection';
import ProcessSection from './sections/ProcessSection';
import TrustSection from './sections/TrustSection';
import RegionalSection from './sections/RegionalSection';
import CareerSection from './sections/CareerSection';
import FinalCTA from './sections/FinalCTA';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 0.7,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#F5F0EB' }}>
      <Navigation />
      <HeroSection />
      <TitleBand />
      <ServiceGrid />
      <CapabilityMatrix />
      <ProcessSection />
      <TrustSection />
      <ClientShowcase />
      <PartnerSection />
      <RegionalSection />
      <SupportBand />
      <CareerSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
