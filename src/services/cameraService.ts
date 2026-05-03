import { greenhousePaths, subscribeToPath } from '@/src/services/firebaseService';
import { CameraData } from '@/src/types/invernadero';

const cameraDefaults: CameraData = {
  ip: '--',
  capture: '',
  actualizado: '',
};

export const subscribeToCamera = (onData: (data: CameraData) => void) =>
  subscribeToPath<CameraData>(greenhousePaths.camera, (data) => {
    onData({ ...cameraDefaults, ...data });
  });
