import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useThemeMode } from '@/src/hooks/useThemeMode';
import { radius, spacing } from '@/src/theme/spacing';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const SurfaceCard = ({ children, style }: Props) => {
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
        style,
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
