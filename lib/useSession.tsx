'use client';

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
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
  const router = useRouter();

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
      router.push('/login');
      router.refresh();
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
