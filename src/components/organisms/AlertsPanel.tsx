import { View } from 'react-native';

import { EmptyState } from '@/src/components/atoms/EmptyState';
import { AlertBanner } from '@/src/components/molecules/AlertBanner';
import { AlertItem } from '@/src/types/invernadero';

type Props = {
  alerts: AlertItem[];
};

export const AlertsPanel = ({ alerts }: Props) => {
  if (!alerts.length) {
    return <EmptyState icon="shield-check" message="No hay alertas activas." />;
  }

  return (
    <View style={{ gap: 12 }}>
      {alerts.map((alert) => (
        <AlertBanner alert={alert} key={alert.id} />
      ))}
    </View>
  );
};
