import type { SiteContent } from "./types";

// Placeholder copy — everything here is editable from /admin.
export const defaultContent: SiteContent = {
  settings: {
    brand: "Taprizz",
    email: "taprizz.india@gmail.com",
    city: "Jaipur, Rajasthan",
    upiId: "9672999166@fam",
    upiName: "Taprizz",
    whatsapp: "919672999166",
    announcement: "Now onboarding a limited number of businesses in Jaipur",
  },
  hero: {
    eyebrow: "For restaurants, cafes, salons and clinics in Jaipur",
    title: "Reviews, followers and repeat guests from",
    highlight: "one tap.",
    subtitle:
      "Taprizz helps Jaipur businesses get honest Google reviews, more Instagram followers and guests who come back. Take the Taprizz App for the whole customer experience, or the AI Review QR plaque for reviews.",
    cta: "Book a meeting",
    stats: [],
  },
  partners: [
    { name: "Coffeekaart", slug: "coffeekaart", image: "/clients/coffeekaart.webp", category: "cafe", about: "A coffee cafe by Batra's Takeaway Corner, with outlets at Raja Park and Gandhi Nagar.", addresses: ["Gali No. 3, Raja Park, Jaipur 302004", "Coffeekaart II: C-1, Railway Station Road, Gandhi Nagar, Jaipur 302015"] },
    { name: "Green Feast", slug: "greenfeast", image: "/clients/greenfeast.webp", category: "cafe", about: "Healthy food and fresh exotic fruits and veggies, with a subscription option.", addresses: ["C-35 A, Lajpat Marg, C Scheme, Jaipur 302001", "Take away: Sector 3, Jawahar Nagar, Jaipur"] },
    { name: "The Tattoo Cafe & Lounge", slug: "", image: "/clients/tattoo.webp", category: "cafe", about: "A cafe and lounge with a view of Hawa Mahal.", addresses: ["3rd Floor, 30, Opposite Hawa Mahal, Hawa Mahal Road, Jaipur 302002"] },
    { name: "Jaipur Vista", slug: "", image: "/clients/jaipurvista.webp", category: "cafe", about: "A cafe with a view, opposite Hawa Mahal.", addresses: ["Opposite Hawa Mahal, Jaipur"] },
    { name: "24 Society Salon & Wellness", slug: "", image: "/clients/24society.webp", category: "salon", about: "A salon and wellness studio in Jaipur.", addresses: ["Jaipur"] },
    { name: "Chitra Katha", slug: "", image: "/clients/chitrakatha.webp", category: "hotel", about: "A homestay in Jaipur: a story per stay.", addresses: ["60 Hathroi Fort, Hari Kishan Somani Marg, Ajmer Road, Jaipur 302001"] },
    { name: "NG Ayurveda", slug: "", image: "/clients/ngayurveda.webp", category: "clinic", about: "An Ayurvedic clinic in Jaipur.", addresses: ["Jaipur"] },
  ],
  // The old plaque catalog and retainer plans were removed. A new catalog is added from Admin when it is ready.
  products: [],
  addons: [],
  plans: [],
  faq: [
    { q: "Do guests need to install an app?", a: "No. The NFC plaque or the QR code opens the page in the phone's browser." },
  ],
  footer: {
    instagram: "https://www.instagram.com/taprizz.in",
    instagramHandle: "@taprizz.in",
    tagline: "AI review plaques and a guest platform for businesses in Jaipur.",
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
Questions about these terms? Reach us on Instagram (@taprizz.in) or by email using the details in the website footer.`,
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
For any privacy question, message us on Instagram (@taprizz.in) or email us using the details in the website footer.`,
    refund: `# Payments
All payments are made online by UPI. We do not offer cash on delivery.

# Cancellation
You can cancel an order before design work or dispatch begins. Message us on Instagram (@taprizz.in) with your order code and, once cancelled, we will refund the amount you paid to the original UPI account.

# Custom design
Orders that include the Custom Design add-on cannot be cancelled once design work has started.

# Damaged or incorrect items
If your plaque arrives damaged or is not what you ordered, message us on Instagram (@taprizz.in) with your order code and clear photos as soon as you receive it, and we will repair, replace or refund it.

# Plus plan warranty
Plus Retainer customers get a 1-year replacement for plaques that break, get damaged or have their print removed, as described in our Terms.

# Retainer plans
Retainer plans are billed for the full period selected. If you wish to stop early, please talk to us; we will look at it case by case.

# Shipping
We dispatch after payment verification and design approval (where applicable). We will share tracking details with you on Instagram.

# Contact
To raise a request, message us on Instagram (@taprizz.in) or email us using the details in the website footer.`,
  },
};
