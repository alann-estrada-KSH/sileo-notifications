# Ejemplos

Esta página se enfoca en patrones de uso del mundo real.

## 1. Mensaje simple de éxito

```ts-demo
sileo.success({
  title: "Guardado",
  description: "Tus cambios se aplicaron.",
});
```

## 2. Notificación de acción

```ts-demo
sileo.action({
  title: "Nuevo comentario",
  description: "Abre el hilo para responder.",
  button: {
    title: "Abrir",
    onClick: () => router.push("/thread/123"),
  },
});
```

## 3. Flujo de carga a éxito

```ts-demo
await sileo.promise(saveProfile(), {
  loading: {
    title: "Guardando perfil",
    description: "Espera un momento...",
  },
  success: () => ({
    title: "Perfil guardado",
    description: "Tus ajustes ya están al día.",
  }),
  error: (err) => ({
    title: "Error al guardar",
    description: String(err),
  }),
});
```

## 4. Flujo de promesa a acción

```ts-demo
await sileo.promise(fetchInvoice(), {
  loading: {
    title: "Creando factura",
  },
  success: (invoice) => ({
    title: "Factura lista",
    description: invoice.number,
  }),
  action: (invoice) => ({
    title: "Factura lista",
    description: invoice.number,
    button: {
      title: "Copiar número",
      onClick: () => navigator.clipboard.writeText(invoice.number),
    },
  }),
  error: {
    title: "No se pudo crear la factura",
  },
});
```

## 5. Notificaciones en ráfaga agrupadas

```ts-demo
sileo.info({ title: "Archivo 1 subido", groupKey: "uploads" });
sileo.info({ title: "Archivo 2 subido", groupKey: "uploads" });
sileo.info({ title: "Archivo 3 subido", groupKey: "uploads" });
```

Cuando `Toaster grouping` está habilitado y la cubeta supera el umbral, sileo-vue colapsa el conjunto en una píldora resumen.

## 6. Contenido de descripción enriquecido

```ts-demo
import { h } from "vue";

sileo.info({
  title: "Novedades del equipo",
  description: h("div", { class: "stack" }, [
    h("strong", "3 miembros se unieron"),
    h("span", "Se creó un nuevo espacio de trabajo."),
  ]),
});
```

## 7. Notificación fija

```ts-demo
sileo.info({
  title: "Mensaje fijado",
  description: "Esta notificación permanece hasta cerrarla manualmente.",
  duration: null,
});
```

## 8. Comportamiento y movimiento controlados

```ts-demo
sileo.info({
  title: "Tiempos personalizados",
  description: "La expansión y el colapso se pueden ajustar.",
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

## 9. Paleta personalizada de marca

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

Ver [Estilos y temas](styling.md) para la lista completa de campos de `SileoColors`.

## 10. Notificaciones de color al estilo toastify

```vue-demo-colored
<template>
  <Toaster theme="colored" />
</template>
```

Ahora el fondo de cada notificación coincide con su propio estado — éxito es verde, error es rojo, etc. — con el título, la descripción y el badge cambiando automáticamente a un color claro legible. Sobrescribe un solo estado manteniendo el resto:

```vue-demo-colored
<template>
  <Toaster theme="colored" :colors="{ success: '#059669' }" />
</template>
```

## 11. Full dark vs. acento oscuro

`fill` cambia la superficie de un toast. Un fill casi negro sobre una página clara funciona como acento; `black` puro es full dark, así que aclara el texto con `styles`.

```ts-demo
sileo.success({ title: "Guardado", fill: "#171717" });

sileo.success({
  title: "Reserva confirmada",
  description: "Tu asiento está reservado.",
  fill: "black",
  styles: { title: "text-white!", description: "text-white/75!" },
});
```

## 12. Con o sin parte desplegable

El panel desplegable solo existe cuando el toast tiene `description` (o un `button`). Omite ambos para una píldora simple que nunca se expande.

```ts-demo
sileo.info({ title: "Solo píldora, nada que expandir" });

sileo.info({
  title: "Desplegable",
  description: "Pasa el cursor o espera al autopilot para ver este panel.",
});
```

## 13. Roundness

```ts-demo
sileo.info({ title: "Roundness 6", description: "Esquinas más rectas.", roundness: 6 });
sileo.info({ title: "Roundness 24", description: "Esquinas más suaves.", roundness: 24 });
```

## 14. Descripción rica con avatares

`description` acepta cualquier contenido de render de Vue, no solo texto.

```ts-demo
import { h } from "vue";

const avatar = (bg, label) =>
  h("span", {
    style: `display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:999px;background:${bg};color:#fff;font-size:11px;box-shadow:0 0 0 2px #fff;margin-right:-8px`,
  }, label);

sileo.info({
  title: "Novedades del equipo",
  description: h("div", { style: "display:flex;flex-direction:column;gap:8px" }, [
    h("div", { style: "display:flex" }, [avatar("#6366f1", "AL"), avatar("#ec4899", "MR"), avatar("#14b8a6", "JT")]),
    h("span", { style: "font-size:12px" }, "3 miembros nuevos se unieron al proyecto."),
  ]),
});
```

## 15. Configuración sugerida del shell de la app

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
