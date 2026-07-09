# Styling and Theming

`sileo_flutter` replicates the color structures, theme mappings, and sizing metrics of the Vue implementation using native Flutter equivalents.

## Theming Options

Passed to `Toaster` via the `theme` parameter:

```dart
const Toaster(theme: SileoTheme.dark);
const Toaster(theme: SileoTheme.light);
const Toaster(theme: SileoTheme.system);  // Resolves from MediaQuery.platformBrightnessOf(context)
const Toaster(theme: SileoTheme.colored); // Each toast filled with its own state color
const Toaster(theme: SileoTheme.custom, colors: SileoColors(...));
```

### Colored Theme
The `colored` theme matches the background of each toast with its respective state accent color (e.g. green for success, red for error, etc.).
Title, badge, and action button foregrounds automatically switch to a light color (white with transparency) so they read correctly against the rich state background.

## Custom Colors (`colors` parameter)

You can override any specific color in the palette across any theme using the `colors` parameter of `Toaster`. Unset fields automatically fall back to the active theme's defaults.

```dart
Toaster(
  theme: SileoTheme.custom,
  colors: SileoColors(
    background: Color(0xFF1B1030),     // Custom viewport-wide toast background
    foreground: Color(0xFFF4E9FF),     // Title text color
    description: Color(0xFFC9B8E8),    // Body text color
    dismissBackground: Color(0xFF4B3869), // Hover/splash background on close icon
    success: Color(0xFF7DFFB3),        // Success accent color
    error: Color(0xFFFF6B81),          // Error accent color
    warning: Color(0xFFFFD166),        // Warning accent color
    info: Color(0xFF7DC4FF),           // Info accent color
    action: Color(0xFFC792FF),         // Action accent color
    loading: Color(0xFFA0A0C0),        // Loading accent color
  ),
)
```

## Border Radius and Flat-Seam Joining

- **Roundness (`double`):** Controls the border radius of the toast cards. Defaults to `16.0`.
- **Flat-Seam Contact:** When a toast expands, the contact corners at the seam automatically flatten (radius `0.0`), preventing notched indents and creating a unified visual shape.

## Custom Layout Style Overrides

You can pass custom `BoxDecoration` and `TextStyle` configurations to individual toasts using the `styles` parameter:

```dart
sileo.success(SileoOptions(
  title: 'Custom Font',
  styles: SileoStyles(
    titleStyle: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold),
    descriptionStyle: TextStyle(fontSize: 12.0, color: Colors.grey),
    toastDecoration: BoxDecoration(
      border: Border.all(color: Colors.white, width: 2.0),
    ),
  ),
));
```
