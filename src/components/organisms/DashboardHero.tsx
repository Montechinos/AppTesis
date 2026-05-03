import { View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { StatusBadge } from '@/src/components/atoms/StatusBadge';
import { HeroCard } from '@/src/components/molecules/HeroCard';
import { QuickStat } from '@/src/components/molecules/QuickStat';
import { SensorData } from '@/src/types/invernadero';
import { formatPercent, formatTemp } from '@/src/utils/formatters';

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
    <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
      <QuickStat label="Promedio temp" value={formatTemp((sensors.temp1 + sensors.temp2) / 2)} />
      <QuickStat label="Promedio suelo" value={formatPercent((sensors.suelo1 + sensors.suelo2) / 2)} />
    </View>
  </HeroCard>
);
