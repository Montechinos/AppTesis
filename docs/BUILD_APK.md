# Build APK de demostracion

## Requisitos

- Node.js instalado.
- Cuenta de Expo/EAS.
- Variables en `.env`:
  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
  - `EXPO_PUBLIC_FIREBASE_DATABASE_URL`

## Validacion local

```powershell
npm.cmd install
npm.cmd run typecheck
npx.cmd expo start -c
```

## Instalar EAS CLI

```powershell
npm.cmd install -g eas-cli
eas.cmd --version
```

## Iniciar sesion en Expo

```powershell
eas.cmd login
```

Si ya tienes un token de Expo:

```powershell
$env:EXPO_TOKEN="tu_token"
```

## Configurar EAS

El proyecto ya incluye `eas.json` con perfil `preview` para APK.

Si EAS pide inicializar el proyecto:

```powershell
eas.cmd build:configure --platform android
```

## Generar APK preview

```powershell
eas.cmd build --platform android --profile preview
```

Al terminar, EAS mostrara un enlace de descarga. Abre ese enlace desde el celular Android o descarga el APK y pasalo al dispositivo.

## Instalar en Android

1. Descarga el APK desde el link de EAS.
2. Abre el archivo en el celular.
3. Si Android bloquea la instalacion, habilita "Instalar apps desconocidas" para el navegador o gestor de archivos.
4. Instala la app.
5. Abre "Invernadero inteligente".
