import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Taprizz | Reviews, SEO and GEO for Jaipur businesses",
  description:
    "Taprizz puts an AI Google review flow on a premium NFC plaque, with an optional guest platform, plus SEO and GEO work so you are found on Google and in AI answers. Book a demo in Jaipur.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
