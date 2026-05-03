export const buildCameraUri = (capture: string, refreshTick: number) => {
  if (!capture) return '';
  return `${capture}${capture.includes('?') ? '&' : '?'}t=${refreshTick}`;
};
