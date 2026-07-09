<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { framework, setFramework, type Framework } from "../framework";
import { DOCS_BY_FRAMEWORK, DEFAULT_SLUG } from "../docs-content";

const route = useRoute();
const router = useRouter();

// On a docs page the URL (not just the toggle) encodes the framework, so
// switching has to navigate — otherwise the toggle would show "Flutter"
// active while the page still renders the Vue doc it was already on.
// Same slug carries over if it exists for the target framework (both have
// "styling"), otherwise falls back to that framework's overview.
const choose = (next: Framework) => {
    if (route.path.startsWith("/docs")) {
        const slug = typeof route.params.slug === "string" ? route.params.slug : DEFAULT_SLUG;
        const carriesOver = DOCS_BY_FRAMEWORK[next].some((doc) => doc.slug === slug);
        const targetSlug = carriesOver ? slug : DEFAULT_SLUG;
        router.push(targetSlug === DEFAULT_SLUG ? `/docs/${next}` : `/docs/${next}/${targetSlug}`);
        return;
    }
    setFramework(next);
};
</script>

<template>
    <div class="fw-toggle" role="group" aria-label="Framework">
        <button
            type="button"
            class="fw-btn"
            :class="{ active: framework === 'vue' }"
            :aria-pressed="framework === 'vue'"
            @click="choose('vue')"
        >Vue</button>
        <button
            type="button"
            class="fw-btn"
            :class="{ active: framework === 'flutter' }"
            :aria-pressed="framework === 'flutter'"
            @click="choose('flutter')"
        >Flutter</button>
    </div>
</template>

<style scoped>
.fw-toggle {
    display: inline-flex;
    gap: 0.25rem;
    padding: 0.2rem;
    border-radius: 999px;
    border: 1px solid var(--line);
}

.fw-btn {
    padding: 0.25rem 0.65rem;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--paper-faint);
    font-family: var(--font-mono);
    font-size: 0.74rem;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: background 160ms var(--ease-out-expo), color 160ms var(--ease-out-expo);
}

.fw-btn.active {
    background: var(--accent-soft);
    color: var(--paper);
}
</style>
