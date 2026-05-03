import { SensorData, SensorSnapshot } from '@/src/types/invernadero';

export const MAX_HISTORY = 12;

export const buildSnapshot = (data: SensorData): SensorSnapshot => ({
  id: `${Date.now()}`,
  timestamp: Date.now(),
  tempAverage: (data.temp1 + data.temp2) / 2,
  soilAverage: (data.suelo1 + data.suelo2) / 2,
});

export const appendSnapshot = (
  current: SensorSnapshot[],
  snapshot: SensorSnapshot,
) => [...current, snapshot].slice(-MAX_HISTORY);
