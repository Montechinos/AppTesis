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
  const [plantConfigError, setPlantConfigError] = useState('');

  useEffect(() => {
    let isMounted = true;

    getActivePlantConfig()
      .then((config) => {
        if (isMounted) {
          setActivePlant(config);
        }
      })
      .catch(() => {
        if (isMounted) {
          setPlantConfigError('No se pudo cargar la planta activa desde Firebase.');
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
      setPlantConfigError('');
      const config: ActivePlantConfig = {
        plantName: plantName.trim(),
        phase,
        targets: calculatePlantNeeds(plantName, phase),
        createdAt: new Date().toISOString(),
      };

      await saveActivePlantConfig(config);
      setActivePlant(config);
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
      plantConfigError,
    }),
    [activePlant, configurePlant, isLoadingPlant, plantConfigError],
  );
};
