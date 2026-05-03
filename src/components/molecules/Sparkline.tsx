import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { AppText } from '@/src/components/atoms/AppText';
import { colors } from '@/src/theme/colors';

type Props = {
  color: string;
  label: string;
  values: number[];
};

const buildPath = (values: number[], width: number, height: number) => {
  if (!values.length) return '';
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
};

export const Sparkline = ({ color, label, values }: Props) => {
  const [width, setWidth] = useState(260);

  return (
    <View onLayout={(event) => setWidth(event.nativeEvent.layout.width - 24)} style={styles.container}>
      <AppText tone="muted">{label}</AppText>
      <Svg height={52} width="100%">
        <Path d={buildPath(values, width, 42)} fill="none" stroke={color} strokeWidth={3} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${colors.surfaceMuted}aa`,
    borderRadius: 16,
    gap: 8,
    padding: 12,
  },
});
