import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NatureBackground } from '@/src/components/molecules/NatureBackground';
import { useThemeMode } from '@/src/hooks/useThemeMode';
import { spacing } from '@/src/theme/spacing';

type Props = {
  children: ReactNode;
};

export const ScreenView = ({ children }: Props) => {
  const { colors } = useThemeMode();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.safeArea,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      <NatureBackground />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: 96 + insets.bottom,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>{children}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { flexGrow: 1 },
  inner: { padding: spacing.md, gap: spacing.md },
});
