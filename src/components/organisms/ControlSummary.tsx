import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';
import { StatusRow } from '@/src/components/molecules/StatusRow';
import { ControlData } from '@/src/types/invernadero';

type Props = {
  control: ControlData;
};

export const ControlSummary = ({ control }: Props) => (
  <SurfaceCard>
    <StatusRow label="Modo actual" tone={control.modoAuto ? 'success' : 'warning'} value={control.modoAuto ? 'Automatico' : 'Manual'} />
    <StatusRow label="Iluminacion" tone={control.foco ? 'success' : 'info'} value={control.foco ? 'Encendida' : 'Apagada'} />
    <StatusRow label="Ventilacion" tone={control.ventilador ? 'success' : 'info'} value={control.ventilador ? 'Activa' : 'Detenida'} />
  </SurfaceCard>
);
