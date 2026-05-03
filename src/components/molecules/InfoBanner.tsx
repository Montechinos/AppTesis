import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { colors } from '@/src/theme/colors';
import { radius, spacing } from '@/src/theme/spacing';

type Props = {
  message: string;
  tone?: 'danger' | 'info';
};

const backgroundMap = {
  danger: '#ffe8e8',
  info: '#e8f4ff',
};

export const InfoBanner = ({ message, tone = 'info' }: Props) => (
  <View style={[styles.container, { backgroundColor: backgroundMap[tone] }]}>
    <AppText style={styles.text}>{message}</AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    padding: spacing.md,
  },
  text: {
    color: colors.text,
    lineHeight: 18,
  },
});
