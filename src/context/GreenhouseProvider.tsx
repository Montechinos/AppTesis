import { createContext, ReactNode, useContext } from 'react';

import { useGreenhouseSystem } from '@/src/hooks/useGreenhouseSystem';

const GreenhouseContext = createContext<ReturnType<typeof useGreenhouseSystem> | null>(
  null,
);

type Props = {
  children: ReactNode;
};

export const GreenhouseProvider = ({ children }: Props) => {
  const value = useGreenhouseSystem();
  return <GreenhouseContext.Provider value={value}>{children}</GreenhouseContext.Provider>;
};

export const useGreenhouse = () => {
  const context = useContext(GreenhouseContext);

  if (!context) {
    throw new Error('useGreenhouse debe usarse dentro de GreenhouseProvider');
  }

  return context;
};
