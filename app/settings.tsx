import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { AppButton } from '@/src/components/atoms/AppButton';
import { AppSwitch } from '@/src/components/atoms/AppSwitch';
import { AppText } from '@/src/components/atoms/AppText';
import { AppTextInput } from '@/src/components/atoms/AppTextInput';
import { ScreenView } from '@/src/components/atoms/ScreenView';
import { SectionHeading } from '@/src/components/atoms/SectionHeading';
import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';
import { useAuth } from '@/src/hooks/useAuth';
import { useThemeMode } from '@/src/hooks/useThemeMode';
import { spacing } from '@/src/theme/spacing';
import { validatePassword } from '@/src/utils/validators';

export default function SettingsScreen() {
  const auth = useAuth();
  const { isDark, toggleMode } = useThemeMode();
  const user = auth.user;
  const [name, setName] = useState(String(user?.user_metadata?.name ?? ''));
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const saveName = async () => {
    if (!name.trim()) {
      setMessage('Ingresa un nombre valido.');
      return;
    }
    await auth.rename(name);
    setMessage('Nombre actualizado.');
  };

  const savePassword = async () => {
    const error = validatePassword(password);
    if (error) {
      setMessage(error);
      return;
    }
    await auth.changePassword(password);
    setPassword('');
    setMessage('Contraseña actualizada.');
  };

  return (
    <ScreenView>
      <SectionHeading subtitle="Sesion, apariencia y ayuda de uso." title="Configuracion" />
      <SurfaceCard>
        <View style={styles.profile}>
          {user?.user_metadata?.avatar_url ? (
            <Image source={{ uri: user.user_metadata.avatar_url }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <AppText weight="bold">{name.slice(0, 1).toUpperCase() || 'U'}</AppText>
            </View>
          )}
          <View style={styles.profileText}>
            <AppText weight="bold">{name || 'Usuario'}</AppText>
            <AppText tone="muted">{user?.email}</AppText>
            <AppText tone="muted">Foto de perfil local preparada para futura integracion con Storage.</AppText>
          </View>
        </View>
      </SurfaceCard>

      <SurfaceCard>
        <AppText weight="semibold">Cuenta</AppText>
        <AppTextInput onChangeText={setName} placeholder="Nombre" value={name} />
        <AppButton icon="account-edit-outline" label="Guardar nombre" onPress={saveName} />
        <AppTextInput
          onChangeText={setPassword}
          placeholder="Nueva contraseña"
          secureTextEntry
          value={password}
        />
        <AppButton icon="lock-reset" label="Cambiar contraseña" onPress={savePassword} variant="secondary" />
        {message ? <AppText tone="muted">{message}</AppText> : null}
        {auth.error ? <AppText style={styles.error}>{auth.error}</AppText> : null}
      </SurfaceCard>

      <SurfaceCard>
        <AppSwitch label="Modo oscuro" onChange={toggleMode} value={isDark} />
      </SurfaceCard>

      <SurfaceCard>
        <AppText weight="semibold">Uso de la app</AppText>
        <AppText tone="muted">Los sensores DHT muestran temperatura y humedad ambiente.</AppText>
        <AppText tone="muted">El modo automatico deja que el ESP32 controle riego y ventilacion.</AppText>
        <AppText tone="muted">Si no hay agua, evita activar bombas hasta rellenar el tanque.</AppText>
        <AppText tone="muted">Los controles manuales escriben en Firebase Realtime Database.</AppText>
      </SurfaceCard>

      <AppButton icon="logout" label="Cerrar sesion" onPress={auth.logout} variant="danger" />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  avatar: { borderRadius: 32, height: 64, width: 64 },
  avatarPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#dff5e8',
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  error: { color: '#d9534f' },
  profile: { flexDirection: 'row', gap: spacing.md },
  profileText: { flex: 1, gap: 4 },
});
