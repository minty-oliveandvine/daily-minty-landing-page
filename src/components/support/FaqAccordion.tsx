'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { FaqItem, FaqBlock, PermissionRow } from '@/config/faq';

function PermissionsTable({ permissions }: { permissions?: PermissionRow[] }) {
  const roles = ['CASHIER', 'SHOP MANAGER', 'ACCOUNTANT', 'ADMIN'];
  const defaultPermissions: PermissionRow[] = [
    { name: 'Prepare daily report', roles: { CASHIER: true, 'SHOP MANAGER': true, ACCOUNTANT: true, ADMIN: true } },
    { name: 'View daily report you created', roles: { CASHIER: true, 'SHOP MANAGER': true, ACCOUNTANT: true, ADMIN: true } },
    { name: 'View daily report of the whole shop', roles: { CASHIER: false, 'SHOP MANAGER': true, ACCOUNTANT: true, ADMIN: true } },
    { name: 'Sales method setting', roles: { CASHIER: false, 'SHOP MANAGER': false, ACCOUNTANT: true, ADMIN: true } },
    { name: 'Expense code setting', roles: { CASHIER: false, 'SHOP MANAGER': false, ACCOUNTANT: true, ADMIN: true } },
    { name: 'Publish to Xero', roles: { CASHIER: false, 'SHOP MANAGER': false, ACCOUNTANT: true, ADMIN: true } },
    { name: 'Connect & disconnect to Xero', roles: { CASHIER: false, 'SHOP MANAGER': false, ACCOUNTANT: false, ADMIN: true } },
  ];
  const tablePermissions = permissions || defaultPermissions;

  return (
    <div className="mt-4 overflow-x-auto border border-gray-200 rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left font-bold text-ink">PERMISSION</th>
            {roles.map((role) => (
              <th key={role} className="px-4 py-3 text-center font-bold text-ink text-xs uppercase tracking-wider">{role}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tablePermissions.map((perm, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-3 font-medium text-ink">
                {perm.name.includes('Xero') ? (
                  <>
                    {perm.name.substring(0, perm.name.indexOf('Xero')).trim()}
                    {' '}
                    <span className="font-bold text-black">Xero</span>
                    {perm.name.substring(perm.name.indexOf('Xero') + 4).trimStart()}
                  </>
                ) : (
                  perm.name
                )}
              </td>
              {roles.map((role) => (
                <td key={role} className="px-4 py-3 text-center">
                  {perm.roles[role as keyof typeof perm.roles] ? (
                    <span className="text-teal-deep text-xl">✓</span>
                  ) : (
                    <span className="text-gray-300 text-xl">○</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FaqAccordion({ items, defaultOpenId }: { items: FaqItem[]; defaultOpenId?: string | null }) {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (defaultOpenId) {
      setOpenId(defaultOpenId);
    }
  }, [defaultOpenId, items]);

  useEffect(() => {
    if (openId) {
      setTimeout(() => {
        const element = document.getElementById(`faq-${openId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [openId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article
            key={item.id}
            id={`faq-${item.id}`}
            className={cn(
              'bg-white border rounded-[14px] overflow-hidden transition-all duration-200 h-fit',
              'border-line hover:border-ink/[0.18] hover:-translate-y-0.5 hover:shadow-minty-md',
              isOpen && 'border-teal shadow-[0_1px_0_rgba(47,184,166,.06),0_8px_24px_rgba(15,45,58,.06)]',
              item.wide && 'md:col-span-2'
            )}
          >
            <button
              type="button"
              className="w-full flex items-center gap-4 px-[22px] py-[18px] bg-transparent border-0 cursor-pointer text-left font-sans"
              aria-expanded={isOpen}
              aria-controls={`faq-body-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span className="flex-1 text-base font-semibold text-teal-deep leading-[1.4]">
                Q. {item.question.includes('Xero') ? (
                  <>
                    {item.question.substring(0, item.question.indexOf('Xero')).trim()}
                    {' '}
                    <span className="font-bold text-black">Xero</span>
                    {item.question.substring(item.question.indexOf('Xero') + 4).trimStart()}
                  </>
                ) : (
                  item.question
                )}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  'relative flex-none w-10 h-10 rounded-xl bg-teal-gradient shadow-[0_6px_16px_rgba(0,203,198,.30)] transition-transform duration-300',
                  'before:content-[""] before:absolute before:top-1/2 before:left-[11px] before:right-[11px] before:h-[2.5px] before:bg-white before:rounded-sm before:-translate-y-1/2 before:transition-transform before:duration-300',
                  'after:content-[""] after:absolute after:left-1/2 after:top-[11px] after:bottom-[11px] after:w-[2.5px] after:bg-white after:rounded-sm after:-translate-x-1/2 after:transition-transform after:duration-300',
                  isOpen && 'before:rotate-[135deg] after:rotate-[135deg]'
                )}
              />
            </button>
            {isOpen && (
              <div
                id={`faq-body-${item.id}`}
                className="px-[22px] pb-5 text-ink-soft text-[14.5px] leading-[1.65]"
                role="region"
              >
                {renderBlocks(item.body)}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function renderBlocks(blocks: FaqBlock[]) {
  return blocks.map((block, idx) => {
    switch (block.type) {
      case 'p':
        return <p key={idx} className="text-ink-muted [&+p]:mt-2.5">{block.text}</p>;
      case 'p-strong':
        return <p key={idx} className="text-ink-muted [&+p]:mt-2.5"><strong>{block.text}</strong></p>;
      case 'ul':
        return (
          <ul key={idx} className="mt-2.5 pl-5 text-ink-soft text-[14.5px] leading-[1.65] marker:text-teal">
            {block.items.map((it, i) =>
              typeof it === 'string' ? (
                <li key={i} className="mb-1">{it}</li>
              ) : (
                <li key={i} className="mb-1"><strong>{it.strong}</strong> {it.text}</li>
              )
            )}
          </ul>
        );
      case 'ol':
        return (
          <ol key={idx} className="mt-2.5 pl-[22px] text-ink-soft text-[14.5px] leading-[1.65] marker:text-teal-deep marker:font-bold">
            {block.items.map((it, i) => <li key={i} className="mb-2">{it}</li>)}
          </ol>
        );
      case 'permissions-table':
        return <PermissionsTable key={idx} permissions={block.permissions} />;
    }
  });
}