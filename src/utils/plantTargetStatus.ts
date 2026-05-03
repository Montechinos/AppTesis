import { PlantTargetStatus } from '@/src/types/plant';

export const getPlantTargetStatus = (
  current: number,
  target: number,
  tolerance: number,
): PlantTargetStatus => {
  if (current < target - tolerance) return 'bajo';
  if (current > target + tolerance) return 'alto';
  return 'ideal';
};
