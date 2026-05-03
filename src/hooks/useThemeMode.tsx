import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { ThemeColors, colorSchemes } from '@/src/theme/colors';

type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  colors: ThemeColors;
  isDark: boolean;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => Promise<void>;
  toggleMode: () => Promise<void>;
};

const STORAGE_KEY = 'greenhouse.theme.mode';
const ThemeContext = createContext<ThemeContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [mode, setModeState] = useState<ThemeMode>('light');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((storedMode) => {
      if (storedMode === 'dark' || storedMode === 'light') {
        setModeState(storedMode);
      }
    });
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    const setMode = async (nextMode: ThemeMode) => {
      setModeState(nextMode);
      await AsyncStorage.setItem(STORAGE_KEY, nextMode);
    };

    return {
      colors: colorSchemes[mode],
      isDark: mode === 'dark',
      mode,
      setMode,
      toggleMode: () => setMode(mode === 'dark' ? 'light' : 'dark'),
    };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeMode debe usarse dentro de ThemeProvider');
  }

  return context;
};
