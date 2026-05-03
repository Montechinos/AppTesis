import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { colors } from '@/src/theme/colors';
import { radius, spacing } from '@/src/theme/spacing';

type Props = {
  label: string;
  onPress: () => void;
};

export const PrimaryButton = ({ label, onPress }: Props) => (
  <Pressable onPress={onPress} style={styles.button}>
    <AppText style={styles.label} tone="inverse" weight="semibold">
      {label}
    </AppText>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  label: { fontSize: 14 },
});
