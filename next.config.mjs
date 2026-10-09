/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // WAITLIST_URL carries no NEXT_PUBLIC_ prefix but is read in client components (navLinks in
  // src/config/nav.ts, landingContent in src/config/landing.ts), so Next only inlines it into
  // the browser bundle because it is listed here. Remove this and every Log In / Join Waitlist
  // href silently falls back to the default in src/config/site.ts.
  env: {
    WAITLIST_URL: process.env.WAITLIST_URL,
  },
  images: { formats: ['image/avif', 'image/webp'] },
  compress: true,
  poweredByHeader: false,
};
export default nextConfig;