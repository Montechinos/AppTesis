import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { useThemeMode } from '@/src/hooks/useThemeMode';
import { radius, spacing } from '@/src/theme/spacing';

type Props = {
  children: ReactNode;
};

export const SurfaceCard = ({ children }: Props) => {
  const { colors } = useThemeMode();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: radius.lg,
    elevation: 3,
    gap: spacing.sm,
    padding: spacing.md,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
  },
});
