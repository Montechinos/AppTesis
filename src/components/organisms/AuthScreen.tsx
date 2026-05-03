import { ReactNode, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInRight, FadeOutLeft, LinearTransition } from 'react-native-reanimated';

import { AppButton } from '@/src/components/atoms/AppButton';
import { AppText } from '@/src/components/atoms/AppText';
import { LoadingState } from '@/src/components/atoms/LoadingState';
import { AuthButton } from '@/src/components/molecules/auth/AuthButton';
import { AuthHeader } from '@/src/components/molecules/auth/AuthHeader';
import { AuthInput } from '@/src/components/molecules/auth/AuthInput';
import { AuthSwitcher } from '@/src/components/molecules/auth/AuthSwitcher';
import { NatureBackground } from '@/src/components/molecules/NatureBackground';
import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';
import { useAuth } from '@/src/hooks/useAuth';
import { useThemeMode } from '@/src/hooks/useThemeMode';
import { spacing } from '@/src/theme/spacing';
import { isEmail, validatePassword } from '@/src/utils/validators';

type Mode = 'register' | 'login';

export const AuthScreen = () => {
  const auth = useAuth();
  const { colors } = useThemeMode();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const isRegister = mode === 'register';

  const switchMode = (nextMode: Mode) => {
    setMessage('');
    auth.clearError();
    setMode(nextMode);
  };

  if (auth.loading) {
    return <LoadingState label="Preparando sesion segura..." />;
  }

  if (auth.user && !auth.verified) {
    return (
      <AuthFrame backgroundColor={colors.background}>
        <Animated.View layout={LinearTransition.springify()} style={styles.authShell}>
          <SurfaceCard style={styles.authCard}>
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
        </Animated.View>
      </AuthFrame>
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
    <AuthFrame backgroundColor={colors.background}>
      <Animated.View layout={LinearTransition.springify()} style={styles.authShell}>
        <SurfaceCard style={styles.authCard}>
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
              onPress={() => switchMode(isRegister ? 'login' : 'register')}
              prompt={isRegister ? '¿Ya tienes una cuenta? ' : '¿No tienes una cuenta? '}
            />
          </Animated.View>
        </SurfaceCard>
      </Animated.View>
    </AuthFrame>
  );
};

type AuthFrameProps = {
  backgroundColor: string;
  children: ReactNode;
};

const AuthFrame = ({ backgroundColor, children }: AuthFrameProps) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      edges={[]}
      style={[
        styles.safeArea,
        {
          backgroundColor,
          paddingTop: insets.top,
        },
      ]}
    >
      <NatureBackground />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: insets.bottom + spacing.xl,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.centerContent}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  authShell: {
    alignSelf: 'center',
    maxWidth: 420,
    width: '100%',
  },
  authCard: {
    padding: spacing.xl,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  error: { color: '#d9534f' },
  fields: {
    gap: spacing.sm,
  },
  form: {
    gap: spacing.md,
  },
  keyboardView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: { fontSize: 28, lineHeight: 34 },
});
