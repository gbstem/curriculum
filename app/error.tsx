'use client';

import React, { useEffect } from 'react';
import { Button, Card, Container } from 'react-bootstrap';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console
    console.error('Next.js UI Error Boundary caught error:', error);
  }, [error]);

  const message = error.message ? error.message.toLowerCase() : '';
  const isNotFound = message.includes('not found');

  return (
    <Container className="d-flex align-items-center justify-content-center min-h-[80vh] py-5">
      <Card className="w-100 max-w-[600px] border-0 bg-white p-4 text-center shadow-lg">
        <Card.Body>
          <div className={isNotFound ? 'text-warning mb-4' : 'text-danger mb-4'}>
            <i
              className={
                isNotFound ? 'fas fa-search-minus fa-4x' : 'fas fa-exclamation-triangle fa-4x'
              }
            ></i>
          </div>
          <Card.Title className="display-6 fw-bold mb-3 text-indigo-950">
            {isNotFound ? 'Resource Not Found' : 'Database or Server Error'}
          </Card.Title>
          <Card.Text className="text-muted fs-5 mb-4">
            {isNotFound
              ? 'The requested track, course, or lesson could not be found. Please double-check the URL or return to the curriculum homepage.'
              : 'Something went wrong while communicating with the gbSTEM database. Please share the details below with the gbSTEM website maintainers.'}
          </Card.Text>

          <div className="bg-light font-monospace small mb-4 max-h-[200px] overflow-y-auto rounded border p-3 text-start">
            <div className={isNotFound ? 'fw-bold text-warning mb-1' : 'fw-bold text-danger mb-1'}>
              {isNotFound ? 'Details:' : 'Error Message:'}
            </div>
            <div className="mb-2 text-wrap break-all">{error.message || 'Unknown error'}</div>
            {!isNotFound && error.stack && (
              <>
                <hr className="my-2" />
                <div className="fw-bold text-secondary mb-1">Stack Trace:</div>
                <pre className="mt-1 mb-0 text-[0.75rem] break-all whitespace-pre-wrap">
                  {error.stack}
                </pre>
              </>
            )}
            {!isNotFound && error.digest && (
              <>
                <hr className="my-2" />
                <div className="fw-bold text-secondary mb-1">Digest:</div>
                <div>{error.digest}</div>
              </>
            )}
          </div>

          <div className="d-flex justify-content-center gap-3">
            <Button variant="primary" className="fw-semibold px-4 py-2 text-white" onClick={reset}>
              <i className="fas fa-sync me-2"></i> Try Again
            </Button>
            <Button
              variant="outline-secondary"
              className="fw-semibold px-4 py-2"
              onClick={() => (window.location.href = '/')}
            >
              <i className="fas fa-home me-2"></i> Go to Home
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
