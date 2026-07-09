<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { t } from "../i18n";
import { framework, FRAMEWORK_META } from "../framework";
import { navHeight } from "../lib/navMetrics";
import FrameworkToggle from "./FrameworkToggle.vue";
import LanguageToggle from "./LanguageToggle.vue";
import ThemeToggle from "./ThemeToggle.vue";

const navEl = ref<HTMLElement | null>(null);
let observer: ResizeObserver | null = null;

onMounted(() => {
    if (!navEl.value || typeof ResizeObserver === "undefined") return;
    observer = new ResizeObserver(([entry]) => {
        navHeight.value = entry.contentRect.height;
    });
    observer.observe(navEl.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
    <nav ref="navEl" class="nav container">
        <router-link to="/" class="wordmark"><span class="wordmark-dot" aria-hidden="true"></span>Sileo</router-link>
        <div class="nav-primary">
            <router-link :to="{ path: '/', hash: '#playground' }">{{ t("nav").playground }}</router-link>
            <router-link :to="{ path: '/', hash: '#features' }">{{ t("nav").features }}</router-link>
            <router-link :to="`/docs/${framework}`">{{ t("nav").docs }}</router-link>
            <a :href="FRAMEWORK_META[framework].repo" target="_blank" rel="noreferrer">{{ t("nav").github }}</a>
        </div>
        <div class="nav-toggles">
            <FrameworkToggle />
            <ThemeToggle />
            <LanguageToggle />
        </div>
    </nav>
</template>

<style scoped>
.nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem 1.25rem;
    padding-block: 1.5rem;
    position: relative;
    z-index: 2;
}

.wordmark {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    text-decoration: none;
    color: var(--paper);
}

.wordmark-dot {
    width: 14px;
    height: 9px;
    border-radius: var(--radius-pill);
    background: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-soft);
    transition: transform 260ms var(--ease-out-expo);
}

.wordmark:hover .wordmark-dot {
    transform: scaleX(1.3);
}

.nav-primary {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.85rem;
}

.nav-primary a {
    text-decoration: none;
    color: var(--paper-dim);
    transition: color 180ms var(--ease-out-expo);
}

.nav-primary a:hover {
    color: var(--paper);
}

.nav-toggles {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.6rem;
}

@media (max-width: 860px) {
    .nav {
        padding-block: 1.25rem;
    }

    .nav-primary {
        order: 3;
        width: 100%;
        gap: 1rem;
        font-size: 0.78rem;
    }

    .nav-toggles {
        order: 2;
        margin-left: auto;
    }
}
</style>
