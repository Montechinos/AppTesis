import { ScreenView } from '@/src/components/atoms/ScreenView';
import { SectionHeading } from '@/src/components/atoms/SectionHeading';
import { useGreenhouse } from '@/src/context/GreenhouseProvider';
import { ConnectionBanner } from '@/src/components/molecules/ConnectionBanner';
import { AlertsPanel } from '@/src/components/organisms/AlertsPanel';

export default function AlertsScreen() {
  const state = useGreenhouse();

  return (
    <ScreenView>
      <SectionHeading
        subtitle="Se generan con reglas simples sobre agua, temperatura y suelo."
        title="Centro de alertas"
      />
      <ConnectionBanner isChecking={state.isChecking} isOffline={state.isOffline} />
      <AlertsPanel alerts={state.alerts} />
    </ScreenView>
  );
}
