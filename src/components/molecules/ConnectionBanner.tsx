import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { StatusBadge } from '@/src/components/atoms/StatusBadge';
import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';

type Props = {
  isChecking: boolean;
  isOffline: boolean;
};

export const ConnectionBanner = ({ isChecking, isOffline }: Props) => (
  <SurfaceCard>
    <View style={styles.row}>
      <View style={styles.copy}>
        <AppText weight="semibold">Estado de la app</AppText>
        <AppText tone="muted">Monitoreo de conectividad del dispositivo.</AppText>
      </View>
      <StatusBadge
        label={isChecking ? 'Conectando' : isOffline ? 'Offline' : 'Online'}
        tone={isChecking ? 'warning' : isOffline ? 'danger' : 'success'}
      />
    </View>
  </SurfaceCard>
);

const styles = StyleSheet.create({
  copy: { flex: 1, gap: 2 },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
});
