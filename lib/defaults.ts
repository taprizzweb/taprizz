import type { SiteContent } from "./types";

// Placeholder copy — everything here is editable from /admin.
export const defaultContent: SiteContent = {
  settings: {
    brand: "Taprizz",
    whatsapp: "919672999166",
    email: "taprizz.india@gmail.com",
    phone: "+91 96729 99166",
    city: "Jaipur, Rajasthan",
    upiId: "9672999166@fam",
    upiName: "Taprizz",
    announcement: "Now onboarding a limited number of premium businesses in Jaipur · 1-Year Plaque Warranty on Plus Retainer",
    introVideo: "/videos/launch-promo.mp4",
    fullDemoVideo: "/videos/full-demo.mp4",
    demoBusiness: "Your Business Name",
  },
  hero: {
    eyebrow: "The AI Review Engine for Premium Businesses",
    title: "One tap turns a happy guest into a",
    highlight: "5-star Google review.",
    subtitle:
      "Taprizz is the highest-security AI review bot, delivered on a beautifully crafted NFC plaque. Built only for premium businesses that care how they are seen on Google.",
    cta: "Get Your Plaque",
    stats: [
      { value: "1 Tap", label: "to start a review" },
      { value: "30 sec", label: "average completion" },
      { value: "1 Year", label: "plaque warranty on Plus" },
      { value: "24/7", label: "priority support on Plus" },
    ],
  },
  importance: {
    title: "Why reviews decide who wins your customers",
    subtitle: "Watch the 1:40 story, then see the full product demo right below.",
    points: [
      { title: "Google is your new storefront", text: "Most guests read reviews before they ever walk in. Your rating is your first impression." },
      { title: "Happy guests stay silent", text: "Satisfied customers rarely write reviews on their own. A one-tap flow removes the friction." },
      { title: "Fresh reviews lift rankings", text: "Steady, recent, keyword-rich reviews help you show up higher in local search." },
      { title: "Premium deserves premium proof", text: "A refined plaque on your table or counter tells guests you take your reputation seriously." },
    ],
  },
  showcase: {
    title: "Meet the Taprizz Plaque",
    subtitle: "Crafted to sit beautifully on any premium counter, table or reception.",
    steps: [
      { title: "Crafted to be noticed", text: "A refined finish that matches luxury interiors rather than fighting them." },
      { title: "One tap, no app", text: "Built-in NFC chip opens your review page instantly on any modern phone." },
      { title: "QR as a backup", text: "Every plaque also carries a QR code, so no guest is ever left out." },
      { title: "Made to last", text: "Durable material and print. Plus Retainer adds a 1-year replacement warranty." },
    ],
  },
  how: {
    title: "How Taprizz works",
    steps: [
      { title: "Tap", text: "Guest taps their phone on the plaque or scans the QR." },
      { title: "Rate", text: "They pick a star rating and tap a few quick options about their visit." },
      { title: "AI writes", text: "Taprizz AI turns their taps into a natural, keyword-aware review." },
      { title: "Post", text: "One more tap and they land on your Google review page, ready to post." },
    ],
  },
  demo: {
    title: "Try the guest experience",
    subtitle: "This is exactly what your customers will see. Tap the options.",
    question: "What did you enjoy most?",
    options: ["Ambience", "Warm service", "Great view", "Quality", "Cleanliness", "Perfect for photos"],
  },
  comparison: {
    title: "Taprizz vs. the usual ways",
    subtitle: "See why premium owners choose a managed plaque over a plain QR sticker.",
    columns: ["Taprizz", "Plain QR sticker", "Asking manually"],
    rows: [
      { feature: "One-tap NFC + QR", values: ["Yes", "QR only", "No"] },
      { feature: "AI-written, keyword-aware review", values: ["Yes", "No", "No"] },
      { feature: "Custom page for your business", values: ["Yes", "No", "No"] },
      { feature: "Premium plaque design", values: ["Yes", "Paper / sticker", "-"] },
      { feature: "Detailed reports (Plus)", values: ["Yes", "No", "No"] },
      { feature: "1-year replacement (Plus)", values: ["Yes", "No", "-"] },
      { feature: "Works without staff effort", values: ["Yes", "Partly", "No"] },
    ],
  },
  products: [
    {
      id: "plaque-classic",
      name: "Taprizz Graphite Plaque",
      tagline: "Elegant graphite NFC + QR Google review plaque",
      price: 1499,
      discount: 0,
      salePrice: 1199,
      images: [],
      stock: 100,
      active: true,
      badge: "Best Seller",
      features: ["Built-in NFC chip", "QR backup", "Custom review page", "Graphite finish"],
    },
    {
      id: "plaque-luxe",
      name: "Taprizz Royal Blue Plaque",
      tagline: "Bold royal-blue NFC + QR Google review plaque",
      price: 2499,
      discount: 0,
      salePrice: 2124,
      images: [],
      stock: 50,
      active: true,
      badge: "Luxury",
      features: ["Royal blue finish", "Built-in NFC chip", "QR backup", "Gift-ready box"],
    },
  ],
  addons: [
    {
      id: "custom-design",
      name: "Custom Design",
      description: "Your logo, colours and layout designed by our team on the plaque.",
      price: 499,
      active: true,
    },
  ],
  plans: [
    {
      id: "basic",
      name: "Basic Retainer",
      tagline: "Everything you need to keep reviews flowing",
      highlight: false,
      tiers: [
        { months: 1, price: 449, original: 449 },
        { months: 3, price: 1199, original: 1347 },
        { months: 6, price: 2159, original: 2694 },
      ],
      features: [
        { text: "Custom AI review page for your business", included: true },
        { text: "Keyword and service tuning", included: true },
        { text: "Hosting and updates", included: true },
        { text: "Support on business days", included: true },
        { text: "Detailed performance reports", included: false },
        { text: "24/7 customer response", included: false },
        { text: "1-year plaque replacement warranty", included: false },
      ],
    },
    {
      id: "plus",
      name: "Plus Retainer",
      tagline: "Priority care with full plaque protection",
      highlight: true,
      tiers: [
        { months: 1, price: 599, original: 599 },
        { months: 3, price: 1649, original: 1797 },
        { months: 6, price: 3059, original: 3594 },
      ],
      features: [
        { text: "Everything in Basic", included: true },
        { text: "1-year replacement warranty: broken, damaged or print faded", included: true },
        { text: "Detailed reports on reviews and tap activity", included: true },
        { text: "24/7 customer response", included: true },
        { text: "Priority setup and faster edits", included: true },
        { text: "Dedicated account support", included: true },
        { text: "Early access to new Taprizz features", included: true },
      ],
    },
  ],
  audience: {
    title: "Made for the best cafes and salons in Jaipur, and the premium brands beside them",
    items: [
      { name: "Cafes and Restaurants", text: "Turn every table into a review engine." },
      { name: "Hotels and Resorts", text: "Capture feedback at reception, rooms and dining." },
      { name: "Salons and Spas", text: "Let a great experience speak for itself." },
      { name: "Clinics and Dental", text: "Build trust before the first appointment." },
      { name: "Showrooms and Jewellers", text: "Match your premium brand on Google." },
      { name: "Event Venues", text: "Collect praise while the memories are fresh." },
    ],
  },
  about: {
    title: "About Taprizz",
    text: "Taprizz is a Jaipur-based AI company. We start with review technology for the city's top cafes, salons and premium venues, building a page and plaque tailored to each one. As we grow, we will add more AI services so one trusted partner can power your whole brand.",
    points: ["Selective by design: premium clients only", "Secure, privacy-first AI review flow", "Personally onboarded in Jaipur"],
  },
  faq: [
    { q: "Do customers need to install an app?", a: "No. The NFC plaque opens your review page directly, and the QR code works with any camera." },
    { q: "What does the Plus Retainer warranty cover?", a: "For one year, we replace a plaque that breaks, gets damaged or has its print removed." },
    { q: "Can I pay on delivery?", a: "No. We accept online payment only, via UPI." },
    { q: "How long does setup take?", a: "After payment is verified we design your page and dispatch your plaque. We'll confirm timing on WhatsApp." },
    { q: "Can I change my review questions later?", a: "Yes. Your retainer includes updates to questions and keywords." },
  ],
  roadmap: {
    title: "Taprizz is just the beginning",
    subtitle: "We are building an AI-powered growth agency for Jaipur's finest businesses. Review Engine is service number one.",
    items: [
      { name: "AI Review Engine", text: "NFC plaques with an AI-written review flow.", status: "Live" },
      { name: "AI Reputation Dashboard", text: "One view of ratings, sentiment and competitors.", status: "Coming soon" },
      { name: "AI Content for Instagram", text: "Posts, reels ideas and captions in your brand voice.", status: "Coming soon" },
      { name: "AI WhatsApp Assistant", text: "Instant replies, bookings and follow-ups.", status: "Coming soon" },
      { name: "Local SEO on Autopilot", text: "Rank higher for the searches your guests make.", status: "Coming soon" },
    ],
  },
  footer: {
    instagram: "https://www.instagram.com/taprizz.in",
    instagramHandle: "@taprizz.in",
    tagline: "AI-powered Google review plaques for premium businesses in Jaipur.",
    disclaimer:
      "Taprizz provides review-collection tools. Reviews must reflect the genuine experience of the customer who posts them; Taprizz does not write, buy or post fake reviews on anyone's behalf. Google and the Google logo are trademarks of Google LLC. Taprizz is an independent company and is not affiliated with or endorsed by Google.",
  },
  legal: {
    updated: "October 2026",
    terms: `# 1. About these terms
These terms apply to your use of the Taprizz website and to every order you place with us. By placing an order you agree to them.

# 2. Our products and services
Taprizz supplies NFC + QR review plaques, a custom review page for your business, and optional retainer plans (Basic and Plus) that keep that page updated.

# 3. Orders and payment
All payments are made online by UPI. We do not offer cash on delivery. An order is confirmed only after we verify your payment using the UTR / reference number you submit. Prices are in Indian Rupees and are shown on the website at the time of purchase.

# 4. Retainer plans
Retainer plans run for the period you choose (1, 3 or 6 months) from the date your review page goes live. The Plus plan additionally includes detailed reports, 24/7 customer response and a 1-year replacement warranty on your plaque if it breaks, is damaged or its print is removed. The warranty does not cover loss or theft.

# 5. Custom design
Custom design is an optional add-on. We will share the design with you for approval before production.

# 6. Honest reviews
You agree to use Taprizz only to invite real customers to share their real experience. You must not use the service to publish fake, incentivised-without-disclosure or misleading reviews, and you remain responsible for complying with Google's policies.

# 7. Limitation of liability
We do not control Google's platform, ratings or review moderation and cannot guarantee a particular rating, ranking or number of reviews. To the extent permitted by law, our total liability for any claim is limited to the amount you paid for the affected order.

# 8. Changes and governing law
We may update these terms from time to time; the version on this page is the current one. These terms are governed by the laws of India, and the courts at Jaipur, Rajasthan have jurisdiction.

# 9. Contact
Questions about these terms? Reach us on WhatsApp or by email using the details in the website footer.`,
    privacy: `# What we collect
When you place an order or contact us we collect your name, business name, phone number, email address, delivery address, links you share (such as Instagram or Google Maps), design notes, and the UPI reference (UTR) number you submit. We do not see or store your UPI PIN or bank details.

# How we use it
We use this information only to process and deliver your order, set up your review page, provide support, and contact you about your order or plan.

# Review pages
The review pages we build for your business collect the star rating and options a guest taps in order to draft a review text. The final review is posted by the guest on Google.

# Storage and sharing
Your data is stored with our database provider (Supabase). We do not sell your personal data. We share it only with service providers who help us fulfil your order, such as courier partners, and when the law requires it.

# Cookies and local storage
We store your cart in your browser's local storage so it is still there when you return. We do not use it to track you across other sites.

# Your choices
You can ask us to access, correct or delete your information by contacting us. We may need to keep order records where the law requires.

# Contact
For any privacy question, message us on WhatsApp or email us using the details in the website footer.`,
    refund: `# Payments
All payments are made online by UPI. We do not offer cash on delivery.

# Cancellation
You can cancel an order before design work or dispatch begins. Contact us on WhatsApp with your order code and, once cancelled, we will refund the amount you paid to the original UPI account.

# Custom design
Orders that include the Custom Design add-on cannot be cancelled once design work has started.

# Damaged or incorrect items
If your plaque arrives damaged or is not what you ordered, message us on WhatsApp with your order code and clear photos as soon as you receive it, and we will repair, replace or refund it.

# Plus plan warranty
Plus Retainer customers get a 1-year replacement for plaques that break, get damaged or have their print removed, as described in our Terms.

# Retainer plans
Retainer plans are billed for the full period selected. If you wish to stop early, please talk to us; we will look at it case by case.

# Shipping
We dispatch after payment verification and design approval (where applicable). We will share tracking details on WhatsApp.

# Contact
To raise a request, message us on WhatsApp or email us using the details in the website footer.`,
  },
  testimonialsNote: "",
};
