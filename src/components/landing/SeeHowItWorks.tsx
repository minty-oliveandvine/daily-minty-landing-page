'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { landingContent } from '@/config/landing';

export default function SeeHowItWorksSection() {
  const { seeHowItWorks } = landingContent;

  return (
    <section id="see-how-it-works" className="bg-[#00CBB0] pt-12 md:pt-20 pb-12 md:pb-20 text-center flex flex-col items-center">
      <Container className="flex flex-col items-center mb-0">

        <h2 className="text-[28px] md:text-[40px] font-extrabold text-white mb-4 md:mb-6 tracking-tight">
          {seeHowItWorks.title}
        </h2>

        <Button
          className="bg-white text-[#113B4A] hover:bg-white/90 font-bold px-6 py-2.5 md:py-3 rounded-full text-[13px] md:text-[14px] shadow-sm transition-all duration-200 mb-8 md:mb-12"
        >
          {seeHowItWorks.buttonText}
        </Button>

        <div className="w-full max-w-[400px] md:max-w-[600px] aspect-[1.5/1] md:aspect-[1.7/1] rounded-[24px] md:rounded-[32px] overflow-hidden select-none pointer-events-none">
            <video
            className="w-full h-full object-contain"
            autoPlay
            muted
            loop
            playsInline
            controlsList="nofullscreen nodownload nopictureinpicture"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            >
            <source src={`/${seeHowItWorks.image}`} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        </div>
      </Container>
    </section>
  );
}