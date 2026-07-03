'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { landingContent } from '@/config/landing';
import FadeContent from '@/animations/landing/fadeanim';

export default function SeeHowItWorksSection() {
  const { seeHowItWorks } = landingContent;

  // Strip the extension so we can offer multiple formats.
  // Safari/iOS cannot play WebM, so we must provide an MP4 fallback.
  const videoBase = seeHowItWorks.image.replace(/\.(webm|mp4|mov)$/i, '');

  // Only the transparent WebM keeps its alpha. Browsers that can't play WebM
  // (Safari/iOS) fall back to the MP4, whose transparent areas render as black.
  // For those we blend "screen" over the teal section to hide that black.
  // We must NOT blend on WebM-capable browsers, or it would wash out the mascot.
  const [needsBlend, setNeedsBlend] = useState(false);

  useEffect(() => {
    const testVideo = document.createElement('video');
    const canPlayWebm = testVideo.canPlayType('video/webm; codecs="vp9"') !== '' ||
      testVideo.canPlayType('video/webm') !== '';
    setNeedsBlend(!canPlayWebm);
  }, []);

  return (
    <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
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
            preload="auto"
            controlsList="nofullscreen nodownload nopictureinpicture"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            // MP4/H.264 (used by Safari/iOS) can't store transparency, so its
            // transparent areas show as black. Blending "screen" over the solid
            // teal section makes those pure-black pixels composite away. Only
            // applied when the browser falls back to MP4 (see needsBlend).
            style={needsBlend ? { mixBlendMode: 'screen' } : undefined}
            >
            {/* WebM first for Chrome/Firefox (smaller); MP4 fallback for Safari/iOS which cannot play WebM */}
            <source src={`/${videoBase}.webm`} type="video/webm" />
            <source src={`/${videoBase}.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        </div>
      </Container>
    </section>
    </FadeContent>
  );
}