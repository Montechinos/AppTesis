import { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { AppSwitch } from '@/src/components/atoms/AppSwitch';
import { AppText } from '@/src/components/atoms/AppText';
import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';
import { useThemeMode } from '@/src/hooks/useThemeMode';

type Props = {
  label: string;
  helper: string;
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
};

export const ControlRow = ({
  label,
  helper,
  icon,
  value,
  disabled,
  onChange,
}: Props) => {
  const { colors } = useThemeMode();

  return (
    <SurfaceCard>
      <View style={styles.iconRow}>
        <MaterialCommunityIcons color={colors.primary} name={icon} size={24} />
        <AppText tone="muted">{value ? 'ON' : 'OFF'}</AppText>
      </View>
      <AppSwitch disabled={disabled} label={label} onChange={onChange} value={value} />
      <AppText tone="muted">{helper}</AppText>
    </SurfaceCard>
  );
};

const styles = StyleSheet.create({
  iconRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
});
