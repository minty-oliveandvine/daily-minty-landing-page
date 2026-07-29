'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Mail, MessageSquare, HelpCircle, CheckCircle2 } from 'lucide-react';
import AnimatedContent from '@/animations/contact/heroanim';

const TOPICS = [
  'Getting started',
  'Billing & pricing',
  'Technical issue',
  'Xero / integrations',
  'Something else',
];

// Rate limiting: at most MAX_SUBMISSIONS within WINDOW_MS, plus a COOLDOWN_MS
// gap between any two sends. Timestamps persist so a page reload can't reset it.
const STORAGE_KEY = 'minty:contact:submissions';
const MAX_SUBMISSIONS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const COOLDOWN_MS = 30 * 1000; // 30 seconds between sends

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Reads submission timestamps, dropping any that fall outside the window. */
function readRecentSubmissions(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const cutoff = Date.now() - WINDOW_MS;
    return parsed.filter((t): t is number => typeof t === 'number' && t > cutoff);
  } catch {
    // Corrupt or unavailable storage (e.g. Safari private mode) — fail open.
    return [];
  }
}

function recordSubmission(timestamps: number[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(timestamps));
  } catch {
    // Storage unavailable — in-memory state still guards this session.
  }
}

export default function ContactFormSection() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submissions, setSubmissions] = useState<number[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(0);
  // When the form became fillable — the server rejects implausibly fast submits.
  const renderedAt = useRef<number>(0);

  // Hydrate from storage after mount so server and client markup match.
  useEffect(() => {
    setSubmissions(readRecentSubmissions());
    renderedAt.current = Date.now();
  }, []);

  const lastSubmission = submissions.length ? Math.max(...submissions) : 0;
  const hitLimit = submissions.length >= MAX_SUBMISSIONS;

  // Tick down whichever block is active, so the UI re-enables on its own.
  useEffect(() => {
    if (!lastSubmission && !hitLimit) return;

    const tick = () => {
      const now = Date.now();
      const cooldownEnds = lastSubmission + COOLDOWN_MS;
      // When the cap is hit, the block lasts until the oldest entry ages out.
      const windowEnds = hitLimit ? Math.min(...submissions) + WINDOW_MS : 0;
      const until = Math.max(cooldownEnds, windowEnds);
      const remaining = Math.ceil((until - now) / 1000);

      if (remaining <= 0) {
        setSecondsLeft(0);
        // Re-read to drop entries that have aged out of the window.
        setSubmissions(readRecentSubmissions());
        return;
      }
      setSecondsLeft(remaining);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lastSubmission, hitLimit, submissions]);

  const isRateLimited = secondsLeft > 0;

  const limitMessage = useCallback(() => {
    if (hitLimit) {
      const mins = Math.ceil(secondsLeft / 60);
      return `You've sent ${MAX_SUBMISSIONS} messages recently. Please wait ${mins} minute${
        mins === 1 ? '' : 's'
      } before sending another, or email us directly.`;
    }
    return `Please wait ${secondsLeft} second${secondsLeft === 1 ? '' : 's'} before sending another message.`;
  }, [hitLimit, secondsLeft]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isRateLimited) {
      setErrorMessage(limitMessage());
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const formData = new FormData(event.currentTarget);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      renderedAt: renderedAt.current,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        // 429 from the server carries its own retry guidance.
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      // Only count sends that actually succeeded.
      const next = [...readRecentSubmissions(), Date.now()];
      recordSubmission(next);
      setSubmissions(next);
      setStatus('sent');
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

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
    <section className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 pb-12 md:pb-20 mt-12 md:mt-20">
      {/* Left: Contact Form Card with Subtle Shadow */}
      <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-[20px] md:rounded-[32px] shadow-[0_4px_32px_rgba(0,0,0,0.03)] border border-gray-100">
        <h2 className="text-[20px] md:text-2xl font-extrabold text-[#113B4A] mb-2">Send us a message</h2>
        <p className="text-[12px] md:text-sm text-[#4A7280] mb-6 md:mb-8">We typically reply within a few hours during business days.</p>

        {status === 'sent' ? (
          <div className="flex flex-col items-start gap-3 py-8">
            <div className="w-12 h-12 rounded-full bg-[#D4EFE9] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#00CBB0]" />
            </div>
            <h3 className="text-lg font-extrabold text-[#113B4A]">Message sent!</h3>
            <p className="text-sm text-[#4A7280]">
              Thanks for reaching out — we&apos;ve got your message and will reply to your inbox shortly.
            </p>
            {isRateLimited ? (
              <p className="text-[13px] text-[#4A7280]">
                {hitLimit
                  ? limitMessage()
                  : `You can send another message in ${secondsLeft}s.`}
              </p>
            ) : (
              <button
                onClick={() => setStatus('idle')}
                className="text-[13px] font-bold text-[#00CBB0] hover:underline"
              >
                Send another message →
              </button>
            )}
          </div>
        ) : (
        <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-[#113B4A] mb-1.5">Your name *</label>
              <input id="name" name="name" required maxLength={100} className="w-full bg-[#fbf8f2] p-2.5 md:p-3 rounded-lg md:rounded-xl border border-[#e7ddd0] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all text-[13px]" placeholder="minty" />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-[#113B4A] mb-1.5">Email *</label>
              <input id="email" name="email" type="email" required maxLength={200} className="w-full bg-[#fbf8f2] p-2.5 md:p-3 rounded-lg md:rounded-xl border border-[#e7ddd0] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all text-[13px]" placeholder="you@business.com" />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5'>
              <div>
                <label htmlFor="businessName" className="block text-xs font-bold text-[#113B4A] mb-1.5">Business name</label>
                <input id="businessName" name="businessName" maxLength={150} className="w-full bg-[#fbf8f2] p-2.5 md:p-3 rounded-lg md:rounded-xl border border-[#e7ddd0] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all text-[13px]" placeholder="Optional" />
              </div>

              <div>
                <label htmlFor="topic" className="block text-xs font-bold text-[#113B4A] mb-1.5">Topic *</label>
                <select id="topic" name="topic" required defaultValue="" className="w-full bg-[#fbf8f2] p-2.5 md:p-3 rounded-lg md:rounded-xl border border-[#e7ddd0] text-[#4A7280] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all appearance-none text-[13px]">
                  <option value="" disabled>Pick one..</option>
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-bold text-[#113B4A] mb-1.5">How can we help? *</label>
            <textarea id="message" name="message" required maxLength={5000} className="w-full bg-[#fbf8f2] p-2.5 md:p-4 rounded-lg md:rounded-xl border border-[#e7ddd0] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all resize-none text-[13px]" rows={4} placeholder="Tell us a bit about..." />
          </div>

          {/* Honeypot — hidden from users, catches bots that fill every field */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] w-px h-px opacity-0"
          />

          {status === 'error' && (
            <p className="text-[12px] md:text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {errorMessage}
            </p>
          )}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 pt-2">
            <p className="text-[11px] md:text-[13px] text-[#4A7280]">By submitting, you agree to our <a href="#" className="text-[#00CBB0] underline">privacy policy</a>. We&apos;ll only use your details to reply to you.</p>
            <button
              type="submit"
              disabled={status === 'sending' || isRateLimited}
              title={isRateLimited ? limitMessage() : undefined}
              className="bg-[#00CBB0] text-white px-6 md:px-8 py-2.5 md:py-3.5 rounded-full font-bold text-[12px] md:text-sm hover:bg-[#00B59D] transition-colors shadow-lg shadow-[#00CBB0]/20 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending'
                ? 'Sending…'
                : isRateLimited
                  ? `Wait ${secondsLeft}s…`
                  : 'Send message →'}
            </button>
          </div>
        </form>
        )}
      </div>

      <div className="lg:col-span-5 space-y-3 md:space-y-4">
        <div className="bg-[#FAF6F0] p-4 md:p-6 rounded-[16px] md:rounded-[24px] border border-[#F2EFE8] hover:border-[#E8E1D5] transition-colors">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-9 md:w-10 h-9 md:h-10 rounded-full bg-[#D4EFE9] flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 md:w-5 h-4 md:h-5 text-[#00CBB0]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#113B4A] mb-1 text-[13px] md:text-sm">Email us directly</h3>
              <p className="text-[11px] md:text-xs text-[#4A7280] leading-relaxed mb-2">Best for non-urgent questions and detailed asks. Replies usually within 4 hours.</p>
              <a href="mailto:hello@dailyminty.com" className="text-[11px] md:text-xs font-bold text-[#00CBB0] hover:underline">hello@dailyminty.com →</a>
            </div>
          </div>
        </div>

        <div className="bg-[#FAF6F0] p-4 md:p-6 rounded-[16px] md:rounded-[24px] border border-[#F2EFE8] hover:border-[#E8E1D5] transition-colors">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-9 md:w-10 h-9 md:h-10 rounded-full bg-[#D4EFE9] flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-4 md:w-5 h-4 md:h-5 text-[#00CBB0]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#113B4A] mb-1 text-[13px] md:text-sm">Whatsapp us</h3>
              <p className="text-[11px] md:text-xs text-[#4A7280] leading-relaxed mb-2">Get instant replies during business hours. Chat directly with our team on WhatsApp.</p>
               <a href="https://wa.me/85260423884" target="_blank" rel="noopener noreferrer" className="text-[11px] md:text-xs font-bold text-[#00CBB0] hover:underline">Start chat →</a>
            </div>
          </div>
        </div>

        <div className="bg-[#FAF6F0] p-4 md:p-6 rounded-[16px] md:rounded-[24px] border border-[#F2EFE8] hover:border-[#E8E1D5] transition-colors">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-9 md:w-10 h-9 md:h-10 rounded-full bg-[#D4EFE9] flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-4 md:w-5 h-4 md:h-5 text-[#00CBB0]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#113B4A] mb-1 text-[13px] md:text-sm">Help centre</h3>
              <p className="text-[11px] md:text-xs text-[#4A7280] leading-relaxed mb-2">Step-by-step guides, video walkthroughs, and answers to the most common questions.</p>
              <a href="/resources/learning" className="text-[11px] md:text-xs font-bold text-[#00CBB0] hover:underline">Browse articles →</a>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-[#D4EFE9] p-3 md:p-4 rounded-[16px] md:rounded-[24px] flex items-start gap-2.5 md:gap-3">
          <CheckCircle2 className="w-4 md:w-5 h-4 md:h-5 text-[#00CBB0] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-[12px] md:text-sm font-bold text-[#113B4A] mb-0.5 md:mb-1">All systems normal</p>
            <p className="text-[11px] md:text-xs text-[#4A7280]">No incidents reported in the last 24 hours.</p>
          </div>
        </div>
      </div>
    </section>
    </AnimatedContent>
  );
}