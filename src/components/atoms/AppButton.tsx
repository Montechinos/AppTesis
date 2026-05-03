import { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { AppText } from '@/src/components/atoms/AppText';
import { useThemeMode } from '@/src/hooks/useThemeMode';
import { radius, spacing } from '@/src/theme/spacing';

type Props = {
  label: string;
  icon?: ComponentProps<typeof MaterialCommunityIcons>['name'];
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  onPress: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AppButton = ({ label, disabled, icon, variant = 'primary', onPress }: Props) => {
  const { colors } = useThemeMode();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const backgroundColor =
    variant === 'danger'
      ? colors.danger
      : variant === 'secondary'
        ? colors.surfaceMuted
        : variant === 'ghost'
          ? 'transparent'
          : colors.primary;
  const labelColor = variant === 'primary' || variant === 'danger' ? colors.surface : colors.text;

  return (
    <AnimatedPressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      style={[
        styles.button,
        { backgroundColor, borderColor: colors.border, opacity: disabled ? 0.55 : 1 },
        animatedStyle,
      ]}
    >
      <View style={styles.content}>
        {icon ? <MaterialCommunityIcons color={labelColor} name={icon} size={20} /> : null}
        <AppText style={{ color: labelColor }} weight="semibold">
          {label}
        </AppText>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: radius.pill,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  content: { alignItems: 'center', flexDirection: 'row', gap: spacing.xs },
});
