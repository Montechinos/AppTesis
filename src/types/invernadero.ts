export type DeviceToggleKey =
  | 'modoAuto'
  | 'foco'
  | 'ventilador'
  | 'bomba1'
  | 'bomba2';

export interface SensorData {
  temp1: number;
  hum1: number;
  temp2: number;
  hum2: number;
  suelo1: number;
  suelo2: number;
  hayAgua: boolean;
  foco: boolean;
  ventilador: boolean;
  bomba1: boolean;
  bomba2: boolean;
  modoAuto: boolean;
  wifi: boolean;
  ip: string;
  uptime: string;
  dht1Error?: boolean;
  dht2Error?: boolean;
}

export interface ControlData {
  modoAuto: boolean;
  foco: boolean;
  ventilador: boolean;
  bomba1: boolean;
  bomba2: boolean;
}

export interface CameraData {
  ip: string;
  capture: string;
  actualizado: string;
}

export interface SensorSnapshot {
  id: string;
  timestamp: number;
  tempAverage: number;
  soilAverage: number;
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface HistoryEvent {
  id: string;
  title: string;
  description: string;
  timestamp: number;
  source: 'manual' | 'automatico';
  tone: 'info' | 'success' | 'warning' | 'danger';
}
