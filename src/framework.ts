import { ref } from "vue";

export type Framework = "vue" | "flutter";

const STORAGE_KEY = "sileo-landing-framework";

const detectDefault = (): Framework => {
    if (typeof window === "undefined") return "vue";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "vue" || stored === "flutter" ? stored : "vue";
};

export const framework = ref<Framework>(detectDefault());

export const setFramework = (next: Framework) => {
    framework.value = next;
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, next);
};

export const FRAMEWORK_META: Record<Framework, { label: string; repo: string; install: string }> = {
    vue: {
        label: "Vue 3",
        repo: "https://github.com/alann-estrada-KSH/sileo-vue",
        install: "npm install @alann-estrada-ksh/sileo-vue",
    },
    flutter: {
        label: "Flutter",
        repo: "https://github.com/alann-estrada-KSH/sileo-flutter",
        install: "flutter pub add sileo_flutter",
    },
};
