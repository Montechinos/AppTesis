import { AppButton } from '@/src/components/atoms/AppButton';

type Props = {
  label: string;
  onPress: () => void;
};

export const AuthButton = ({ label, onPress }: Props) => (
  <AppButton icon="login-variant" label={label} onPress={onPress} />
);
