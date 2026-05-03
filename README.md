# Invernadero Inteligente

App movil con Expo, React Native, TypeScript, Expo Router, Supabase Auth y Firebase Realtime Database para monitorear y controlar un invernadero conectado a un ESP32.

## Stack

- Expo Router
- React Native + TypeScript
- Supabase Auth para login, registro, verificacion de correo y sesion persistente
- Firebase Realtime Database solo para sensores y control
- React Native Reanimated + Gesture Handler
- React Native Paper
- Expo Vector Icons
- AsyncStorage
- Expo Linear Gradient

## Instalacion

```bash
npm install
npx expo start
```

Tambien puedes usar:

```bash
npm run typecheck
npm run android
npm run ios
npm run web
```

## Variables de entorno

Crea `.env` desde `.env.example`.

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_DATABASE_URL=https://appinvernadero-4f601-default-rtdb.firebaseio.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

## Supabase

La autenticacion usa `src/config/supabase.ts`.

- Register pide nombre, correo, contraseña y confirmacion.
- Supabase envia el correo de verificacion.
- La app solo entra al panel si existe sesion y `email_confirmed_at`.
- El perfil se intenta guardar en una tabla `profiles` con columnas sugeridas: `id`, `name`, `email`, `avatar_url`, `updated_at`.
- Si `profiles` aun no existe, la app no se rompe y deja advertencia en consola.

## Firebase RTDB

Firebase se conserva solo para datos del invernadero:

- `/invernadero/sensores`
- `/invernadero/control`

Estructura esperada de sensores:

```json
{
  "temp1": 25.2,
  "hum1": 70,
  "temp2": 24.8,
  "hum2": 68,
  "suelo1": 55,
  "suelo2": 60,
  "hayAgua": true,
  "foco": false,
  "ventilador": true,
  "bomba1": false,
  "bomba2": false,
  "modoAuto": true,
  "wifi": true,
  "ip": "192.168.1.20",
  "uptime": "01:12:30",
  "dht1Error": false,
  "dht2Error": false
}
```

Estructura esperada de control:

```json
{
  "modoAuto": false,
  "foco": false,
  "ventilador": false,
  "bomba1": false,
  "bomba2": false
}
```

## Arquitectura

- `app/`: tabs finales `Principal`, `Control`, `Historial`, `Configuracion`.
- `src/components/`: atomos, moleculas y organismos reutilizables.
- `src/config/`: clientes Firebase y Supabase.
- `src/context/`: estado global del invernadero.
- `src/hooks/`: auth, tema, sensores, control, historial y red.
- `src/services/`: acceso a Supabase Auth y Firebase RTDB.
- `src/theme/`: paleta clara/oscura, espaciado y tipografia.
- `src/types/`: modelos del dominio.
- `src/utils/`: validadores, alertas, formateadores e historial visual.

## Funcionalidad

- Registro/Login con Supabase Auth y verificacion de correo.
- Sesion persistente.
- Modo claro/oscuro persistido con AsyncStorage.
- Fondo visual natural con degradado y formas animadas.
- Firebase en tiempo real para sensores y controles.
- Bloqueo de bombas si `hayAgua` es `false`.
- Bloqueo visual de bombas en modo automatico.
- Historial local persistente de eventos.
- Seleccion persistente de una planta activa.
- Configuracion con datos de usuario, cambio de nombre, cambio de contraseña, ayuda, creadores y cerrar sesion.

## Dependencias principales instaladas

- `@supabase/supabase-js`
- `firebase`
- `@react-native-async-storage/async-storage`
- `react-native-paper`
- `react-native-gesture-handler`
- `react-native-reanimated`
- `expo-linear-gradient`
- `@expo/vector-icons`

## Commits realizados

- `🔧 chore(deps): instalar supabase y persistencia local`
- `✨ feat(auth): integrar supabase y tabs principales`
- `🔧 chore(deps): configurar gestures y paper`
