export interface PriceDetails {
  currency: string;
  amount: string | number;
  unit: string;
}

export interface CtaDetails {
  label: string;
  href: string;
}

export interface PricingPlan {
  key: string;
  name: string;
  thumbSrc: string;
  isPopular: boolean;
  popularTag?: string;
  tagline: string;
  strikePrice: PriceDetails;
  meta: string;
  trialNote: string;
  cta: CtaDetails;
  featuresHeading: string;
  features: string[];
}

export const landingPricing: PricingPlan[] = [
  {
    key: 'petty-cash',
    name: 'Petty Cash',
    thumbSrc: '/assets/deployed-assets/sub-petty-cash.png', // Main register illustration
    isPopular: false,
    tagline: 'Track every dollar in and out of the till — receipts, floats, and daily reconciliation.',
    strikePrice: {
      currency: 'HKD',
      amount: '280',
      unit: '/mo'
    },
    meta: 'per shop, billed monthly\nSingle service subscription.',
    trialNote: 'Free trial for the first 30 days, then HKD 280/mo.',
    cta: {
      label: 'Join Waitlist',
      href: '/auth/signup?plan=petty-cash'
    },
    featuresHeading: 'What you get:',
    features: [
      'Daily petty cash',
      'Cash flow & PDF report',
      'Xero sync (cash entries)',
      'Team invites & roles'
    ]
  },
  {
    key: 'bill-payment',
    name: 'Bill Payment',
    thumbSrc: '/assets/deployed-assets/sub-bill-payment.png', // Bill & cash illustration
    isPopular: false,
    tagline: 'Schedule supplier bills, log payments, and never miss a due date.',
    strikePrice: {
      currency: 'HKD',
      amount: '280',
      unit: '/mo'
    },
    meta: 'per shop, billed monthly\nSingle service subscription.',
    trialNote: 'Free trial for the first 30 days, then HKD 280/mo.',
    cta: {
      label: 'Join Waitlist',
      href: '/auth/signup?plan=bill-payment'
    },
    featuresHeading: 'What you get:',
    features: [
      'Bill scheduling & reminder',
      'Supplier & vendor directory',
      'Payment logging & proof upload',
      'Payables & PDF reports',
      'Xero sync (bills & payments)',
      'Team invites & roles'
    ]
  },
  {
    key: 'super-minty',
    name: 'Super Minty',
    thumbSrc: '/assets/deployed-assets/sub-super-minty.png', // Combined master card illustration
    isPopular: true,
    popularTag: 'BEST VALUE',
    tagline: 'Both services, one bill — add the second for just HKD 120 more.',
    strikePrice: {
      currency: 'HKD',
      amount: '400',
      unit: '/mo'
    },
    meta: 'Petty Cash + Bill Payment, billed monthly.',
    trialNote: 'Free trial for the first 30 days, then HKD 400/mo.',
    cta: {
      label: 'Join Waitlist',
      href: '/auth/signup?plan=super-minty'
    },
    featuresHeading: 'Everything in both services:',
    features: [
      'Everything from Petty Cash',
      'Everything from Bill Payment',
      'Xero sync (full)',
      'Multi-shop management',
      'Team invites & roles'
    ]
  }
];