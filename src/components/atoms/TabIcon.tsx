import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { colors } from '@/src/theme/colors';

type Props = {
  focused: boolean;
  name: keyof typeof MaterialCommunityIcons.glyphMap;
};

export const TabIcon = ({ focused, name }: Props) => (
  <MaterialCommunityIcons
    color={focused ? colors.primary : colors.tabInactive}
    name={name}
    size={22}
  />
);
