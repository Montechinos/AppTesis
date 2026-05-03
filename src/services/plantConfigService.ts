import AsyncStorage from '@react-native-async-storage/async-storage';

import { ActivePlantConfig } from '@/src/types/plant';

export const ACTIVE_PLANT_CONFIG_KEY = 'activePlantConfig';

export const getActivePlantConfig = async () => {
  const storedValue = await AsyncStorage.getItem(ACTIVE_PLANT_CONFIG_KEY);

  if (!storedValue) {
    return null;
  }

  return JSON.parse(storedValue) as ActivePlantConfig;
};

export const saveActivePlantConfig = async (config: ActivePlantConfig) => {
  await AsyncStorage.setItem(ACTIVE_PLANT_CONFIG_KEY, JSON.stringify(config));
  return config;
};
