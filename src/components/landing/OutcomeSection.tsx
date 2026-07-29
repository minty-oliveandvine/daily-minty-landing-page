'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import VideoModal from '@/components/ui/VideoModal';
import { landingContent } from '@/config/landing';
import { Wallet, ReceiptText, Menu, Play, LucideIcon } from 'lucide-react';
import FadeContent from '@/animations/landing/fadeanim';

const iconMap: { [key: string]: LucideIcon } = {
  Wallet: Wallet,
  ReceiptText: Menu,
};

export default function OutcomeSection() {
  const { outcome } = landingContent;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<{ title: string; href: string } | null>(null);
  const cardThemeStyles = [
    {
      bgClass: "bg-[#00cbb2]", 
      iconSrc: "/icons/cash.svg"
    },
    {
      bgClass: "bg-[#0f2d37]", 
      iconSrc: "/icons/bill.svg"
    }
  ];

  return (
    <>
    <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
    {/* id is the target of the hero's "See how it works" CTA. No scroll-mt —
        the navbar is `relative`, not sticky, so any offset would just leave a
        strip of the previous section visible above this one. */}
    <section id="solution" className="bg-[#dcf3ec] py-12 md:py-20" aria-labelledby="outcome-title">
      <Container className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="bg-[#bfeae0] text-[#00a896] text-xs font-bold tracking-wider px-4 py-1.5 rounded-full uppercase mb-4">
            The Solution
          </span>
          <div className="bg-white px-8 py-4 rounded-full shadow-sm max-w-xl">
            <h2 id="outcome-title" className="text-[20px] md:text-[24px] font-extrabold text-[#1a202c] leading-tight">
              {outcome.title}{' '}
              <span className="text-[#00cbb2]">{outcome.titleAccent}</span>{' '}
            </h2>
          </div>
        </div>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {outcome.cards.map((card, index) => {
            const theme = cardThemeStyles[index] || cardThemeStyles[0];
            const IconComponent = iconMap[card.icon];
            return (
              <button
                key={card.key}
                onClick={() => {
                  setSelectedCard({ title: card.title, href: card.href });
                  setIsModalOpen(true);
                }}
                className={`${theme.bgClass} rounded-[24px] p-6 pb-0 flex flex-col justify-between shadow-md overflow-hidden aspect-[4/3] cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg w-full text-left`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[24px] font-bold text-white tracking-wide">
                    {card.title}
                  </h3>
                  {/* Dynamic Icon Container */}
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    {IconComponent && (
                      <IconComponent className={`${card.iconTextColor} w-5 h-5`} />
                    )}
                  </div>
                </div>

                {/* Image Placeholder */}
                <div className="bg-white rounded-t-[16px] flex-grow flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full min-h-[140px] group">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover rounded-t-[16px]"
                      priority={index < 2}
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-200">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <Play className="w-7 h-7 text-[#00cbb2] fill-[#00cbb2] ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
    </FadeContent>

    {selectedCard && (
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={selectedCard.href}
        title={selectedCard.title}
      />
    )}
    </>
  );
}