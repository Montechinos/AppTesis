import { useEffect, useState } from 'react';

import { AlertItem, SensorData } from '@/src/types/invernadero';
import { buildAlerts } from '@/src/utils/alerts';

export const useAlertsFeed = (sensors: SensorData) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  useEffect(() => {
    setAlerts(buildAlerts(sensors));
  }, [sensors]);

  return alerts;
};
