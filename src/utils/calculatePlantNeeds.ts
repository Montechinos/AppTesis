import { PlantPhase, PlantPhaseOption, PlantTargets } from '@/src/types/plant';

export const PLANT_PHASE_OPTIONS: PlantPhaseOption[] = [
  {
    label: 'Germinacion',
    value: 'germinacion',
    description:
      'Etapa inicial donde la semilla empieza a brotar y necesita humedad constante.',
  },
  {
    label: 'Desarrollo',
    value: 'desarrollo',
    description:
      'Etapa de crecimiento de tallos, hojas y raices; requiere equilibrio de luz, agua y aire.',
  },
  {
    label: 'Floracion',
    value: 'floracion',
    description:
      'Etapa donde aparecen flores; necesita condiciones estables para evitar estres.',
  },
  {
    label: 'Fructificacion',
    value: 'fructificacion',
    description:
      'Etapa donde se forman los frutos; suele requerir mas agua, luz y control ambiental.',
  },
];

const targetRules: Record<PlantPhase, PlantTargets> = {
  germinacion: {
    luzObjetivo: 40,
    aguaObjetivo: 75,
    humedadSueloObjetivo: 80,
    ventilacionObjetivo: 35,
    temperaturaObjetivo: 22,
    humedadAireObjetivo: 75,
  },
  desarrollo: {
    luzObjetivo: 70,
    aguaObjetivo: 60,
    humedadSueloObjetivo: 65,
    ventilacionObjetivo: 55,
    temperaturaObjetivo: 24,
    humedadAireObjetivo: 65,
  },
  floracion: {
    luzObjetivo: 80,
    aguaObjetivo: 55,
    humedadSueloObjetivo: 60,
    ventilacionObjetivo: 65,
    temperaturaObjetivo: 24,
    humedadAireObjetivo: 60,
  },
  fructificacion: {
    luzObjetivo: 85,
    aguaObjetivo: 70,
    humedadSueloObjetivo: 70,
    ventilacionObjetivo: 70,
    temperaturaObjetivo: 25,
    humedadAireObjetivo: 60,
  },
};

export const getPlantPhaseLabel = (phase: PlantPhase) =>
  PLANT_PHASE_OPTIONS.find((option) => option.value === phase)?.label ?? phase;

export const calculatePlantNeeds = (
  plantName: string,
  phase: PlantPhase,
): PlantTargets => {
  const normalizedName = plantName.trim().toLowerCase();

  // Simulacion local de IA: por ahora usa reglas por fase. El nombre se normaliza
  // para conectar ajustes por cultivo o un servicio de IA sin cambiar la firma.
  void normalizedName;

  return { ...targetRules[phase] };
};
