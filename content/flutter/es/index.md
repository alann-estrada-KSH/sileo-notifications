# Documentación de sileo_flutter

`sileo_flutter` es una librería de notificaciones (toasts) para Flutter con opinión propia y muy expresiva. Es un port nativo en Dart/Flutter de [sileo-vue](https://github.com/alann-estrada-KSH/sileo-vue) que reproduce toda la estética visual, animaciones gooey, comportamientos de agrupación, flujos de promesas y hooks de ciclo de vida usando widgets nativos.

## Empieza aquí

- [Primeros pasos](getting-started.md)
- [Referencia de API](api-reference.md)
- [Estilos y temas](styling.md)
- [Funciones avanzadas](advanced-features.md)

## Funciones clave

- **Fusión gooey de metaballs:** Motor de renderizado totalmente personalizado que usa blurs acelerados por GPU (`ImageFiltered`) y matrices de umbral de color (`ColorFiltered`) para fusionar segmentos separados de notificación (encabezado y cuerpo) en una sola forma orgánica y cohesiva.
- **Easing inspirado en física:** Aprovecha la curva de física original `--sileo-spring-easing` para animaciones de entrada/salida realistas y atractivas.
- **Flujos de promesas asíncronas:** Lanza indicadores de carga de forma imperativa, espera tareas/Futures asíncronas, y resuélvelas en línea a tarjetas de éxito, error o acción.
- **Agrupación de notificaciones:** Condensa ráfagas de notificaciones en una posición dada en una sola píldora resumen (`"X notificaciones"`) para mantener la interfaz limpia.
- **Deslizar para descartar en móvil:** Seguimiento de arrastre vertical suave con snap-back por inercia y desvanecimiento de opacidad.
- **Hooks de ciclo de vida granulares:** Dispara analítica, telemetría u orquestación personalizada cuando las notificaciones se muestran, expanden, colapsan o salen.
