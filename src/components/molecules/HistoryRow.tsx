import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { SensorSnapshot } from '@/src/types/invernadero';
import { formatPercent, formatTemp } from '@/src/utils/formatters';

type Props = {
  item: SensorSnapshot;
};

export const HistoryRow = ({ item }: Props) => (
  <View style={styles.row}>
    <AppText tone="muted">
      {new Date(item.timestamp).toLocaleTimeString()}
    </AppText>
    <AppText>{formatTemp(item.tempAverage)}</AppText>
    <AppText>{formatPercent(item.soilAverage)}</AppText>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
