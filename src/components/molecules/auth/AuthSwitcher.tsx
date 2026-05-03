import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { useThemeMode } from '@/src/hooks/useThemeMode';

type Props = {
  action: string;
  prompt: string;
  onPress: () => void;
};

export const AuthSwitcher = ({ action, prompt, onPress }: Props) => {
  const { colors } = useThemeMode();

  return (
    <View style={styles.container}>
      <AppText tone="muted">{prompt}</AppText>
      <Pressable onPress={onPress}>
        <AppText style={{ color: colors.primary }} weight="bold">
          {action}
        </AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
