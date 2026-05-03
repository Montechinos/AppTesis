import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { LoadingState } from '@/src/components/atoms/LoadingState';
import { ScreenView } from '@/src/components/atoms/ScreenView';
import { SectionHeading } from '@/src/components/atoms/SectionHeading';
import { useGreenhouse } from '@/src/context/GreenhouseProvider';
import { ConnectionBanner } from '@/src/components/molecules/ConnectionBanner';
import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';
import { InfoBanner } from '@/src/components/molecules/InfoBanner';
import { ActivePlantPanel } from '@/src/components/organisms/ActivePlantPanel';
import { AlertsPanel } from '@/src/components/organisms/AlertsPanel';
import { DashboardHero } from '@/src/components/organisms/DashboardHero';
import { HistoryPanel } from '@/src/components/organisms/HistoryPanel';
import { PlantSetupModal } from '@/src/components/organisms/PlantSetupModal';
import { SensorGrid } from '@/src/components/organisms/SensorGrid';
import { SoilStatusPanel } from '@/src/components/organisms/SoilStatusPanel';
import { SystemStatusPanel } from '@/src/components/organisms/SystemStatusPanel';
import { useActivePlant } from '@/src/hooks/useActivePlant';
import { useThemeMode } from '@/src/hooks/useThemeMode';
import { radius, spacing } from '@/src/theme/spacing';

export default function DashboardScreen() {
  const state = useGreenhouse();
  const { colors } = useThemeMode();
  const { activePlant, configurePlant, isLoadingPlant } = useActivePlant();
  const [isPlantModalOpen, setIsPlantModalOpen] = useState(false);

  if (state.loading) {
    return <LoadingState />;
  }

  return (
    <ScreenView>
      <DashboardHero sensors={state.sensors} />
      {activePlant ? (
        <ActivePlantPanel
          activePlant={activePlant}
          onChangePlant={() => setIsPlantModalOpen(true)}
          sensors={state.sensors}
        />
      ) : (
        <SurfaceCard style={styles.addPlantCard}>
          <View style={styles.addPlantCopy}>
            <AppText style={styles.addPlantTitle} weight="bold">
              Configura la planta activa
            </AppText>
            <AppText tone="muted">
              El invernadero usara una sola configuracion activa para calcular sus objetivos.
            </AppText>
          </View>
          <Pressable
            disabled={isLoadingPlant}
            onPress={() => setIsPlantModalOpen(true)}
            style={[
              styles.addPlantButton,
              { backgroundColor: colors.primary, opacity: isLoadingPlant ? 0.55 : 1 },
            ]}
          >
            <MaterialCommunityIcons color={colors.surface} name="plus" size={20} />
            <AppText tone="inverse" weight="semibold">
              Agregar planta
            </AppText>
          </Pressable>
        </SurfaceCard>
      )}
      <ConnectionBanner isChecking={state.isChecking} isOffline={state.isOffline} />
      {state.error ? <InfoBanner message={state.error} tone="danger" /> : null}
      <SectionHeading subtitle="Lecturas DHT y ambiente interno." title="Sensores" />
      <SensorGrid sensors={state.sensors} />
      <SectionHeading subtitle="Seguimiento de suelo y servicios del sistema." title="Operacion" />
      <SoilStatusPanel sensors={state.sensors} />
      <SystemStatusPanel sensors={state.sensors} />
      <SectionHeading subtitle="Alertas activas calculadas desde Firebase." title="Alertas rapidas" />
      <AlertsPanel alerts={state.alerts} />
      <SectionHeading subtitle="Historial local en memoria del dispositivo." title="Historial visual" />
      <HistoryPanel history={state.sensorHistory} />
      <PlantSetupModal
        visible={isPlantModalOpen}
        onClose={() => setIsPlantModalOpen(false)}
        onSubmit={async (plantName, phase) => {
          await configurePlant(plantName, phase);
          setIsPlantModalOpen(false);
        }}
      />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  addPlantButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  addPlantCard: {
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  addPlantCopy: { gap: spacing.xs },
  addPlantTitle: { fontSize: 22 },
});
