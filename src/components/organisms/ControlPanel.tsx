import { View } from 'react-native';

import { ControlRow } from '@/src/components/molecules/ControlRow';
import { ControlData, DeviceToggleKey } from '@/src/types/invernadero';

type Props = {
  control: ControlData;
  hasWater: boolean;
  savingKey: DeviceToggleKey | null;
  onToggle: (key: DeviceToggleKey, value: boolean) => void | Promise<void>;
};

export const ControlPanel = ({ control, hasWater, savingKey, onToggle }: Props) => (
  <View style={{ gap: 12 }}>
    <ControlRow disabled={savingKey === 'modoAuto'} helper="Define si el ESP32 actua por reglas automaticas." label="Modo automatico" onChange={(value) => onToggle('modoAuto', value)} value={control.modoAuto} />
    <ControlRow disabled={savingKey === 'foco'} helper="Enciende la iluminacion del cultivo." label="Foco" onChange={(value) => onToggle('foco', value)} value={control.foco} />
    <ControlRow disabled={savingKey === 'ventilador'} helper="Mueve aire para estabilizar la temperatura." label="Ventilador" onChange={(value) => onToggle('ventilador', value)} value={control.ventilador} />
    <ControlRow disabled={!hasWater || savingKey === 'bomba1'} helper="Riego de la zona 1." label="Bomba 1" onChange={(value) => onToggle('bomba1', value)} value={control.bomba1} />
    <ControlRow disabled={!hasWater || savingKey === 'bomba2'} helper="Riego de la zona 2." label="Bomba 2" onChange={(value) => onToggle('bomba2', value)} value={control.bomba2} />
  </View>
);
