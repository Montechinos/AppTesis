import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { AlertItem } from '@/src/types/invernadero';
import { colors } from '@/src/theme/colors';
import { radius, spacing } from '@/src/theme/spacing';

type Props = {
  alert: AlertItem;
};

const accentMap = {
  high: colors.danger,
  low: colors.secondary,
  medium: colors.warning,
};

export const AlertBanner = ({ alert }: Props) => (
  <View style={[styles.container, { borderColor: accentMap[alert.severity] }]}>
    <MaterialCommunityIcons
      color={accentMap[alert.severity]}
      name="alert-circle"
      size={22}
    />
    <View style={styles.copy}>
      <AppText weight="bold">{alert.title}</AppText>
      <AppText tone="muted">{alert.description}</AppText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderLeftWidth: 4,
    borderRadius: radius.md,
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
  },
  copy: { flex: 1, gap: 4 },
});
