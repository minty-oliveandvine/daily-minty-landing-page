import { siteConfig } from './site';

export const landingContent = {
  hero: {
    title: 'Daily Minty',
    titleAccent: '',
    lede: 'No more lost receipts, no more missing numbers.',
    primaryCta: {
      label: 'Join Waitlist',
      href: siteConfig.waitlistUrl,
      external: true,
    },
    secondaryCta: {
      label: 'See how it works',
      href: '#solution',
    },
    trustText: {before: 'Sync directly with',highlighted: 'Xero'},
    imageAlt: 'Daily Minty hero image showing a cat with a laptop and phone',
    image: '/assets/deployed-assets/hero-cat-laptop-phone.png',
  },
  how: {
    title: 'Minty helps you close the day,',
    titleAccent: 'everyday.',
    subtitle: 'Four methods. One go-to dashboard. Zero spreadsheet trauma.',
    steps: [
      {
        num: 1,
        image: '/assets/deployed-assets/step1-cat-coins.png',
        alt: 'Enter today\'s numbers',
        title: 'Enter today\'s numbers',
        body: 'You\'ll be making and entering quickly in a clean, guided interface.',
      },
      {
        num: 2,
        image: '/assets/deployed-assets/cash.png',
        alt: 'Check the cash',
        title: 'Check the cash',
        body: 'Count your draw amount + Minty does the math along side you.',
      },
      {
        num: 3,
        image: '/assets/deployed-assets/box_minty.png',
        alt: 'Request payments',
        title: 'Request payments',
        body: 'Create, pay, and track payments + Minty keeps everyone aligned on bill payments.',
      },
      {
        num: 4,
        image: '/assets/deployed-assets/step3-cat-phone.png',
        alt: 'Get a clean daily report',
        title: 'Get a clean daily report',
        body: 'A clean, accurate summary that\'s ready to review, share or export.',
      },
    ],
  },
  problem: {
    tag: 'The Problem',
    headline: 'Stuck in a messy and\ntiring routine.',
    highlights: ['messy', 'tiring'],
    items: [
      'Rushed entries at closing',
      "Numbers don't match",
      'Extra time fixing mistakes',
      'Stress follows you home',
    ],
    imageAlt: 'A sad black cat sitting in a cardboard box surrounded by receipts representing feeling overwhelmed with business closing tasks',
    image: '/assets/deployed-assets/problem-cat-box.png'
  },
  outcome: {
  title: 'Daily closing feels',
  titleAccent: 'clear again.',
  cards: [
    {
      key: 'petty-cash',
      title: 'Petty Cash',
      image: '/assets/deployed-assets/landing_payment.png',
      alt: 'Petty cash placeholder',
      // Added design tokens for the first card
      icon: 'Wallet',
      bgColor: 'bg-[#00cbb2]',
      iconTextColor: 'text-[#00cbb2]',
      href: 'https://www.youtube.com/watch?v=3_TVkcyzEQs'
    },
    {
      key: 'bill-payment',
      title: 'Payment',
      image: '/assets/deployed-assets/landing_petty.png',
      alt: 'Bill payment placeholder',
      // Added design tokens for the second card
      icon: 'ReceiptText',
      bgColor: 'bg-[#0f2d37]',
      iconTextColor: 'text-[#0f2d37]',
      href: 'https://www.youtube.com/watch?v=fucuzlKQwDU'
    },
  ],
},
helpsYou: {
  title: 'Minty helps you to',
  cards: [
    {
      icon: 'CheckCircle', 
      alt: 'Checkmark icon',
      body: 'Account accurately, and less stress around daily figures.',
    },
    {
      icon: 'RefreshCw',
      alt: 'Sync circle icon',
      body: 'Trust your daily numbers and sync them directly to Xero.',
    },
    {
      icon: 'CreditCard', 
      alt: 'Plan card icon',
      body: 'Plan all your shop in one place.',
    },
  ],
},
demo: {
  badge: 'WATCH HOW IT WORKS',
  title: 'See Minty in action',
  subtitle: '',
  videoUrl: 'https://www.youtube.com/embed/LZVNOp6YTzE',
},
keepMeUpdated: {
  eyebrow: 'Interested?',
  title: 'Keep me updated',
  buttonText: 'Join the Waitlist',
  backgroundImage: '/assets/deployed-assets/sky.png',
  mascotImage: '/assets/deployed-assets/super.png',
  mascotAlt: 'Minty mascot superhero with red cape',
}
};
