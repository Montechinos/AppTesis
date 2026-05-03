import { ScreenView } from '@/src/components/atoms/ScreenView';
import { SectionHeading } from '@/src/components/atoms/SectionHeading';
import { useGreenhouse } from '@/src/context/GreenhouseProvider';
import { ConnectionBanner } from '@/src/components/molecules/ConnectionBanner';
import { CameraPanel } from '@/src/components/organisms/CameraPanel';

const buildCameraUri = (capture: string, refreshTick: number) =>
  capture ? `${capture}${capture.includes('?') ? '&' : '?'}t=${refreshTick}` : '';

export default function CameraScreen() {
  const state = useGreenhouse();

  return (
    <ScreenView>
      <SectionHeading
        subtitle="Imagen actualizada automáticamente cada segundo."
        title="Vigilancia"
      />
      <ConnectionBanner isChecking={state.isChecking} isOffline={state.isOffline} />
      <CameraPanel
        camera={state.camera}
        imageUri={buildCameraUri(state.camera.capture, state.refreshTick)}
        onRefresh={state.manualRefresh}
      />
    </ScreenView>
  );
}
