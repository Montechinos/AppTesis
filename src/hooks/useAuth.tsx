import { Session, User } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import {
  signInWithEmail,
  signOut,
  signUpWithEmail,
  updatePassword,
  updateUserName,
} from '@/src/services/auth/authService';
import { isSupabaseConfigured, supabase } from '@/src/config/supabase';

type AuthContextValue = {
  error: string;
  loading: boolean;
  session: Session | null;
  user: User | null;
  verified: boolean;
  clearError: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  rename: (name: string) => Promise<void>;
  changePassword: (password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Configura EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY en .env.');
      setLoading(false);
      return undefined;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      error,
      loading,
      session,
      user: session?.user ?? null,
      verified: Boolean(session?.user.email_confirmed_at),
      clearError: () => setError(''),
      login: async (email, password) => {
        setError('');
        setLoading(true);
        try {
          await signInWithEmail(email.trim(), password);
        } catch (nextError) {
          setError(nextError instanceof Error ? nextError.message : 'No se pudo iniciar sesion.');
        } finally {
          setLoading(false);
        }
      },
      logout: async () => {
        setError('');
        await signOut();
      },
      refreshSession: async () => {
        const { data, error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError) {
          setError(refreshError.message);
          return;
        }
        setSession(data.session);
      },
      register: async (name, email, password) => {
        setError('');
        setLoading(true);
        try {
          await signUpWithEmail(name.trim(), email.trim(), password);
        } catch (nextError) {
          setError(nextError instanceof Error ? nextError.message : 'No se pudo registrar.');
        } finally {
          setLoading(false);
        }
      },
      rename: async (name) => {
        setError('');
        const user = await updateUserName(name.trim());
        if (user) {
          setSession((current) => (current ? { ...current, user } : current));
        }
      },
      changePassword: async (password) => {
        setError('');
        await updatePassword(password);
      },
    }),
    [error, loading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
};
