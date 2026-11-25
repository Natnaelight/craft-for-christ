export const site = {
  name: "Craft for Christ",
  tagline: "Wear your faith.",
  description: "Faith-inspired clothing, made for everyday life.",
  nav: [
    { label: "Shop", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  hero: {
    eyebrow: "New collection",
    titleStart: "Wear your",
    titleAccent: "faith",
    subtitle:
      "Thoughtfully made clothing that carries a quiet message, designed for church, work, and everything in between.",
    primaryCta: { label: "Shop the collection", href: "/products" },
    secondaryCta: { label: "Our story", href: "/about" },
    // When you have a photo, put it in /public (e.g. "/hero.jpg") and set it here.
    image: null as string | null,
    imageAlt: "Craft for Christ collection",
  },

  // PLACEHOLDER COPY: confirm each one is true for your business before launch.
  values: [
    {
      icon: "lock",
      title: "Secure payment",
      text: "Pay safely online with Chapa.",
    },
    {
      icon: "truck",
      title: "Delivery across Ethiopia",
      text: "Addis Ababa and other regions.",
    },
    {
      icon: "cross",
      title: "Faith-inspired designs",
      text: "Made to be worn every day.",
    },
  ],

  // PLACEHOLDER COPY: replace with your real story.
  story: {
    title: "Clothing with a purpose",
    verse:
      "Let your light so shine before men, that they may see your good works.",
    verseRef: "Matthew 5:16 (KJV)",
    paragraphs: [
      "Craft for Christ is clothing made to be worn on ordinary days: to church, to work, to the market, and everywhere in between.",
      "Each piece carries a quiet message of faith, so what you wear can start a conversation without saying a word.",
    ],
  },
};
