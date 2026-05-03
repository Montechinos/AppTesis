import { supabase } from '@/src/config/supabase';
import { UserProfile } from '@/src/types/user';

export const signUpWithEmail = async (name: string, email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    throw error;
  }

  if (data.user) {
    await saveProfile({
      id: data.user.id,
      name,
      email: data.user.email ?? email,
    });
  }

  return data;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export const saveProfile = async (profile: UserProfile) => {
  const { error } = await supabase.from('profiles').upsert({
    id: profile.id,
    name: profile.name,
    email: profile.email,
    avatar_url: profile.avatarUrl ?? null,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.warn('No se pudo guardar profiles. Verifica que la tabla exista.', error.message);
  }
};

export const updatePassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    throw error;
  }
};

export const updateUserName = async (name: string) => {
  const { data, error } = await supabase.auth.updateUser({ data: { name } });

  if (error) {
    throw error;
  }

  if (data.user) {
    await saveProfile({
      id: data.user.id,
      name,
      email: data.user.email ?? '',
    });
  }

  return data.user;
};
