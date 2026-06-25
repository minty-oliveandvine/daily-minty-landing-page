'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingHero from '@/components/pricing-components/PricingHero';
import PricingGrid from '@/components/pricing-components/PricingGrid';
import PricingFAQSupport from '@/components/pricing-components/PricingFaq';

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFC]">
      <Navbar />
      <main className="flex-grow pt-6 md:pt-10 pb-24 font-sans">
        <PricingHero />
        <PricingGrid />
        <PricingFAQSupport />
      </main>
      <Footer />
    </div>
  );
}

{/* ggg
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PricingPage() {
  // Track which plan card is actively clicked/selected
  const [selectedPlan, setSelectedPlan] = useState<string>('super-minty');

  const pricingPlans = [
    {
      id: 'petty-cash',
      title: 'Petty Cash',
      description: 'Track every dollar in and out of the till — receipts, floats, and daily reconciliation.',
      illustrationSrc: '/assets/deployed-assets/sub-petty-cash.png',
      crossedText: 'HKD 280/mo',
      currentPrice: 'Free',
      subText: 'per shop, billed monthly\nSingle service subscription.',
      trialText: 'Free trial for the first 30 days, then HKD 280/mo.',
      features: [
        'Daily petty cash',
        'Cash flow & PDF report',
        'Xero sync (cash entries)',
        'Team invites & roles'
      ],
      isPopular: false,
    },
    {
      id: 'bill-payment',
      title: 'Bill Payment',
      description: 'Schedule supplier bills, log payments, and never miss a due date.',
      illustrationSrc: '/assets/deployed-assets/sub-bill-payment.png', 
      crossedText: 'HKD 280/mo',
      currentPrice: 'Free',
      subText: 'per shop, billed monthly\nSingle service subscription.',
      trialText: 'Free trial for the first 30 days, then HKD 280/mo.',
      features: [
        'Bill scheduling & reminder',
        'Supplier & vendor directory',
        'Payment logging & proof upload',
        'Payables & PDF reports',
        'Xero sync (bills & payments)',
        'Team invites & roles'
      ],
      isPopular: false,
    },
    {
      id: 'super-minty',
      title: 'Super Minty',
      description: 'Both services, one bill — add the second for just HKD 120 more.',
      illustrationSrc: '/assets/deployed-assets/sub-super-minty.png',
      crossedText: 'HKD 400/mo',
      currentPrice: 'Free',
      subText: 'Petty Cash + Bill Payment, billed monthly.',
      trialText: 'Free trial for the first 30 days, then HKD 400/mo.',
      features: [
        'Everything from Petty Cash',
        'Everything from Bill Payment',
        'Xero sync (full)',
        'Multi-shop management',
        'Team invites & roles'
      ],
      isPopular: true,
      badgeText: 'Best Value'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFC]">
      <Navbar />

      <main className="flex-grow pt-6 md:pt-10 pb-24 font-sans">
        <Container>
          
          <section className="relative bg-[#00CBB0] rounded-[32px] px-6 py-10 md:p-16 text-white overflow-hidden lg:overflow-visible mb-12 md:mb-16 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 max-w-[550px]">
                <h1 className="text-[32px] md:text-[48px] font-extrabold tracking-tight leading-tight mb-3">
                  Minty Pricing Plans
                </h1>
                <p className="text-white/90 text-sm md:text-base max-w-[480px]">
                  One subscription. Every daily-closing tool you need.
                </p>
              </div>

              <div className="lg:col-span-5 flex justify-center md:justify-end md:pr-8 lg:pr-0 lg:absolute lg:right-12 lg:bottom-[-45px] w-full max-w-[200px] md:max-w-[240px] lg:w-[320px] mx-auto lg:mx-0 pointer-events-none z-20">
                <Image
                  src="/assets/deployed-assets/minty-hero-cat.png"
                  alt="Minty Superhero Mascot"
                  width={320}
                  height={320}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
                />
              </div>
            </div>
          </section>


          <div className="flex justify-center mb-12">
            <span className="bg-white border border-gray-100 text-[#113B4A] text-[13px] font-bold px-6 py-2.5 rounded-full shadow-sm tracking-wide">
              Subscription Types
            </span>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mb-16">
            {pricingPlans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              
              return (
                <div 
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`bg-white border rounded-[24px] p-6 md:p-8 flex flex-col justify-between transition-all duration-200 cursor-pointer relative ${
                    isSelected 
                      ? 'border-[#00CBB0] shadow-[0_12px_36px_rgba(0,203,176,0.08)] scale-[1.01]' 
                      : 'border-gray-200/70 shadow-[0_4px_24px_rgba(17,59,74,0.02)] hover:border-gray-300'
                  }`}
                >
                  <div>

                    <div className="bg-[#F5F8F9] rounded-2xl w-full aspect-[1.75/1] mb-6 flex items-center justify-center overflow-hidden border border-gray-100/50">
                      <Image 
                        src={plan.illustrationSrc} 
                        alt={plan.title}
                        width={plan.id === 'super-minty' ? 220 : 180} 
                        height={110}
                        className="object-contain"
                      />
                    </div>


                    <div className="flex gap-2 items-center mb-3">
                      <h2 className="text-[#113B4A] text-2xl font-extrabold tracking-tight">
                        {plan.title}
                      </h2>
                      {plan.badgeText && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E5ECF0] text-[#4A7280] tracking-wide uppercase">
                          {plan.badgeText}
                        </span>
                      )}
                    </div>

            
                    <p className="text-gray-500 text-xs leading-relaxed mb-8 min-h-[36px]">
                      {plan.description}
                    </p>


                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <span className="text-gray-400 font-bold text-2xl tracking-tight relative inline-block">
                        {plan.crossedText}
                        <span className="absolute left-0 top-1/2 w-full h-[2.5px] bg-[#FF5E5E] -translate-y-1/2 rounded" />
                      </span>
                      
                      <span className="text-[#00CBB0] font-extrabold text-3xl tracking-tight">
                        {plan.currentPrice}
                      </span>
                    </div>


                    <p className="text-gray-400 text-[11px] whitespace-pre-line leading-normal mb-3">
                      {plan.subText}
                    </p>
                    
                    <p className="text-[#113B4A] text-[11px] font-medium bg-[#F5F8F9] p-3 rounded-xl border border-gray-100/50 mb-6">
                      {plan.trialText}
                    </p>


                    <Button 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents layout bubble handling if you trigger page routing
                        setSelectedPlan(plan.id);
                      }}
                      className={`w-full py-3 rounded-xl font-bold text-sm shadow-xs transition-all duration-150 mb-8 ${
                        isSelected 
                          ? 'bg-[#113B4A] text-white hover:bg-[#1A4B5D]' 
                          : 'bg-[#ECF2F5] text-[#113B4A] hover:bg-[#E1EAEB]'
                      }`}
                    >
                      Try for free
                    </Button>


                    <div className="border-t border-gray-100 pt-6">
                      <h4 className="text-[#113B4A] text-xs font-extrabold mb-4 uppercase tracking-wider text-opacity-90">
                        {plan.id === 'super-minty' ? 'Everything in both services:' : 'What you get:'}
                      </h4>
                      <ul className="flex flex-col gap-3.5">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 font-medium">
                            <span className="text-[#00CBB0] font-bold shrink-0 text-sm leading-none">✓</span>
                            <span className="leading-tight text-gray-500">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>


          <p className="text-center text-gray-400 text-[11px] max-w-[800px] mx-auto mb-16 leading-normal">
            *Prices in HKD, billed monthly per shop. Subscribe to one service for HKD 280/mo, or add the second for just HKD 120 more — the Super Minty bundle at HKD 400/mo.
          </p>


          <section className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-[0_4px_24px_rgba(17,59,74,0.01)] text-center max-w-[650px] mx-auto">
            <h3 className="text-[#113B4A] text-[24px] md:text-[28px] font-extrabold tracking-tight mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-400 text-xs md:text-sm mb-6 max-w-[420px] mx-auto leading-relaxed">
              Check our help centre or reach out — we'll match you with the right plan.
            </p>
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <Button className="bg-[#00CBB0] text-white hover:bg-[#00B59D] font-bold px-6 py-2.5 rounded-full text-[13px] shadow-sm transition-all duration-200">
                Visit FAQ
              </Button>
              <Button className="bg-[#113B4A] text-white hover:bg-[#1A4B5D] font-bold px-6 py-2.5 rounded-full text-[13px] shadow-sm transition-all duration-200">
                Contact Support
              </Button>
            </div>
          </section>

        </Container>
      </main>

      <Footer />
    </div>
  );
}

*/}