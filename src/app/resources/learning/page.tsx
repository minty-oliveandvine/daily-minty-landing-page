'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GetStartedHeroSection from '@/components/get-started/Hero-Section';
import GuidesSection from '@/components/get-started/Guide-Section';
import SupportCardsSection from '@/components/get-started/SupportCardsSection';

export default function GetStartedPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <GetStartedHeroSection />
        <GuidesSection />
        <SupportCardsSection />
      </main>
      <Footer />
    </>
  );
}
