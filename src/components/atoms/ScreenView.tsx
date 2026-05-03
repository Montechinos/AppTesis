import { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { NatureBackground } from '@/src/components/molecules/NatureBackground';
import { useThemeMode } from '@/src/hooks/useThemeMode';
import { spacing } from '@/src/theme/spacing';

type Props = {
  children: ReactNode;
};

export const ScreenView = ({ children }: Props) => {
  const { colors } = useThemeMode();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <NatureBackground />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.inner}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { paddingBottom: spacing.xl },
  inner: { padding: spacing.md, gap: spacing.md },
});
