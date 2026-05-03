import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { colors } from '@/src/theme/colors';
import { radius, spacing } from '@/src/theme/spacing';

type Props = {
  label: string;
  tone?: 'success' | 'warning' | 'danger' | 'info';
};

const toneMap = {
  success: colors.success,
  warning: colors.warning,
  danger: colors.danger,
  info: colors.secondary,
};

export const StatusBadge = ({ label, tone = 'info' }: Props) => (
  <View style={[styles.badge, { backgroundColor: `${toneMap[tone]}18` }]}>
    <AppText style={{ color: toneMap[tone], fontSize: 12 }} weight="semibold">
      {label}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
});
