import { useEffect, useState } from 'react';

import { subscribeToSensors, sensorDefaults } from '@/src/services/sensorService';
import { SensorData, SensorSnapshot } from '@/src/types/invernadero';
import { appendSnapshot, buildSnapshot } from '@/src/utils/history';

export const useSensorStream = () => {
  const [sensors, setSensors] = useState<SensorData>(sensorDefaults);
  const [history, setHistory] = useState<SensorSnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToSensors((nextData) => {
      setSensors(nextData);
      setHistory((current) => appendSnapshot(current, buildSnapshot(nextData)));
      setLoading(false);
      setError('');
    }, (message) => {
      setError(message);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { sensors, sensorHistory: history, loading, error };
};
