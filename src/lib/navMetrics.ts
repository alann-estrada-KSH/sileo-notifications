import { ref } from "vue";

// SiteNav reports its real rendered height here (ResizeObserver), so anything
// that needs to clear the nav — like the playground's fixed Toaster viewport —
// doesn't rely on a hardcoded pixel guess that breaks the moment the nav
// wraps to a second row on a narrower viewport or grows a new toggle.
export const navHeight = ref(0);
