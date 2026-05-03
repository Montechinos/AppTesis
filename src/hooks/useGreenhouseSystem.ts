import { useAlertsFeed } from '@/src/hooks/useAlertsFeed';
import { useCameraStream } from '@/src/hooks/useCameraStream';
import { useControlState } from '@/src/hooks/useControlState';
import { useNetworkStatus } from '@/src/hooks/useNetworkStatus';
import { useSensorStream } from '@/src/hooks/useSensorStream';

export const useGreenhouseSystem = () => {
  const sensorState = useSensorStream();
  const controlState = useControlState();
  const cameraState = useCameraStream();
  const networkState = useNetworkStatus();
  const alerts = useAlertsFeed(sensorState.sensors);

  return {
    ...sensorState,
    ...controlState,
    ...cameraState,
    ...networkState,
    alerts,
  };
};
