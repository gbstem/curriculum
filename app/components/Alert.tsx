import React from 'react';
import { CloseButton } from './Modal';

interface AlertProps {
  /** Shows an × button that calls this. */
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
}

/** A red error box. Every one carries `data-testid="error-alert"` for the Cypress specs. */
export default function Alert({ onClose, className = '', children }: AlertProps) {
  return (
    <div
      role="alert"
      data-testid="error-alert"
      className={`relative mb-4 rounded-md border border-[#f1aeb5] bg-[#f8d7da] p-4 text-[#58151c] ${onClose ? 'pe-12' : ''} ${className}`}
    >
      {children}
      {onClose && (
        <CloseButton onClick={onClose} className="absolute top-0 right-0 z-2 px-4 py-5" />
      )}
    </div>
  );
}

export function AlertHeading({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 text-h4 leading-heading font-medium">{children}</div>;
}
