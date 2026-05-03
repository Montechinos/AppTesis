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
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
    <View style={{ minWidth: 150, flex: 1 }}>
      <ControlRow disabled={savingKey === 'modoAuto'} helper="El ESP32 decide riego y clima." icon="autorenew" label="Modo automatico" onChange={(value) => onToggle('modoAuto', value)} value={control.modoAuto} />
    </View>
    <View style={{ minWidth: 150, flex: 1 }}>
      <ControlRow disabled={savingKey === 'foco'} helper="Iluminacion del cultivo." icon="lightbulb-on-outline" label="Foco" onChange={(value) => onToggle('foco', value)} value={control.foco} />
    </View>
    <View style={{ minWidth: 150, flex: 1 }}>
      <ControlRow disabled={savingKey === 'ventilador'} helper="Estabiliza temperatura." icon="fan" label="Ventilador" onChange={(value) => onToggle('ventilador', value)} value={control.ventilador} />
    </View>
    <View style={{ minWidth: 150, flex: 1 }}>
      <ControlRow disabled={!hasWater || control.modoAuto || savingKey === 'bomba1'} helper={control.modoAuto ? 'Controlada automaticamente.' : 'Riego de la zona 1.'} icon="water-pump" label="Bomba 1" onChange={(value) => onToggle('bomba1', value)} value={control.bomba1} />
    </View>
    <View style={{ minWidth: 150, flex: 1 }}>
      <ControlRow disabled={!hasWater || control.modoAuto || savingKey === 'bomba2'} helper={control.modoAuto ? 'Controlada automaticamente.' : 'Riego de la zona 2.'} icon="water-pump-off" label="Bomba 2" onChange={(value) => onToggle('bomba2', value)} value={control.bomba2} />
    </View>
  </View>
);
