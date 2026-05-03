import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { colors } from '@/src/theme/colors';

type Props = {
  title: string;
  subtitle?: string;
};

export const SectionHeading = ({ title, subtitle }: Props) => (
  <View style={styles.container}>
    <AppText style={styles.title} weight="bold">
      {title}
    </AppText>
    {subtitle ? (
      <AppText style={styles.subtitle} tone="muted">
        {subtitle}
      </AppText>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: { gap: 4 },
  title: { color: colors.text, fontSize: 20 },
  subtitle: { fontSize: 13, lineHeight: 18 },
});
