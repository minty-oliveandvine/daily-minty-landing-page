export interface GuideItem {
  id: number;
  category: string;
  duration: string;
  title: string;
  description: string;
  badge: string;
  videoThumbnail: string;
  videoUrl: string;
}

export const getStartedContent = {
  hero: {
    title: "Get started using",
    description: "Support guides and tutorials for first-time users — everything you need to be up and running today.",
    primaryBtn: "Try Minty for free",
    primaryBtnHref: "/pricing",
    secondaryBtn: "Log In",
    secondaryBtnHref: "",
    mascotSrc: "/assets/deployed-assets/minty-mascot-glasses.png",
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
  // Guides are grouped by module. Each group renders as its own band with its
  // own background colour; `eyebrow` is the dark prefix before the teal title,
  // and a group with no eyebrow/subtitle shows just its title (see login-otp).
  //
  // TODO: ids must stay unique across ALL groups — the player keys its open
  // state off them. Videos below are the three we have; the remaining cards
  // reuse them as placeholders until per-module recordings are supplied.
  guideGroups: [
    {
      id: "login-otp",
      eyebrow: "",
      title: "Login to Minty with OTP",
      subtitle: "Get started instantly with a simple one-time password login.",
      // The original benefits band's tint.
      background: "bg-[#f3f9f7]",
      // Empty on purpose — this band is a title-only banner, no guide cards.
      items: [] as GuideItem[],
      // Rendered as a full-width band directly after this group.
      callout: {
        title: "Xero Integration",
        description: "Create Xero organisation to be used in Minty",
        buttonText: "View details",
        buttonHref: "/resources/xero-integration",
        image: "/assets/deployed-assets/minty_xero.png",
        imageAlt: "The Minty x Xero logo lockup",
      },
    },
    {
      id: "petty-cash",
      eyebrow: "Guides for",
      title: "Petty Cash Module",
      subtitle: "Short, practical tutorials to help you master Minty step by step.",
      background: "bg-[#FBF7F0]",
      items: [
        {
          id: 6,
          category: "Coming Soon",
          duration: "0:00 sec",
          title: "Coming Soon",
          description: 'Coming Soon',
          badge: "",
          videoThumbnail: "",
          videoUrl: ""
        },
        // {
        //   id: 2,
        //   category: "Getting Started",
        //   duration: "0:42 sec",
        //   title: "2. Request Payment and keep it on track",
        //   description: '"How do I connect Minty account with other accounting systems?"',
        //   badge: "",
        //   videoThumbnail: "/assets/deployed-assets/GS-07-01.png",
        //   videoUrl: "https://www.youtube.com/watch?v=Uku-S8hNs6c"
        // },
      ],
    },
    {
      id: "payment-request",
      eyebrow: "Guides for",
      title: "Payment Request Module",
      subtitle: "Short, practical tutorials to help you master Minty step by step.",
      background: "bg-white",
      items: [
        {
          id: 4,
          category: "Getting Started",
          duration: "0:43 sec",
          title: "1. Request Payment and keep it on track",
          description: '"How do I connect Minty account with other accounting systems?"',
          badge: "",
          videoThumbnail: "/assets/deployed-assets/GS-07-01.png",
          videoUrl: "https://www.youtube.com/watch?v=Uku-S8hNs6c"
        },
         {
          id: 5,
          category: "Getting Started",
          duration: "0:34 sec",
          title: "2. Void Incorrect Bills",
          description: '"How do I connect Minty account with other accounting systems?"',
          badge: "",
          videoThumbnail: "/assets/deployed-assets/GS-07-03.png",
          videoUrl: "https://www.youtube.com/watch?v=TtO_HbNOLyM"
        },
      ],
    },
    {
      id: "settings",
      eyebrow: "Guides for",
      title: "Xero Settings",
      subtitle: "Short, practical tutorials to help you master Minty step by step.",
      background: "bg-[#F1F6F8]",
      items: [
        {
          id: 1,
          category: "Getting Started",
          duration: "0:43 sec",
          title: "1. When Xero Comes First",
          description: '"I\'m new to Minty - where should I start?"',
          badge: "",
          videoThumbnail: "/assets/deployed-assets/GS-02-03.png",
          videoUrl: "https://www.youtube.com/watch?v=1AwgfXOV-k0"
        },
        
      ],
    },
  ],
  xeroGuide: {
    title: "Connecting and Managing Xero Integration in Minty",
    videoThumbnail: "/assets/deployed-assets/GS-02-02.png",
    videoUrl: "https://youtu.be/02fYdxjx6j8",
    duration: "1:26",
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