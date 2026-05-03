import { onValue, ref, set } from 'firebase/database';

import { realtimeDb } from '@/src/config/firebase';

export const greenhousePaths = {
  camera: 'invernadero/camara',
  control: 'invernadero/control',
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
