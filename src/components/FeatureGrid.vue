<script setup lang="ts">
import { computed } from "vue";
import { t } from "../i18n";

// Spans/colors are layout-only and language-agnostic, so they stay separate
// from the translated copy instead of being duplicated into both locale
// dictionaries. Colors cycle the toast's own state palette across the cards
// (see style.css state-* tokens) — the same "signature" that makes the
// actual notifications instantly recognizable, echoed in the chrome around
// them instead of every card wearing one flat accent hue.
const SPANS = [3, 3, 2, 2, 2, 3, 3];
const COLORS = [
    "var(--accent)",
    "var(--state-info)",
    "var(--state-warning)",
    "var(--state-action)",
    "var(--state-success)",
    "var(--state-error)",
    "var(--state-info)",
];

const features = computed(() =>
    t("features").items.map((item, i) => ({ ...item, span: SPANS[i] ?? 2, color: COLORS[i] ?? "var(--accent)" })),
);
</script>

<template>
    <section id="features" class="features container">
        <p v-reveal class="eyebrow">{{ t("features").eyebrow }}</p>
        <h2 v-reveal="60" class="section-title">{{ t("features").title }}</h2>

        <div class="bento">
            <article
                v-for="(feature, i) in features"
                :key="feature.title"
                v-reveal="i * 70"
                class="card"
                :style="{ '--span': feature.span, '--tag-color': feature.color }"
            >
                <span class="tag">{{ feature.tag }}</span>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.body }}</p>
            </article>
        </div>
    </section>
</template>

<style scoped>
.features {
    padding-block: 6rem;
}

.section-title {
    margin-top: 0.6rem;
    max-width: 32ch;
    font-size: clamp(2rem, 4.4vw, 2.85rem);
}

.bento {
    margin-top: 2.75rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1.1rem;
}

.card {
    grid-column: span var(--span);
    padding: 1.9rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--line);
    background: linear-gradient(155deg, var(--ink-2), var(--ink-1));
    transition: border-color 220ms var(--ease-out-expo), transform 220ms var(--ease-out-expo), box-shadow 220ms var(--ease-out-expo);
}

.card:hover {
    border-color: var(--tag-color);
    transform: translateY(-4px);
    box-shadow: 0 16px 36px -18px color-mix(in oklch, var(--tag-color) 55%, transparent);
}

.tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--tag-color);
}

.tag::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: var(--radius-pill);
    background: var(--tag-color);
}

.card h3 {
    margin-top: 0.85rem;
    font-size: 1.35rem;
}

.card p {
    margin-top: 0.65rem;
    color: var(--paper-dim);
    font-size: 0.96rem;
    line-height: 1.6;
}

@media (max-width: 960px) {
    .bento {
        grid-template-columns: repeat(2, 1fr);
    }
    .card {
        grid-column: span 1;
    }
}

@media (max-width: 560px) {
    .bento {
        grid-template-columns: 1fr;
    }
}
</style>
