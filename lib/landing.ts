// SEO landing pages. Each entry becomes a static route at /<slug> (see app/[slug]/page.tsx).
export type Landing = {
  slug: string;
  title: string; // <title>
  description: string; // meta description
  h1: string;
  lead: string;
  keyword: string;
  sections: { h2: string; body: string; bullets?: string[] }[];
  faq: { q: string; a: string }[];
  demoUrl?: string; // optional live-demo link shown under the hero
};

const CTA_NOTE = "Taprizz is built for premium businesses in Jaipur, Rajasthan.";

export const landings: Landing[] = [
  {
    slug: "google-review-stand-jaipur",
    title: "Google Review Stand in Jaipur — NFC & QR Plaque | Taprizz",
    description: "Get more Google reviews in Jaipur. Taprizz NFC + QR review plaques let guests leave a 5-star review with one tap. Made in Jaipur for cafes, salons and stores.",
    h1: "Google review stand in Jaipur that gets you more 5-star reviews",
    lead: "Most happy customers never leave a review because it takes too many steps. Taprizz puts an NFC + QR plaque on your counter so a guest can start a Google review with one tap.",
    keyword: "google reviews",
    sections: [
      {
        h2: "Why Google reviews decide who gets the walk-in",
        body: "When someone in Jaipur searches \"best cafe near me\" or \"salon in C-Scheme\", the businesses with more and fresher Google reviews show up higher in Maps and look more trustworthy. A steady stream of recent reviews beats a one-time push.",
      },
      {
        h2: "How a Taprizz plaque works",
        body: "The plaque sits at your counter, table or billing desk.",
        bullets: ["Guest taps their phone on the plaque (NFC) or scans the QR code. No app needed.", "They land on a page made for your business and answer a few quick questions.", "Our AI turns their answers into a natural review draft they can edit and post to your Google listing."],
      },
      {
        h2: "Built for premium businesses",
        body: `${CTA_NOTE} We design the page and plaque for each venue, so it looks like part of your brand, not a generic sticker.`,
      },
    ],
    faq: [
      { q: "Do customers need to install an app?", a: "No. The NFC plaque opens your review page directly and the QR code works with any phone camera." },
      { q: "Is this allowed by Google?", a: "Guests write and post their own review from their own Google account. Taprizz only makes it quick to start. Always follow Google's review policies." },
    ],
  },
  {
    slug: "ai-google-review-generator",
    title: "AI Google Review Generator for Businesses | Taprizz",
    description: "An AI review assistant that helps your customers write a genuine Google review in about 30 seconds. NFC + QR plaque for cafes, salons and premium stores in Jaipur.",
    h1: "AI that helps your customers write their Google review in 30 seconds",
    lead: "The hardest part of leaving a review is knowing what to write. Taprizz asks a few simple questions and drafts the words, so more guests finish and post.",
    keyword: "ai review",
    sections: [
      {
        h2: "From a blank box to a finished review",
        body: "Instead of staring at an empty review field, the guest picks what they liked, such as the service, the staff or the ambience. The AI turns those choices into a readable draft in their voice, which they can change before posting.",
      },
      {
        h2: "Tuned to your business",
        body: "Your retainer includes keyword and service tuning, so drafts mention the things people actually search for, like your signature dishes or treatments.",
        bullets: ["Custom review page per business", "Keywords and questions you can update later", "Privacy-first flow"],
      },
      { h2: "The guest stays in control", body: "Every review is posted by the customer from their own Google account, after they read and approve it." },
    ],
    faq: [
      { q: "Are the reviews fake?", a: "No. The guest chooses what to say and posts it themselves. The AI only helps with wording." },
      { q: "Can I change the questions?", a: "Yes. Your retainer includes updates to questions and keywords." },
    ],
  },
  {
    slug: "gemini-google-review-generator",
    title: "Gemini-Powered Google Review Generator | Taprizz",
    description: "Taprizz uses Google's Gemini AI to help customers write genuine Google reviews in seconds. NFC + QR plaque for cafes, salons and stores in Jaipur. Try the live demo.",
    h1: "Gemini-powered Google reviews: tap, answer, post",
    lead: "Taprizz uses Google's Gemini AI to turn a guest's quick answers into a natural review draft they can edit and post to your Google listing. Try the live demo below.",
    keyword: "gemini google reviews",
    demoUrl: "https://reviews.taprizz.in/s/001",
    sections: [
      {
        h2: "How Gemini helps your customers",
        body: "Most people do not leave reviews because they do not know what to write. Gemini removes that problem.",
        bullets: ["The guest taps the plaque or scans the QR code.", "They choose a few options about what they liked.", "Gemini drafts a readable review in natural language.", "The guest edits it if they want and posts it from their own Google account."],
      },
      {
        h2: "Why this works for premium businesses",
        body: "Reviews written from real answers read like real feedback, because they are. Each business gets its own review page with keywords and services tuned to what customers actually mention.",
      },
      {
        h2: "Genuine and policy-friendly",
        body: "The guest always reads, edits and posts their own review. Taprizz never posts on a customer's behalf and does not offer rewards for positive reviews, in line with Google's review policies.",
      },
      { h2: "Made in Jaipur", body: `${CTA_NOTE} We design the review page and the plaque for each venue.` },
    ],
    faq: [
      { q: "Does Taprizz use Gemini?", a: "Yes. Taprizz uses Google's Gemini AI to help draft the review text from the guest's answers." },
      { q: "Does the guest have to post what Gemini writes?", a: "No. They can edit or change the draft, and they post it themselves from their own Google account." },
      { q: "Do customers need an app?", a: "No. The NFC tap or QR scan opens the review page in the phone's browser." },
    ],
  },
  {
    slug: "smart-qr-google-review",
    title: "Smart QR Code for Google Reviews — NFC Plaque | Taprizz",
    description: "A smart QR + NFC plaque that sends customers straight to your Google review page. Premium finish, custom design, built in Jaipur.",
    h1: "A smart QR and NFC plaque that sends guests straight to your review page",
    lead: "A plain QR sticker is easy to ignore. A Taprizz plaque combines NFC tap and QR scan in a premium finish that belongs on your counter.",
    keyword: "smart qr",
    sections: [
      {
        h2: "NFC tap plus QR backup",
        body: "Most modern phones open the page with a tap. For any phone that can't, the QR code works with the camera. Either way there is nothing to install.",
      },
      {
        h2: "More than a QR code",
        body: "A QR code only links to a page. Taprizz also builds the page, runs the AI review flow, and keeps it updated through your retainer.",
        bullets: ["Graphite and royal-blue finishes", "Custom design with your logo and colours (add-on)", "1-year plaque warranty on the Plus Retainer"],
      },
    ],
    faq: [
      { q: "What if a customer's phone has no NFC?", a: "They scan the QR code on the plaque with their camera." },
      { q: "Can you put my logo on it?", a: "Yes, through the Custom Design add-on." },
    ],
  },
  {
    slug: "review-plaque-for-cafes-jaipur",
    title: "Google Review Plaque for Cafes in Jaipur | Taprizz",
    description: "Turn happy cafe guests into 5-star Google reviews. NFC + QR table and counter plaques made for premium cafes in Jaipur.",
    h1: "Google review plaques for cafes in Jaipur",
    lead: "Guests are relaxed and happy while they sip their coffee, which is the best moment to ask. Taprizz makes the ask effortless.",
    keyword: "cafe google reviews",
    sections: [
      {
        h2: "Where it goes in a cafe",
        body: "Place a plaque at the billing counter and on tables, or hand it over with the bill. Guests tap while they wait, and no staff member has to ask awkwardly.",
      },
      { h2: "Reviews that mention what you want to be known for", body: "Tuned keywords help reviews mention your coffee, desserts, ambience and service, the same words people search for in Maps." },
    ],
    faq: [{ q: "How many plaques does a cafe need?", a: "One at the counter is the minimum. Many cafes add one per few tables. We will advise on WhatsApp." }],
  },
  {
    slug: "review-plaque-for-salons-jaipur",
    title: "Google Review Plaque for Salons in Jaipur | Taprizz",
    description: "Get more Google reviews for your salon or spa in Jaipur. NFC + QR review plaque with an AI-assisted review page.",
    h1: "Google review plaques for salons and spas in Jaipur",
    lead: "People pick a salon by reading reviews first. Taprizz makes it easy for a client to share their experience right after the service, while they are still looking at the mirror.",
    keyword: "salon google reviews",
    sections: [
      { h2: "Ask at the right moment", body: "Place the plaque at the reception or the styling station. A client can tap while the bill is prepared." },
      { h2: "Showcase your services", body: "Tuned keywords help reviews mention the treatments you want to be found for, such as bridal makeup, hair colour or skin care." },
    ],
    faq: [{ q: "Can I use it for multiple stylists?", a: "Yes. One review page covers your business, and we can add service options clients choose from." }],
  },
  {
    slug: "nfc-vs-qr-review-plaque",
    title: "NFC vs QR Code for Google Reviews: Which Is Better? | Taprizz",
    description: "NFC tap or QR scan for collecting Google reviews? A plain comparison of both, and why Taprizz plaques use both.",
    h1: "NFC vs QR code for collecting Google reviews",
    lead: "Both work. They solve slightly different problems, which is why a good review plaque uses both.",
    keyword: "nfc vs qr review",
    sections: [
      { h2: "NFC tap", body: "A tap is the fastest route to the page. No camera, no focusing.", bullets: ["Works on most modern phones", "Feels premium", "Needs a compatible phone"] },
      { h2: "QR scan", body: "Works with the camera on practically any smartphone.", bullets: ["Universal", "Easy to print", "Needs the guest to open the camera"] },
      { h2: "What actually moves reviews", body: "The tag or code is only the doorway. Getting a guest from the doorway to a posted review depends on how simple the next steps are, which is what the Taprizz AI review page is for." },
    ],
    faq: [{ q: "Do I have to pick one?", a: "No. Every Taprizz plaque includes both an NFC chip and a QR code." }],
  },
];

export const landingBySlug = (slug: string) => landings.find((l) => l.slug === slug);
