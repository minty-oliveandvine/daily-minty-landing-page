import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import XeroMapping from '@/components/xero/XeroMapping';
import XeroGuideSection from '@/components/get-started/XeroGuideSection';
import GuidesSectionFaq from '@/components/get-started/GetStartedFaq';
import AnimatedContent from '@/animations/landing/heroanim';
import FadeContent from '@/animations/landing/fadeanim';
import { xeroIntegrationContent } from '@/config/xero-integration';

export const metadata: Metadata = {
  title: 'Xero Integration',
  description:
    'How Daily Minty connects to Xero — what syncs between the two, how to set it up, and how to manage the connection.',
  alternates: { canonical: '/resources/xero-integration' },
};

export default function XeroIntegrationPage() {
  const { hero, mapping } = xeroIntegrationContent;

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Entrance animations so arriving from "View details" eases in rather
            than snapping — same primitives the other pages' sections use. */}
        <AnimatedContent
          distance={60}
          direction="vertical"
          reverse={false}
          duration={0.7}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0}
        >
          <section className="bg-[#f3f9f7] py-12 md:py-16 text-center">
            <Container className="max-w-[1440px] px-4 md:px-6">
              <span className="inline-flex items-center gap-2 bg-[#D2EFE9] text-[#00A884] text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A884]" />
                {hero.eyebrow}
              </span>
              <h1 className="text-[32px] md:text-[44px] font-extrabold tracking-tight mb-3">
                <span className="text-[#2BA9E0]">{hero.titleAccent}</span>{' '}
                <span className="text-[#113B4A]">{hero.titleRest}</span>
              </h1>
              <p className="text-gray-500 text-sm md:text-base">{hero.subtitle}</p>
            </Container>
          </section>
        </AnimatedContent>

        <FadeContent blur={false} duration={1000} ease="ease-out" initialOpacity={0}>
          <section className="bg-white py-10 md:py-16">
            <Container className="max-w-[1440px] px-4 md:px-6">
              <h2 className="text-[#113B4A] text-[22px] sm:text-[26px] md:text-[28px] font-extrabold tracking-tight mb-8 md:mb-10">
                {mapping.title}
              </h2>
              <div className="mx-auto w-full max-w-[820px]">
                <XeroMapping
                  leftLabel={mapping.leftLabel}
                  rightLabel={mapping.rightLabel}
                  rows={mapping.rows}
                />
              </div>
            </Container>
          </section>
        </FadeContent>

        {/* Both moved here from /resources/learning. */}
        <XeroGuideSection />
        <GuidesSectionFaq />
      </main>
      <Footer />
    </>
  );
}
