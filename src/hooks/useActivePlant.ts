import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  getActivePlantConfig,
  saveActivePlantConfig,
} from '@/src/services/plantConfigService';
import { ActivePlantConfig, PlantPhase } from '@/src/types/plant';
import { calculatePlantNeeds } from '@/src/utils/calculatePlantNeeds';

export const useActivePlant = () => {
  const [activePlant, setActivePlant] = useState<ActivePlantConfig | null>(null);
  const [isLoadingPlant, setIsLoadingPlant] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getActivePlantConfig()
      .then((config) => {
        if (isMounted) {
          setActivePlant(config);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingPlant(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const configurePlant = useCallback(
    async (plantName: string, phase: PlantPhase) => {
      const config: ActivePlantConfig = {
        plantName: plantName.trim(),
        phase,
        targets: calculatePlantNeeds(plantName, phase),
        createdAt: new Date().toISOString(),
      };

      setActivePlant(config);
      await saveActivePlantConfig(config);
      return config;
    },
    [],
  );

  return useMemo(
    () => ({
      activePlant,
      configurePlant,
      hasActivePlant: Boolean(activePlant),
      isLoadingPlant,
    }),
    [activePlant, configurePlant, isLoadingPlant],
  );
};
