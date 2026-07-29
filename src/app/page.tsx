import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import OutcomeSection from '@/components/landing/OutcomeSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import HelpsYouSection from '@/components/landing/HelpsYouSection';
import DemoSection from '@/components/landing/DemoSection';
import KeepMeUpdatedSection from '@/components/landing/KeepMeUpdatedSection';
export const metadata: Metadata = {
  title: 'Daily Minty',
  description:
    'Daily Minty makes daily cash closing simple. Petty cash, bill payment, and Xero sync in one calm dashboard for small business owners.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DemoSection />
        <ProblemSection />
        <OutcomeSection />
        <HowItWorksSection />
        <HelpsYouSection />
        <KeepMeUpdatedSection />
      </main>
      <Footer />
      
    </>
  );
}
// 2026 - 2027