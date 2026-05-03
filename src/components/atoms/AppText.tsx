import { Text, TextProps } from 'react-native';

import { useThemeMode } from '@/src/hooks/useThemeMode';
import { typography } from '@/src/theme/typography';

type Props = TextProps & {
  tone?: 'default' | 'muted' | 'inverse';
  weight?: 'regular' | 'semibold' | 'bold';
};

const fontWeightMap = {
  regular: '400',
  semibold: '600',
  bold: '700',
} as const;

export const AppText = ({
  style,
  tone = 'default',
  weight = 'regular',
  ...props
}: Props) => {
  const { colors } = useThemeMode();
  const colorMap = {
    default: colors.text,
    muted: colors.textMuted,
    inverse: colors.surface,
  };

  return (
    <Text
      {...props}
      style={[
        {
          color: colorMap[tone],
          fontSize: typography.body,
          fontWeight: fontWeightMap[weight],
        },
        style,
      ]}
    />
  );
};
