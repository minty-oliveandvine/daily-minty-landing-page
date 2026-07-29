'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { VolumeX, Clock } from 'lucide-react';

/** Pull the video id out of any YouTube URL form. */
function youtubeId(videoUrl: string): string {
  if (videoUrl.includes('/embed/')) return videoUrl.split('/embed/')[1].split(/[?&#]/)[0];
  if (videoUrl.includes('youtu.be/')) return videoUrl.split('youtu.be/')[1].split(/[?&#]/)[0];
  if (videoUrl.includes('watch?v=')) return videoUrl.split('watch?v=')[1].split('&')[0];
  return '';
}

function buildEmbedUrl(videoUrl: string): string {
  const params = new URLSearchParams({
    autoplay: '1',
    // Muted is required or browsers block autoplay outright. YouTube's own
    // volume control in the bar below is how the viewer turns sound on.
    mute: '1',
    // Native chrome: draggable timeline, elapsed/total time, volume,
    // fullscreen. Set to '0' to hide it again.
    controls: '1',
    // Suppresses on-video annotation cards.
    iv_load_policy: '3',
    // Keeps end-screen suggestions within this channel.
    rel: '0',
    // Stops iOS from forcing the video into its native fullscreen player.
    playsinline: '1',
    enablejsapi: '1',
  });
  return `https://www.youtube.com/embed/${youtubeId(videoUrl)}?${params}`;
}

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  /** Local path or absolute URL. Falls back to YouTube's own poster frame. */
  thumbnail?: string;
  /**
   * Controlled mode. Pass both to let a parent enforce one-open-at-a-time
   * across several players; omit both to let each manage itself.
   */
  isPlaying?: boolean;
  onPlayingChange?: (playing: boolean) => void;
  /** Poster width before playing — the player expands past this on click. */
  collapsedWidth?: string;
  /** Poster aspect ratio; the playing frame is always 16/9. */
  posterAspect?: string;
  /** Rendered on top of the poster, e.g. a category badge. */
  posterOverlay?: ReactNode;
  /** Shown bottom-right of the poster, e.g. "4:13". Hidden when empty. */
  duration?: string;
  /** Set false when the surrounding card supplies its own close control. */
  showClose?: boolean;
  /** Set false when the parent already scrolls the container into view. */
  scrollOnPlay?: boolean;
  className?: string;
}

/**
 * Shared YouTube player: click the poster to start, autoplay muted with
 * YouTube's chrome hidden, then explicit "tap for sound" and fullscreen
 * affordances. Used by both the guide cards and the Xero walkthrough.
 */
export default function VideoPlayer({
  videoUrl,
  title,
  thumbnail,
  isPlaying: controlledPlaying,
  onPlayingChange,
  collapsedWidth = 'max-w-[460px]',
  posterAspect = 'aspect-[16/9]',
  posterOverlay,
  duration,
  showClose = true,
  scrollOnPlay = true,
  className,
}: VideoPlayerProps) {
  const [uncontrolledPlaying, setUncontrolledPlaying] = useState(false);
  const isControlled = controlledPlaying !== undefined;
  const isPlaying = isControlled ? controlledPlaying : uncontrolledPlaying;

  const setPlaying = (next: boolean) => {
    if (!isControlled) setUncontrolledPlaying(next);
    onPlayingChange?.(next);
  };

  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // hqdefault, not maxresdefault — the latter 404s on videos that were never
  // uploaded at high enough resolution, which leaves a blank poster.
  const poster = thumbnail || `https://img.youtube.com/vi/${youtubeId(videoUrl)}/hqdefault.jpg`;
  const isLocalThumb = Boolean(thumbnail) && thumbnail!.startsWith('/');

  // Each newly opened video starts muted again.
  useEffect(() => {
    setIsMuted(true);
  }, [isPlaying]);

  // Controls are hidden, so offer an explicit way to turn sound on.
  const unmute = () => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
      '*'
    );
    setIsMuted(false);
  };

  if (!videoUrl) return null;

  if (!isPlaying) {
    return (
      // The outer wrapper owns the width so playing can widen past the poster.
      <div className={cn('mx-auto w-full transition-[max-width] duration-300 ease-out', collapsedWidth)}>
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            if (scrollOnPlay) {
              setTimeout(() => {
                playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }, 100);
            }
          }}
          aria-label={`Play: ${title}`}
          className={cn(
            'relative w-full rounded-2xl overflow-hidden cursor-pointer group shadow-sm block border-0 p-0',
            posterAspect
          )}
        >
          {isLocalThumb ? (
            <Image
              src={poster}
              alt={title}
              fill
              // Without an explicit sizes, `fill` defaults to 100vw and Next
              // picks a srcset entry for the whole viewport — soft on a poster
              // that is really ~880px. quality 100 avoids extra recompression.
              sizes="(min-width: 1024px) 880px, 100vw"
              quality={100}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]"
              style={{ backgroundImage: `url('${poster}')` }}
            />
          )}

          {posterOverlay}

          <div className="absolute inset-0 bg-black/5 flex items-center justify-center transition-colors group-hover:bg-black/10">
            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-md backdrop-blur-xs transform transition-transform group-hover:scale-110">
              <span className="text-[#113B4A] text-xl ml-1" aria-hidden="true">▶</span>
            </div>
          </div>

          {duration && (
            <span className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
              <Clock size={11} />
              {duration}
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div
      ref={playerRef}
      className={cn(
        'relative overflow-hidden bg-[#EDF3F1]',
        'aspect-[16/9] mx-auto w-full rounded-2xl border border-emerald-50/50 shadow-inner transition-[max-width] duration-300 ease-out',
        className
      )}
    >
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        src={buildEmbedUrl(videoUrl)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
      />

      {/* Sound hint only — YouTube's bar handles volume, scrubbing and
          fullscreen now. Sits top-left so it clears the control bar. */}
      {isMuted && (
        <button
          onClick={unmute}
          className="absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-black/70 px-3.5 py-2 text-[12px] font-bold text-white backdrop-blur-sm transition-colors hover:bg-black/85"
          aria-label="Turn on sound"
        >
          <VolumeX size={14} />
          Tap for sound
        </button>
      )}

      {showClose && (
        <button
          onClick={() => setPlaying(false)}
          className="absolute top-3 right-3 z-20 w-7 h-7 bg-black/60 text-white/90 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-150 text-[11px] font-bold"
          aria-label="Close video"
        >
          ✕
        </button>
      )}
    </div>
  );
}
