import { FlatList, StyleSheet, View } from 'react-native';

import { AppButton } from '@/src/components/atoms/AppButton';
import { AppText } from '@/src/components/atoms/AppText';
import { EmptyState } from '@/src/components/atoms/EmptyState';
import { ScreenView } from '@/src/components/atoms/ScreenView';
import { SectionHeading } from '@/src/components/atoms/SectionHeading';
import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';
import { useGreenhouse } from '@/src/context/GreenhouseProvider';
import { useThemeMode } from '@/src/hooks/useThemeMode';
import { spacing } from '@/src/theme/spacing';
import { formatDateTime } from '@/src/utils/formatters';

export default function HistoryScreen() {
  const { events, clearHistory } = useGreenhouse();
  const { colors } = useThemeMode();

  return (
    <ScreenView>
      <SectionHeading
        subtitle="Eventos locales persistidos en este dispositivo."
        title="Historial"
      />
      {!events.length ? (
        <EmptyState icon="history" message="Aun no hay eventos guardados." />
      ) : (
        <>
          <AppButton icon="delete-outline" label="Limpiar historial" onPress={clearHistory} variant="secondary" />
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SurfaceCard>
                <View style={styles.row}>
                  <View style={[styles.dot, { backgroundColor: item.tone === 'danger' ? colors.danger : colors.primary }]} />
                  <View style={styles.content}>
                    <AppText weight="semibold">{item.title}</AppText>
                    <AppText tone="muted">{item.description}</AppText>
                    <AppText tone="muted">
                      {formatDateTime(item.timestamp)} · {item.source}
                    </AppText>
                  </View>
                </View>
              </SurfaceCard>
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          />
        </>
      )}
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, gap: 4 },
  dot: { borderRadius: 999, height: 12, marginTop: 5, width: 12 },
  row: { flexDirection: 'row', gap: spacing.sm },
});
