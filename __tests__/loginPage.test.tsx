import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import LoginPage from '../app/login/page';

// Mock useRouter from next/navigation
const mockPush = jest.fn();
const mockRefresh = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

describe('LoginPage component', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('renders login form correctly', () => {
    render(<LoginPage />);

    expect(screen.getByText('gbSTEM Curriculum Access')).toBeInTheDocument();
    expect(screen.getByLabelText('Role')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Access Curriculum/i })).toBeInTheDocument();
  });

  it('submits login request successfully and redirects', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ username: 'editor', role: 'editor', isLoggedIn: true }),
    });

    render(<LoginPage />);

    const roleSelect = screen.getByLabelText('Role');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(roleSelect, { target: { value: 'editor' } });
    fireEvent.change(passwordInput, { target: { value: 'editor-pass' } });

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /Access Curriculum/i }).closest('form')!);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'editor',
        password: 'editor-pass',
      }),
    });

    expect(mockPush).toHaveBeenCalledWith('/');
    expect(mockRefresh).toHaveBeenCalled();
  });

  it('handles failed login and displays error message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Incorrect password' }),
    });

    render(<LoginPage />);

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'wrong-pass' } });

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /Access Curriculum/i }).closest('form')!);
    });

    expect(await screen.findByText('Incorrect password')).toBeInTheDocument();
  });
});
