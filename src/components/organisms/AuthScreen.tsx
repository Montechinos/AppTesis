import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft, LinearTransition } from 'react-native-reanimated';

import { AppButton } from '@/src/components/atoms/AppButton';
import { AppText } from '@/src/components/atoms/AppText';
import { LoadingState } from '@/src/components/atoms/LoadingState';
import { ScreenView } from '@/src/components/atoms/ScreenView';
import { AuthButton } from '@/src/components/molecules/auth/AuthButton';
import { AuthHeader } from '@/src/components/molecules/auth/AuthHeader';
import { AuthInput } from '@/src/components/molecules/auth/AuthInput';
import { AuthSwitcher } from '@/src/components/molecules/auth/AuthSwitcher';
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
        <Animated.View layout={LinearTransition.springify()} style={styles.authShell}>
          <SurfaceCard>
            <Animated.View
              entering={FadeInRight.duration(260)}
              exiting={FadeOutLeft.duration(180)}
              key={mode}
              style={styles.form}
            >
              <AuthHeader
                subtitle={
                  isRegister
                    ? 'Crea tu cuenta para comenzar'
                    : 'Accede a tu invernadero inteligente'
                }
                title={isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
              />

              <View style={styles.fields}>
                {isRegister ? (
                  <AuthInput
                    autoCapitalize="words"
                    icon="account-outline"
                    onChangeText={setName}
                    placeholder="Nombre"
                    value={name}
                  />
                ) : null}
                <AuthInput
                  autoCapitalize="none"
                  icon="email-outline"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="Correo"
                  value={email}
                />
                <AuthInput
                  icon="lock-outline"
                  onChangeText={setPassword}
                  placeholder="Contraseña"
                  secureTextEntry
                  value={password}
                />
                {isRegister ? (
                  <AuthInput
                    icon="lock-check-outline"
                    onChangeText={setConfirmPassword}
                    placeholder="Confirmar contraseña"
                    secureTextEntry
                    value={confirmPassword}
                  />
                ) : null}
              </View>

              {message ? <AppText style={styles.error}>{message}</AppText> : null}
              {auth.error ? <AppText style={styles.error}>{auth.error}</AppText> : null}

              <AuthButton label={isRegister ? 'Crear cuenta' : 'Iniciar sesión'} onPress={submit} />
              <AuthSwitcher
                action={isRegister ? 'Inicia sesión' : 'Regístrate'}
                onPress={() => setMode(isRegister ? 'login' : 'register')}
                prompt={isRegister ? '¿Ya tienes una cuenta? ' : '¿No tienes una cuenta? '}
              />
            </Animated.View>
          </SurfaceCard>
        </Animated.View>
      </ScreenView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  authShell: {
    alignSelf: 'center',
    maxWidth: 460,
    width: '100%',
  },
  error: { color: '#d9534f' },
  fields: {
    gap: spacing.sm,
  },
  flex: { flex: 1 },
  form: {
    gap: spacing.md,
  },
  title: { fontSize: 28, lineHeight: 34 },
});
