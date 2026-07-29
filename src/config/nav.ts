import { siteConfig } from './site';

export interface NavChild {
  label: string;
  href: string;
  enabled: boolean;
}
export interface NavLink {
  key: string;
  label: string;
  href: string;
  enabled: boolean;
  variant?: 'text' | 'primary' | 'dark';
  external?: boolean;
  children?: NavChild[];
}

export const navLinks: NavLink[] = [
  { key: 'home',     label: 'Home',    href: '/',        variant: 'text', enabled: true },
  { key: 'pricing',  label: 'Pricing', href: '/pricing', variant: 'text', enabled: true },
  {
    key: 'resources',
    label: 'Resources',
    href: '#',
    variant: 'text',
    enabled: true,
    children: [
      { label: 'Learning', href: '/resources/learning', enabled: true },
      { label: 'FAQ',      href: '/resources/faq',      enabled: true },
      { label: 'Contact',  href: '/resources/contact',  enabled: true },
    ],
  },
  {
    key: 'get-started',
    label: 'Join Waitlist',
    href: siteConfig.waitlistUrl,
    variant: 'primary',
    external: true,
    enabled: true,
  },
  {
    key: 'login',
    label: 'Log In',
    href: siteConfig.loginUrl,
    variant: 'dark',
    external: true,
    enabled: true,
  },
];