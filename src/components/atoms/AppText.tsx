import { Text, TextProps } from 'react-native';

import { colors } from '@/src/theme/colors';
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

const colorMap = {
  default: colors.text,
  muted: colors.textMuted,
  inverse: colors.surface,
};

export const AppText = ({
  style,
  tone = 'default',
  weight = 'regular',
  ...props
}: Props) => (
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
