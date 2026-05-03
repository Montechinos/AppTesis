import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { colors } from '@/src/theme/colors';
import { radius, spacing } from '@/src/theme/spacing';

type Props = {
  label: string;
  value: string;
};

export const QuickStat = ({ label, value }: Props) => (
  <View style={styles.box}>
    <AppText style={styles.value} tone="inverse" weight="bold">
      {value}
    </AppText>
    <AppText style={styles.label} tone="inverse">
      {label}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  box: {
    backgroundColor: `${colors.surface}22`,
    borderRadius: radius.md,
    minWidth: 92,
    padding: spacing.sm,
  },
  value: { fontSize: 18 },
  label: { fontSize: 12, marginTop: 2, opacity: 0.88 },
});
