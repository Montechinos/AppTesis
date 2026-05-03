import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';

type Props = {
  label?: string;
};

export const LoadingState = ({ label = 'Cargando invernadero...' }: Props) => (
  <View style={styles.container}>
    <ActivityIndicator color={colors.primary} size="large" />
    <AppText tone="muted">{label}</AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.md,
    justifyContent: 'center',
  },
});
