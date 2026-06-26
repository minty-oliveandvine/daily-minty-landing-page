'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactHero from '@/components/contact/ContactHero';
import ContactFormSection from '@/components/contact/ContactFormSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F9FBFC]">
      <Navbar />
      <main>
        <ContactHero />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
}
