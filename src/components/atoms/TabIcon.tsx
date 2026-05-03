import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useThemeMode } from '@/src/hooks/useThemeMode';

type Props = {
  focused: boolean;
  name: keyof typeof MaterialCommunityIcons.glyphMap;
};

export const TabIcon = ({ focused, name }: Props) => {
  const { colors } = useThemeMode();

  return (
    <MaterialCommunityIcons
      color={focused ? colors.primary : colors.tabInactive}
      name={name}
      size={22}
    />
  );
};
