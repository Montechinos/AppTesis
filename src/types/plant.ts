export type PlantPhase =
  | 'germinacion'
  | 'desarrollo'
  | 'floracion'
  | 'fructificacion';

export type PlantTargetStatus = 'ideal' | 'bajo' | 'alto';

export interface PlantTargets {
  luzObjetivo: number;
  aguaObjetivo: number;
  humedadSueloObjetivo: number;
  ventilacionObjetivo: number;
  temperaturaObjetivo: number;
  humedadAireObjetivo: number;
}

export interface ActivePlantConfig {
  plantName: string;
  phase: PlantPhase;
  targets: PlantTargets;
  createdAt: string;
}

export interface PlantPhaseOption {
  label: string;
  value: PlantPhase;
  description: string;
}
