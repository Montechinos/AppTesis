# Instalacion del APK de demostracion

## Generar APK con EAS

1. Instalar dependencias:

```bash
npm install
```

2. Verificar que Metro compile con cache limpia:

```bash
npx expo start -c
```

3. Iniciar sesion en Expo/EAS:

```bash
eas login
```

4. Configurar el proyecto si EAS lo solicita:

```bash
eas build:configure --platform android
```

5. Generar el APK interno:

```bash
eas build --platform android --profile preview
```

## Instalar en Android

1. Abrir el link de descarga generado por EAS desde el telefono Android.
2. Descargar el archivo `.apk`.
3. Abrir el APK descargado y confirmar la instalacion.
4. Si Android lo solicita, activar la opcion para instalar apps desconocidas desde el navegador o gestor de archivos usado.

El perfil `preview` genera un APK instalable para demostracion interna. El perfil `production` esta reservado para generar AAB.
