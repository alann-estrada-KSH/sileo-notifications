# Getting Started

## Installation

Add `sileo_flutter` as a dependency in your `pubspec.yaml` (currently referencing the repository):

```yaml
dependencies:
  sileo_flutter:
    git:
      url: https://github.com/alann-estrada-KSH/sileo-flutter.git
      ref: master
```

Then run:

```bash
flutter pub get
```

## Basic Setup

Render the `Toaster` viewport widget once near your application shell (usually at the root `Stack` of your app):

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
            // Mount the global Toaster viewport
            const Toaster(position: SileoPosition.topRight),
          ],
        ),
      ),
    );
  }
}
```

Now you can trigger notifications imperatively from anywhere in your codebase without passing a `BuildContext`:

```dart
import 'package:sileo_flutter/sileo_flutter.dart';

void notify() {
  sileo.info(const SileoOptions(
    title: 'Saved',
    description: 'Your changes were successfully stored.',
  ));
}
```

## Core Concepts

- **`Toaster`:** A stateful widget mounted once that listens to the global singleton store and renders active toast viewports using overlay entries.
- **`sileo`:** The imperative API entry point to trigger, dismiss, or clear notifications.
- **`SileoOptions`:** The configuration payload passed to each notification.
- **`SileoPosition`:** The alignment viewport (`topLeft`, `topCenter`, `topRight`, `bottomLeft`, `bottomCenter`, `bottomRight`).

## Basic Notification Types

```dart
sileo.success(const SileoOptions(title: 'Done'));
sileo.error(const SileoOptions(title: 'Upload failed'));
sileo.warning(const SileoOptions(title: 'Quota almost full'));
sileo.info(const SileoOptions(title: 'Sync complete'));
sileo.action(const SileoOptions(
  title: 'New message',
  button: SileoButton(title: 'Open'),
));
```

## Next Step

Read the [API Reference](api-reference.md) to understand all available configuration options.
