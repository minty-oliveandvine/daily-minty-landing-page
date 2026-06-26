'use client';

import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FAQHero from '@/components/support/FaqHero';
import FAQCategories from '@/components/support/FaqCategories';
import FAQSupportSection from '@/components/support/FaqSupportSection';

export default function FAQPage() {
  const searchParams = useSearchParams();
  const openFaqId = searchParams.get('faqId');

  return (
    <div className="min-h-screen bg-[#F9FBFC]">
      <Navbar />
      <main>
        <FAQHero />
        <FAQCategories openId={openFaqId} />
        <FAQSupportSection />
      </main>
      <Footer />
    </div>
  );
}
