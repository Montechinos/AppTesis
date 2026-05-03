import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { colors } from '@/src/theme/colors';
import { radius, spacing } from '@/src/theme/spacing';

type Props = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  message: string;
};

export const EmptyState = ({ icon, message }: Props) => (
  <View style={styles.container}>
    <MaterialCommunityIcons color={colors.textMuted} name={icon} size={28} />
    <AppText style={styles.message} tone="muted">
      {message}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  message: { textAlign: 'center' },
});
