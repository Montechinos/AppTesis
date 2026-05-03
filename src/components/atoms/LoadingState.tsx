import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { NatureBackground } from '@/src/components/molecules/NatureBackground';
import { useThemeMode } from '@/src/hooks/useThemeMode';
import { spacing } from '@/src/theme/spacing';

type Props = {
  label?: string;
};

export const LoadingState = ({ label = 'Cargando invernadero...' }: Props) => {
  const { colors } = useThemeMode();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <NatureBackground />
      <ActivityIndicator color={colors.primary} size="large" />
      <AppText tone="muted">{label}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.md,
    justifyContent: 'center',
  },
});
