import { siteConfig } from './site';

export interface FooterChildLink {
  key: string; label: string; href: string;
  external?: boolean; enabled: boolean;
}
export interface FooterLink {
  key: string; label: string; href: string;
  external?: boolean; style: 'text' | 'button'; enabled: boolean;
  children?: FooterChildLink[];
}

export const footerLinks: FooterLink[] = [
  { key: 'home',    label: 'Home',    href: '/',        style: 'text', enabled: true },
  { key: 'pricing', label: 'Pricing', href: '/pricing', style: 'text', enabled: true },
  {
    key: 'resources', label: 'Resources', href: '#', style: 'text', enabled: true,
    children: [
      { key: 'support-faq', label: 'Support / FAQ', href: '/resources/support', enabled: true },
      { key: 'contact',     label: 'Contact',       href: '/resources/contact', enabled: true },
    ],
  },
  {
    key: 'get-started', label: 'Get started with Minty',
    href: '/getstarted', style: 'button', enabled: false, // placeholder
  },
  {
    key: 'login', label: 'Log In',
    href: siteConfig.loginUrl, external: true, style: 'button', enabled: true,
  },
];

export function getVisibleFooterLinks(): FooterLink[] {
  return footerLinks
    .filter((l) => l.enabled)
    .map((l) => ({ ...l, children: l.children?.filter((c) => c.enabled) }));
}