import { View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { StatusBadge } from '@/src/components/atoms/StatusBadge';
import { HeroCard } from '@/src/components/molecules/HeroCard';
import { SensorData } from '@/src/types/invernadero';

type Props = {
  sensors: SensorData;
};

export const DashboardHero = ({ sensors }: Props) => (
  <HeroCard
    subtitle={`IP ${sensors.ip} | Uptime ${sensors.uptime}`}
    title="Invernadero inteligente"
  >
    <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
      <StatusBadge
        label={sensors.modoAuto ? 'Modo automatico' : 'Modo manual'}
        tone={sensors.modoAuto ? 'success' : 'warning'}
      />
      <StatusBadge label={sensors.wifi ? 'WiFi estable' : 'Sin WiFi'} tone={sensors.wifi ? 'info' : 'danger'} />
      <AppText tone="inverse">ESP32 conectado con Firebase en tiempo real.</AppText>
    </View>
  </HeroCard>
);
