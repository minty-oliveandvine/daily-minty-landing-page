import { Mail, MessageSquare, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function ContactFormSection() {
  return (
    <section className="max-w-[1000px] mx-auto px-4 grid lg:grid-cols-12 gap-8 pb-20 mt-20">
      {/* Left: Contact Form Card with Subtle Shadow */}
      <div className="lg:col-span-7 bg-white p-10 rounded-[32px] shadow-[0_4px_32px_rgba(0,0,0,0.03)] border border-gray-100">
        <h2 className="text-2xl font-extrabold text-[#113B4A] mb-2">Send us a message</h2>
        <p className="text-sm text-[#4A7280] mb-8">We typically reply within a few hours during business days.</p>

        <form className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[#113B4A] mb-1.5">Your name *</label>
              <input className="w-full bg-[#fbf8f2] p-3 rounded-xl border border-[#e7ddd0] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all" placeholder="minty" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#113B4A] mb-1.5">Email *</label>
              <input className="w-full bg-[#fbf8f2] p-3 rounded-xl border border-[#e7ddd0] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all" placeholder="you@business.com" />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-5'>
              <div>
                <label className="block text-xs font-bold text-[#113B4A] mb-1.5">Business name</label>
                <input className="w-full bg-[#fbf8f2] p-3 rounded-xl border border-[#e7ddd0] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all" placeholder="Optional" />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#113B4A] mb-1.5">Topic *</label>
                <select className="w-full bg-[#fbf8f2] p-3 rounded-xl border border-[#e7ddd0] text-[#4A7280] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all appearance-none">
                  <option>Pick one..</option>
                </select>
              </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#113B4A] mb-1.5">How can we help? *</label>
            <textarea className="w-full bg-[#fbf8f2] p-4 rounded-xl border border-[#e7ddd0] focus:ring-2 focus:ring-[#e7ddd0]/20 outline-none transition-all resize-none" rows={4} placeholder="Tell us a bit about..." />
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-[13px] text-[#4A7280] max-w-[200px]">By submitting, you agree to our <a href="#" className="text-[#00CBB0] underline">privacy policy</a>. We&apos;ll only use your details to reply to you.</p>
            <button className="bg-[#00CBB0] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#00B59D] transition-colors shadow-lg shadow-[#00CBB0]/20">
              Send message →
            </button>
          </div>
        </form>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <div className="bg-[#FAF6F0] p-6 rounded-[24px] border border-[#F2EFE8] hover:border-[#E8E1D5] transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D4EFE9] flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-[#00CBB0]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#113B4A] mb-1 text-sm">Email us directly</h3>
              <p className="text-xs text-[#4A7280] leading-relaxed mb-2">Best for non-urgent questions and detailed asks. Replies usually within 4 hours.</p>
              <a href="mailto:hello@dailyminty.com" className="text-xs font-bold text-[#00CBB0] hover:underline">hello@dailyminty.com →</a>
            </div>
          </div>
        </div>

        <div className="bg-[#FAF6F0] p-6 rounded-[24px] border border-[#F2EFE8] hover:border-[#E8E1D5] transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D4EFE9] flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-[#00CBB0]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#113B4A] mb-1 text-sm">Whatsapp us</h3>
              <p className="text-xs text-[#4A7280] leading-relaxed mb-2">Get instant replies during business hours. Chat directly with our team on WhatsApp.</p>
              <a href="https://wa.me/60423884" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#00CBB0] hover:underline">Start chat →</a>
            </div>
          </div>
        </div>

        <div className="bg-[#FAF6F0] p-6 rounded-[24px] border border-[#F2EFE8] hover:border-[#E8E1D5] transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D4EFE9] flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5 text-[#00CBB0]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#113B4A] mb-1 text-sm">Help centre</h3>
              <p className="text-xs text-[#4A7280] leading-relaxed mb-2">Step-by-step guides, video walkthroughs, and answers to the most common questions.</p>
              <a href="/get-started" className="text-xs font-bold text-[#00CBB0] hover:underline">Browse articles →</a>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-[#D4EFE9] p-4 rounded-[24px] flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#00CBB0] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-[#113B4A] mb-1">All systems normal</p>
            <p className="text-xs text-[#4A7280]">No incidents reported in the last 24 hours. <a href="#" className="text-[#00CBB0] font-bold hover:underline">View status page →</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}