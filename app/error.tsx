'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to console
    console.error('Next.js UI Error Boundary caught error:', error);
  }, [error]);

  const message = error.message ? error.message.toLowerCase() : '';
  const isNotFound = message.includes('not found');

  return (
    <div className="site-container flex min-h-[80vh] items-center justify-center py-12">
      <div className="relative flex w-full max-w-150 min-w-0 flex-col overflow-hidden rounded-card bg-white p-6 text-center wrap-break-word shadow-lg">
        <div className="flex-auto p-8 narrow:p-6">
          <div className={isNotFound ? 'mb-6 text-warning' : 'mb-6 text-danger'}>
            <i
              className={
                isNotFound ? 'fas fa-search-minus fa-4x' : 'fas fa-exclamation-triangle fa-4x'
              }
            ></i>
          </div>
          <div className="mb-4 text-display-6 leading-heading font-bold">
            {isNotFound ? 'Resource Not Found' : 'Database or Server Error'}
          </div>
          <p className="mb-6 text-h5 text-muted">
            {isNotFound
              ? 'The requested track, course, or lesson could not be found. Please double-check the URL or return to the curriculum homepage.'
              : 'Something went wrong while communicating with the gbSTEM database. Please share the details below with the gbSTEM website maintainers.'}
          </p>

          <div className="mb-6 max-h-50 overflow-y-auto rounded-md border border-divider bg-light p-4 text-left font-mono text-[0.875em]">
            <div
              className={isNotFound ? 'mb-1 font-bold text-warning' : 'mb-1 font-bold text-danger'}
            >
              {isNotFound ? 'Details:' : 'Error Message:'}
            </div>
            <div className="mb-2 break-all whitespace-normal">
              {error.message || 'Unknown error'}
            </div>
            {!isNotFound && error.stack && (
              <>
                <hr className="my-2" />
                <div className="mb-1 font-bold text-secondary">Stack Trace:</div>
                <pre className="mt-1 mb-0 text-[0.875em] leading-4 break-all whitespace-pre-wrap">
                  {error.stack}
                </pre>
              </>
            )}
            {!isNotFound && error.digest && (
              <>
                <hr className="my-2" />
                <div className="mb-1 font-bold text-secondary">Digest:</div>
                <div>{error.digest}</div>
              </>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="btn btn-primary px-6 py-2 font-semibold text-white"
              onClick={reset}
            >
              <i className="fas fa-sync me-2"></i> Try Again
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary px-6 py-2 font-semibold"
              onClick={() => router.push('/')}
            >
              <i className="fas fa-home me-2"></i> Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
