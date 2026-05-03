export const formatPercent = (value: number) => `${Math.round(value)}%`;

export const formatTemp = (value: number) => `${value.toFixed(1)}°C`;

export const formatBoolean = (value: boolean, truthy: string, falsy: string) =>
  value ? truthy : falsy;

export const formatUpdatedAt = (value: string) => {
  if (!value) return 'sin registro';
  return value;
};

export const formatUptime = (value: string) => value || '--';
