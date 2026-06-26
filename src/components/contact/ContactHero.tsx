import Image from 'next/image';

export default function ContactHero() {
  return (
    <section className="relative pt-10 pb-16 text-center px-4 overflow-hidden bg-[#FAF6F0]">
        <div className="inline-flex items-center gap-2 bg-[#d6efe8] text-[#00CBB0] px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6 border border-[#00CBB0]/10 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00CBB0]" />
            {"We're here to help"}
        </div>

        <h1 className="text-[56px] font-extrabold text-[#113B4A] tracking-tight mb-4">
            Talk to <span className="text-[#00CBB0]">Minty.</span>
        </h1>
        
        <p className="max-w-[480px] mx-auto text-[#4A7280] leading-relaxed text-sm">
            {"Real humans, fast answers. Whether you've hit a snag, want a hand setting up, or just have a question about your numbers — drop us a line."}
        </p>

        <div className="absolute left-[5%] top-[80px] hidden lg:block w-[320px]">
            <Image 
            src="/assets/deployed-assets/contact-cat-desk.png" 
            alt="Minty working" 
            width={320} 
            height={240} 
            className="w-full h-auto"
            />
        </div>
    </section>
  );
}