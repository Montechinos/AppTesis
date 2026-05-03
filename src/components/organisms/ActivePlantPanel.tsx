import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { StatusBadge } from '@/src/components/atoms/StatusBadge';
import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';
import { useThemeMode } from '@/src/hooks/useThemeMode';
import { radius, spacing } from '@/src/theme/spacing';
import { SensorData } from '@/src/types/invernadero';
import { ActivePlantConfig, PlantTargetStatus } from '@/src/types/plant';
import { formatPercent, formatTemp } from '@/src/utils/formatters';
import { getPlantPhaseLabel } from '@/src/utils/calculatePlantNeeds';
import { getPlantTargetStatus } from '@/src/utils/plantTargetStatus';

type Props = {
  activePlant: ActivePlantConfig;
  sensors: SensorData;
  onChangePlant: () => void;
};

type Comparison = {
  label: string;
  current: string;
  target: string;
  status: PlantTargetStatus;
};

const statusTone: Record<PlantTargetStatus, 'success' | 'warning' | 'danger'> = {
  ideal: 'success',
  bajo: 'warning',
  alto: 'danger',
};

export const ActivePlantPanel = ({ activePlant, onChangePlant, sensors }: Props) => {
  const { colors } = useThemeMode();
  const { targets } = activePlant;

  const tempAverage = (sensors.temp1 + sensors.temp2) / 2;
  const airHumidityAverage = (sensors.hum1 + sensors.hum2) / 2;
  const soilAverage = (sensors.suelo1 + sensors.suelo2) / 2;

  const comparisons: Comparison[] = [
    {
      label: 'Temperatura',
      current: formatTemp(tempAverage),
      target: formatTemp(targets.temperaturaObjetivo),
      status: getPlantTargetStatus(tempAverage, targets.temperaturaObjetivo, 1.5),
    },
    {
      label: 'Humedad aire',
      current: formatPercent(airHumidityAverage),
      target: formatPercent(targets.humedadAireObjetivo),
      status: getPlantTargetStatus(airHumidityAverage, targets.humedadAireObjetivo, 8),
    },
    {
      label: 'Humedad suelo',
      current: formatPercent(soilAverage),
      target: formatPercent(targets.humedadSueloObjetivo),
      status: getPlantTargetStatus(soilAverage, targets.humedadSueloObjetivo, 8),
    },
  ];

  return (
    <SurfaceCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={[styles.iconWrap, { backgroundColor: `${colors.primary}18` }]}>
            <MaterialCommunityIcons color={colors.primary} name="sprout" size={24} />
          </View>
          <View style={styles.titleCopy}>
            <AppText tone="muted">Planta activa</AppText>
            <AppText style={styles.title} weight="bold">
              {activePlant.plantName}
            </AppText>
          </View>
        </View>
        <Pressable
          onPress={onChangePlant}
          style={[styles.changeButton, { backgroundColor: colors.primary }]}
        >
          <MaterialCommunityIcons color={colors.surface} name="swap-horizontal" size={18} />
          <AppText tone="inverse" weight="semibold">
            Cambiar planta
          </AppText>
        </Pressable>
      </View>

      <StatusBadge label={`Fase: ${getPlantPhaseLabel(activePlant.phase)}`} tone="info" />

      <View style={styles.section}>
        <AppText weight="bold">Condiciones objetivo</AppText>
        <View style={styles.targetGrid}>
          <TargetPill label="Luz" value={formatPercent(targets.luzObjetivo)} />
          <TargetPill label="Agua" value={formatPercent(targets.aguaObjetivo)} />
          <TargetPill label="Suelo" value={formatPercent(targets.humedadSueloObjetivo)} />
          <TargetPill label="Ventilacion" value={formatPercent(targets.ventilacionObjetivo)} />
          <TargetPill label="Temperatura" value={formatTemp(targets.temperaturaObjetivo)} />
          <TargetPill label="Humedad aire" value={formatPercent(targets.humedadAireObjetivo)} />
        </View>
      </View>

      <View style={styles.section}>
        <AppText weight="bold">Estado real vs objetivo</AppText>
        <View style={styles.comparisonList}>
          {comparisons.map((item) => (
            <View key={item.label} style={styles.comparisonRow}>
              <View>
                <AppText weight="semibold">{item.label}</AppText>
                <AppText style={styles.comparisonDetail} tone="muted">
                  Actual {item.current} | Objetivo {item.target}
                </AppText>
              </View>
              <StatusBadge label={item.status} tone={statusTone[item.status]} />
            </View>
          ))}
        </View>
      </View>
    </SurfaceCard>
  );
};

const TargetPill = ({ label, value }: { label: string; value: string }) => {
  const { colors } = useThemeMode();

  return (
    <View style={[styles.targetPill, { backgroundColor: colors.surfaceMuted }]}>
      <AppText style={styles.targetLabel} tone="muted">
        {label}
      </AppText>
      <AppText weight="bold">{value}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { gap: spacing.md },
  changeButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  comparisonDetail: { fontSize: 12, lineHeight: 18 },
  comparisonList: { gap: spacing.sm },
  comparisonRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: radius.md,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  section: { gap: spacing.sm },
  targetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  targetLabel: { fontSize: 12 },
  targetPill: {
    borderRadius: radius.md,
    minWidth: 132,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  title: { fontSize: 24 },
  titleCopy: { flexShrink: 1 },
  titleRow: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minWidth: 220,
  },
});
