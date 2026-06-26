import Image from 'next/image';

export default function FAQHero() {
  return (
    <section className="relative w-full max-w-[1200px] mx-auto my-8 px-4">
      <div className="relative w-full bg-gradient-to-r from-[#03c5c0] to-[#69d8c2] rounded-[32px] p-8 md:p-12 overflow-visible min-h-[240px] flex items-center justify-between gap-6">

        {/* Left Content */}
        <div className="z-10 flex-1">
          <p className="text-white font-bold text-xs md:text-sm tracking-widest uppercase mb-2 opacity-90">
            Petty Cash & Bill Payment
          </p>
          <h1 className="text-white text-[32px] md:text-[48px] font-extrabold tracking-tight leading-[1.15]">
            Frequently 
          </h1>
          <h2 className="text-white text-[32px] md:text-[48px] font-extrabold tracking-tight leading-[1.15]">
            asked questions

          </h2>
        </div>

        <div className="relative flex-shrink-0 mr-8 md:mr-16">
          <div className="absolute top-[20%] right-[85%] md:right-[70%] bg-white text-[#113B4A] font-bold text-xs md:text-sm px-5 py-3 rounded-[20px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] whitespace-nowrap z-30 flex items-center">
            Need help? No worries!
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2.5 h-2.5 bg-white rotate-45 rounded-sm" />
          </div>

          <Image
            src="/assets/deployed-assets/faq-professor-cat.png"
            alt="Minty Teacher Mascot"
            width={240}
            height={240}
            className="w-[140px] md:w-[340px] h-auto object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
}