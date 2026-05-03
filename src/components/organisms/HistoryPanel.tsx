import { View } from 'react-native';

import { Divider } from '@/src/components/atoms/Divider';
import { AppText } from '@/src/components/atoms/AppText';
import { EmptyState } from '@/src/components/atoms/EmptyState';
import { HistoryRow } from '@/src/components/molecules/HistoryRow';
import { Sparkline } from '@/src/components/molecules/Sparkline';
import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';
import { SensorSnapshot } from '@/src/types/invernadero';
import { colors } from '@/src/theme/colors';

type Props = {
  history: SensorSnapshot[];
};

export const HistoryPanel = ({ history }: Props) => {
  if (!history.length) {
    return <EmptyState icon="chart-line-variant" message="Aun no hay historial local." />;
  }

  return (
    <SurfaceCard>
      <Sparkline
        color={colors.secondary}
        label="Temperatura promedio"
        values={history.map((item) => item.tempAverage)}
      />
      <Sparkline
        color={colors.primary}
        label="Humedad de suelo promedio"
        values={history.map((item) => item.soilAverage)}
      />
      <View style={{ gap: 8 }}>
        <AppText weight="semibold">Ultimas lecturas</AppText>
        <Divider />
        {history.slice().reverse().map((item) => (
          <HistoryRow item={item} key={item.id} />
        ))}
      </View>
    </SurfaceCard>
  );
};
