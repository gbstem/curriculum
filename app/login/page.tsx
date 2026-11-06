'use client';

import { useSession } from '@/lib/useSession';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import Modal, { ModalBody, ModalHeader } from '../components/Modal';
import Spinner from '../components/Spinner';

// Only accept a same-origin path (starting with a single '/', not '//') to
// avoid an open redirect via this param.
function sanitizeRedirect(redirect: string | null): string {
  return redirect && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/';
}

function LoginPageInner() {
  const [role, setRole] = useState<'viewer' | 'editor'>('viewer');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const { refreshSession } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

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
        // Successful login, refresh session and redirect to the originally
        // requested destination (or home if there wasn't one)
        await refreshSession();
        router.push(sanitizeRedirect(searchParams.get('redirect')));
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || 'Incorrect password. Please try again.');
      }
    } catch (err: any) {
      setError('An error occurred during verification.');
      console.error('Login verification error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f4f6f9]" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f6f9]">
      <Modal show={true} onHide={() => {}} staticBackdrop centered testId="login-modal">
        <ModalHeader
          className="bg-primary py-6 text-center text-white"
          titleClassName="w-full font-bold"
        >
          <i className="fas fa-lock me-2"></i>
          gbSTEM Curriculum Access
        </ModalHeader>
        <ModalBody className="p-6">
          <div className="mb-6 text-center">
            <img src="/images/penguin.png" alt="gbSTEM Logo" className="mb-4 h-auto max-w-full" />
            <h4 className="font-bold">Welcome to gbSTEM Curriculum</h4>
            <p className="text-muted">
              Please enter your role and password to access the curriculum.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label htmlFor="role-select" className="mb-2 font-semibold">
                Role
              </label>
              <select
                id="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value as 'viewer' | 'editor')}
                className="select select-lg mb-4"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="password-input" className="mb-2 font-semibold">
                Password
              </label>
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                data-autofocus
                className="input input-lg"
              />
              {error && <div className="mt-2 font-medium text-danger">{error}</div>}
            </div>

            <div className="mt-6 grid">
              <button
                type="submit"
                className="btn btn-primary btn-lg py-2 font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner small className="me-2" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Access Curriculum
                  </>
                )}
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}
