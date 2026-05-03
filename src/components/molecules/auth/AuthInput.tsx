import { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { AppTextInput } from '@/src/components/atoms/AppTextInput';
import { useThemeMode } from '@/src/hooks/useThemeMode';
import { radius, spacing } from '@/src/theme/spacing';

type Props = ComponentProps<typeof AppTextInput> & {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

export const AuthInput = ({ icon, style, ...props }: Props) => {
  const { colors, isDark } = useThemeMode();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: isDark ? '#000000' : colors.shadow,
        },
      ]}
    >
      <MaterialCommunityIcons color={colors.textMuted} name={icon} size={21} />
      <AppTextInput
        {...props}
        style={[
          styles.input,
          {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          },
          style,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    elevation: 2,
    flexDirection: 'row',
    gap: spacing.xs,
    minHeight: 54,
    paddingLeft: spacing.md,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  input: {
    borderWidth: 0,
    flex: 1,
    minHeight: 52,
    paddingLeft: 0,
  },
});
