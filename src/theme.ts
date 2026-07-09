import { ref } from "vue";

export type PageTheme = "dark" | "light";

const STORAGE_KEY = "sileo-landing-theme";

// Explicit only once the user actually clicks the toggle — until then the
// page tracks the OS theme live, including switching mid-session (e.g. the
// OS flips to dark at sunset while the tab is still open).
let hasExplicitChoice = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) !== null;

const systemTheme = (): PageTheme =>
    window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";

const detectDefault = (): PageTheme => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
    return systemTheme();
};

const applyTheme = (value: PageTheme) => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = value;
    document.documentElement.style.colorScheme = value;
};

export const pageTheme = ref<PageTheme>(detectDefault());
applyTheme(pageTheme.value);

if (typeof window !== "undefined" && window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (event) => {
        if (hasExplicitChoice) return;
        pageTheme.value = event.matches ? "light" : "dark";
        applyTheme(pageTheme.value);
    });
}

export const setPageTheme = (next: PageTheme) => {
    hasExplicitChoice = true;
    pageTheme.value = next;
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
};
