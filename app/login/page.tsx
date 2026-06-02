'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSession } from '@/lib/useSession';

export default function LoginPage() {
  const [role, setRole] = useState<'viewer' | 'editor'>('viewer');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const { refreshSession } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoginSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: role,
          password,
        }),
      });

      if (response.ok) {
        // Successful login, refresh session and redirect to home
        await refreshSession();
        router.push('/');
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || 'Incorrect password. Please try again.');
      }
    } catch (err: any) {
      setError('An error occurred during verification.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh', background: '#f4f6f9' }}
      />
    );
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', background: '#f4f6f9' }}
    >
      <Modal show={true} onHide={() => {}} backdrop="static" keyboard={false} centered>
        <Modal.Header className="bg-primary py-4 text-center text-white">
          <Modal.Title className="fs-4 fw-bold w-100">
            <i className="fas fa-lock me-2"></i>
            gbSTEM Curriculum Access
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="mb-4 text-center">
            <img
              src="/images/penguin.png"
              alt="gbSTEM Logo"
              className="img-fluid mb-3"
              style={{ maxWidth: '150px' }}
            />
            <h4 className="fw-bold">Welcome to gbSTEM Curriculum</h4>
            <p className="text-muted">
              Please enter your role and password to access the curriculum.
            </p>
          </div>

          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="role-select">
              <Form.Label className="fw-semibold">Role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value as 'viewer' | 'editor')}
                size="lg"
                className="mb-3"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password-input">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
                size="lg"
              />
              {error && <div className="text-danger fw-medium mt-2">{error}</div>}
            </Form.Group>

            <div className="d-grid mt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="fw-semibold py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Verifying...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Access Curriculum
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
