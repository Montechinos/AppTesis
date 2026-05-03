export const formatPercent = (value: number) => `${Math.round(value)}%`;

export const formatTemp = (value: number) => `${value.toFixed(1)} C`;

export const formatBoolean = (value: boolean, truthy: string, falsy: string) =>
  value ? truthy : falsy;

export const formatUpdatedAt = (value: string) => {
  if (!value) return 'sin registro';
  return value;
};

export const formatUptime = (value: string) => value || '--';

export const formatDateTime = (value: number) =>
  new Date(value).toLocaleString(undefined, {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
  });
