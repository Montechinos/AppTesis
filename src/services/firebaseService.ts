import { get, onValue, ref, set } from 'firebase/database';

import { realtimeDb } from '@/src/config/firebase';

export const greenhousePaths = {
  control: 'invernadero/control',
  activePlant: 'invernadero/plantaActiva',
  sensors: 'invernadero/sensores',
} as const;

export const subscribeToPath = <T>(
  path: string,
  onData: (data: T | null) => void,
) => {
  const pathRef = ref(realtimeDb, path);
  return onValue(pathRef, (snapshot) => {
    onData((snapshot.val() as T | null) ?? null);
  });
};

export const writePath = async <T>(path: string, data: T) => {
  await set(ref(realtimeDb, path), data);
};

export const readPath = async <T>(path: string) => {
  const snapshot = await get(ref(realtimeDb, path));
  return (snapshot.val() as T | null) ?? null;
};
