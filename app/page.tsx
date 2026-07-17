import Image from "next/image";

export default function Home() {
  return (
    <>
    <main className="flex-1 bg-white">
      <section className="mx-auto w-full max-w-[1440px] px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[2fr_3fr]">
          <div>
            <h1 className="font-display text-5xl font-extrabold tracking-[-0.035em] whitespace-nowrap text-[#0f2d3a] sm:text-[clamp(56px,6vw,80px)]">
              Daily Minty
            </h1>
            <p className="mt-6 max-w-[320px] whitespace-pre-line text-[19px] font-display text-[#2c4754]">
              {"No more lost receipts,\nno more missing numbers."}
            </p>
            <a
              href="https://forms.clickup.com/9008167462/f/8ceveh6-19038/4A7KI514BG030HAP22"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-alive font-display mt-8 inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#00CBC6] to-[#00D5BF] px-9 py-5 text-[clamp(20px,2.4vw,28px)] font-bold text-white shadow-[0_10px_28px_rgba(0,203,198,0.38),inset_0_1px_0_rgba(255,255,255,0.35)] transition-all hover:from-[#00D8D3] hover:to-[#00E2CC] hover:shadow-[0_14px_32px_rgba(0,203,198,0.45),inset_0_1px_0_rgba(255,255,255,0.4)]"
            >
              Join Waitlist
            </a>
          </div>
          <div>
            <Image
              src="/daily.png"
              alt="Daily Minty"
              width={1374}
              height={773}
              sizes="(min-width: 1440px) 835px, (min-width: 1024px) 60vw, 100vw"
              className="h-auto w-full"
              quality={100}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fbe7d2]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <Image
                src="/problem.png"
                alt="The Problem"
                width={2526}
                height={1548}
                sizes="(min-width: 1440px) 696px, (min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full"
                quality={100}
              />
            </div>
            <div className="rounded-3xl bg-[#fff7ec] p-8 sm:p-10">
              <div className="inline-block rounded-full bg-[#f4d4b3] px-4 py-1.5">
                <span className="font-display text-xs font-bold tracking-wider text-[#d96a3a]">
                  THE PROBLEM
                </span>
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold text-[#0f2d3a] sm:text-4xl">
                Stuck in a <span className="text-[#d96a3a]">messy</span> and{" "}
                <br className="hidden lg:block" />
                <span className="text-[#d96a3a]">tiring</span> routine.
              </h2>
              <ul className="mt-8 space-y-4">
                {[
                  "Rushed entries at closing",
                  "Numbers don't match",
                  "Extra time fixing mistakes",
                  "Stress follows you home",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined flex-none text-2xl text-[#d96a3a]"
                      aria-hidden="true"
                    >
                      close
                    </span>
                    <span className="font-display text-base text-[#0f2d3a]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-24">
          <h2 className="font-display text-center text-4xl font-bold text-[#0f2d3a] sm:text-5xl">
            Minty helps you close the day,{" "}
            <br />
            everyday.
          </h2>
          <p className="mt-6 text-center text-base font-display text-[#0f2d3a]/60 sm:text-lg">
            Three methods. One go-to dashboard. Zero spreadsheet trauma.
          </p>
          <div className="mx-auto mt-16 grid max-w-[1140px] grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                img: "/numbers.png",
                width: 2400,
                height: 1933,
                title: "Enter today's numbers",
                description:
                  "You'll be making and entering quickly in a clean, guided interface.",
              },
              {
                img: "/cash.png",
                width: 2666,
                height: 1777,
                title: "Check the cash",
                description:
                  "Count your draw amount + Minty does the math along side you.",
              },
              {
                img: "/report.png",
                width: 2379,
                height: 1778,
                title: "Get a clean daily report",
                description:
                  "A clean, accurate summary that's ready to review, share or export.",
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="grid grid-rows-[auto_auto_auto_1fr] justify-items-center gap-3.5 rounded-[22px] border border-[#e7ddd0] bg-white px-6 py-7 text-center shadow-[0_1px_2px_rgba(15,45,58,0.04),0_2px_8px_rgba(15,45,58,0.04)]"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={step.img}
                    alt={step.title}
                    fill
                    sizes="(min-width: 1024px) 320px, 100vw"
                    className="object-contain"
                    quality={100}
                  />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d6efe8]">
                  <span className="font-display text-base font-bold text-[#24a08f]">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-display flex min-h-[2.4em] items-center text-[21px] font-bold text-[#0f2d3a]">
                  {step.title}
                </h3>
                <p className="font-display min-h-[4em] text-[15.5px] leading-[1.5] text-[#6b8088]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="waitlist"
        className="relative overflow-hidden bg-cover bg-center pt-20 text-white"
        style={{ backgroundImage: "url('/sky.png')" }}
      >
        <div className="mx-auto grid w-full max-w-[1140px] grid-cols-1 items-center gap-10 px-7 lg:min-h-[520px] lg:grid-cols-2">
          <div className="mx-auto w-full max-w-[440px] rounded-[28px] border border-white/45 bg-white/20 px-7 py-14 text-center shadow-[0_24px_60px_rgba(15,45,58,0.16),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-[18px] backdrop-saturate-[1.1] sm:px-14">
            <h2 className="font-display text-[clamp(44px,5vw,68px)] font-extrabold leading-[1.02] tracking-[-0.025em] text-[#0f2d3a]">
              <span className="mb-2.5 block font-sans text-[clamp(20px,1.8vw,26px)] font-medium tracking-normal text-[#0f2d3a]/70 italic">
                Interested?
              </span>
              Keep me updated
            </h2>
            <a
              href="https://forms.clickup.com/9008167462/f/8ceveh6-19038/4A7KI514BG030HAP22"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex items-center gap-3.5 rounded-full bg-gradient-to-r from-[#00CBC6] to-[#00D5BF] px-9 py-4 text-xl font-bold tracking-[-0.01em] text-white shadow-[0_12px_28px_rgba(0,203,198,0.42),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all hover:from-[#00D8D3] hover:to-[#00E2CC] hover:shadow-[0_16px_36px_rgba(0,203,198,0.52),inset_0_1px_0_rgba(255,255,255,0.5)]"
            >
              Join the Waitlist
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/20 transition-all group-hover:translate-x-1 group-hover:bg-white/30">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          </div>
          <div className="waitlist-float ml-auto flex w-full items-center justify-end lg:max-w-[620px]">
            <Image
              src="/super.png"
              alt="Minty mascot superhero with red cape"
              width={2372}
              height={1778}
              sizes="(min-width: 1024px) 620px, 100vw"
              quality={100}
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>
    </main>

    <footer className="border-t border-black/5 bg-[#fdf6ec] py-9">
      <div className="mx-auto flex max-w-[1140px] flex-wrap items-center px-7">
        <span className="text-[13px] text-[#6b8088]">
          © {new Date().getFullYear()}{" "}Olive &amp; Vine HK. All rights reserved.
        </span>
      </div>
    </footer>
    </>
  );
}
