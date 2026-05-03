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
