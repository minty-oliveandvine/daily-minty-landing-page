import { Mail, MessageSquare, HelpCircle, CheckCircle2 } from 'lucide-react';
import AnimatedContent from '@/animations/contact/heroanim';
export default function ContactFormSection() {
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

        <form className="space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div>
              <label className="block text-xs font-bold text-[#113B4A] mb-1.5">Your name *</label>
              <input className="w-full bg-[#fbf8f2] p-2.5 md:p-3 rounded-lg md:rounded-xl border border-[#e7ddd0] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all text-[13px]" placeholder="minty" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#113B4A] mb-1.5">Email *</label>
              <input className="w-full bg-[#fbf8f2] p-2.5 md:p-3 rounded-lg md:rounded-xl border border-[#e7ddd0] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all text-[13px]" placeholder="you@business.com" />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5'>
              <div>
                <label className="block text-xs font-bold text-[#113B4A] mb-1.5">Business name</label>
                <input className="w-full bg-[#fbf8f2] p-2.5 md:p-3 rounded-lg md:rounded-xl border border-[#e7ddd0] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all text-[13px]" placeholder="Optional" />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#113B4A] mb-1.5">Topic *</label>
                <select className="w-full bg-[#fbf8f2] p-2.5 md:p-3 rounded-lg md:rounded-xl border border-[#e7ddd0] text-[#4A7280] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all appearance-none text-[13px]">
                  <option>Pick one..</option>
                </select>
              </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#113B4A] mb-1.5">How can we help? *</label>
            <textarea className="w-full bg-[#fbf8f2] p-2.5 md:p-4 rounded-lg md:rounded-xl border border-[#e7ddd0] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all resize-none text-[13px]" rows={4} placeholder="Tell us a bit about..." />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 pt-2">
            <p className="text-[11px] md:text-[13px] text-[#4A7280]">By submitting, you agree to our <a href="#" className="text-[#00CBB0] underline">privacy policy</a>. We&apos;ll only use your details to reply to you.</p>
            <button className="bg-[#00CBB0] text-white px-6 md:px-8 py-2.5 md:py-3.5 rounded-full font-bold text-[12px] md:text-sm hover:bg-[#00B59D] transition-colors shadow-lg shadow-[#00CBB0]/20 whitespace-nowrap">
              Send message →
            </button>
          </div>
        </form>
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
              <a href="/get-started" className="text-[11px] md:text-xs font-bold text-[#00CBB0] hover:underline">Browse articles →</a>
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