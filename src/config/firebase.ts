import { getApps, initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

if (!process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL) {
  console.warn('Falta EXPO_PUBLIC_FIREBASE_DATABASE_URL; se usara la RTDB por defecto.');
}

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL:
    process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL ||
    'https://appinvernadero-4f601-default-rtdb.firebaseio.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const realtimeDb = getDatabase(app);
