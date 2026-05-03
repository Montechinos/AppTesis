import { Image, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { EmptyState } from '@/src/components/atoms/EmptyState';
import { PrimaryButton } from '@/src/components/atoms/PrimaryButton';
import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';
import { CameraData } from '@/src/types/invernadero';
import { colors } from '@/src/theme/colors';
import { radius, spacing } from '@/src/theme/spacing';
import { formatUpdatedAt } from '@/src/utils/formatters';

type Props = {
  camera: CameraData;
  imageUri: string;
  onRefresh: () => void;
};

export const CameraPanel = ({ camera, imageUri, onRefresh }: Props) => (
  <SurfaceCard>
    {camera.capture ? (
      <Image source={{ uri: imageUri }} style={styles.image} />
    ) : (
      <EmptyState icon="cctv-off" message="Camara no disponible" />
    )}
    <View style={styles.footer}>
      <View style={{ flex: 1 }}>
        <AppText weight="semibold">IP camara: {camera.ip || '--'}</AppText>
        <AppText tone="muted">Actualizado: {formatUpdatedAt(camera.actualizado)}</AppText>
      </View>
      <PrimaryButton label="Refrescar" onPress={onRefresh} />
    </View>
  </SurfaceCard>
);

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    height: 220,
    width: '100%',
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
