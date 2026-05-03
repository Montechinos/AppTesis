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
      <AppText weight="semibold">Estado de la app</AppText>
      <StatusBadge
        label={isChecking ? 'Conectando' : isOffline ? 'Offline' : 'Online'}
        tone={isChecking ? 'warning' : isOffline ? 'danger' : 'success'}
      />
    </View>
  </SurfaceCard>
);

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
