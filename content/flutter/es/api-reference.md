# Referencia de API

## API en tiempo de ejecución (`sileo`)

La clase controladora imperativa `SileoController` (expuesta como el singleton global `sileo`) gestiona la cola de notificaciones.

### `sileo.show(options)`
Lanza una notificación usando el `type` explícito en options, con `info` por defecto. Devuelve el `id` único de la notificación (string).

### `sileo.success(options)`
Lanza una notificación de éxito.

### `sileo.error(options)`
Lanza una notificación de error.

### `sileo.warning(options)`
Lanza una notificación de advertencia.

### `sileo.info(options)`
Lanza una notificación informativa.

### `sileo.action(options)`
Lanza una notificación de acción. Normalmente se combina con un parámetro `button:` en options.

### `sileo.loading(options)`
Lanza una notificación indicadora de carga. Por defecto usa `sticky: true`.

### `sileo.promise<T>(futureOrFn, options)`
Lanza una notificación de carga, ejecuta y espera el `Future<T>` asíncrono, y la resuelve/reemplaza con opciones de éxito/acción o error cuando se resuelve.

*   `futureOrFn` acepta una `Future<T> Function()` (generador perezoso) o un `Future<T>` directo.
*   Devuelve el resultado del future original o propaga su error.

### `sileo.dismiss(id)`
Descarta la notificación activa más reciente que coincida con `id`. Si no se pasa `id`, descarta todas las notificaciones activas.

### `sileo.clear(position)`
Limpia instantáneamente todas las notificaciones, o las que coincidan con el `SileoPosition` dado, sin mostrar animaciones de salida.

### `sileo.configure(options)`
Aplica ajustes globales por defecto que se combinan en todas las notificaciones futuras.

---

## `SileoOptions`

Payload de configuración que se pasa a las invocaciones de `sileo`.

| Propiedad | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `id` | `String?` | Autogenerado | ID estable. Reusar un ID activo reemplaza la notificación en su lugar, reiniciando su duración. |
| `title` | `String?` | — | Texto de encabezado principal. |
| `description` | `dynamic` | — | Contenido del cuerpo. Puede ser un `String` o cualquier `Widget` personalizado. |
| `type` | `SileoState?` | `info` | Estado usado por `show()`. |
| `position` | `SileoPosition?` | Por defecto del viewport | Posición de alineación de esta notificación específica. |
| `duration` | `Duration?` | `6000` ms | Cuenta regresiva de auto-descarte. Se ignora si `sticky: true`. |
| `sticky` | `bool` | `false` | Si es true, permanece en pantalla indefinidamente hasta descartarse manualmente. |
| `icon` | `Widget?` | Por defecto del estado | Sobrescribe el icono dentro de la insignia izquierda. |
| `styles` | `SileoStyles?` | — | Estilos de texto y decoraciones personalizados. |
| `fill` | `Color?` | Por defecto del tema | Color de fondo a medida para esta notificación específica. |
| `roundness` | `double?` | `16.0` | Radio de borde de las esquinas en píxeles. |
| `autopilot` | `dynamic` | `true` | Booleano o mapa de tiempos personalizado `{expand: Duration, collapse: Duration}`. |
| `swipeToDismiss` | `bool` | `true` | Si es true, habilita gestos de deslizamiento vertical para descartar. |
| `button` | `SileoButton?` | — | Configuración del botón de acción principal. |
| `groupKey` | `String?` | `"__default__"` | Clave del grupo lógico para agrupar notificaciones. |
| `hooks` | `SileoLifecycleHooks?` | — | Callbacks de evento para cambios de ciclo de vida. |

---

## `SileoButton`

```dart
class SileoButton {
  const SileoButton({
    required this.title,
    this.onClick,
  });

  final String title;
  final VoidCallback? onClick;
}
```

---

## `SileoStyles`

```dart
class SileoStyles {
  const SileoStyles({
    this.titleStyle,
    this.descriptionStyle,
    this.badgeDecoration,
    this.buttonStyle,
    this.toastDecoration,
  });

  final TextStyle? titleStyle;
  final TextStyle? descriptionStyle;
  final BoxDecoration? badgeDecoration;
  final ButtonStyle? buttonStyle;
  final BoxDecoration? toastDecoration;
}
```

---

## `SileoLifecycleHooks`

```dart
class SileoLifecycleHooks {
  const SileoLifecycleHooks({
    this.onShow,
    this.onExpand,
    this.onCollapse,
    this.onDismiss,
  });

  final void Function(SileoLifecycleContext)? onShow;
  final void Function(SileoLifecycleContext)? onExpand;
  final void Function(SileoLifecycleContext)? onCollapse;
  final void Function(SileoLifecycleContext)? onDismiss;
}
```

---

## Parámetros de `Toaster`

Widget viewport montado en tu árbol de widgets.

| Parámetro | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `position` | `SileoPosition` | `topRight` | Posición por defecto del viewport. |
| `offset` | `dynamic` | — | Offsets de borde personalizados del viewport (double, num, o `SileoOffsetConfig`). |
| `options` | `SileoOptions?` | — | Opciones base por defecto combinadas en todas las notificaciones del viewport. |
| `theme` | `SileoTheme` | Resuelto por `system` | Tema de color (`light`, `dark`, `system`, `custom`, `colored`). |
| `colors` | `SileoColors?` | — | Sobrescrituras de color a medida para todos los estados. |
| `grouping` | `bool` | `false` | Si es true, colapsa ráfagas en una tarjeta resumen. |
| `groupThreshold` | `int` | `4` | Número de notificaciones antes de que se dispare la agrupación. |
| `ariaLive` | `SileoAriaLive` | `polite` | Configuración de semántica de accesibilidad. |
