// 1. Define internal structural layout types for standard lists
export type ListItem = 
  | string 
  | { strong: string; text: string };

// 2. Define block types to mirror your FaqAccordion component's switch-case statement
export type PermissionRow = {
  name: string;
  roles: { CASHIER: boolean; 'SHOP MANAGER': boolean; ACCOUNTANT: boolean; ADMIN: boolean };
};

export type FaqBlock =
  | { type: 'p'; text: string }
  | { type: 'p-strong'; text: string }
  | { type: 'ul'; items: ListItem[] }
  | { type: 'ol'; items: string[] }
  | { type: 'permissions-table'; permissions?: PermissionRow[] };

export interface FaqItem {
  id: string;
  category: 'beginner' | 'intermediate' | 'accountant';
  question: string;
  wide?: boolean; 
  body: FaqBlock[];
}

export const landingFaq: FaqItem[] = [
  {
    id: 'not-finished',
    category: 'beginner',
    question: "I didn't finish today's closing. Is that okay?",
    wide: false,
    body: [
      { 
        type: 'p', 
        text: "Yes, that is completely fine! Minty saves your progress automatically. You can jump back in tomorrow morning and pick up exactly right where you left off without losing any drawer records." 
      }
    ]
  },
  {
    id: 'closing-time',
    category: 'beginner',
    question: "Do I have to close at the same time every day?",
    wide: false,
    body: [
      { 
        type: 'p', 
        text: "No. While consistency helps your business rhythms, Minty processes shifts dynamically. You can close out your numbers whenever your operating doors officially lock for the day." 
      }
    ]
  },
  {
    id: 'skip-day',
    category: 'beginner',
    question: "What happens if I skip a day?",
    wide: false,
    body: [
      { 
        type: 'p', 
        text: "Minty flags the day as an inactive sequence. When you run your next closing session, you can choose to group the historical roll-forward values or account for them separately." 
      }
    ]
  },
  {
    id: 'exact-numbers',
    category: 'beginner',
    question: "Do the numbers need to be exact?",
    wide: false,
    body: [
      { 
        type: 'p', 
        text: "Ideally yes, but small cash drawer discrepancies happen. Minty logs variances transparently under a 'Safe Discrepancy Margin' field so your bank deposit sheets remain balanced." 
      }
    ]
  },
  {
    id: 'dont-match',
    category: 'beginner',
    question: "What if numbers don't match exactly?",
    wide: false,
    body: [
      { 
        type: 'p', 
        text: "Don't panic. Minty walks you through a short reconciliation checklist to pinpoint where the cash, terminal credit cards, or petty voucher entries strayed off course." 
      }
    ]
  },
  {
    id: 'change-numbers',
    category: 'beginner',
    question: "Can Minty change my numbers without me knowing?",
    wide: false,
    body: [
      { 
        type: 'p', 
        text: "Absolutely not. Minty acts purely as an immutable Ledger Ledger Ledger interface mirror. Your logged balances can never be modified or changed automatically behind the scenes." 
      }
    ]
  },
  {
    id: 'no-receipt',
    category: 'beginner',
    question: "What if I don't have a receipt?",
    wide: false,
    body: [
      { 
        type: 'p', 
        text: "You can write a digital memo voucher inside the application describing the itemization, cost, and purpose to successfully offset cash balancing checks." 
      }
    ]
  },
  {
    id: 'same-day-upload',
    category: 'beginner',
    question: "Do receipts have to be uploaded on the same day?",
    wide: false,
    body: [
      { 
        type: 'p', 
        text: "Not necessarily. While immediate snapshots avoid lost papers, you can queue uploaded receipts into your open balancing workflows at any point during the current tracking week." 
      }
    ]
  },
  {
    id: 'something-off',
    category: 'beginner',
    question: "Will I get in trouble if something is off?",
    wide: false,
    body: [
      { 
        type: 'p', 
        text: "No, Minty is a helpful operational tool, not a strict monitoring authority. Discrepancies simply display as clear adjustments so you and your accountant have complete clarity." 
      }
    ]
  },
  {
    id: 'monitoring-shop',
    category: 'beginner',
    question: "Is Minty monitoring or controlling my shop?",
    wide: false,
    body: [
      { 
        type: 'p', 
        text: "Minty does not control store POS machines or banking terminals. We only receive and organize structural accounting balance sheets that you explicitly submit." 
      }
    ]
  },
  {
    id: 'customer-support',
    category: 'beginner',
    question: "When should I contact customer support?",
    wide: false,
    body: [
      { 
        type: 'p', 
        text: "Anytime you run into internal server sync issues, math system glitches, or if you need general help sorting out a complex, historical ledger lock error!" 
      }
    ]
  },

  {
    id: 'split-shifts',
    category: 'intermediate',
    question: "How do I balance split-shifts or mid-day drawer handoffs?",
    wide: false,
    body: [
      { type: 'p', text: "Intermediate workflows allow mid-day drops. You can perform an intermediate snapshot audit trail without completely finalizing or closing the daily store lifecycle window." }
    ]
  },


  {
    id: 'export-ledger',
    category: 'accountant',
    question: "Can I export formatted journals directly into QuickBooks or Xero?",
    wide: true,
    body: [
      { type: 'p-strong', text: "Yes. System compliance data downloads cleanly into standardized CSV/XLS format matrices built for direct general ledger injection maps." }
    ]
  },

  {
    id: 'user-permissions',
    category: 'accountant',
    question: "Why do different users see different things in Minty?",
    wide: true,
    body: [
      {
        type: 'p',
        text: "Minty uses role-based permissions so each user sees only what they need. This prevents mistakes and reduces confusion."
      },
      {
        type: 'permissions-table',
        permissions: [
          { name: 'Prepare daily report', roles: { CASHIER: true, 'SHOP MANAGER': true, ACCOUNTANT: true, ADMIN: true } },
          { name: 'View daily report you created', roles: { CASHIER: true, 'SHOP MANAGER': true, ACCOUNTANT: true, ADMIN: true } },
          { name: 'View daily report of the whole shop', roles: { CASHIER: false, 'SHOP MANAGER': true, ACCOUNTANT: true, ADMIN: true } },
          { name: 'Sales method setting', roles: { CASHIER: false, 'SHOP MANAGER': false, ACCOUNTANT: true, ADMIN: true } },
          { name: 'Expense code setting', roles: { CASHIER: false, 'SHOP MANAGER': false, ACCOUNTANT: true, ADMIN: true } },
          { name: 'Publish to Xero', roles: { CASHIER: false, 'SHOP MANAGER': false, ACCOUNTANT: true, ADMIN: true } },
          { name: 'Connect & disconnect to Xero', roles: { CASHIER: false, 'SHOP MANAGER': false, ACCOUNTANT: false, ADMIN: true } }
        ]
      }
    ]
  },
];