// The owner's canonical curriculum code, e.g. "GS-07-02". It is the ONLY key: React key,
// open-state key, and the DOM id (#guide-GS-07-02) that deep links and the e2e order test use.
// Because GS-xx-yy sorts lexicographically into curriculum order, "rendered order == sorted
// order" is a one-line assertion - which is what stops the list drifting out of order again.
export interface GuideItem {
  code: string;
  title: string;
  /** The question a first-timer would actually ask. Omit to render no subline. */
  question?: string;
  /** mm:ss, read from the video itself. Absent while a guide is still unfilmed. */
  duration?: string;
  /** "" = scripted but not yet filmed; renders as a non-interactive "Coming soon" row. */
  videoUrl: string;
}

export interface GuideCallout {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  image: string;
  imageAlt: string;
}

export interface GuideGroup {
  /** The module code, "GS-00" ... "GS-08". */
  code: string;
  /** Anchor target for the desktop rail, e.g. "module-xero". */
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  items: GuideItem[];
  /** A full-width band rendered directly after this group. */
  callout?: GuideCallout;
  /** Tailwind background class. Only the banner group sets one; the list itself is white. */
  background?: string;
}

/** "GS-07-02" -> { module: 7, step: 2 }. Throws rather than silently mis-numbering a row. */
export function parseGuideCode(code: string): { module: number; step: number } {
  const m = /^GS-(\d{2})-(\d{2})$/.exec(code);
  if (!m) throw new Error(`Malformed guide code: "${code}" (expected GS-nn-nn)`);
  return { module: Number(m[1]), step: Number(m[2]) };
}

export const getStartedContent = {
  hero: {
    title: "Get started using",
    description: "Support guides and tutorials for first-time users — everything you need to be up and running today.",
    primaryBtn: "Try Minty for free",
    primaryBtnHref: "/pricing",
    secondaryBtn: "Log In",
    secondaryBtnHref: "",
    mascotSrc: "/guides/minty-mascot-glasses.webp",
  },
  benefits: {
    title: "What will you get from this page?",
    items: [
      {
        id: "01",
        text: "Complete your first proper daily closing today"
      },
      {
        id: "02",
        text: "Just follow the steps in order"
      },
      {
        id: "03",
        text: "No accounting knowledge required"
      }
    ]
  },
  // The guide curriculum. The order here IS the order on the page, and it is the owner
  // canonical GS-xx-yy sequence - do not reorder without moving the codes with it.
  //
  // Numbering is DERIVED, never typed: the step comes from the code (parseGuideCode) and
  // the module number from the group's position among groups that have items. That is
  // deliberate - the numbers used to live inside the title strings ("1. Daily Closing ..."),
  // which is how the list silently drifted out of order. e2e/learning.spec.ts pins it now.
  //
  // There is no GS-06 in the owner's list. Because module numbers are positional, the gap
  // is invisible to visitors and a future GS-06 renumbers everything for free.
  guideGroups: [
    {
      // Not a module: the title-only banner that opens the page, kept exactly as it was.
      code: "banner-login-otp",
      slug: "login-otp",
      eyebrow: "",
      title: "Login to Minty with OTP",
      subtitle: "Get started instantly with a simple one-time password login.",
      background: "bg-[#f3f9f7]",
      items: [],
      // Rendered as a full-width band directly after this banner.
      callout: {
        title: "Xero Integration",
        description: "Create Xero organisation to be used in Minty",
        buttonText: "View details",
        buttonHref: "/resources/xero-integration",
        image: "/guides/minty-xero.webp",
        imageAlt: "The Minty x Xero logo lockup",
      },
    },
    {
      code: "GS-00",
      slug: "module-basics",
      eyebrow: "Start with",
      title: "The Basics",
      subtitle: "What Minty is, and the first thing you\'ll create.",
      items: [
        {
          code: "GS-00-01",
          title: "What is Minty?",
          question: '"What does Minty actually do for me?"',
          duration: "0:39",
          videoUrl: "https://www.youtube.com/watch?v=muOqcQ-_pRc",
        },
        {
          code: "GS-00-02",
          title: "Creating Your First Entity",
          question: '"What\'s an entity, and how do I make one?"',
          duration: "1:23",
          videoUrl: "https://www.youtube.com/watch?v=8H5d3HPMVOo",
        },
      ],
    },
    {
      code: "GS-01",
      slug: "module-store",
      eyebrow: "Guides for",
      title: "Your Store Setup",
      subtitle: "One store, one entity - then make Minty look like yours.",
      items: [
        {
          code: "GS-01-01",
          title: "One Store, One Entity: Master Your Daily Closing by Store",
          question: '"I have more than one shop - how do I keep them apart?"',
          duration: "0:30",
          videoUrl: "https://www.youtube.com/watch?v=wVT0_64OW8I",
        },
        {
          code: "GS-01-02",
          title: "Making Minty Look Like Your Store",
          question: '"Can I set this up the way my shop actually works?"',
          duration: "0:39",
          videoUrl: "https://www.youtube.com/watch?v=ybS1Q_SY3gA",
        },
      ],
    },
    {
      code: "GS-02",
      slug: "module-xero",
      eyebrow: "Guides for",
      title: "Xero Settings",
      subtitle: "Why the connection matters, and how to make it.",
      items: [
        {
          code: "GS-02-01",
          title: "Why Minty Connects to Xero",
          question: '"Do I really need to connect Xero?"',
          duration: "0:32",
          videoUrl: "https://www.youtube.com/watch?v=lPe_kCPhDpQ",
        },
        {
          code: "GS-02-02",
          title: "Connecting Minty to Xero",
          question: '"How do I connect Minty to Xero?"',
          duration: "1:27",
          videoUrl: "https://www.youtube.com/watch?v=7CnOOOzlSrU",
        },
        {
          code: "GS-02-03",
          title: "When Xero Comes First",
          question: '"I\'m new to Minty - where should I start?"',
          duration: "0:43",
          videoUrl: "https://www.youtube.com/watch?v=owqwK3zfYho",
        },
      ],
    },
    {
      code: "GS-03",
      slug: "module-closing",
      eyebrow: "Guides for",
      title: "Your Daily Closing",
      subtitle: "The whole flow first, then the same thing step by step.",
      items: [
        {
          code: "GS-03-01",
          title: "The Daily Closing Flow, Explained",
          question: '"What happens when I close the day?"',
          duration: "0:30",
          videoUrl: "https://www.youtube.com/watch?v=nkjrKpBXWVo",
        },
        {
          code: "GS-03-02",
          title: "Daily Closing: Step by Step Overview",
          question: '"How do I close the day in Minty?"',
          duration: "1:00",
          videoUrl: "https://www.youtube.com/watch?v=xFKNPOxuYPo",
        },
      ],
    },
    {
      code: "GS-04",
      slug: "module-mismatches",
      eyebrow: "Guides for",
      title: "When Things Don\'t Add Up",
      subtitle: "Numbers that disagree, and days that slipped past you.",
      items: [
        {
          code: "GS-04-01",
          title: "When the Numbers Don\'t Agree",
          question: '"My numbers don\'t match - what now?"',
          duration: "0:47",
          videoUrl: "https://www.youtube.com/watch?v=lgCHne-AhZ8",
        },
        {
          code: "GS-04-02",
          title: "When Yesterday Slips Past You",
          question: '"What happens if I miss a day\'s closing?"',
          duration: "0:41",
          videoUrl: "https://www.youtube.com/watch?v=1389UDsTs-Y",
        },
      ],
    },
    {
      code: "GS-05",
      slug: "module-publishing",
      eyebrow: "Guides for",
      title: "Publishing and Status",
      subtitle: "Send the day across, and know which status it\'s in.",
      items: [
        {
          code: "GS-05-01",
          title: "Publishing a Daily Closing",
          question: '"How do I publish my daily closing?"',
          duration: "0:37",
          videoUrl: "https://www.youtube.com/watch?v=l7zkPbLfjbE",
        },
        {
          code: "GS-05-02",
          title: "Three Words for Three Moments",
          question: '"Which status should my closing be in?"',
          duration: "0:42",
          videoUrl: "https://www.youtube.com/watch?v=osczCj2qFBk",
        },
      ],
    },
    {
      code: "GS-07",
      slug: "module-payments",
      eyebrow: "Guides for",
      title: "Payment Requests",
      subtitle: "Request it, record it, and cancel it when it\'s wrong.",
      items: [
        {
          code: "GS-07-01",
          title: "Request Payment and Keep It on Track",
          question: '"How do I request a payment and track it?"',
          duration: "0:44",
          videoUrl: "https://www.youtube.com/watch?v=KEhW9LWVMFg",
        },
        {
          code: "GS-07-02",
          title: "Record Your Payment, Full / Partial",
          question: '"They only paid half - how do I record that?"',
          duration: "1:34",
          videoUrl: "https://www.youtube.com/watch?v=KEGGLKFz_Pw",
        },
        {
          code: "GS-07-03",
          title: "Voiding Incorrect Bills",
          question: '"I raised the wrong bill - how do I cancel it?"',
          duration: "0:35",
          videoUrl: "https://www.youtube.com/watch?v=jjTfSYQAy0E",
        },
      ],
    },
    {
      code: "GS-08",
      slug: "module-team",
      eyebrow: "Coming soon:",
      title: "Your Team",
      subtitle: "Roles, and the people who help you close. Both of these are in production.",
      items: [
        {
          code: "GS-08-01",
          title: "Understanding User Roles in Minty",
          question: '"Who on my team can see and do what?"',
          videoUrl: "",
        },
        {
          code: "GS-08-02",
          title: "Adding the People Who Help You Close",
          question: '"How do I invite my staff?"',
          videoUrl: "",
        },
      ],
    },
  ] as GuideGroup[],
  xeroGuide: {
    title: "Connecting and Managing Xero Integration in Minty",
    videoThumbnail: "/guides/GS-02-02.webp",
    videoUrl: "https://www.youtube.com/watch?v=7CnOOOzlSrU",
    duration: "1:27",
    videoNote: "IF ANY...",
    items: [
      {
        id: "connect",
        question: "Let's connect Minty to Xero",
        answer: [
          "Ready to link Minty with Xero? Let's do it together. First, log in to Minty and either create a new entity or pick one you already have. Once your entity is ready, open the module you'd like to work with, click the three-line menu in the top-right corner, and head to Settings. From there, choose Entity & Integration and click Connect to Xero. I'll take you over to Xero, where you'll log in and choose the organization you'd like to manage right on the Allow Access screen. Give it the go-ahead, and that's it. You and Xero are linked and ready to sync.",
        ],
      },
      {
        id: "what-happens",
        question: "What happens inside of Minty when I connect?",
        answer: [
          "Curious what happens after you click Connect to Xero? Here's the honest play-by-play. Once you log in and approve access on Xero's screen, which is where you pick your organization rather than inside Minty, Xero sends me back a one-time code. I swap that code for a secure access token, along with a refresh token to keep things running, then read the connection Xero just opened and lock in the organization it points to. One small heads-up: if you approve more than one organization at once, I only keep the first, so be sure to approve just the one you want. From there, I remember that pairing on my side and quietly attach it to every request I make. Whenever my access expires, I renew it in the background so you stay connected without lifting a finger. Nothing else travels back to Xero, and your tokens and organization stay safely with me.",
        ],
      },
      {
        id: "how-do-i-know",
        question: "How do I know it's connected?",
        answer: [
          "Once we're connected, you can check things from either side with no guesswork. Over in Minty, I'll show you right away which Xero organization is linked to your entity, right there on the settings card. In Xero, you can confirm the same by opening Manage Connected Apps (just click the nine dots in the top-left corner), where you'll find \"Minty\" already listed and can disconnect anytime. One honest note: disconnecting from the Xero side will disconnect me too, though not at the exact moment you do it. I notice the change the next time I refresh a page, so it may take a little while to catch up.",
        ],
      },
      {
        id: "rules",
        question: "Are there any rules I should know?",
        answer: [
          "A few firm ground rules keep everything safe and in sync.",
          "First, it's one organization to one entity. A Xero organization can be linked to just one Minty entity at a time, so if someone else tries to connect it, even a fellow member of that same organization, I'll turn the request down and hand the access back to Xero. Your Connected Apps page will show the refusal too. One thing to watch: if you connect an organization that's already linked to another of your own entities, I'll quietly move the link over to the new one, so double-check which entity you're connecting.",
          "Second, you'll need to use the same account. Always connect with the very same Xero account you used to sign in to Minty. If the two don't match, I'll refuse the connection, undo the access Xero just granted, and show you an error naming both addresses. This one is a firm requirement rather than a friendly suggestion.",
          "Finally, invitations are personal. Only the exact address that received a Minty invitation can accept it, so opening the link while signed in under a different email simply won't work.",
        ],
      },
      {
        id: "chart-of-accounts",
        question: "Why do only certain charts of account show up?",
        answer: [
          "Wondering why the account list looks the way it does? Most of your Xero accounts are yours to pick, and that even includes locked system accounts like Bank Revaluations, Accounts Receivable, and Accounts Payable. I work with those and send them across to Xero for you, so they stay on the list. The only accounts I leave off are the ones Xero locks against direct posting, such as Realised Currency Gains, Sales Tax, Historical Adjustment, Rounding, and Retained Earnings. Choosing one of those would only lead to an error, so I filter them out ahead of time and leave you with the accounts you can actually use.",
        ],
      },
    ],
  },
faqSection: {
    title: "Xero Integration FAQ",
    subtitle: "Cannot connect to Xero? I'm here to help.",
    faqBox: {
      title: "Xero Integration FAQ",
      buttonText: "Minty FAQ",
      items: [
        {
          id: 1,
          question: "How do I disconnect from Xero?",
          answer: "No hard feelings, disconnecting is quick and you can do it from either side. If you'd like to unlink from within Minty, just click the Disconnect button and I'll close the Xero connection at the same time. If you'd rather do it from Xero, head to Manage Connected Apps and click Disconnect there, which unlinks Minty right along with it. Either way, both sides disconnect together, so you only ever need to do it once."
        },
        {
          id: 2,
          question: "What does the integration not cover?",
          answer: "Great question, and I like being upfront about where I stop. I keep connections strictly one-to-one, so a single Xero organization only ever links to one Minty entity. I also won't connect if you're signed in to Xero as a different person than the one who clicked, since the two have to match. Invitations stay personal too, so only the exact address an invite was sent to can accept it. When it comes to your data, I never delete your Xero contacts. I only add and update, so nothing goes missing by accident. In certain pickers, like expense and owner accounts, I quietly leave out the accounts Xero manages on its own. There aren't any sync settings to fiddle with either, since I handle the timing myself. If there's something specific you're wondering whether I handle, just ask and I'll always tell you straight."
        },
        {
          id: 3,
          question: "Where do payment processing fees show up in Xero?",
          answer: "Whenever you publish from Minty, I tuck each transaction into the right spot in Xero for you. Publish from the petty cash module and I'll record it under Spend & Receive Money, where you can check it anytime under Cash In & Out on your Xero Home page. Every petty cash transaction shows up there, sorted by its type. Publish from the payment module and I'll post it to Bills instead, so just open the Bills page in Xero and your recorded transaction will be waiting there."
        },
        {
          id: 4,
          question: "How do I reconcile my sales data in Xero?",
          answer: "Reconciling happens over in Xero, and the path depends on which module you're using. For the payment module, I keep it hands-off. I pull your bank feed and drop it straight onto your Xero bank statement, so you can head there and reconcile right away. The petty cash module takes one extra step to reach the bank statement. Once you publish from Minty, your entries land on Xero's Account Transactions page. From there, export them as a CSV, then import that CSV into your bank statement page, and now you can reconcile them in Xero just like everything else."
        },
        {
          id: 5,
          question: "When does my data sync, and is there anything I can adjust?",
          answer: "Here's the honest rundown. I don't run a constant real-time stream. Instead, I move data at two natural moments. Coming in from Xero, I keep a local copy of your chart of accounts and contacts so pages load fast. I download everything when you first connect, then quietly refresh it as you visit the relevant pages, updating only what's actually changed. I never delete a contact, so I only ever add and update. Going out to Xero, your transactions are sent when you Publish a report, which I handle in the background so you're never left waiting. Behind the scenes I keep the connection alive on my own, and your access renews automatically whenever it's needed. Apart from connecting and logging in, there are no sync settings for you to manage. I take care of the timing."
        }
      ]
    },
    supportCards: [
      {
        type: "support",
        icon: "✉", 
        title: "Contact support",
        description: "Contact Olive and Vine Consulting for more information, personalised help, or to book an hour with a specialist.",
        linkText: "Send a message",
        href: "/resources/contact"
      },
      {
        type: "videos",
        icon: "▶",
        title: "Watch video guides",
        description: "Follow along with a curated walkthrough covering every part of Minty — perfect for visual learners.",
        linkText: "Browse videos",
        href: "#guide"
      }
    ]
  }
};

// Fail loudly on a malformed curriculum, but only in development: this module is imported by a
// 'use client' component, so throwing in production would white-screen the page for a visitor
// over a typo. In dev it surfaces the moment you save.
if (process.env.NODE_ENV !== "production") {
  const seen = new Set<string>();
  for (const group of getStartedContent.guideGroups) {
    for (const item of group.items) {
      parseGuideCode(item.code);
      if (!item.code.startsWith(`${group.code}-`)) {
        throw new Error(`${item.code} is filed under group ${group.code}`);
      }
      if (seen.has(item.code)) throw new Error(`Duplicate guide code ${item.code}`);
      seen.add(item.code);
      if (item.videoUrl && !item.duration) {
        throw new Error(`${item.code} has a video but no duration`);
      }
      if (!item.videoUrl && item.duration) {
        throw new Error(`${item.code} has a duration but no video`);
      }
    }
  }
}