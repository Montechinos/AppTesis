import { ref, update } from 'firebase/database';

import { realtimeDb } from '@/src/config/firebase';
import { greenhousePaths, subscribeToPath } from '@/src/services/firebaseService';
import { ControlData, DeviceToggleKey } from '@/src/types/invernadero';

const controlDefaults: ControlData = {
  modoAuto: false,
  foco: false,
  ventilador: false,
  bomba1: false,
  bomba2: false,
};

export const subscribeToControl = (onData: (data: ControlData) => void) =>
  subscribeToPath<ControlData>(greenhousePaths.control, (data) => {
    onData({ ...controlDefaults, ...(data ?? {}) });
  });

export const updateControlValue = async (
  key: DeviceToggleKey,
  value: boolean,
) => {
  return update(ref(realtimeDb, greenhousePaths.control), { [key]: value });
};
