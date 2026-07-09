# Advanced Features

`sileo_flutter` includes several state-of-the-art interactive and rendering mechanisms designed to match the high-fidelity behaviors of the Vue library.

## 1. GPU-Accelerated Gooey Metaball Effect

To join separate header and body components into a single organic "blob" (metaball union), `sileo_flutter` employs a composite filter technique:

- Copy shapes of the header and body (represented as solid paint templates) are stacked in a background layer.
- An `ImageFiltered` widget applies a Gaussian blur to these shapes (`sigma = roundness * 0.5`).
- A `ColorFiltered` widget forces the blurred alpha values through a steep threshold matrix (`60 * alpha - 7650`), re-sharpening the borders everywhere except where they touch.
- The two shapes overlap by exactly `24.0` pixels, ensuring a completely smooth, continuous seam transition.

## 2. Dynamic Content Height & Smooth Fading

The body text and action buttons grow and shrink dynamically:

- **No Hardcoded Heights:** The body container uses `AnimatedSize` (aligned according to position) with `clipBehavior: Clip.hardEdge` to automatically expand to the intrinsic size of the widget tree without clippings.
- **`AnimatedOpacity`:** Text and buttons are wrapped in a 600ms `AnimatedOpacity` synchronized with the expand state. The text fades in slowly as the height expands and clips, avoiding abrupt text pop-ins.

## 3. Persistent Hover Interruption

- **MouseRegion:** Viewports track pointer enters and exits to automatically pause active toast dismiss timers (preserving remaining duration) and resume them on exit.
- **Rebuilt Hover Safety:** If a new toast is created while the mouse pointer is already positioned over the viewport, its timer is immediately paused on construction, preventing the toast from auto-dismissing while you read it.

## 4. Swipe-to-Dismiss (Mobile & Touch)

Toasts can be dismissed by vertical dragging:

- Handled automatically for all non-loading toasts.
- Visual displacement is clamped to a maximum of `±22` pixels with opacity fading down to `0.65` at `60` pixels of drag.
- Releasing past a `34` pixel threshold triggers dismissal; otherwise, it snaps back smoothly.
- Close buttons and action buttons are automatically excluded from initiating swipe gestures.

## 5. Lifecycle Hooks

Register callbacks to hook into key state changes:

```dart
sileo.success(SileoOptions(
  title: 'Profile Updated',
  hooks: SileoLifecycleHooks(
    onShow: (ctx) => print('Toast ${ctx.id} showing'),
    onExpand: (ctx) => print('Toast expanded'),
    onCollapse: (ctx) => print('Toast collapsed'),
    onDismiss: (ctx) => print('Toast exiting'),
  ),
));
```
