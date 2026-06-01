import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { SessionProvider, useSession } from '../lib/useSession';

// Mock useRouter from next/navigation
const mockPush = jest.fn();
const mockRefresh = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

const TestComponent = () => {
  const { session, loading, logout } = useSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <span data-testid="username">{session.username}</span>
      <span data-testid="role">{session.role}</span>
      <span data-testid="isLoggedIn">{session.isLoggedIn ? 'yes' : 'no'}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('SessionProvider and useSession hook', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('provides default session initially and fetches session details', async () => {
    const mockSession = {
      username: 'editor',
      role: 'editor',
      isLoggedIn: true,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSession,
    });

    render(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>
    );

    // Initial state: loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('/api/auth');

    // Wait for the fetch promise to resolve and render values
    await screen.findByText('yes');
    expect(screen.getByTestId('username')).toHaveTextContent('editor');
    expect(screen.getByTestId('role')).toHaveTextContent('editor');
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('yes');
  });

  it('handles failed session fetch gracefully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>
    );

    await screen.findByText('no');
    expect(screen.getByTestId('username')).toHaveTextContent('');
    expect(screen.getByTestId('role')).toHaveTextContent('viewer');
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('no');
  });

  it('logout calls API route and redirects', async () => {
    const mockSession = {
      username: 'viewer',
      role: 'viewer',
      isLoggedIn: true,
    };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSession,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ isLoggedIn: false, username: '', role: 'viewer' }),
      });

    render(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>
    );

    await screen.findByText('yes');

    // Trigger logout
    await act(async () => {
      screen.getByText('Logout').click();
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/auth', { method: 'DELETE' });
    expect(mockPush).toHaveBeenCalledWith('/login');
    expect(mockRefresh).toHaveBeenCalled();
  });
});
