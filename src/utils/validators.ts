export const isEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim());

export const validatePassword = (value: string) =>
  value.length >= 6 ? '' : 'La contraseña debe tener al menos 6 caracteres.';
