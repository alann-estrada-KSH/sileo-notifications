# Estilos y temas

`sileo_flutter` replica las estructuras de color, los mapeos de tema y las métricas de tamaño de la implementación en Vue usando equivalentes nativos de Flutter.

## Opciones de tema

Se pasan a `Toaster` mediante el parámetro `theme`:

```dart
const Toaster(theme: SileoTheme.dark);
const Toaster(theme: SileoTheme.light);
const Toaster(theme: SileoTheme.system);  // Se resuelve desde MediaQuery.platformBrightnessOf(context)
const Toaster(theme: SileoTheme.colored); // Cada notificación se rellena con el color de su propio estado
const Toaster(theme: SileoTheme.custom, colors: SileoColors(...));
```

### Tema Colored
El tema `colored` iguala el fondo de cada notificación con el color de acento de su estado respectivo (por ejemplo, verde para éxito, rojo para error, etc.).
Los colores de primer plano del título, insignia y botón de acción cambian automáticamente a un color claro (blanco con transparencia) para que se lean correctamente sobre el fondo intenso del estado.

## Colores personalizados (parámetro `colors`)

Puedes sobrescribir cualquier color específico de la paleta en cualquier tema usando el parámetro `colors` de `Toaster`. Los campos no definidos vuelven automáticamente a los valores por defecto del tema activo.

```dart
Toaster(
  theme: SileoTheme.custom,
  colors: SileoColors(
    background: Color(0xFF1B1030),     // Fondo personalizado de la notificación, en todo el viewport
    foreground: Color(0xFFF4E9FF),     // Color del texto del título
    description: Color(0xFFC9B8E8),    // Color del texto del cuerpo
    dismissBackground: Color(0xFF4B3869), // Fondo hover/splash del ícono de cerrar
    success: Color(0xFF7DFFB3),        // Color de acento de éxito
    error: Color(0xFFFF6B81),          // Color de acento de error
    warning: Color(0xFFFFD166),        // Color de acento de advertencia
    info: Color(0xFF7DC4FF),           // Color de acento informativo
    action: Color(0xFFC792FF),         // Color de acento de acción
    loading: Color(0xFFA0A0C0),        // Color de acento de carga
  ),
)
```

## Bordes redondeados y unión de costura plana

- **Roundness (`double`):** Controla el radio de borde de las tarjetas de notificación. Por defecto es `16.0`.
- **Contacto de costura plana:** Cuando una notificación se expande, las esquinas de contacto en la costura se aplanan automáticamente (radio `0.0`), evitando muescas y creando una forma visual unificada.

## Sobrescrituras de estilo de layout personalizado

Puedes pasar configuraciones personalizadas de `BoxDecoration` y `TextStyle` a notificaciones individuales usando el parámetro `styles`:

```dart
sileo.success(SileoOptions(
  title: 'Fuente personalizada',
  styles: SileoStyles(
    titleStyle: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold),
    descriptionStyle: TextStyle(fontSize: 12.0, color: Colors.grey),
    toastDecoration: BoxDecoration(
      border: Border.all(color: Colors.white, width: 2.0),
    ),
  ),
));
```
