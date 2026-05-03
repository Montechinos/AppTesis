import { greenhousePaths, subscribeToPath } from '@/src/services/firebaseService';
import { SensorData } from '@/src/types/invernadero';

export const sensorDefaults: SensorData = {
  temp1: 0,
  hum1: 0,
  temp2: 0,
  hum2: 0,
  suelo1: 0,
  suelo2: 0,
  hayAgua: false,
  foco: false,
  ventilador: false,
  bomba1: false,
  bomba2: false,
  modoAuto: false,
  wifi: false,
  ip: '--',
  uptime: '--',
};

export const subscribeToSensors = (
  onData: (data: SensorData) => void,
  onError?: (message: string) => void,
) =>
  subscribeToPath<SensorData>(greenhousePaths.sensors, (data) => {
    if (!data) {
      onError?.('Sin datos de sensores disponibles');
      return;
    }

    onData({ ...sensorDefaults, ...data });
  });
