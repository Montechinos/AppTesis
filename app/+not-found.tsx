import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { PrimaryButton } from '@/src/components/atoms/PrimaryButton';
import { colors } from '@/src/theme/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'No encontrada' }} />
      <View style={styles.container}>
        <AppText style={styles.title} weight="bold">
          La ruta no existe.
        </AppText>
        <AppText style={styles.text} tone="muted">
          Regresa al panel principal del invernadero.
        </AppText>
        <Link href="/" style={styles.link}>
          <PrimaryButton label="Ir al dashboard" onPress={() => undefined} />
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
  },
  text: {
    fontSize: 14,
    marginTop: 8,
  },
  link: {
    marginTop: 16,
  },
});
