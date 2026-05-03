import { StyleSheet, Switch, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { colors } from '@/src/theme/colors';

type Props = {
  label: string;
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
};

export const AppSwitch = ({ label, value, disabled, onChange }: Props) => (
  <View style={styles.container}>
    <AppText style={styles.label} weight="semibold">
      {label}
    </AppText>
    <Switch
      disabled={disabled}
      onValueChange={onChange}
      thumbColor={colors.surface}
      trackColor={{ false: colors.border, true: colors.primary }}
      value={value}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: { flex: 1, fontSize: 15, marginRight: 12 },
});
