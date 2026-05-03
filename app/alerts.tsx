import { ScreenView } from '@/src/components/atoms/ScreenView';
import { SectionHeading } from '@/src/components/atoms/SectionHeading';
import { ConnectionBanner } from '@/src/components/molecules/ConnectionBanner';
import { AlertsPanel } from '@/src/components/organisms/AlertsPanel';
import { useGreenhouseSystem } from '@/src/hooks/useGreenhouseSystem';

export default function AlertsScreen() {
  const state = useGreenhouseSystem();

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
