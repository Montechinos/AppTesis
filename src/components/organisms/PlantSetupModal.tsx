import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { AppTextInput } from '@/src/components/atoms/AppTextInput';
import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';
import { useThemeMode } from '@/src/hooks/useThemeMode';
import { radius, spacing } from '@/src/theme/spacing';
import { PlantPhase } from '@/src/types/plant';
import { PLANT_PHASE_OPTIONS } from '@/src/utils/calculatePlantNeeds';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (plantName: string, phase: PlantPhase) => Promise<void>;
};

export const PlantSetupModal = ({ onClose, onSubmit, visible }: Props) => {
  const { colors } = useThemeMode();
  const [plantName, setPlantName] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<PlantPhase>('germinacion');
  const [isSaving, setIsSaving] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      damping: 18,
      mass: 0.8,
      stiffness: 180,
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, visible]);

  const handleSubmit = async () => {
    if (!plantName.trim() || isSaving) {
      return;
    }

    setIsSaving(true);
    await onSubmit(plantName, selectedPhase);
    setIsSaving(false);
    setPlantName('');
  };

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.backdrop}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <Animated.View style={[styles.modalWrap, { opacity: animatedValue, transform: [{ scale }] }]}>
          <SurfaceCard style={styles.card}>
            <View style={styles.header}>
              <View>
                <AppText style={styles.title} weight="bold">
                  Configurar planta
                </AppText>
                <AppText tone="muted">Una planta activa para todo el invernadero.</AppText>
              </View>
              <Pressable
                accessibilityLabel="Cerrar configuracion de planta"
                onPress={onClose}
                style={[styles.iconButton, { backgroundColor: colors.surfaceMuted }]}
              >
                <MaterialCommunityIcons color={colors.text} name="close" size={22} />
              </Pressable>
            </View>

            <View style={styles.field}>
              <AppText weight="semibold">¿Que vas a plantar?</AppText>
              <AppTextInput
                autoCapitalize="words"
                onChangeText={setPlantName}
                placeholder="Tomate, lechuga, fresa..."
                value={plantName}
              />
            </View>

            <View style={styles.field}>
              <AppText weight="semibold">Fase</AppText>
              <View style={styles.phaseList}>
                {PLANT_PHASE_OPTIONS.map((option) => {
                  const isSelected = option.value === selectedPhase;

                  return (
                    <Pressable
                      key={option.value}
                      onPress={() => setSelectedPhase(option.value)}
                      style={[
                        styles.phaseCard,
                        {
                          backgroundColor: isSelected ? `${colors.primary}18` : colors.surfaceMuted,
                          borderColor: isSelected ? colors.primary : colors.border,
                        },
                      ]}
                    >
                      <View style={styles.phaseTitleRow}>
                        <MaterialCommunityIcons
                          color={isSelected ? colors.primary : colors.textMuted}
                          name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
                          size={20}
                        />
                        <AppText weight="semibold">{option.label}</AppText>
                      </View>
                      <AppText style={styles.description} tone="muted">
                        {option.description}
                      </AppText>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <Pressable
              disabled={!plantName.trim() || isSaving}
              onPress={handleSubmit}
              style={[
                styles.primaryButton,
                {
                  backgroundColor: colors.primary,
                  opacity: !plantName.trim() || isSaving ? 0.55 : 1,
                },
              ]}
            >
              <MaterialCommunityIcons color={colors.surface} name="calculator-variant" size={20} />
              <AppText tone="inverse" weight="semibold">
                {isSaving ? 'Guardando...' : 'Hacer calculos'}
              </AppText>
            </Pressable>
          </SurfaceCard>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.md,
  },
  card: {
    maxHeight: '92%',
    width: '100%',
  },
  description: { fontSize: 13, lineHeight: 18 },
  field: { gap: spacing.sm },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  iconButton: {
    alignItems: 'center',
    borderRadius: radius.pill,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  modalWrap: {
    maxWidth: 520,
    width: '100%',
  },
  phaseCard: {
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  phaseList: { gap: spacing.sm },
  phaseTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  primaryButton: {
    alignItems: 'center',
    borderRadius: radius.pill,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: { fontSize: 22 },
});
