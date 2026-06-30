'use client';

import { useState, useEffect } from 'react';
import { Zap, Settings, BarChart3 } from 'lucide-react';
import { Sprout } from 'lucide-react';

const faqDatabase = {
  beginner: [
    { q: "Q. I didn't finish today's closing. Is that okay?", a: "Yes, that's completely fine! Daily Minty allows you to save drafts or backdate entry inputs." },
    { q: "Q. Do I have to close at the same time every day?", a: "Not at all. You can complete your closing review at whatever hour works best for your operational workflows." },
    { q: "Q. What happens if I skip a day?", a: "Skipping a day won't break your system. Daily Minty alerts you of any untracked calendar dates." },
    { q: "Q. Do the numbers need to be exact?", a: "While aiming for exact numbers is great, Minty allows you to log discrepancies clearly under overages/shortages." },
    { q: "Q. What if numbers don't match exactly?", a: "If your physical drawer count contradicts recorded sales, our flow guides you to record a discrepancy adjustment." },
    { q: "Q. Can Minty change my numbers without me knowing?", a: "Never. All records require explicitly signed confirmation and full audit history tracking." },
    { q: "Q. What if I don't have a receipt?", a: "You can flag petty cash expenses as 'Missing Proof' while still documenting the expense category." },
    { q: "Q. Do receipts have to be uploaded on the same day?", a: "Nope. You can snap photos on the fly or go back later to add attachments directly into historical logs." },
    { q: "Q. Will I get in trouble if something is off?", a: "Mistakes happen! Minty is built to find and flag variance anomalies gracefully as an internal helper tool." },
    { q: "Q. Is Minty monitoring or controlling my shop?", a: "No, Daily Minty behaves strictly as a local software platform supporting point-of-sale verification tracking." },
    { q: "Q. When should I contact customer support?", a: "Anytime you hit a snag! Our support specialists are standing by for sync discrepancies or workflow tips." }
  ],
  intermediate: [
    { q: "Q. How do I configure custom petty cash categories?", a: "Head to settings to provision unique operational tags to separate different recurring ledger streams." },
    { q: "Q. Can we link multiple bank terminal floats?", a: "Yes, advanced configurations support splitting cash handling profiles by distinct registers." }
  ],
  accountant: [
    { q: "Q. What if Minty and Xero show different numbers?", a: "Differences usually occur due to unposted batch items. Check your sync logs to verify completed transfers." },
    { q: "Q. How does the full ledger reconciliation export match up?", a: "Exports map into industry-standard formats, providing cash flow breakdowns and tax adjustments." }
  ]
};

export default function FAQCategories({ openId }: { openId?: string | null }) {
  const [activeTab, setActiveTab] = useState<'beginner' | 'intermediate' | 'accountant'>('beginner');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openId) {
      const decodedId = decodeURIComponent(openId).toLowerCase();

      // Search across all tabs to find the matching question
      for (const tab of ['beginner', 'intermediate', 'accountant'] as const) {
        const itemIndex = faqDatabase[tab].findIndex((item) => {
          const questionText = item.q.toLowerCase().replace('q. ', '');
          return questionText === decodedId || decodedId.includes(questionText) || questionText.includes(decodedId);
        });

        if (itemIndex !== -1) {
          setActiveTab(tab);
          setOpenIndex(itemIndex);
          // Scroll to the item after a brief delay to ensure DOM is updated
          setTimeout(() => {
            const element = document.getElementById(`faq-item-${itemIndex}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 150);
          break;
        }
      }
    }
  }, [openId]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      {/* Tab Navigation */}
      <div className="flex flex-col items-center mb-12">
        <div className="inline-flex bg-[#edf7f5] p-1.5 rounded-full border border-[#d6eae4] shadow-inner">
          {(['beginner', 'intermediate', 'accountant'] as const).map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setOpenIndex(null);
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#00CBB0] text-white shadow-[0_4px_12px_rgba(0,203,176,0.3)]'
                    : 'text-[#1e3a47] hover:bg-white/50'
                }`}
              >
                {/* Render exact graphics based on tab key matching design image_af6ba6.png */}
                {tab === 'beginner' && (
                  <span className="text-base" role="img" aria-label="sprout">🌱</span>
                )}
                {tab === 'intermediate' && (
                  <span className="text-base" role="img" aria-label="gear">⚙️</span>
                )}
                {tab === 'accountant' && (
                  <span className="text-base" role="img" aria-label="chart">📊</span>
                )}

                {/* Display Text Label */}
                <span>
                  {tab === 'beginner' ? 'Beginner' : tab === 'intermediate' ? 'Intermediate' : 'Accountant'}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-gray-400 text-sm mt-4">
          {activeTab === 'beginner' && "New to Minty? Start here — the everyday basics of closing your day."}
          {activeTab === 'intermediate' && "Optimize operations — workflows, tracking codes, and team control options."}
          {activeTab === 'accountant' && "Deep dives — bookkeeper workflows, reconciliation tools, and data mapping."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 items-start">
        {faqDatabase[activeTab].map((item, index) => (
          <div
            key={index}
            id={`faq-item-${index}`}
            className={`bg-white border rounded-2xl p-5 cursor-pointer transition-all h-fit ${
              openIndex === index ? 'border-[#00CBB0] shadow-sm' : 'border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex justify-between items-center gap-4">
              <span className="text-[#00CBB0] font-bold text-[13px]">{item.q}</span>
              <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 font-bold text-lg ${
                openIndex === index ? 'bg-[#00CBB0] text-white' : 'bg-[#00CBB0] text-white'
              }`}>
                <span className="transform -translate-y-[2px] select-none">
                  {openIndex === index ? '−' : '+'}
                </span>
              </div>
            </div>
            {openIndex === index && (
              <p className="mt-4 text-gray-500 text-xs leading-relaxed pt-4">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}