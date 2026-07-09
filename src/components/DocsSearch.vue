<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { locale } from "../i18n";
import { search } from "../lib/searchIndex";

const open = ref(false);
const query = ref("");
const selected = ref(0);
const inputEl = ref<HTMLInputElement | null>(null);
const router = useRouter();

const results = computed(() => search(query.value, locale.value));

const close = () => {
    open.value = false;
    query.value = "";
    selected.value = 0;
};

const openSearch = () => {
    open.value = true;
    nextTick(() => inputEl.value?.focus());
};

const go = (path: string) => {
    router.push(path);
    close();
};

const onKeydown = (event: KeyboardEvent) => {
    const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
    if (isShortcut) {
        event.preventDefault();
        open.value ? close() : openSearch();
        return;
    }
    if (!open.value) return;

    if (event.key === "Escape") {
        close();
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        selected.value = Math.min(selected.value + 1, results.value.length - 1);
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        selected.value = Math.max(selected.value - 1, 0);
    } else if (event.key === "Enter") {
        const hit = results.value[selected.value];
        if (hit) go(hit.path);
    }
};

watch(query, () => (selected.value = 0));

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));

defineExpose({ open: openSearch });
</script>

<template>
    <button type="button" class="search-trigger" aria-label="Search docs" @click="openSearch">
        <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.3" /><path d="M10.5 10.5L14 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" /></svg>
        <kbd>&#8984;K</kbd>
    </button>

    <Teleport to="body">
        <div v-if="open" class="search-overlay" @click.self="close">
            <div class="search-panel" role="dialog" aria-modal="true" aria-label="Search docs">
                <div class="search-input-row">
                    <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.3" /><path d="M10.5 10.5L14 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" /></svg>
                    <input
                        ref="inputEl"
                        v-model="query"
                        type="text"
                        placeholder="Search the docs…"
                        autocomplete="off"
                        spellcheck="false"
                    />
                    <kbd class="esc">Esc</kbd>
                </div>

                <ul v-if="results.length" class="search-results">
                    <li
                        v-for="(hit, i) in results"
                        :key="`${hit.framework}-${hit.slug}`"
                        :class="{ active: i === selected }"
                        @mouseenter="selected = i"
                    >
                        <button type="button" @click="go(hit.path)">
                            <span class="fw-badge" :class="hit.framework">{{ hit.framework }}</span>
                            <span class="hit-body">
                                <span class="hit-title">{{ hit.title }}</span>
                                <span class="hit-snippet">{{ hit.snippet }}</span>
                            </span>
                        </button>
                    </li>
                </ul>
                <p v-else-if="query.trim()" class="search-empty">No results for "{{ query }}".</p>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.search-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    height: 32px;
    padding: 0 0.6rem;
    border-radius: var(--radius-pill);
    border: 1px solid var(--line);
    background: transparent;
    color: var(--paper-faint);
    cursor: pointer;
    transition: border-color 160ms var(--ease-out-expo), color 160ms var(--ease-out-expo);
}

.search-trigger:hover {
    border-color: var(--accent);
    color: var(--paper);
}

.search-trigger svg {
    width: 14px;
    height: 14px;
}

.search-trigger kbd {
    font-family: var(--font-mono);
    font-size: 0.68rem;
}

.search-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: min(18vh, 160px);
    background: oklch(0.05 0.01 296 / 60%);
    backdrop-filter: blur(4px);
}

.search-panel {
    width: min(600px, 90vw);
    max-height: 60vh;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-lg);
    border: 1px solid var(--line);
    background: var(--ink-1);
    box-shadow: 0 24px 60px -20px oklch(0.05 0.01 296 / 70%);
    overflow: hidden;
}

.search-input-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.2rem;
    border-bottom: 1px solid var(--line);
}

.search-input-row svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: var(--paper-faint);
}

.search-input-row input {
    flex: 1;
    border: 0;
    background: none;
    color: var(--paper);
    font-family: var(--font-body);
    font-size: 1rem;
    outline: none;
}

.search-input-row .esc {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--paper-faint);
    border: 1px solid var(--line);
    border-radius: var(--radius-sm);
    padding: 0.1rem 0.4rem;
}

.search-results {
    list-style: none;
    margin: 0;
    padding: 0.5rem;
    overflow-y: auto;
}

.search-results button {
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 0.7rem;
    padding: 0.7rem 0.8rem;
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    color: inherit;
    text-align: left;
    cursor: pointer;
}

.search-results li.active button {
    background: var(--ink-2);
}

.fw-badge {
    flex-shrink: 0;
    margin-top: 0.15rem;
    padding: 0.1rem 0.45rem;
    border-radius: var(--radius-pill);
    font-family: var(--font-mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.fw-badge.vue {
    background: oklch(0.623 0.214 259.815 / 18%);
    color: var(--state-action);
}

.fw-badge.flutter {
    background: oklch(0.685 0.169 237.323 / 18%);
    color: var(--state-info);
}

.hit-body {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
}

.hit-title {
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--paper);
}

.hit-snippet {
    font-size: 0.8rem;
    color: var(--paper-faint);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.search-empty {
    padding: 1.5rem 1.2rem;
    color: var(--paper-faint);
    font-size: 0.9rem;
}
</style>
