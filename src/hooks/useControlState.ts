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

const labels: Record<DeviceToggleKey, string> = {
  modoAuto: 'modo automatico',
  foco: 'foco',
  ventilador: 'ventilador',
  bomba1: 'bomba 1',
  bomba2: 'bomba 2',
};

export const useControlState = (
  onEvent?: (title: string, description: string, source?: 'manual' | 'automatico') => void,
) => {
  const [control, setControl] = useState<ControlData>(defaults);
  const [savingKey, setSavingKey] = useState<DeviceToggleKey | null>(null);
  const [saveError, setSaveError] = useState('');

  useEffect(() => subscribeToControl(setControl), []);

  const setToggle = async (key: DeviceToggleKey, value: boolean) => {
    setSavingKey(key);
    setSaveError('');

    try {
      await updateControlValue(key, value);
      onEvent?.(
        `${value ? 'Se activo' : 'Se apago'} ${labels[key]}`,
        `Cambio manual escrito en /invernadero/control/${key}.`,
        'manual',
      );
    } catch {
      setSaveError(`No se pudo actualizar ${key}.`);
    } finally {
      setSavingKey(null);
    }
  };

  return { control, saveError, savingKey, setToggle };
};
