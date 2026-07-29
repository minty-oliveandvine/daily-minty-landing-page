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
  // { key: 'privacy', label: 'Privacy', href: '/privacy', style: 'text', enabled: true },
  // { key: 'terms', label: 'Terms', href: '/terms', style: 'text', enabled: true },
  { key: 'contact', label: 'Contact', href: 'mailto:hello@dailyminty.com', style: 'text', enabled: true },
  { key: 'youtube', label: 'Youtube', href: 'https://www.youtube.com/@DailyMinty', external: true, style: 'text', enabled: true },
  { key: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/dailymintyglobal?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw…', external: true, style: 'text', enabled: true },
];

export function getVisibleFooterLinks(): FooterLink[] {
  return footerLinks
    .filter((l) => l.enabled)
    .map((l) => ({ ...l, children: l.children?.filter((c) => c.enabled) }));
}