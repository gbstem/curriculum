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

  return (
    <Container
      className="d-flex align-items-center justify-content-center py-5"
      style={{ minHeight: '80vh' }}
    >
      <Card
        className="w-100 border-0 p-4 text-center shadow-lg"
        style={{ maxWidth: '600px', backgroundColor: '#fff' }}
      >
        <Card.Body>
          <div className="text-danger mb-4">
            <i className="fas fa-exclamation-triangle fa-4x"></i>
          </div>
          <Card.Title className="display-6 fw-bold mb-3 text-indigo-950">
            Database or Server Error
          </Card.Title>
          <Card.Text className="text-muted fs-5 mb-4">
            Something went wrong while communicating with the gbSTEM database. Please share the
            details below with the gbSTEM website maintainers.
          </Card.Text>

          <div
            className="bg-light font-monospace small mb-4 rounded border p-3 text-start"
            style={{ maxHeight: '200px', overflowY: 'auto' }}
          >
            <div className="fw-bold text-danger mb-1">Error Message:</div>
            <div className="mb-2 text-wrap" style={{ wordBreak: 'break-all' }}>
              {error.message || 'Unknown error'}
            </div>
            {error.stack && (
              <>
                <hr className="my-2" />
                <div className="fw-bold text-secondary mb-1">Stack Trace:</div>
                <pre
                  className="mt-1 mb-0"
                  style={{ whiteSpace: 'pre-wrap', fontSize: '0.75rem', wordBreak: 'break-all' }}
                >
                  {error.stack}
                </pre>
              </>
            )}
            {error.digest && (
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
