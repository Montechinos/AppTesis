import { View } from 'react-native';

import { MetricCard } from '@/src/components/molecules/MetricCard';
import { SensorData } from '@/src/types/invernadero';
import { formatPercent, formatTemp } from '@/src/utils/formatters';

type Props = {
  sensors: SensorData;
};

export const SensorGrid = ({ sensors }: Props) => (
  <View style={{ gap: 12 }}>
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <View style={{ flex: 1 }}>
        <MetricCard detail="DHT1 ambiente" icon="thermometer" label="Temperatura 1" value={formatTemp(sensors.temp1)} />
      </View>
      <View style={{ flex: 1 }}>
        <MetricCard detail="DHT1 ambiente" icon="water-percent" label="Humedad 1" value={formatPercent(sensors.hum1)} />
      </View>
    </View>
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <View style={{ flex: 1 }}>
        <MetricCard detail="DHT2 ambiente" icon="thermometer-lines" label="Temperatura 2" value={formatTemp(sensors.temp2)} />
      </View>
      <View style={{ flex: 1 }}>
        <MetricCard detail="DHT2 ambiente" icon="water-outline" label="Humedad 2" value={formatPercent(sensors.hum2)} />
      </View>
    </View>
  </View>
);
