import { forPublic, getContent } from "@/lib/content";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Hero, Marquee } from "@/components/sections/Hero";
import { Importance } from "@/components/sections/Importance";
import { PlaqueShowcase } from "@/components/sections/PlaqueShowcase";
import { How, LiveDemo } from "@/components/sections/HowDemo";
import { Comparison } from "@/components/sections/Comparison";
import { Shop } from "@/components/sections/Shop";
import { Plans } from "@/components/sections/Plans";
import { About, Audience, Faq, Footer, Roadmap } from "@/components/sections/Footerish";
import { GulabiNagri, Platform, TwoOffers } from "@/components/sections/Offers";
import { BookDemo } from "@/components/sections/BookDemo";
import { SliceDivider } from "@/components/ui/SliceDivider";

export const dynamic = "force-dynamic";

const INK = "#141517";
const PAPER = "#f3f3f1";

export default async function Home() {
  const c = forPublic(await getContent());
  return (
    <main>
      <Navbar brand={c.settings.brand} announcement={c.settings.announcement} />
      <CartDrawer />
      <Hero c={c} />
      <Marquee items={["AI review plaque", "Guest platform", "Gulabi Nagri guide", "NFC + QR", "1-Year warranty on Plus", "Made in Jaipur"]} />
      <TwoOffers />
      <SliceDivider from={PAPER} to={INK} />
      <Platform />
      <GulabiNagri />
      <Importance c={c} />
      <SliceDivider from={INK} to={PAPER} />
      <PlaqueShowcase c={c} />
      <How c={c} />
      <SliceDivider from={PAPER} to={INK} />
      <LiveDemo c={c} />
      <SliceDivider from={INK} to={PAPER} />
      <Comparison c={c} />
      <Shop c={c} />
      <SliceDivider from={PAPER} to={INK} />
      <Plans c={c} />
      <SliceDivider from={INK} to={PAPER} />
      <Audience c={c} />
      <SliceDivider from={PAPER} to={INK} />
      <Roadmap c={c} />
      <SliceDivider from={INK} to={PAPER} />
      <About c={c} />
      <Faq c={c} />
      <BookDemo c={c} />
      <Footer c={c} />
    </main>
  );
}
