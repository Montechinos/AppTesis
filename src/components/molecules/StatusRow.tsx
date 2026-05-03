import { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { StatusBadge } from '@/src/components/atoms/StatusBadge';

type Props = {
  label: string;
  value: string;
  tone?: ComponentProps<typeof StatusBadge>['tone'];
};

export const StatusRow = ({ label, value, tone = 'info' }: Props) => (
  <View style={styles.row}>
    <AppText tone="muted">{label}</AppText>
    <StatusBadge label={value} tone={tone} />
  </View>
);

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
