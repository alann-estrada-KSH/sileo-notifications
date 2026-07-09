# Funciones avanzadas

`sileo_flutter` incluye varios mecanismos interactivos y de renderizado de última generación diseñados para igualar el comportamiento de alta fidelidad de la librería en Vue.

## 1. Efecto gooey de metaballs acelerado por GPU

Para unir los componentes separados de encabezado y cuerpo en un solo "blob" orgánico (unión metaball), `sileo_flutter` usa una técnica de filtro compuesto:

- Se apilan copias de las formas del encabezado y el cuerpo (representadas como plantillas de pintura sólida) en una capa de fondo.
- Un widget `ImageFiltered` aplica un blur gaussiano a estas formas (`sigma = roundness * 0.5`).
- Un widget `ColorFiltered` fuerza los valores alfa del blur a través de una matriz de umbral pronunciada (`60 * alpha - 7650`), re-afilando los bordes en todas partes excepto donde se tocan.
- Las dos formas se solapan exactamente `24.0` píxeles, asegurando una transición de costura completamente suave y continua.

## 2. Altura de contenido dinámica y desvanecimiento suave

El texto del cuerpo y los botones de acción crecen y se encogen dinámicamente:

- **Sin alturas fijas:** El contenedor del cuerpo usa `AnimatedSize` (alineado según la posición) con `clipBehavior: Clip.hardEdge` para expandirse automáticamente al tamaño intrínseco del árbol de widgets sin recortes.
- **`AnimatedOpacity`:** El texto y los botones están envueltos en un `AnimatedOpacity` de 600ms sincronizado con el estado de expansión. El texto se desvanece lentamente mientras la altura se expande y recorta, evitando apariciones bruscas de texto.

## 3. Interrupción persistente por hover

- **MouseRegion:** Los viewports rastrean la entrada y salida del puntero para pausar automáticamente los temporizadores de descarte de notificaciones activas (preservando la duración restante) y reanudarlos al salir.
- **Seguridad de hover reconstruido:** Si se crea una nueva notificación mientras el puntero del mouse ya está sobre el viewport, su temporizador se pausa inmediatamente en su construcción, evitando que la notificación se auto-descarte mientras la lees.

## 4. Deslizar para descartar (móvil y táctil)

Las notificaciones se pueden descartar arrastrando verticalmente:

- Se maneja automáticamente para todas las notificaciones que no son de carga.
- El desplazamiento visual se limita a un máximo de `±22` píxeles, con desvanecimiento de opacidad hasta `0.65` a `60` píxeles de arrastre.
- Soltar más allá de un umbral de `34` píxeles dispara el descarte; de lo contrario, vuelve suavemente a su posición.
- Los botones de cerrar y de acción se excluyen automáticamente de iniciar gestos de deslizamiento.

## 5. Hooks de ciclo de vida

Registra callbacks para engancharte a cambios clave de estado:

```dart
sileo.success(SileoOptions(
  title: 'Perfil actualizado',
  hooks: SileoLifecycleHooks(
    onShow: (ctx) => print('Notificación ${ctx.id} mostrándose'),
    onExpand: (ctx) => print('Notificación expandida'),
    onCollapse: (ctx) => print('Notificación colapsada'),
    onDismiss: (ctx) => print('Notificación saliendo'),
  ),
));
```
