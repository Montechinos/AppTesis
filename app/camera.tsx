import { LoadingState } from '@/src/components/atoms/LoadingState';
import { ScreenView } from '@/src/components/atoms/ScreenView';
import { SectionHeading } from '@/src/components/atoms/SectionHeading';
import { useGreenhouse } from '@/src/context/GreenhouseProvider';
import { ConnectionBanner } from '@/src/components/molecules/ConnectionBanner';
import { CameraPanel } from '@/src/components/organisms/CameraPanel';
import { buildCameraUri } from '@/src/utils/camera';

export default function CameraScreen() {
  const state = useGreenhouse();

  if (state.loading) {
    return <LoadingState label="Conectando con la camara..." />;
  }

  return (
    <ScreenView>
      <SectionHeading
        subtitle="Imagen actualizada automaticamente cada segundo."
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
