'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { getStartedContent } from '@/config/get-started';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GetStartedHeroSection from '@/components/get-started/Hero-Section';
import GuidesSection from '@/components/get-started/Guide-Section';
import GuidesSectionFaq from '@/components/get-started/GetStartedFaq';

export default function GetStartedPage() {
  const { hero, benefits } = getStartedContent;

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <GetStartedHeroSection />
        <GuidesSection />
        <GuidesSectionFaq />
      </main>
      <Footer />
    </>
  );
}
