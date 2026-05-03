import { Tabs } from 'expo-router';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

import { AuthScreen } from '@/src/components/organisms/AuthScreen';
import { TabIcon } from '@/src/components/atoms/TabIcon';
import { GreenhouseProvider } from '@/src/context/GreenhouseProvider';
import { AuthProvider, useAuth } from '@/src/hooks/useAuth';
import { ThemeProvider, useThemeMode } from '@/src/hooks/useThemeMode';
import { LoadingState } from '@/src/components/atoms/LoadingState';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

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
