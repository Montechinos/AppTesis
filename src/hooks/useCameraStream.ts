import { useEffect, useState } from 'react';

import { subscribeToCamera } from '@/src/services/cameraService';
import { CameraData } from '@/src/types/invernadero';

const defaults: CameraData = {
  ip: '--',
  capture: '',
  actualizado: '',
};

export const useCameraStream = () => {
  const [camera, setCamera] = useState<CameraData>(defaults);
  const [refreshTick, setRefreshTick] = useState(Date.now());

  useEffect(() => subscribeToCamera(setCamera), []);

  useEffect(() => {
    const timer = setInterval(() => setRefreshTick(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const manualRefresh = () => setRefreshTick(Date.now());

  return { camera, refreshTick, manualRefresh };
};
