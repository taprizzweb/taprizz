import { getContent } from "@/lib/content";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Hero, Marquee } from "@/components/sections/Hero";
import { Importance } from "@/components/sections/Importance";
import { PlaqueShowcase } from "@/components/sections/PlaqueShowcase";
import { How, LiveDemo } from "@/components/sections/HowDemo";
import { Comparison } from "@/components/sections/Comparison";
import { Shop } from "@/components/sections/Shop";
import { Plans } from "@/components/sections/Plans";
import { About, Audience, Contact, Faq, Footer, Roadmap } from "@/components/sections/Footerish";
import { SliceDivider } from "@/components/ui/SliceDivider";

export const dynamic = "force-dynamic";

const INK = "#050505";
const PAPER = "#fafcf3";

export default async function Home() {
  const c = await getContent();
  return (
    <main>
      <Navbar brand={c.settings.brand} announcement={c.settings.announcement} />
      <CartDrawer />
      <Hero c={c} />
      <Marquee items={["Premium businesses only", "Highest-security AI review bot", "1-Year Plaque Warranty", "NFC + QR", "Made in Jaipur"]} />
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
      <Contact c={c} />
      <Footer c={c} />
    </main>
  );
}
