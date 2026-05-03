import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { AppButton } from '@/src/components/atoms/AppButton';
import { AppText } from '@/src/components/atoms/AppText';
import { AppTextInput } from '@/src/components/atoms/AppTextInput';
import { LoadingState } from '@/src/components/atoms/LoadingState';
import { ScreenView } from '@/src/components/atoms/ScreenView';
import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';
import { useAuth } from '@/src/hooks/useAuth';
import { spacing } from '@/src/theme/spacing';
import { isEmail, validatePassword } from '@/src/utils/validators';

type Mode = 'register' | 'login';

export const AuthScreen = () => {
  const auth = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const isRegister = mode === 'register';

  if (auth.loading) {
    return <LoadingState label="Preparando sesion segura..." />;
  }

  if (auth.user && !auth.verified) {
    return (
      <ScreenView>
        <SurfaceCard>
          <AppText style={styles.title} weight="bold">
            Verifica tu correo
          </AppText>
          <AppText tone="muted">
            Supabase envio un enlace de verificacion a {auth.user.email}. Al confirmar el correo
            podras entrar al panel del invernadero.
          </AppText>
          {auth.error ? <AppText style={styles.error}>{auth.error}</AppText> : null}
          <AppButton label="Ya verifique mi correo" onPress={auth.refreshSession} />
          <AppButton label="Cerrar sesion" onPress={auth.logout} variant="ghost" />
        </SurfaceCard>
      </ScreenView>
    );
  }

  const submit = async () => {
    setMessage('');
    auth.clearError();

    if (!isEmail(email)) {
      setMessage('Ingresa un correo valido.');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setMessage(passwordError);
      return;
    }

    if (isRegister) {
      if (!name.trim()) {
        setMessage('Ingresa tu nombre.');
        return;
      }

      if (password !== confirmPassword) {
        setMessage('Las contraseñas no coinciden.');
        return;
      }

      await auth.register(name, email, password);
      setMessage('Cuenta creada. Revisa tu correo para verificar la sesion.');
      return;
    }

    await auth.login(email, password);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
      <ScreenView>
        <SurfaceCard>
          <AppText style={styles.title} weight="bold">
            Invernadero inteligente
          </AppText>
          <AppText tone="muted">
            {isRegister ? 'Crea tu cuenta para entrar al panel.' : 'Ingresa con tu cuenta Supabase.'}
          </AppText>

          <View style={styles.segment}>
            <AppButton label="Register" onPress={() => setMode('register')} variant={isRegister ? 'primary' : 'secondary'} />
            <AppButton label="Login" onPress={() => setMode('login')} variant={!isRegister ? 'primary' : 'secondary'} />
          </View>

          {isRegister ? (
            <AppTextInput autoCapitalize="words" onChangeText={setName} placeholder="Nombre" value={name} />
          ) : null}
          <AppTextInput
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Correo"
            value={email}
          />
          <AppTextInput onChangeText={setPassword} placeholder="Contraseña" secureTextEntry value={password} />
          {isRegister ? (
            <AppTextInput
              onChangeText={setConfirmPassword}
              placeholder="Confirmar contraseña"
              secureTextEntry
              value={confirmPassword}
            />
          ) : null}

          {message ? <AppText style={styles.error}>{message}</AppText> : null}
          {auth.error ? <AppText style={styles.error}>{auth.error}</AppText> : null}
          <AppButton
            label={isRegister ? 'Crear cuenta' : 'Entrar'}
            onPress={submit}
          />
        </SurfaceCard>
      </ScreenView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  error: { color: '#d9534f' },
  flex: { flex: 1 },
  segment: { flexDirection: 'row', gap: spacing.sm },
  title: { fontSize: 28, lineHeight: 34 },
});
