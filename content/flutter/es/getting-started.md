# Primeros pasos

## Instalación

Agrega `sileo_flutter` como dependencia en tu `pubspec.yaml` (por ahora apuntando al repositorio):

```yaml
dependencies:
  sileo_flutter:
    git:
      url: https://github.com/alann-estrada-KSH/sileo-flutter.git
      ref: master
```

Luego ejecuta:

```bash
flutter pub get
```

## Configuración básica

Renderiza el widget viewport `Toaster` una vez, cerca de la raíz de tu aplicación (normalmente en el `Stack` raíz de tu app):

```dart
import 'package:flutter/material.dart';
import 'package:sileo_flutter/sileo_flutter.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Stack(
          children: [
            const MyHomePage(),
            // Monta el viewport global del Toaster
            const Toaster(position: SileoPosition.topRight),
          ],
        ),
      ),
    );
  }
}
```

Ahora puedes disparar notificaciones de forma imperativa desde cualquier parte de tu código sin pasar un `BuildContext`:

```dart
import 'package:sileo_flutter/sileo_flutter.dart';

void notify() {
  sileo.info(const SileoOptions(
    title: 'Guardado',
    description: 'Tus cambios se guardaron correctamente.',
  ));
}
```

## Conceptos clave

- **`Toaster`:** Un widget con estado, montado una sola vez, que escucha el store global singleton y renderiza los viewports de notificaciones activas usando overlay entries.
- **`sileo`:** El punto de entrada imperativo de la API para disparar, descartar o limpiar notificaciones.
- **`SileoOptions`:** El payload de configuración que se pasa a cada notificación.
- **`SileoPosition`:** La posición de alineación del viewport (`topLeft`, `topCenter`, `topRight`, `bottomLeft`, `bottomCenter`, `bottomRight`).

## Tipos básicos de notificación

```dart
sileo.success(const SileoOptions(title: 'Listo'));
sileo.error(const SileoOptions(title: 'Error al subir archivo'));
sileo.warning(const SileoOptions(title: 'Cuota casi al límite'));
sileo.info(const SileoOptions(title: 'Sincronización completa'));
sileo.action(const SileoOptions(
  title: 'Nuevo mensaje',
  button: SileoButton(title: 'Abrir'),
));
```

## Siguiente paso

Lee la [Referencia de API](api-reference.md) para conocer todas las opciones de configuración disponibles.
