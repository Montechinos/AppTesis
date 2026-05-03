import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const memoryStore = new Map<string, string>();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const webStorage = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') {
      return memoryStore.get(key) ?? null;
    }

    return window.localStorage.getItem(key);
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') {
      memoryStore.delete(key);
      return;
    }

    window.localStorage.removeItem(key);
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') {
      memoryStore.set(key, value);
      return;
    }

    window.localStorage.setItem(key, value);
  },
};

const authStorage = Platform.OS === 'web' ? webStorage : AsyncStorage;

if (!isSupabaseConfigured) {
  console.warn('Faltan EXPO_PUBLIC_SUPABASE_URL o EXPO_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: false,
      persistSession: true,
      storage: authStorage,
    },
  },
);
