import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { getVisibleFooterLinks, type FooterLink } from '@/config/footer';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';

function FooterAnchor({
  href, external, className, children,
}: {
  href: string; external?: boolean; className?: string; children: React.ReactNode;
}) {
  // mailto:/tel: must be plain anchors — Next's <Link> routes them through the
  // client router, which swallows every click after the first (same URL, treated
  // as a no-op). No target="_blank" either, or the browser leaves a blank tab open.
  if (/^(mailto:|tel:)/i.test(href)) {
    return <a href={href} className={className}>{children}</a>;
  }

  return external ? (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

function FooterMenuItem({ link }: { link: FooterLink }) {
  const hasChildren = !!link.children && link.children.length > 0;
  const baseTextClass = 'inline-flex items-center text-ink-muted no-underline text-[13px] font-semibold hover:text-ink transition-colors h-full';
  const buttonClass = 'inline-flex items-center justify-center rounded-full bg-ink text-white text-sm font-semibold px-[18px] py-[8px]';

  if (!hasChildren) {
    return (
      <FooterAnchor
        href={link.href}
        external={link.external}
        className={link.style === 'button' ? buttonClass : baseTextClass}
      >
        {link.label}
      </FooterAnchor>
    );
  }

  return (
    <div className="relative group flex items-center h-full">
      <button
        type="button"
        className={cn(baseTextClass, 'inline-flex items-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer font-sans')}
        aria-haspopup="true"
        aria-expanded="false"
      >
        {link.label}
        <span
          aria-hidden="true"
          className="inline-block w-[6px] h-[6px] border-r-2 border-b-2 border-current rotate-45 translate-y-[-1px] transition-transform group-hover:rotate-[225deg] group-focus-within:rotate-[225deg]"
        />
      </button>
      <ul
        role="menu"
        aria-label={`${link.label} submenu`}
        className={cn(
          'absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-1.5 mb-1.5',
          'min-w-[180px] list-none p-2',
          'bg-white border border-ink/10 rounded-2xl shadow-minty-lg z-[60]',
          'opacity-0 invisible pointer-events-none transition-all duration-150',
          'group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:-translate-y-2.5',
          'group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:-translate-y-2.5',
          'after:content-[""] after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-2'
        )}
      >
        {link.children!.map((child) => (
          <li key={child.key} role="none">
            <FooterAnchor
              href={child.href}
              external={child.external}
              className="block px-3.5 py-2.5 rounded-[10px] text-sm font-semibold text-ink bg-transparent hover:bg-teal/10 hover:text-teal-deep transition-colors"
            >
              {child.label}
            </FooterAnchor>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const visibleLinks = getVisibleFooterLinks();

  return (
    <footer className="bg-cream py-6 md:py-9 border-t border-ink/[0.06]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <Container className="flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-6">
        <div className="flex flex-col md:flex-row gap-[18px] items-center text-ink-muted text-[12px] md:text-[13px]">
          <Link href="/" aria-label="Daily Minty home" className="inline-flex items-center">
            <Image
              src="/assets/deployed-assets/minty-logo-v2.png"
              alt=""
              width={100}
              height={60}
              className="h-[40px] w-auto block"
            />
          </Link>
          <span>© {year} {siteConfig.author.name}</span>
        </div>
        <nav className="flex flex-col md:flex-row gap-2 md:gap-3.5 items-center" aria-label="Footer">
          {visibleLinks.map((link) => (
            <FooterMenuItem key={link.key} link={link} />
          ))}
        </nav>
      </Container>
    </footer>
  );
}