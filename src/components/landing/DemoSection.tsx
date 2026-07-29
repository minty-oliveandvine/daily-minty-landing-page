'use client';

import { useState, useEffect, useRef } from 'react';
import Container from '@/components/ui/Container';
import { landingContent } from '@/config/landing';
import FadeContent from '@/animations/landing/fadeanim';
// Test
export default function DemoSection() {
  const { demo } = landingContent;
  const [isPlaying, setIsPlaying] = useState(false);
  const videoCardRef = useRef<HTMLDivElement>(null);

  // Extract video ID from YouTube embed URL
  const videoId = demo.videoUrl.split('/embed/')[1];
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Autoplay the demo once the card scrolls into view. Browsers only allow
  // autoplay when the video is muted, so the iframe URL includes mute=1.
  useEffect(() => {
    const el = videoCardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
    <section className="bg-[#EBF7F4] py-12 md:py-20" aria-labelledby="demo-title">
      <Container className="flex flex-col items-center text-center">
        
        {/* Top Pill Badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#D2EFE9] text-[#00A884] text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A884]"></span>
          {demo.badge}
        </div>

        {/* Section Heading */}
        <h2 id="demo-title" className="text-[28px] md:text-[34px] font-extrabold text-[#113B4A] mb-3 tracking-tight">
          {demo.title}
        </h2>
        
        {/* Section Subtitle */}
        <p className="text-[#647C85] text-[15px] max-w-[550px] leading-relaxed mb-12">
          {demo.subtitle}
        </p>

        {/* Video Player Floating Card */}
        <div ref={videoCardRef} className="w-full max-w-4xl aspect-[16/10] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(17,59,74,0.08)] bg-white relative">
          {isPlaying ? (
            <iframe
              width="100%"
              height="100%"
              src={`${demo.videoUrl}?autoplay=1&mute=1`}
              title="Minty Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <button
              onClick={() => setIsPlaying(true)}
              className="w-full h-full relative block group overflow-hidden"
              aria-label="Play demo video"
            >
              {/* Background: YouTube Thumbnail with Dark Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${thumbnailUrl}')`,
                }}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-200" />

              {/* Centered Circular White Play Button with Soft Backdrop Shadow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.08)] transform transition-transform duration-200 group-hover:scale-105">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="#00A884" 
                    className="w-7 h-7 ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Bottom Left Badge overlay */}
              <div className="absolute bottom-6 left-6 bg-white text-[#113B4A] text-xs font-bold px-4 py-2 rounded-full shadow-sm">
                DailyMinty
              </div>
              
              {/* Bottom Right Duration overlay */}
              <div className="absolute bottom-6 right-6 bg-[#2B4750] text-white text-xs font-bold px-3 py-2 rounded-xl shadow-sm">
                0:40
              </div>
            </button>
          )}
        </div>

      </Container>
    </section>
    </FadeContent>
  );
}