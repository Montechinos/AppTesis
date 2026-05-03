import { TextInput, TextInputProps } from 'react-native';

import { useThemeMode } from '@/src/hooks/useThemeMode';
import { radius, spacing } from '@/src/theme/spacing';

export const AppTextInput = (props: TextInputProps) => {
  const { colors } = useThemeMode();

  return (
    <TextInput
      placeholderTextColor={colors.textMuted}
      {...props}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radius.md,
          borderWidth: 1,
          color: colors.text,
          minHeight: 50,
          paddingHorizontal: spacing.md,
        },
        props.style,
      ]}
    />
  );
};
