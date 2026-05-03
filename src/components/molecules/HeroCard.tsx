import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { AppText } from '@/src/components/atoms/AppText';
import { IconBubble } from '@/src/components/atoms/IconBubble';
import { gradients } from '@/src/theme/colors';
import { radius, spacing } from '@/src/theme/spacing';

type Props = {
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export const HeroCard = ({ title, subtitle, children }: Props) => (
  <LinearGradient colors={[...gradients.hero]} style={styles.card}>
    <View style={styles.header}>
      <IconBubble color="#0f9d6f" name="sprout" />
      <View style={styles.copy}>
        <AppText style={styles.title} tone="inverse" weight="bold">
          {title}
        </AppText>
        <AppText style={styles.subtitle} tone="inverse">
          {subtitle}
        </AppText>
      </View>
    </View>
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  card: { borderRadius: radius.lg, gap: spacing.md, padding: spacing.lg },
  header: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },
  copy: { flex: 1, gap: 4 },
  title: { fontSize: 24 },
  subtitle: { lineHeight: 18, opacity: 0.9 },
});
