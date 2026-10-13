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
import { About, Audience, Roadmap, Contact, Faq, Footer } from "@/components/sections/Footerish";

export const dynamic = "force-dynamic";

export default async function Home() {
  const c = await getContent();
  return (
    <main>
      <Navbar brand={c.settings.brand} announcement={c.settings.announcement} />
      <CartDrawer />
      <Hero c={c} />
      <Marquee items={["Premium businesses only", "Highest-security AI review bot", "1-Year Plaque Warranty", "NFC + QR", "Made in Jaipur"]} />
      <Importance c={c} />
      <PlaqueShowcase c={c} />
      <How c={c} />
      <LiveDemo c={c} />
      <Comparison c={c} />
      <Shop c={c} />
      <Plans c={c} />
      <Audience c={c} />
      <Roadmap c={c} />
      <About c={c} />
      <Faq c={c} />
      <Contact c={c} />
      <Footer c={c} />
    </main>
  );
}
