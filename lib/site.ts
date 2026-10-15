// Canonical site origin. Set NEXT_PUBLIC_SITE_URL in the host's env to your real domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://taprizz.in").replace(/\/$/, "");
