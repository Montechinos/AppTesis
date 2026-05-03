import { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { IconBubble } from '@/src/components/atoms/IconBubble';
import { SurfaceCard } from '@/src/components/molecules/SurfaceCard';
import { colors } from '@/src/theme/colors';

type Props = {
  icon: ComponentProps<typeof IconBubble>['name'];
  label: string;
  value: string;
  detail?: string;
};

export const MetricCard = ({ icon, label, value, detail }: Props) => (
  <SurfaceCard>
    <View style={styles.header}>
      <IconBubble name={icon} />
      <AppText tone="muted">{label}</AppText>
    </View>
    <AppText style={styles.value} weight="bold">
      {value}
    </AppText>
    {detail ? (
      <AppText style={styles.detail} tone="muted">
        {detail}
      </AppText>
    ) : null}
  </SurfaceCard>
);

const styles = StyleSheet.create({
  header: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  value: { color: colors.text, fontSize: 26 },
  detail: { fontSize: 12, lineHeight: 16 },
});
