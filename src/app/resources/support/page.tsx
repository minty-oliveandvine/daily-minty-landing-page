'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FAQHero from '@/components/support/FaqHero';
import FAQCategories from '@/components/support/FaqCategories';
import FAQSupportSection from '@/components/support/FaqSupportSection';

function FAQContent() {
  const searchParams = useSearchParams();
  const openFaqId = searchParams.get('faqId');

  return (
    <main>
      <FAQHero />
      <FAQCategories openId={openFaqId} />
      <FAQSupportSection />
    </main>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#F9FBFC]">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
        <FAQContent />
      </Suspense>
      <Footer />
    </div>
  );
}
