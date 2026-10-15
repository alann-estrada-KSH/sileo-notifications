# Examples

This page focuses on real-world usage patterns.

## 1. Simple success message

```ts-demo
sileo.success({
  title: "Saved",
  description: "Your changes were applied.",
});
```

## 2. Action toast

```ts-demo
sileo.action({
  title: "New comment",
  description: "Open the thread to reply.",
  button: {
    title: "Open",
    onClick: () => router.push("/thread/123"),
  },
});
```

## 3. Loading to success flow

```ts-demo
await sileo.promise(saveProfile(), {
  loading: {
    title: "Saving profile",
    description: "Please wait...",
  },
  success: () => ({
    title: "Profile saved",
    description: "Your settings are now up to date.",
  }),
  error: (err) => ({
    title: "Save failed",
    description: String(err),
  }),
});
```

## 4. Promise to action flow

```ts-demo
await sileo.promise(fetchInvoice(), {
  loading: {
    title: "Creating invoice",
  },
  success: (invoice) => ({
    title: "Invoice ready",
    description: invoice.number,
  }),
  action: (invoice) => ({
    title: "Invoice ready",
    description: invoice.number,
    button: {
      title: "Copy number",
      onClick: () => navigator.clipboard.writeText(invoice.number),
    },
  }),
  error: {
    title: "Invoice could not be created",
  },
});
```

## 5. Grouped burst notifications

```ts-demo
sileo.info({ title: "File 1 uploaded", groupKey: "uploads" });
sileo.info({ title: "File 2 uploaded", groupKey: "uploads" });
sileo.info({ title: "File 3 uploaded", groupKey: "uploads" });
```

When `Toaster grouping` is enabled and the bucket crosses the threshold, sileo-vue collapses the set into a summary pill.

## 6. Rich description content

```ts-demo
import { h } from "vue";

sileo.info({
  title: "Team update",
  description: h("div", { class: "stack" }, [
    h("strong", "3 members joined"),
    h("span", "A new workspace has been provisioned."),
  ]),
});
```

## 7. Sticky notification

```ts-demo
sileo.info({
  title: "Pinned message",
  description: "This toast remains until dismissed manually.",
  duration: null,
});
```

## 8. Controlled motion and behavior

```ts-demo
sileo.info({
  title: "Custom timing",
  description: "Expand/collapse can be tuned.",
  autopilot: {
    expand: 300,
    collapse: 2400,
  },
  swipeToDismiss: true,
  hooks: {
    onShow: ({ id }) => console.log("shown", id),
    onDismiss: ({ id }) => console.log("dismissed", id),
  },
});
```

## 9. Custom branded palette

```vue-demo-custom
<script setup lang="ts">
import type { SileoColors } from "@alann-estrada-ksh/sileo-vue";

const brand: SileoColors = {
  background: "#1b1030",
  foreground: "#f4e9ff",
  success: "#7dffb3",
  error: "#ff6b81",
};
</script>

<template>
  <Toaster theme="custom" :colors="brand" />
</template>
```

See [Styling and Theming](styling.md) for the full `SileoColors` field list.

## 10. Toastify-style colored toasts

```vue-demo-colored
<template>
  <Toaster theme="colored" />
</template>
```

Each toast's background now matches its own state — success is green, error is red, and so on — with title, description, and badge automatically switched to a readable light foreground. Override a single state while keeping the rest:

```vue-demo-colored
<template>
  <Toaster theme="colored" :colors="{ success: '#059669' }" />
</template>
```

## 11. Full dark vs. dark accent

`fill` swaps the toast surface for one toast. A near-black fill on a light page reads as an accent; pure `black` is full dark, so remember to lighten the text with `styles`.

```ts-demo
sileo.success({ title: "Saved", fill: "#171717" });

sileo.success({
  title: "Booking confirmed",
  description: "Your seat is reserved.",
  fill: "black",
  styles: { title: "text-white!", description: "text-white/75!" },
});
```

## 12. With or without the expandable part

The expandable panel only exists when a toast has a `description` (or a `button`). Leave both out for a plain pill that never expands.

```ts-demo
sileo.info({ title: "Pill only, nothing to expand" });

sileo.info({
  title: "Expandable",
  description: "Hover or wait for autopilot to reveal this panel.",
});
```

## 13. Roundness

```ts-demo
sileo.info({ title: "Roundness 6", description: "Tighter corners.", roundness: 6 });
sileo.info({ title: "Roundness 24", description: "Softer corners.", roundness: 24 });
```

## 14. Rich description with avatars

`description` accepts any Vue render content, not only strings.

```ts-demo
import { h } from "vue";

const avatar = (bg, label) =>
  h("span", {
    style: `display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:999px;background:${bg};color:#fff;font-size:11px;box-shadow:0 0 0 2px #fff;margin-right:-8px`,
  }, label);

sileo.info({
  title: "Team update",
  description: h("div", { style: "display:flex;flex-direction:column;gap:8px" }, [
    h("div", { style: "display:flex" }, [avatar("#6366f1", "AL"), avatar("#ec4899", "MR"), avatar("#14b8a6", "JT")]),
    h("span", { style: "font-size:12px" }, "3 new members joined the project."),
  ]),
});
```

## 15. Suggested app shell setup

```vue
<template>
  <AppLayout>
    <RouterView />
    <Toaster
      position="top-right"
      theme="system"
      :grouping="true"
      :group-threshold="4"
      aria-live="polite"
    />
  </AppLayout>
</template>
```
