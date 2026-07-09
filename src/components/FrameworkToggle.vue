<script setup lang="ts">
import { framework, setFramework } from "../framework";
</script>

<template>
    <div class="fw-toggle" role="group" aria-label="Framework">
        <button
            type="button"
            class="fw-btn"
            :class="{ active: framework === 'vue' }"
            :aria-pressed="framework === 'vue'"
            @click="setFramework('vue')"
        >Vue</button>
        <button
            type="button"
            class="fw-btn"
            :class="{ active: framework === 'flutter' }"
            :aria-pressed="framework === 'flutter'"
            @click="setFramework('flutter')"
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
