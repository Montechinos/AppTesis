import { View } from 'react-native';

import { colors } from '@/src/theme/colors';

export const Divider = () => (
  <View
    style={{
      backgroundColor: colors.border,
      height: 1,
      width: '100%',
    }}
  />
);
