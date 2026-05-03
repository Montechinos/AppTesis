import { AlertItem, SensorData } from '@/src/types/invernadero';

export const buildAlerts = (data: SensorData): AlertItem[] => {
  const alerts: AlertItem[] = [];

  if (!data.hayAgua) {
    alerts.push({
      id: 'water',
      title: 'Tanque sin agua',
      description: 'Las bombas quedaron bloqueadas para proteger el sistema.',
      severity: 'high',
    });
  }

  if (data.temp1 > 30 || data.temp2 > 30) {
    alerts.push({
      id: 'temp',
      title: 'Temperatura alta',
      description: 'Uno de los sensores supero los 30 C.',
      severity: 'medium',
    });
  }

  if (data.temp1 === -1 || data.hum1 === -1 || data.dht1Error) {
    alerts.push({
      id: 'dht1',
      title: 'Sensor DHT1 desconectado',
      description: 'El ESP32 reporto error o valores -1 en el primer sensor.',
      severity: 'high',
    });
  }

  if (data.temp2 === -1 || data.hum2 === -1 || data.dht2Error) {
    alerts.push({
      id: 'dht2',
      title: 'Sensor DHT2 desconectado',
      description: 'El ESP32 reporto error o valores -1 en el segundo sensor.',
      severity: 'high',
    });
  }

  if (data.suelo1 < 30 || data.suelo2 < 30) {
    alerts.push({
      id: 'soil',
      title: 'Suelo seco',
      description: 'La humedad del suelo bajo de 30% en una zona.',
      severity: 'medium',
    });
  }

  return alerts;
};
