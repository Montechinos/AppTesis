import { useAlertsFeed } from '@/src/hooks/useAlertsFeed';
import { useControlState } from '@/src/hooks/useControlState';
import { useHistory } from '@/src/hooks/useHistory';
import { useNetworkStatus } from '@/src/hooks/useNetworkStatus';
import { useSensorStream } from '@/src/hooks/useSensorStream';

export const useGreenhouseSystem = () => {
  const sensorState = useSensorStream();
  const historyState = useHistory(sensorState.sensors);
  const controlState = useControlState(historyState.addEvent);
  const networkState = useNetworkStatus();
  const alerts = useAlertsFeed(sensorState.sensors);

  return {
    ...sensorState,
    ...controlState,
    ...historyState,
    ...networkState,
    alerts,
  };
};
