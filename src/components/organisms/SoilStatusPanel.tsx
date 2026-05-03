import { View } from 'react-native';

import { MetricCard } from '@/src/components/molecules/MetricCard';
import { SensorData } from '@/src/types/invernadero';
import { formatPercent } from '@/src/utils/formatters';

type Props = {
  sensors: SensorData;
};

export const SoilStatusPanel = ({ sensors }: Props) => (
  <View style={{ flexDirection: 'row', gap: 12 }}>
    <View style={{ flex: 1 }}>
      <MetricCard
        detail="Zona de riego 1"
        icon="sprinkler"
        label="Suelo 1"
        value={formatPercent(sensors.suelo1)}
      />
    </View>
    <View style={{ flex: 1 }}>
      <MetricCard
        detail="Zona de riego 2"
        icon="sprinkler-variant"
        label="Suelo 2"
        value={formatPercent(sensors.suelo2)}
      />
    </View>
  </View>
);
