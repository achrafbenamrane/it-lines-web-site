import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import AboutTeam from '@/components/sections/AboutTeam';
import Contact from '@/components/sections/Contact';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import FinalCTA from '@/components/sections/FinalCTA';
import FloatingShapes from '@/components/FloatingShapes';
import ErrorBoundary from '@/components/ErrorBoundary';
import SEOHead from '@/components/SEOHead';
import PWAInstaller from '@/components/PWAInstaller';

export const metadata = {
  title: 'IT Lines - IT Consulting & Development Services',
  description: 'Empowering businesses with innovative IT solutions and expert consulting services for sustainable growth.',
};

export default function Home() {
  return (
    <ErrorBoundary>
      <SEOHead />
      <div className="overflow-x-hidden relative">
        <FloatingShapes />
        <main className="relative z-10">
          <Hero />
          <Services />
          <WhyChooseUs />
          <AboutTeam />
          <FinalCTA />
          <Contact />
        </main>
        <PWAInstaller />
      </div>
    </ErrorBoundary>
  );
}

