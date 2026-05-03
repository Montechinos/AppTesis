# Invernadero Inteligente

App movil creada con Expo + React Native + TypeScript + Expo Router para monitorear y controlar un invernadero conectado a un ESP32 por medio de Firebase Realtime Database.

## Stack

- Expo Router
- React Native
- TypeScript
- Firebase Realtime Database
- Atomic Design

## Arquitectura

- `app/`: rutas principales con navegacion inferior.
- `src/components/`: atomos, moleculas y organismos reutilizables.
- `src/config/`: inicializacion de Firebase.
- `src/context/`: estado global compartido del invernadero.
- `src/hooks/`: suscripciones y logica de presentacion.
- `src/services/`: acceso a sensores, control y camara.
- `src/theme/`: colores, espaciado y sombras.
- `src/types/`: modelos del dominio.
- `src/utils/`: formateo, alertas e historial local.

## Firebase

Base RTDB:

`https://appinvernadero-4f601-default-rtdb.firebaseio.com`

Rutas usadas:

- `/invernadero/sensores`
- `/invernadero/control`
- `/invernadero/camara`

## Instalacion

1. Instala dependencias:
   `npm install`
2. Crea tu archivo `.env` a partir de `.env.example`.
3. Completa las variables `EXPO_PUBLIC_FIREBASE_*`.
4. Inicia el proyecto:
   `npx expo start`
5. Prueba la app desde tu celular con Expo Go.

## Variables de entorno

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_DATABASE_URL=https://appinvernadero-4f601-default-rtdb.firebaseio.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

## Reglas temporales para pruebas

Usa `firebase.rules.example.json` solo durante pruebas controladas.

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

En produccion debes cerrar estas reglas y autenticar a los clientes antes de permitir lectura o escritura.

## Ejecucion util

- `npm run typecheck`
- `npx expo start`

## Notas de prueba

- Si la camara devuelve una URL fija, la app agrega un query param para forzar refresco cada segundo.
- Si Firebase aun no tiene nodos creados, la app muestra estados vacios y advertencias en lugar de fallar.
- La escritura de bombas se bloquea cuando `hayAgua` es `false`.
