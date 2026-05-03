import { AppSwitch } from '@/src/components/atoms/AppSwitch';
import { AppText } from '@/src/components/atoms/AppText';
import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';

type Props = {
  label: string;
  helper: string;
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
};

export const ControlRow = ({
  label,
  helper,
  value,
  disabled,
  onChange,
}: Props) => (
  <SurfaceCard>
    <AppSwitch disabled={disabled} label={label} onChange={onChange} value={value} />
    <AppText tone="muted">{helper}</AppText>
  </SurfaceCard>
);
