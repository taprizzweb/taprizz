import { ArrowUpRight, Check, Search, Sparkles } from "lucide-react";
import { Reveal, SectionHead } from "@/components/ui/Reveal";

const SEO_POINTS = [
  "A complete, accurate Google Business Profile",
  "Fresh reviews that use the words guests really say",
  "Replies that mention what you do and where, in a natural way",
  "Clear page markup, so Google reads your name, address and services",
];
const GEO_POINTS = [
  "The same name, address and description everywhere you appear",
  "Plain pages that answer the questions guests really ask",
  "A steady stream of recent, honest reviews",
  "A regular check of how AI assistants describe you, shared with you",
];
const LOOP = [
  { t: "Guest taps", x: "A happy guest taps the plaque in your place." },
  { t: "Honest review", x: "They post their own review. An unhappy guest can tell you privately." },
  { t: "Fresher profile", x: "More recent reviews, and problems you can fix early." },
  { t: "Easier to find", x: "On Google Search and Maps, and in AI answers." },
  { t: "More guests", x: "New guests find you. Offers and Gulabi Nagri bring them back." },
];

export function SeoGeo() {
  return (
    <section id="growth" className="grid-light scroll-mt-20 border-t border-black/10 px-5 py-24 text-ink md:px-8 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead light title="Be found on Google, and in AI answers." subtitle="Reviews are where it starts. We also work on SEO and GEO, so Google, Maps and AI assistants can find your business, understand it and recommend it." />
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-[30px] border border-black/10 bg-white p-8 md:p-10">
              <Search className="h-7 w-7" />
              <h3 className="mt-5 text-4xl md:text-5xl">SEO</h3>
              <p className="mt-2 text-black/60">Being found on Google Search and Google Maps when people look for what you offer, near them.</p>
              <ul className="mt-6 space-y-3">{SEO_POINTS.map((p) => (<li key={p} className="flex gap-3 text-black/70"><Check className="mt-1 h-4 w-4 shrink-0" />{p}</li>))}</ul>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="h-full rounded-[30px] bg-black p-8 text-white md:p-10">
              <Sparkles className="h-7 w-7 text-lime-400" />
              <h3 className="mt-5 text-4xl md:text-5xl">GEO</h3>
              <p className="mt-2 text-white/60">Being understood and mentioned when people ask AI assistants such as ChatGPT, Gemini or Google&apos;s AI answers for a place near them.</p>
              <ul className="mt-6 space-y-3">{GEO_POINTS.map((p) => (<li key={p} className="flex gap-3 text-white/70"><Check className="mt-1 h-4 w-4 shrink-0 text-lime-400" />{p}</li>))}</ul>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <h3 className="mt-20 text-3xl md:text-5xl">How it grows your business.</h3>
          <ol className="mt-8 grid gap-4 md:grid-cols-5">
            {LOOP.map((s, i) => (
              <li key={s.t} className="relative rounded-[22px] border border-black/10 bg-white p-5">
                <span className="text-sm font-semibold text-black/40">Step {i + 1}</span>
                <p className="mt-1 text-xl font-semibold">{s.t}</p>
                <p className="mt-2 text-sm text-black/60">{s.x}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-black/55">Then the loop repeats: every new visit can become a new review.</p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 flex flex-col gap-6 rounded-[26px] bg-black p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-2xl">
              <p className="text-2xl font-semibold md:text-3xl">An honest promise.</p>
              <p className="mt-2 text-white/65">Nobody can promise a ranking or a mention in an AI answer, and you should be careful of anyone who does. We do the work that makes you easier to find, and we show you what changed. In your demo we also look at how your business appears on Google today.</p>
            </div>
            <a href="#book" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-lime-400 px-7 py-3.5 font-semibold text-black transition hover:bg-lime-300">Book a demo <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const STEPS = [
  { t: "Demo", x: "About 20 minutes on a real phone: the plaque, the guest platform and Gulabi Nagri, plus a look at how you appear on Google today." },
  { t: "Setup", x: "We build your page, set your questions and keywords, and prepare your plaque." },
  { t: "Go live", x: "The plaque goes on your tables and counters, and your team gets their own logins." },
  { t: "Review and improve", x: "We go through reviews, feedback and taps with you, and adjust. Detailed reports come with the Plus plan." },
];
const PROMISES = [
  "Honest reviews only. Guests write their own words and post them themselves. No fake reviews and no rewards for reviews.",
  "Every guest can post a review on Google, whatever their rating.",
  "Your team has its own sign-ins. Each person sees only what their role needs.",
  "Clear terms: online UPI payment, with written terms, privacy and refund pages.",
  "Local support from Jaipur. Reach us on Instagram or email.",
  "No promises we cannot keep: no guaranteed rating, ranking or number of reviews.",
];

export function Trust() {
  return (
    <section id="trust" className="bg-black px-5 py-24 text-white md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-2">
        <div>
          <Reveal><h2 className="text-5xl leading-[0.95] md:text-7xl">How we work with you.</h2></Reveal>
          <ol className="mt-10 space-y-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.05}>
                <li className="flex gap-5 border-b border-white/10 pb-6 last:border-0">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-lime-400/60 text-sm font-semibold text-lime-400">{i + 1}</span>
                  <div><h3 className="text-2xl">{s.t}</h3><p className="mt-1 text-white/60">{s.x}</p></div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
        <div>
          <Reveal><h2 className="text-5xl leading-[0.95] md:text-7xl">What you can count on.</h2></Reveal>
          <ul className="mt-10 space-y-4">
            {PROMISES.map((p, i) => (
              <Reveal key={p} delay={i * 0.04}>
                <li className="flex gap-3 rounded-[20px] border border-white/12 bg-white/[0.03] p-5 text-white/75"><Check className="mt-1 h-4 w-4 shrink-0 text-lime-400" />{p}</li>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/45"><a className="underline hover:text-lime-400" href="/terms">Terms</a> · <a className="underline hover:text-lime-400" href="/privacy">Privacy</a> · <a className="underline hover:text-lime-400" href="/refund">Cancellation and refund</a></p>
        </div>
      </div>
    </section>
  );
}

// Questions an owner asks before booking. They are shown first, ahead of the saved questions.
export const OWNER_QA = [
  { q: "Is this only for one outlet?", a: "No. Several outlets can sit under one view, each with its own plaque and page. Ask us to show it in your demo." },
  { q: "Will this get me fake or bought reviews?", a: "No. A guest chooses what they liked, a draft is written from those choices, and the guest edits it and posts it themselves. We do not post for anyone, and we do not buy or reward reviews." },
  { q: "What if a guest is unhappy?", a: "Every guest can post a review on Google. The guest platform also gives guests a private way to tell you what went wrong, so you can put it right." },
  { q: "What do SEO and GEO mean for my business?", a: "SEO is being found on Google Search and Maps. GEO is being understood and mentioned when people ask an AI assistant, such as ChatGPT or Gemini, for a place near them. Both start from clear, consistent information and honest, recent reviews." },
  { q: "Can you guarantee more reviews or a higher rank?", a: "No, and be careful of anyone who does. We make it easy for happy guests to review you, and easier for Google and AI assistants to understand your business. Then we show you what changed." },
];
