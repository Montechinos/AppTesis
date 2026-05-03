import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

import { useThemeMode } from '@/src/hooks/useThemeMode';

export const NatureBackground = () => {
  const { isDark } = useThemeMode();
  const drift = useSharedValue(0);

  useEffect(() => {
    drift.value = withRepeat(
      withSequence(withTiming(1, { duration: 4200 }), withTiming(0, { duration: 4200 })),
      -1,
      true,
    );
  }, [drift]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: isDark ? 0.22 : 0.32,
    transform: [{ translateY: drift.value * 16 }],
  }));

  return (
    <View style={[StyleSheet.absoluteFill, styles.noPointerEvents]}>
      <LinearGradient
        colors={isDark ? ['#071612', '#10231d', '#0d1b2a'] : ['#f7fffb', '#e8f9f5', '#eef8ff']}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[styles.circle, styles.primary, animatedStyle]} />
      <Animated.View style={[styles.circle, styles.secondary, animatedStyle]} />
      <View style={[styles.moon, { opacity: isDark ? 0.45 : 0.1 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: 999,
    position: 'absolute',
  },
  moon: {
    backgroundColor: '#d9f6ff',
    borderRadius: 999,
    height: 70,
    position: 'absolute',
    right: 28,
    top: 42,
    width: 70,
  },
  noPointerEvents: {
    pointerEvents: 'none',
  },
  primary: {
    backgroundColor: '#b7ead5',
    height: 210,
    left: -82,
    top: 80,
    width: 210,
  },
  secondary: {
    backgroundColor: '#b9e6ff',
    bottom: 160,
    height: 180,
    right: -70,
    width: 180,
  },
});
