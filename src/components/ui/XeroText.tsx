import { Fragment } from 'react';

/** The Xero brand blue used wherever the word appears in copy. */
export const XERO_BLUE = '#2baae0';

/**
 * Renders `text` with every occurrence of "Xero" in the Xero blue, leaving the
 * rest of the string in whatever colour the surrounding element sets.
 *
 * Splitting on a capturing group keeps the separators, so this handles the word
 * at any position and any number of times — "Xero Integration FAQ" and
 * "Connect & disconnect to Xero" both come out right.
 */
export function highlightXero(text: string) {
  return text.split(/(Xero)/g).map((part, i) =>
    part === 'Xero' ? (
      <span key={i} style={{ color: XERO_BLUE }}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}
