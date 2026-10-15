export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  blocks: ({ h2: string } | { p: string } | { ul: string[] })[];
};

export const posts: Post[] = [
  {
    slug: "how-to-get-more-google-reviews-cafe-jaipur",
    title: "How to get more Google reviews for your cafe in Jaipur",
    description: "Seven practical ways Jaipur cafes can earn more genuine Google reviews, from the right moment to ask to making the process one tap.",
    date: "2026-10-15",
    blocks: [
      { p: "Google reviews are one of the first things a customer sees when they search for a cafe in Maps. The good news is that most happy guests are willing to write one. They just need it to be easy and well timed." },
      { h2: "1. Ask at the moment of delight" },
      { p: "The best time is right after a good experience: when the coffee arrives, when the bill is settled, or when a guest compliments something. Waiting until they have left usually means they forget." },
      { h2: "2. Make it one step, not ten" },
      { p: "Every extra step loses people. Searching for your cafe, finding the review button and thinking of what to write is where most guests give up. A NFC tap or QR scan that opens your review page directly removes the first two steps." },
      { h2: "3. Help guests with the words" },
      { p: "A blank box is intimidating. Offering simple prompts about the food, service and ambience, or an AI-drafted suggestion they can edit, helps them finish." },
      { h2: "4. Keep it genuine and within Google's rules" },
      { ul: ["Let guests write and post their own review from their own account.", "Do not pay for reviews or offer discounts in exchange for positive ones.", "Do not post reviews on behalf of customers.", "Reply to every review, good or bad."] },
      { h2: "5. Place the ask where people already look" },
      { p: "Counter, table, billing desk and takeaway bags are natural spots. A neat plaque looks better than a taped-on paper QR." },
      { h2: "6. Keep it steady" },
      { p: "A steady flow of recent reviews looks more trustworthy than a burst followed by silence. Make the ask part of daily service." },
      { h2: "7. Reply and learn" },
      { p: "Thank reviewers by name, and use critical reviews to fix real problems. Potential customers read your replies too." },
    ],
  },
  {
    slug: "how-many-google-reviews-does-a-business-need",
    title: "How many Google reviews does a local business need?",
    description: "There is no magic number. Here is what actually matters for Google reviews: quantity, recency, rating and replies.",
    date: "2026-10-15",
    blocks: [
      { p: "Owners often ask for a target number. Google does not publish one, and the right goal depends on your competitors. What matters is how you compare locally." },
      { h2: "Compare with the businesses around you" },
      { p: "Search your category and area, for example \"salon near C-Scheme\", and look at the top results in Maps. Note their review counts and ratings. Your first goal is to be competitive with them." },
      { h2: "Recency matters" },
      { p: "Fresh reviews tell customers you are open and active. A business with reviews from the last few weeks often looks more reliable than one with many old reviews." },
      { h2: "Rating and replies" },
      { p: "A rating around 4.5 with real, detailed reviews tends to be more convincing than a perfect 5.0 with a few short ones. Replying to reviews shows you care." },
      { h2: "What to do" },
      { ul: ["Check your top three local competitors.", "Aim for a steady weekly flow, not a one-time push.", "Make asking part of your normal service.", "Never buy or fake reviews."] },
    ],
  },
  {
    slug: "nfc-or-qr-which-is-better-for-google-reviews",
    title: "NFC or QR for Google reviews: which should you use?",
    description: "A plain comparison of NFC tap and QR scan for collecting Google reviews, and why using both works best.",
    date: "2026-10-15",
    blocks: [
      { p: "Both NFC and QR can send a customer to your Google review page. Here is how they differ." },
      { h2: "NFC" },
      { ul: ["A single tap opens the page.", "Feels modern and premium.", "Needs a phone with NFC enabled."] },
      { h2: "QR code" },
      { ul: ["Works on almost every smartphone camera.", "Cheap and easy to print.", "The guest has to open the camera and aim."] },
      { h2: "Our recommendation" },
      { p: "Use both on one plaque. Guests with NFC tap, and everyone else scans. That way nobody is left out, and you do not need to explain anything." },
    ],
  },
  {
    slug: "salon-google-reviews-ideas-jaipur",
    title: "Google review ideas for salons and spas in Jaipur",
    description: "Simple, policy-friendly ways salons and spas in Jaipur can collect more genuine Google reviews.",
    date: "2026-10-15",
    blocks: [
      { p: "Clients choose salons based on photos and reviews. Here are ways to collect more reviews without breaking Google's rules." },
      { h2: "Ask at the reception while billing" },
      { p: "Clients are usually happiest right after the service, while looking at the result. A plaque at the billing desk lets them review in seconds." },
      { h2: "Mention services in reviews naturally" },
      { p: "Prompts such as \"What service did you enjoy?\" help reviews mention hair colour, facials or bridal makeup, which are the things people search for." },
      { h2: "Train the team to mention it" },
      { p: "A friendly \"If you enjoyed it, a quick review helps us a lot\" is enough. Never push, and never offer rewards for positive reviews." },
      { h2: "Reply to every review" },
      { p: "Thank clients by name. A good reply to a critical review can win more trust than the review loses." },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
