import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/config/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.75rem', // 28px — matches original .wrap
      screens: {
        '2xl': '1140px',  // max-width matches original .wrap cap
      },
    },
    extend: {
      colors: {
        // Brand palette — ported from CSS variables
        cream:       '#fdf6ec',
        peach:       '#fbe7d2',
        'peach-deep':'#f4d4b3',
        mint:        '#d6efe8',
        'mint-soft': '#eaf6f2',
        'mint-deep': '#b9e2d6',
        teal: {
          DEFAULT: '#2fb8a6',
          deep:    '#1f9e8d',
          grad1:   '#00CBC6',
          grad2:   '#00D5BF',
        },
        ink: {
          DEFAULT: '#0f2d3a',
          soft:    '#2c4754',
          muted:   '#6b8088',
          // The guide list's heading navy. Was written as the literal #113B4A in a dozen
          // places; same value, so nothing shifts a pixel.
          deep:    '#113B4A',
        },
        line: {
          DEFAULT: '#e7ddd0',
          soft:    '#efe8da',
        },
        'brand-deep': '#124b6a',
        // Accent peach for "problem" highlight text
        'peach-accent': '#d96a3a',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'minty-sm': '0 1px 2px rgba(15,45,58,.04), 0 2px 8px rgba(15,45,58,.04)',
        'minty-md': '0 4px 12px rgba(15,45,58,.06), 0 12px 32px rgba(15,45,58,.06)',
        'minty-lg': '0 8px 20px rgba(15,45,58,.08), 0 24px 48px rgba(15,45,58,.08)',
        'teal-glow':'0 6px 18px rgba(47,184,166,.3)',
      },
      backgroundImage: {
        'teal-gradient': 'linear-gradient(90deg, #00CBC6 0%, #00D5BF 100%)',
        'teal-gradient-hover': 'linear-gradient(90deg, #00D8D3 0%, #00E2CC 100%)',
        'hero-teal': `
          radial-gradient(ellipse 70% 90% at 88% 55%, #8fe8d4 0%, #5fd4bf 28%, rgba(95,212,191,0) 65%),
          radial-gradient(ellipse 50% 70% at 95% 40%, #b9f0e0 0%, rgba(185,240,224,0) 55%),
          linear-gradient(110deg, #00BDB8 0%, #00CBC6 50%, #00D5BF 100%)
        `,
      },
      keyframes: {
        catFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%':      { transform: 'translateY(-14px) rotate(2deg)' },
        },
        tierFade: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%,100%': { boxShadow: '0 0 0 4px rgba(47,184,166,.2)' },
          '50%':     { boxShadow: '0 0 0 8px rgba(47,184,166,.05)' },
        },
        subRipple: {
          '0%':   { transform: 'scale(0.85)', opacity: '0.4' },
          '70%':  { transform: 'scale(1.25)', opacity: '0' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
      },
      animation: {
        'cat-float':  'catFloat 5.5s ease-in-out infinite',
        'tier-fade':  'tierFade 0.35s ease',
        'pulse-ring': 'pulseRing 2s ease-in-out infinite',
        'sub-ripple': 'subRipple 2.6s ease-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;