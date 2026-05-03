import 'react-native-gesture-handler';
import { Tabs } from 'expo-router';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthScreen } from '@/src/components/organisms/AuthScreen';
import { TabIcon } from '@/src/components/atoms/TabIcon';
import { GreenhouseProvider } from '@/src/context/GreenhouseProvider';
import { AuthProvider, useAuth } from '@/src/hooks/useAuth';
import { ThemeProvider, useThemeMode } from '@/src/hooks/useThemeMode';
import { LoadingState } from '@/src/components/atoms/LoadingState';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <PaperShell />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const PaperShell = () => {
  const { colors, isDark } = useThemeMode();

  return (
    <PaperProvider
      theme={{
        dark: isDark,
        colors: {
          backdrop: 'rgba(0, 0, 0, 0.35)',
          background: colors.background,
          elevation: {
            level0: 'transparent',
            level1: colors.surface,
            level2: colors.surface,
            level3: colors.surfaceMuted,
            level4: colors.surfaceMuted,
            level5: colors.surfaceMuted,
          },
          error: colors.danger,
          inverseOnSurface: colors.surface,
          inversePrimary: colors.secondary,
          inverseSurface: colors.text,
          onBackground: colors.text,
          onError: colors.surface,
          onErrorContainer: colors.text,
          onPrimary: colors.surface,
          onPrimaryContainer: colors.text,
          onSecondary: colors.surface,
          onSecondaryContainer: colors.text,
          onSurface: colors.text,
          onSurfaceDisabled: colors.textMuted,
          onSurfaceVariant: colors.textMuted,
          onTertiary: colors.text,
          onTertiaryContainer: colors.text,
          outline: colors.border,
          outlineVariant: colors.border,
          primary: colors.primary,
          primaryContainer: colors.surfaceMuted,
          scrim: 'rgba(0, 0, 0, 0.35)',
          secondary: colors.secondary,
          secondaryContainer: colors.surfaceMuted,
          shadow: colors.shadow,
          surface: colors.surface,
          surfaceDisabled: colors.surfaceMuted,
          surfaceVariant: colors.surfaceMuted,
          tertiary: colors.accent,
          tertiaryContainer: colors.surfaceMuted,
        },
      }}
    >
      <RootContent />
    </PaperProvider>
  );
};

const RootContent = () => {
  const auth = useAuth();
  const { colors, isDark } = useThemeMode();

  if (auth.loading) {
    return <LoadingState label="Iniciando app..." />;
  }

  if (!auth.session || !auth.verified) {
    return (
      <>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <AuthScreen />
      </>
    );
  }

  return (
    <GreenhouseProvider>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: colors.background },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.tabInactive,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 68,
            paddingBottom: 10,
            paddingTop: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Principal',
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="view-dashboard-outline" />,
          }}
        />
        <Tabs.Screen
          name="control"
          options={{
            title: 'Control',
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="tune-variant" />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'Historial',
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="history" />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Configuracion',
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="cog-outline" />,
          }}
        />
      </Tabs>
    </GreenhouseProvider>
  );
};
