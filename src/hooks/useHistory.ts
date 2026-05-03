import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';

import { HistoryEvent, SensorData } from '@/src/types/invernadero';

const STORAGE_KEY = 'greenhouse.history.events';
const MAX_EVENTS = 80;

export const useHistory = (sensors: SensorData) => {
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const previousWater = useRef<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (!stored) {
        return;
      }

      try {
        setEvents(JSON.parse(stored) as HistoryEvent[]);
      } catch {
        setEvents([]);
      }
    });
  }, []);

  const persist = useCallback((nextEvents: HistoryEvent[]) => {
    setEvents(nextEvents);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextEvents));
  }, []);

  const addEvent = useCallback(
    (
      title: string,
      description: string,
      source: HistoryEvent['source'] = 'manual',
      tone: HistoryEvent['tone'] = 'info',
    ) => {
      const nextEvent: HistoryEvent = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        title,
        description,
        source,
        tone,
        timestamp: Date.now(),
      };

      persist([nextEvent, ...events].slice(0, MAX_EVENTS));
    },
    [events, persist],
  );

  useEffect(() => {
    if (previousWater.current === null) {
      previousWater.current = sensors.hayAgua;
      return;
    }

    if (previousWater.current && !sensors.hayAgua) {
      addEvent(
        'Alerta sin agua',
        'El tanque quedo sin agua y las bombas deben permanecer bloqueadas.',
        sensors.modoAuto ? 'automatico' : 'manual',
        'danger',
      );
    }

    previousWater.current = sensors.hayAgua;
  }, [addEvent, sensors.hayAgua, sensors.modoAuto]);

  const clearHistory = useCallback(async () => {
    setEvents([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  return { addEvent, clearHistory, events };
};
