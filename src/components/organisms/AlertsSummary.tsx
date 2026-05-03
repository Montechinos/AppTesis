import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';
import { StatusRow } from '@/src/components/molecules/StatusRow';
import { AlertItem } from '@/src/types/invernadero';

type Props = {
  alerts: AlertItem[];
};

export const AlertsSummary = ({ alerts }: Props) => (
  <SurfaceCard>
    <StatusRow label="Total activas" tone={alerts.length ? 'warning' : 'success'} value={`${alerts.length}`} />
    <StatusRow label="Criticas" tone="danger" value={`${alerts.filter((item) => item.severity === 'high').length}`} />
    <StatusRow label="Preventivas" tone="info" value={`${alerts.filter((item) => item.severity !== 'high').length}`} />
  </SurfaceCard>
);
