import React from 'react';

interface SpinnerProps {
  /** The small size, for inside a button. */
  small?: boolean;
  className?: string;
}

/** A spinning ring in the current text color, announced to screen readers as "Loading...". */
export default function Spinner({ small = false, className = '' }: SpinnerProps) {
  return (
    <div
      role="status"
      className={`inline-block animate-spin rounded-full border-current border-r-transparent align-[-0.125em] ${small ? 'size-4 border-[0.2em]' : 'size-12 border-[0.25em]'} ${className}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
