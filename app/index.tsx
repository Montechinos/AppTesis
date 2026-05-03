import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { AppButton } from '@/src/components/atoms/AppButton';
import { AppText } from '@/src/components/atoms/AppText';
import { AppTextInput } from '@/src/components/atoms/AppTextInput';
import { LoadingState } from '@/src/components/atoms/LoadingState';
import { ScreenView } from '@/src/components/atoms/ScreenView';
import { SectionHeading } from '@/src/components/atoms/SectionHeading';
import { useGreenhouse } from '@/src/context/GreenhouseProvider';
import { ConnectionBanner } from '@/src/components/molecules/ConnectionBanner';
import { InfoBanner } from '@/src/components/molecules/InfoBanner';
import { AlertsPanel } from '@/src/components/organisms/AlertsPanel';
import { DashboardHero } from '@/src/components/organisms/DashboardHero';
import { HistoryPanel } from '@/src/components/organisms/HistoryPanel';
import { SensorGrid } from '@/src/components/organisms/SensorGrid';
import { SoilStatusPanel } from '@/src/components/organisms/SoilStatusPanel';
import { SystemStatusPanel } from '@/src/components/organisms/SystemStatusPanel';
import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';

const PLANT_KEY = 'greenhouse.active.plant';

export default function DashboardScreen() {
  const state = useGreenhouse();
  const [plant, setPlant] = useState('');
  const [draftPlant, setDraftPlant] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(PLANT_KEY).then((storedPlant) => {
      if (storedPlant) {
        setPlant(storedPlant);
        setDraftPlant(storedPlant);
      }
    });
  }, []);

  const savePlant = async () => {
    const nextPlant = draftPlant.trim();
    if (!nextPlant) {
      return;
    }
    setPlant(nextPlant);
    setModalVisible(false);
    await AsyncStorage.setItem(PLANT_KEY, nextPlant);
  };

  if (state.loading) {
    return <LoadingState />;
  }

  return (
    <ScreenView>
      {!plant ? (
        <SurfaceCard>
          <AppText style={styles.title} weight="bold">Selecciona una planta</AppText>
          <AppText tone="muted">Solo una planta queda activa para este panel.</AppText>
          <AppButton icon="sprout-outline" label="Agregar planta" onPress={() => setModalVisible(true)} />
        </SurfaceCard>
      ) : (
        <SurfaceCard>
          <View style={styles.plantHeader}>
            <View>
              <AppText tone="muted">Planta activa</AppText>
              <AppText style={styles.title} weight="bold">{plant}</AppText>
            </View>
            <AppButton label="Cambiar planta" onPress={() => setModalVisible(true)} variant="secondary" />
          </View>
        </SurfaceCard>
      )}
      <DashboardHero sensors={state.sensors} />
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
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <SurfaceCard>
            <AppText style={styles.title} weight="bold">Planta activa</AppText>
            <AppTextInput
              autoCapitalize="words"
              onChangeText={setDraftPlant}
              placeholder="Ej. tomate, lechuga, albahaca"
              value={draftPlant}
            />
            <AppButton label="Guardar planta" onPress={savePlant} />
            <AppButton label="Cancelar" onPress={() => setModalVisible(false)} variant="ghost" />
          </SurfaceCard>
        </View>
      </Modal>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  plantHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  title: { fontSize: 22, lineHeight: 28 },
});
