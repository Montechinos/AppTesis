import AsyncStorage from '@react-native-async-storage/async-storage';

import { activatePlantControlMode } from '@/src/services/controlService';
import { greenhousePaths, readPath, writePath } from '@/src/services/firebaseService';
import { ActivePlantConfig } from '@/src/types/plant';

export const ACTIVE_PLANT_CONFIG_KEY = 'activePlantConfig';

export const getActivePlantConfig = async () => {
  try {
    const remoteConfig = await readPath<ActivePlantConfig>(greenhousePaths.activePlant);

    if (remoteConfig) {
      await AsyncStorage.setItem(ACTIVE_PLANT_CONFIG_KEY, JSON.stringify(remoteConfig));
      return remoteConfig;
    }
  } catch {
    // Si Firebase no responde, la app aun puede arrancar con la copia local.
  }

  const storedValue = await AsyncStorage.getItem(ACTIVE_PLANT_CONFIG_KEY);

  if (!storedValue) {
    return null;
  }

  return JSON.parse(storedValue) as ActivePlantConfig;
};

export const saveActivePlantConfig = async (config: ActivePlantConfig) => {
  await AsyncStorage.setItem(ACTIVE_PLANT_CONFIG_KEY, JSON.stringify(config));
  await writePath(greenhousePaths.activePlant, config);
  await activatePlantControlMode(config);
  return config;
};
