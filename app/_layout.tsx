import { Tabs } from 'expo-router';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

import { TabIcon } from '@/src/components/atoms/TabIcon';
import { GreenhouseProvider } from '@/src/context/GreenhouseProvider';
import { colors } from '@/src/theme/colors';

export default function RootLayout() {
  return (
    <GreenhouseProvider>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: colors.background },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.tabInactive,
          tabBarStyle: { height: 68, paddingBottom: 10, paddingTop: 10 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
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
          name="camera"
          options={{
            title: 'Cámara',
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="cctv" />,
          }}
        />
        <Tabs.Screen
          name="alerts"
          options={{
            title: 'Alertas',
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="bell-outline" />,
          }}
        />
      </Tabs>
    </GreenhouseProvider>
  );
}
