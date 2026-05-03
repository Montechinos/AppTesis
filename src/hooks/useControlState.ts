import { useEffect, useState } from 'react';

import { subscribeToControl, updateControlValue } from '@/src/services/controlService';
import { ControlData, DeviceToggleKey } from '@/src/types/invernadero';

const defaults: ControlData = {
  modoAuto: false,
  foco: false,
  ventilador: false,
  bomba1: false,
  bomba2: false,
};

export const useControlState = () => {
  const [control, setControl] = useState<ControlData>(defaults);
  const [savingKey, setSavingKey] = useState<DeviceToggleKey | null>(null);
  const [saveError, setSaveError] = useState('');

  useEffect(() => subscribeToControl(setControl), []);

  const setToggle = async (key: DeviceToggleKey, value: boolean) => {
    setSavingKey(key);
    setSaveError('');

    try {
      await updateControlValue(key, value);
    } catch {
      setSaveError(`No se pudo actualizar ${key}.`);
    } finally {
      setSavingKey(null);
    }
  };

  return { control, saveError, savingKey, setToggle };
};
