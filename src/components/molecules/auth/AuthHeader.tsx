import { Image, StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

import { AppText } from '@/src/components/atoms/AppText';
import { useThemeMode } from '@/src/hooks/useThemeMode';
import { spacing } from '@/src/theme/spacing';

const logo = require('@/assets/logo.png');

type Props = {
  subtitle: string;
  title: string;
};

export const AuthHeader = ({ subtitle, title }: Props) => {
  const { colors, isDark } = useThemeMode();
  const scale = useSharedValue(0.9);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 680 });
  }, [scale]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeIn.duration(620).delay(80)}
        style={[
          styles.logoWrap,
          {
            backgroundColor: colors.surface,
            shadowColor: isDark ? colors.primary : colors.shadow,
            shadowOpacity: isDark ? 0.34 : 0.12,
          },
          logoStyle,
        ]}
      >
        <Image resizeMode="contain" source={logo} style={styles.logo} />
      </Animated.View>
      <View style={styles.copy}>
        <AppText style={styles.title} weight="bold">
          {title}
        </AppText>
        <AppText style={styles.subtitle} tone="muted">
          {subtitle}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.md,
  },
  copy: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  logo: {
    height: 104,
    width: 104,
  },
  logoWrap: {
    alignItems: 'center',
    borderRadius: 36,
    elevation: 5,
    height: 124,
    justifyContent: 'center',
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 22,
    width: 124,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    textAlign: 'center',
  },
});
