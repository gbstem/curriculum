'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { navigateTo } from './navigation';
import { SessionData, defaultSession } from './session';

interface SessionContextType {
  session: SessionData;
  loading: boolean;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType>({
  session: defaultSession,
  loading: true,
  logout: async () => {},
  refreshSession: async () => {},
});

export const useSession = () => useContext(SessionContext);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionData>(defaultSession);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/auth');
      if (res.ok) {
        const data = await res.json();
        setSession(data);
      } else {
        setSession(defaultSession);
      }
    } catch (error) {
      console.error('Failed to fetch session:', error);
      setSession(defaultSession);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      setSession(defaultSession);
      // A hard navigation, not router.push()+router.refresh(). The latter is
      // a client-side transition that can replay a stale entry from Next's
      // Router Cache (e.g. a /login prefetch captured while still
      // authenticated, which the middleware had redirected back to /) instead
      // of round-tripping to the server, intermittently leaving the user on
      // the still-authenticated-looking page after logout.
      navigateTo('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const refreshSession = async () => {
    await fetchSession();
  };

  return (
    <SessionContext.Provider value={{ session, loading, logout, refreshSession }}>
      {children}
    </SessionContext.Provider>
  );
}
