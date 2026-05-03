import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/src/theme/colors';
import { cardShadow } from '@/src/theme/shadows';
import { radius, spacing } from '@/src/theme/spacing';

type Props = {
  children: ReactNode;
};

export const SurfaceCard = ({ children }: Props) => (
  <View style={styles.card}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    gap: spacing.sm,
    padding: spacing.md,
    ...cardShadow,
  },
});
