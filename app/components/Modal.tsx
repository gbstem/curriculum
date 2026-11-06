'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';

// How wide the dialog may grow; each size steps up at the breakpoints shown.
const SIZES = {
  md: 'sm:mx-auto sm:my-7 sm:max-w-125',
  lg: 'sm:mx-auto sm:my-7 sm:max-w-125 lg:max-w-200',
  xl: 'sm:mx-auto sm:my-7 sm:max-w-125 lg:max-w-200 xl:max-w-285',
  // The lesson editor: 96% of the window on desktop, the whole window on phones.
  fullscreen: 'mx-auto my-[2vh] w-[96vw] narrow:m-0 narrow:w-screen',
};

interface ModalProps {
  show: boolean;
  onHide: () => void;
  size?: keyof typeof SIZES;
  /** Vertically center the dialog in the window. */
  centered?: boolean;
  /** Ignore clicks on the backdrop and the Escape key; only a button can close it. */
  staticBackdrop?: boolean;
  testId: string;
  /** Extra classes for the white card itself. */
  className?: string;
  children: React.ReactNode;
}

/**
 * A dialog over a dimmed page. Compose it from `ModalHeader`, `ModalBody` and `ModalFooter`.
 *
 * The outermost element (`role="dialog"`) is also what scrolls when the dialog is taller than
 * the window, and `overscroll-contain` stops that scroll from carrying on to the page behind it.
 */
export default function Modal({
  show,
  onHide,
  size = 'md',
  centered = false,
  staticBackdrop = false,
  testId,
  className = '',
  children,
}: ModalProps) {
  return (
    <Dialog
      open={show}
      onClose={staticBackdrop ? () => {} : onHide}
      className="fixed inset-0 z-1055 overflow-x-hidden overflow-y-auto overscroll-contain"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity duration-150 ease-linear data-closed:opacity-0"
      />
      <div
        className={`pointer-events-none relative m-2 ${SIZES[size]} ${centered ? 'flex min-h-[calc(100%-1rem)] items-center sm:min-h-[calc(100%-3.5rem)]' : ''}`}
      >
        <DialogPanel
          transition
          data-testid={testId}
          className={`pointer-events-auto relative flex w-full flex-col rounded-card bg-white bg-clip-padding shadow-dialog outline-0 transition-[opacity,translate] duration-[150ms,300ms] ease-[linear,ease-out] data-closed:-translate-y-12.5 data-closed:opacity-0 ${className}`}
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

interface ModalHeaderProps {
  /** Background and text color, e.g. `bg-primary text-white`. */
  className?: string;
  titleClassName?: string;
  /** Shows an × button that calls this. */
  onClose?: () => void;
  children: React.ReactNode;
}

export function ModalHeader({
  className = '',
  titleClassName = '',
  onClose,
  children,
}: ModalHeaderProps) {
  return (
    <div
      className={`flex shrink-0 items-center rounded-t-card border-b border-divider p-4 ${className}`}
    >
      <DialogTitle as="h4" className={`mb-0 leading-normal ${titleClassName}`}>
        {children}
      </DialogTitle>
      {onClose && <CloseButton onClick={onClose} className="-m-2 ms-auto p-2" />}
    </div>
  );
}

export function ModalBody({
  className = 'p-4',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`relative flex-auto ${className}`}>{children}</div>;
}

export function ModalFooter({ testId, children }: { testId?: string; children: React.ReactNode }) {
  return (
    <div
      data-testid={testId}
      className="flex shrink-0 flex-wrap items-center justify-end border-t border-divider p-3 *:m-1"
    >
      {children}
    </div>
  );
}

/** The × that closes a dialog or an alert. Position it with `className`. */
export function CloseButton({ onClick, className }: { onClick: () => void; className: string }) {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      className={`box-content size-4 rounded-md text-black opacity-50 hover:opacity-75 focus-visible:opacity-100 focus-visible:shadow-[0_0_0_0.25rem_rgb(13_110_253/0.25)] focus-visible:outline-0 ${className}`}
    >
      <svg viewBox="0 0 16 16" fill="currentColor" className="size-4" aria-hidden>
        <path d="M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414" />
      </svg>
    </button>
  );
}
