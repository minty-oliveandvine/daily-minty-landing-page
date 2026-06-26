export const contactContent = {
  hero: {
    tag: "We're here to help",
    title: "Talk to ",
    titleHighlight: "Minty.",
    description: "Real humans, fast answers. Whether you've hit a snag, want a hand setting up, or just have a question about your numbers — drop us a line.",
    imageAlt: "Minty working",
  },
  form: {
    heading: "Send us a message",
    subheading: "We typically reply within a few hours during business days.",
    fields: [
      { name: "name", label: "Your name", placeholder: "minty", required: true },
      { name: "email", label: "Email", placeholder: "you@business.com", required: true },
      { name: "businessName", label: "Business name", placeholder: "Optional", required: false },
      { name: "topic", label: "Topic", placeholder: "Pick one..", required: true },
      { name: "message", label: "How can we help?", placeholder: "Tell us a bit about...", required: true },
    ],
    privacyText: "By submitting, you agree to our privacy policy.",
    submitButton: "Send message →",
  },
  supportChannels: [
    {
      title: "Email us directly",
      description: "Replies usually within 4 hours. hello@minty.app →",
    },
    {
      title: "Chat in the app",
      description: "Tap the speech bubble in the bottom-right of the dashboard for live chat with our team. Open dashboard →",
    },
    {
      title: "Help centre",
      description: "Step-by-step guides, video walkthroughs, and answers to the most common questions. Browse articles →",
    },
  ],
  statusBar: {
    status: "normal",
    message: "All systems normal",
    detail: "No incidents reported in the last 24 hours. View status page →",
  },
};
