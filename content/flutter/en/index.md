# sileo_flutter Documentation

`sileo_flutter` is an opinionated, highly expressive toast notification library for Flutter. It is a native Dart/Flutter port of [sileo-vue](https://github.com/alann-estrada-KSH/sileo-vue) that reproduces all visual aesthetics, gooey animations, grouping behaviors, promise flows, swipe gestures, and lifecycle hooks with native widgets.

## Start Here

- [Getting Started](getting-started.md)
- [API Reference](api-reference.md)
- [Styling and Theming](styling.md)
- [Advanced Features](advanced-features.md)

## Key Features

- **Gooey Metaball Fusion:** Fully custom rendering engine utilizing GPU-accelerated blurs (`ImageFiltered`) and color threshold matrices (`ColorFiltered`) to merge separate notification segments (header and body) into a single, cohesive organic shape.
- **Physics-Inspired Easing:** Leverages the original `--sileo-spring-easing` physics curve for realistic and engaging entrance/exit motions.
- **Async Promise Flows:** Imperatively launch loading indicators, await async tasks/Futures, and resolve them inline to success, error, or action toast cards.
- **Notification Grouping:** Condense bursts of notifications at a given position into a single summary pill (`"X notifications"`) to keep the interface clean.
- **Mobile-Friendly Swipe-to-Dismiss:** Smooth vertical drag tracking with inertia snap-back and opacity fading.
- **Granular Lifecycle Hooks:** Trigger analytics, telemetry, or custom orchestration when toasts display, expand, collapse, or exit.
