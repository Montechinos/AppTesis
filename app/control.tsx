import { ScreenView } from '@/src/components/atoms/ScreenView';
import { SectionHeading } from '@/src/components/atoms/SectionHeading';
import { AlertBanner } from '@/src/components/molecules/AlertBanner';
import { ConnectionBanner } from '@/src/components/molecules/ConnectionBanner';
import { ControlPanel } from '@/src/components/organisms/ControlPanel';
import { useGreenhouseSystem } from '@/src/hooks/useGreenhouseSystem';

export default function ControlScreen() {
  const state = useGreenhouseSystem();

  return (
    <ScreenView>
      <SectionHeading
        subtitle="Los cambios se escriben en /invernadero/control."
        title="Control del invernadero"
      />
      <ConnectionBanner isChecking={state.isChecking} isOffline={state.isOffline} />
      {!state.sensors.hayAgua ? (
        <AlertBanner
          alert={{
            id: 'water-lock',
            title: 'Bombas deshabilitadas',
            description: 'No hay agua disponible en el tanque.',
            severity: 'high',
          }}
        />
      ) : null}
      <ControlPanel
        control={state.control}
        hasWater={state.sensors.hayAgua}
        onToggle={state.setToggle}
      />
    </ScreenView>
  );
}
