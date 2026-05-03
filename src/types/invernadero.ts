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
