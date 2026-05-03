import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';
import { StatusRow } from '@/src/components/molecules/StatusRow';
import { SensorData } from '@/src/types/invernadero';

type Props = {
  sensors: SensorData;
};

export const SystemStatusPanel = ({ sensors }: Props) => (
  <SurfaceCard>
    <StatusRow label="Agua disponible" tone={sensors.hayAgua ? 'success' : 'danger'} value={sensors.hayAgua ? 'Disponible' : 'Vacio'} />
    <StatusRow label="WiFi del ESP32" tone={sensors.wifi ? 'success' : 'danger'} value={sensors.wifi ? 'Conectado' : 'Sin red'} />
    <StatusRow
      label="Modo de trabajo"
      tone={sensors.modoAuto ? 'success' : 'warning'}
      value={sensors.modoAuto ? 'Automatico' : 'Manual'}
    />
  </SurfaceCard>
);
