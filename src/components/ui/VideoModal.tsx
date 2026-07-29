'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Extract video ID from YouTube URL (supports both watch?v= and youtu.be/ formats)
  let videoId = '';
  const watchMatch = videoUrl.match(/[?&]v=([^&]+)/);
  const shortMatch = videoUrl.match(/youtu\.be\/([^?]+)/);
  videoId = watchMatch ? watchMatch[1] : shortMatch ? shortMatch[1] : '';

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className="bg-white rounded-[24px] w-full max-w-4xl aspect-[16/9] relative shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close video"
        >
          <X size={32} />
        </button>

        {/* Video Title (optional) */}
        <div className="absolute top-4 left-6 z-10">
          <h3 id="video-modal-title" className="text-white text-lg font-bold">
            {title}
          </h3>
        </div>

        {/* YouTube Embed */}
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-[24px]"
        />
      </div>
    </div>
  );
}
