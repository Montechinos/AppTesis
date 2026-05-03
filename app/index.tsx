import { LoadingState } from '@/src/components/atoms/LoadingState';
import { ScreenView } from '@/src/components/atoms/ScreenView';
import { SectionHeading } from '@/src/components/atoms/SectionHeading';
import { ConnectionBanner } from '@/src/components/molecules/ConnectionBanner';
import { AlertsPanel } from '@/src/components/organisms/AlertsPanel';
import { DashboardHero } from '@/src/components/organisms/DashboardHero';
import { HistoryPanel } from '@/src/components/organisms/HistoryPanel';
import { SensorGrid } from '@/src/components/organisms/SensorGrid';
import { SoilStatusPanel } from '@/src/components/organisms/SoilStatusPanel';
import { SystemStatusPanel } from '@/src/components/organisms/SystemStatusPanel';
import { useGreenhouse } from '@/src/context/GreenhouseProvider';

export default function DashboardScreen() {
  const state = useGreenhouse();

  if (state.loading) {
    return <LoadingState />;
  }

  return (
    <ScreenView>
      <DashboardHero sensors={state.sensors} />
      <ConnectionBanner isChecking={state.isChecking} isOffline={state.isOffline} />
      <SectionHeading subtitle="Lecturas DHT y ambiente interno." title="Sensores" />
      <SensorGrid sensors={state.sensors} />
      <SectionHeading subtitle="Seguimiento de suelo y servicios del sistema." title="Operación" />
      <SoilStatusPanel sensors={state.sensors} />
      <SystemStatusPanel sensors={state.sensors} />
      <SectionHeading subtitle="Alertas activas calculadas desde Firebase." title="Alertas rápidas" />
      <AlertsPanel alerts={state.alerts} />
      <SectionHeading subtitle="Historial local en memoria del dispositivo." title="Historial visual" />
      <HistoryPanel history={state.history} />
    </ScreenView>
  );
}
