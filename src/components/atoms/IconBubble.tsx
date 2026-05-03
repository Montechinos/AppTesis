import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/src/theme/colors';
import { radius } from '@/src/theme/spacing';

type Props = {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  color?: string;
};

export const IconBubble = ({ name, color = colors.primary }: Props) => (
  <View style={styles.container}>
    <MaterialCommunityIcons color={color} name={name} size={20} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: `${colors.surface}cf`,
    borderRadius: radius.md,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
});
