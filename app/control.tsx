import { ScreenView } from '@/src/components/atoms/ScreenView';
import { SectionHeading } from '@/src/components/atoms/SectionHeading';
import { useGreenhouse } from '@/src/context/GreenhouseProvider';
import { AlertBanner } from '@/src/components/molecules/AlertBanner';
import { ConnectionBanner } from '@/src/components/molecules/ConnectionBanner';
import { InfoBanner } from '@/src/components/molecules/InfoBanner';
import { ControlPanel } from '@/src/components/organisms/ControlPanel';

export default function ControlScreen() {
  const state = useGreenhouse();

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
      {state.savingKey ? <InfoBanner message={`Guardando ${state.savingKey}...`} /> : null}
      <ControlPanel
        control={state.control}
        hasWater={state.sensors.hayAgua}
        savingKey={state.savingKey}
        onToggle={state.setToggle}
      />
    </ScreenView>
  );
}
