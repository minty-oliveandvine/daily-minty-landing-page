export type MappingTone = 'blue' | 'red' | 'green';
export type MappingDirection = 'right' | 'left';

export interface MappingRow {
  left: string;
  right: string;
  direction: MappingDirection;
  tone: MappingTone;
}

export const xeroIntegrationContent = {
  hero: {
    eyebrow: 'How we collaborate',
    // Split so "Xero" can take the Xero blue and "Integration" the dark ink.
    titleAccent: 'Xero',
    titleRest: 'Integration',
    subtitle: 'Want To Know More About Xero?',
  },

  mapping: {
    title: 'What does Xero integration do?',
    leftLabel: 'Minty',
    rightLabel: 'xero',
    rows: [
      { left: 'Supplier of Petty Cash & Payment module', right: 'Contacts', direction: 'right', tone: 'blue' },
      { left: 'One Minty Entity', right: 'One Xero Organisation', direction: 'right', tone: 'blue' },
      { left: 'Chart of Accounts', right: 'Chart of Accounts', direction: 'left', tone: 'red' },
      { left: 'Petty Cash Account & Deposit Bank Account', right: 'Bank Accounts', direction: 'left', tone: 'red' },
      { left: 'Publish On Payment module', right: 'Bills', direction: 'right', tone: 'green' },
      { left: 'Publish On Petty Cash Module', right: 'Spend & Receive Money', direction: 'right', tone: 'green' },
      { left: 'Receipt Of Expense (Petty Cash)', right: 'attachments of account transaction', direction: 'right', tone: 'green' },
      { left: 'Invoice Of Payment Module', right: 'attachments of bill', direction: 'right', tone: 'green' },
    ] as MappingRow[],
  },
};
