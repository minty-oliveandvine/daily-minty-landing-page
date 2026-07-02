'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import AnimatedContent from '@/animations/pricing/heroanim';

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
    featuresHeading: 'What you get:',
    features: ['Daily petty cash', 'Cash flow & PDF report', 'Xero sync (cash entries)', 'Team invites & roles'],
    isPopular: false,
  },
  {
    id: 'bill-payment',
    title: 'Payment',
    description: 'Schedule supplier bills, log payments, and never miss a due date.',
    illustrationSrc: '/assets/deployed-assets/sub-bill-payment.png',
    crossedText: 'HKD 280/mo',
    currentPrice: 'Free',
    subText: 'per shop, billed monthly\nSingle service subscription.',
    trialText: 'Free trial for the first 30 days, then HKD 280/mo.',
    featuresHeading: 'What you get:',
    features: ['Bill scheduling & reminder', 'Supplier & vendor directory', 'Payment logging & proof upload', 'Payables & PDF reports', 'Xero sync (bills & payments)', 'Team invites & roles'],
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
    featuresHeading: 'Everything in both services:',
    features: ['Everything from Petty Cash', 'Everything from Bill Payment', 'Xero sync (full)', 'Multi-shop management', 'Team invites & roles'],
    isPopular: true,
    badgeText: 'Best Value'
  }
];

export default function PricingGrid() {
  const [selectedPlan, setSelectedPlan] = useState<string>('super-minty');

  return (
    <AnimatedContent
      distance={100}
      direction="vertical"
      reverse={false}
      duration={0.8}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.1}
      delay={0}
    >
    <section className="max-w-[1200px] mx-auto px-4 mb-16">
      <div className="flex justify-center mb-12">
      <span className="bg-white border border-gray-100 text-[#113B4A] text-[13px] font-bold px-6 py-2.5 rounded-full shadow-md tracking-wide">
        Subscription Types
      </span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      {pricingPlans.map((plan) => {
        const isSelected = selectedPlan === plan.id;
        const isSuperMintyGreen = isSelected && plan.id === 'super-minty';

        return (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`border rounded-[24px] p-8 flex flex-col justify-between transition-all duration-200 cursor-pointer relative ${
              isSuperMintyGreen
                ? 'bg-[#01d0c1] border-[#01d0c1] shadow-[0_12px_36px_rgba(1,208,193,0.2)] scale-[1.01] text-white'
                : isSelected && (plan.id === 'petty-cash' || plan.id === 'bill-payment')
                ? 'bg-white border-gray-300 shadow-md scale-[1.01]'
                : 'bg-[#f4f6fc] border-gray-200/70 shadow-sm hover:border-gray-300'
            }`}
          >
            <div>
              <div className={`bg-[#F5F8F9] rounded-2xl w-full aspect-[1.75/1] flex items-center justify-center border border-gray-100/50 ${plan.id === 'super-minty' ? 'mb-[50px]' : 'mb-6'}`}>
                <Image src={plan.illustrationSrc} alt={plan.title} width={plan.id === 'super-minty' ? 500 : 450} height={220} className="object-contain" />
              </div>

              
              <div className={`flex gap-2 items-center mb-3 ${plan.id === 'super-minty' ? 'mb-[16px]' : ''}`}>
                <h2 className={`text-2xl font-extrabold ${isSuperMintyGreen ? 'text-white' : 'text-[#113B4A]'}`}>{plan.title}</h2>
                {plan.badgeText && <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${isSuperMintyGreen ? 'bg-white/20 text-white' : 'bg-[#E5ECF0] text-[#4A7280]'}`}>{plan.badgeText}</span>}
              </div>

              <p className={`text-xs leading-relaxed mb-8 ${isSuperMintyGreen ? 'text-white/80' : 'text-gray-500'}`}>{plan.description}</p>

              <div className={`flex items-center gap-3 mb-1.5 ${plan.id === 'super-minty' ? 'mb-[28px]' : ''}`}>
                <span className={`font-bold text-2xl relative ${isSuperMintyGreen ? 'text-white/70' : 'text-gray-400'}`}>
                  {plan.crossedText}
                  <span className="absolute left-0 top-1/2 w-full h-[2.5px] bg-[#FF5E5E] -translate-y-1/2 rounded" />
                </span>
                <span className={isSuperMintyGreen ? 'text-white font-extrabold text-3xl' : 'text-[#00CBB0] font-extrabold text-3xl'}>{plan.currentPrice}</span>
              </div>

              <p className={`text-[11px] whitespace-pre-line mb-3 ${isSuperMintyGreen ? 'text-white/80' : 'text-gray-400'}`}>{plan.subText}</p>
              
      
              <p className={`text-[11px] font-medium p-3 rounded-xl mb-6 ${isSuperMintyGreen ? 'bg-white/15 text-white' : 'text-[#113B4A] bg-[#F5F8F9]'}`}>{plan.trialText}</p>

              <Button href='/' className={`w-full py-3 rounded-xl font-bold text-sm mb-8 ${isSelected ? 'bg-[#113B4A] text-white' : 'bg-[#ECF2F5] text-[#113B4A]'}`}>
                Try for free
              </Button>

              <div className={`border-t pt-6 ${isSuperMintyGreen ? 'border-white/20' : 'border-gray-100'}`}>
                <p className={`text-xs font-bold mb-3 ${isSuperMintyGreen ? 'text-white' : 'text-[#113B4A]'}`}>
                  {plan.featuresHeading}
                </p>
                <ul className={`flex flex-col gap-3.5`}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-1.5 text-xs ${isSuperMintyGreen ? 'text-white' : 'text-gray-600'}`}>
                    <span className={isSuperMintyGreen ? 'text-white font-bold' : 'text-black font-bold'}>✓</span>
                    {feature.includes('Xero') ? (
                      <>
                        {feature.substring(0, feature.indexOf('Xero')).trim()}
                        {' '}
                        <span className="font-bold text-black">Xero</span>
                        {feature.substring(feature.indexOf('Xero') + 4).trimStart()}
                      </>
                    ) : (
                      feature
                    )}
                  </li>
                ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>

      <p className="text-center text-gray-400 text-[11px] max-w-[800px] mx-auto mb-16 leading-normal mt-8">
        *Prices in HKD, billed monthly per shop. Subscribe to one service for HKD 280/mo, or add the second for just HKD 120 more — the Super Minty bundle at HKD 400/mo.
      </p>
    </section>
    </AnimatedContent>
  );
}