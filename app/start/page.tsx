import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Start with Taprizz", robots: { index: false, follow: false } };

export default function Start() {
  return (
    <main className="min-h-dvh bg-black px-5 py-16 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="text-5xl">What would you like?</h1>
        <div className="mt-8 space-y-4">
          <Link href="/start/app" className="block rounded-[24px] border border-white/12 bg-[#0c0c0c] p-6 transition hover:border-lime-400"><span className="text-2xl">Taprizz App plans</span><span className="mt-1 block text-white/55">The full app with a plan: review page, inbox, menu, ordering and more.</span></Link>
          <Link href="/start/ai-qr" className="block rounded-[24px] border border-white/12 bg-[#0c0c0c] p-6 transition hover:border-lime-400"><span className="text-2xl">AI QR plates</span><span className="mt-1 block text-white/55">Only the AI Review plates for your tables, with a simple plan.</span></Link>
        </div>
      </div>
    </main>
  );
}
