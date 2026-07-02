'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { getStartedContent } from '@/config/get-started';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import FadeContent from '@/animations/landing/fadeanim';

export default function GuidesSection() {
  const { guides } = getStartedContent;

  // Track which guide is currently being viewed/played
  const [activeGuideId, setActiveGuideId] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(4);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Find active guide data if one is selected
  const activeGuide = guides.items.find((item) => item.id === activeGuideId);

  // Scroll to video player when a guide is selected
  useEffect(() => {
    if (activeGuideId && videoContainerRef.current) {
      setTimeout(() => {
        videoContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeGuideId]);

  return (
    <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
    <section className="bg-white py-10 mb-20 font-sans" id="guide">
      <Container>
        <div className="text-left mb-10">
          <h2 className="text-[#113B4A] text-[28px] md:text-[32px] font-extrabold tracking-tight mb-2">
            {guides.title}
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            {guides.subtitle}
          </p>
        </div>

        {activeGuide ? (
          <div ref={videoContainerRef} className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-[0_4px_24px_rgba(17,59,74,0.02)] animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <span className={cn(
                "text-xs font-bold px-3 py-1 rounded-full",
                activeGuide.category === "Petty Cash" ? "bg-[#EBF3FE] text-[#2F80ED]" :
                activeGuide.category === "Bill Payment" ? "bg-[#FFF9E6] text-[#D4A373]" : "bg-[#E6FAF7] text-[#00CBB0]"
              )}>
                {activeGuide.category}
              </span>
              
              <div className="flex items-center gap-4">          
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={14} className="text-gray-400" /> 
                  {activeGuide.duration}
                </span>
                
                <button 
                  onClick={() => setActiveGuideId(null)}
                  className="w-7 h-7 bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-full flex items-center justify-center transition-all duration-150 text-[11px] font-bold shadow-xs"
                  aria-label="Close video view"
                >
                  ✕
                </button>
              </div>
            </div>

            <h3 className="text-[#113B4A] text-xl font-extrabold leading-snug mb-1">
              {activeGuide.title.includes('Xero') ? (
                <>
                  {activeGuide.title.substring(0, activeGuide.title.indexOf('Xero')).trim()}
                  {' '}
                  <span style={{ color: '#266DD3' }}>Xero</span>
                  {activeGuide.title.substring(activeGuide.title.indexOf('Xero') + 4).trimStart()}
                </>
              ) : (
                activeGuide.title
              )}
            </h3>
            <p className="text-gray-400 text-xs italic mb-6">
              {activeGuide.description}
            </p>

            {/* Embedded Screen / Video Sandbox Player Element */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#EDF3F1] border border-emerald-50/50 shadow-inner">
              {activeGuide.videoUrl ? (
                (() => {
                  // Extract video ID from YouTube URL and convert to embed format
                  let embedUrl = activeGuide.videoUrl;
                  if (activeGuide.videoUrl.includes('watch?v=')) {
                    const videoId = activeGuide.videoUrl.split('watch?v=')[1];
                    embedUrl = `https://www.youtube.com/embed/${videoId}`;
                  }
                  return (
                    <iframe
                      width="100%"
                      height="100%"
                      src={embedUrl}
                      title={activeGuide.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  );
                })()
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex items-center gap-2 text-gray-400 text-[14px] font-semibold tracking-wide selection:bg-transparent">
                    <span className="text-[11px] opacity-80">▶</span> Tutorial video coming soon
                  </div>
                </div>
              )}
            </div>

          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
              {guides.items.slice(0, displayCount).map((guide) => (
              <div 
                key={guide.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className={cn(
                    "text-xs font-bold px-3 py-1 rounded-full",
                    guide.category === "Petty Cash" ? "bg-[#EBF3FE] text-[#2F80ED]" :
                    guide.category === "Bill Payment" ? "bg-[#FFFBF0] text-[#DCA11D]" : "bg-[#E6FAF7] text-[#00CBB0]"
                  )}>
                    {guide.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={14} className="text-gray-400" />  {guide.duration}
                  </span>
                </div>


                <h3 className="text-[#113B4A] text-lg font-extrabold leading-snug mb-1">
                  {guide.title.includes('Xero') ? (
                    <>
                      {guide.title.substring(0, guide.title.indexOf('Xero')).trim()}
                      {' '}
                      <span style={{ color: '#266DD3' }}>Xero</span>
                      {guide.title.substring(guide.title.indexOf('Xero') + 4).trimStart()}
                    </>
                  ) : (
                    guide.title
                  )}
                </h3>
                <p className="text-gray-400 text-xs italic mb-6">
                  {guide.description}
                </p>
                <div 
                  onClick={() => setActiveGuideId(guide.id)}
                  className="relative aspect-[1.85/1] w-full rounded-2xl overflow-hidden cursor-pointer group shadow-sm"
                >
                  <Image
                    src={guide.videoThumbnail}
                    alt={guide.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  
                  {/* Upper Right Corner Badge inside video */}
                  {guide.badge && (
                    <span className={cn(
                      "absolute top-3 right-3 text-[11px] font-bold text-white px-2.5 py-1 rounded-sm uppercase tracking-wider",
                      guide.badge === "Petty Cash" ? "bg-[#10485E]" : 
                      guide.badge === "Bill Payment" ? "bg-[#0B5A75]" : "bg-[#113B4A]"
                    )}>
                      {guide.badge}
                    </span>
                  )}

                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center transition-colors group-hover:bg-black/10">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-md backdrop-blur-xs transform transition-transform group-hover:scale-110">
                      <span className="text-[#113B4A] text-xl ml-1">▶</span>
                    </div>
                  </div>
                </div>

              </div>
              ))}
            </div>

            {displayCount < guides.items.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setDisplayCount(displayCount + 4)}
                  className="bg-white border border-gray-200 text-[#113B4A] hover:bg-gray-50 font-bold px-6 py-2.5 rounded-full text-[13px] transition-all duration-200 shadow-xs"
                >
                  Show more guides
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
    </FadeContent>
  );
}