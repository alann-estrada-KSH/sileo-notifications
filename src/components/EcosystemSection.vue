<script setup lang="ts">
import { computed } from "vue";
import { t } from "../i18n";
import { framework, FRAMEWORK_META } from "../framework";

// href is a layout/link concern, language-agnostic, kept out of the
// translated copy — mirrors the SPANS pattern in FeatureGrid.vue. "react"
// is the upstream original by @hiaaryan, not part of the framework switcher,
// so it's never highlighted as "current".
const HREF: Record<string, string> = {
    react: "https://github.com/hiaaryan/sileo",
    vue: FRAMEWORK_META.vue.repo,
    flutter: "https://pub.dev/packages/sileo_flutter",
};

const items = computed(() =>
    t("ecosystem").items.map((item) => ({
        ...item,
        current: item.id === framework.value,
        href: item.id === framework.value ? null : HREF[item.id],
    })),
);
</script>

<template>
    <section id="ecosystem" class="ecosystem container">
        <div class="goo-field" aria-hidden="true">
            <span style="width: 46%; aspect-ratio: 1; left: -6%; top: 10%; background: var(--state-action); opacity: 0.22; animation: blob-drift-a 22s ease-in-out infinite;"></span>
            <span style="width: 38%; aspect-ratio: 1; right: -4%; top: -6%; background: var(--state-success); opacity: 0.18; animation: blob-drift-b 26s ease-in-out infinite;"></span>
            <span style="width: 32%; aspect-ratio: 1; right: 12%; bottom: -12%; background: var(--state-info); opacity: 0.16; animation: blob-drift-a 19s ease-in-out infinite reverse;"></span>
        </div>

        <p v-reveal class="eyebrow">{{ t("ecosystem").eyebrow }}</p>
        <h2 v-reveal="60" class="section-title">{{ t("ecosystem").title }}</h2>
        <p v-reveal="100" class="lede">{{ t("ecosystem").lede }}</p>

        <div class="grid">
            <component
                :is="item.href ? 'a' : 'div'"
                v-for="(item, i) in items"
                :key="item.id"
                v-reveal="i * 80"
                class="card card-pop"
                :class="{ current: item.current }"
                v-bind="item.href ? { href: item.href, target: '_blank', rel: 'noreferrer' } : {}"
            >
                <span class="tag">{{ item.tag }}</span>
                <h3>{{ item.name }}</h3>
                <p>{{ item.body }}</p>
                <span class="cta">{{ item.current ? t("ecosystem").currentCta : item.cta }}</span>
            </component>
        </div>
    </section>
</template>

<style scoped>
.ecosystem {
    position: relative;
    padding-block: 6rem;
}

.ecosystem > *:not(.goo-field) {
    position: relative;
    z-index: 1;
}

.section-title {
    margin-top: 0.6rem;
    max-width: 32ch;
    font-size: clamp(2rem, 4.4vw, 2.85rem);
}

.lede {
    margin-top: 1rem;
    max-width: 62ch;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--paper-dim);
}

.grid {
    margin-top: 2.75rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.1rem;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.9rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--line);
    background: linear-gradient(155deg, var(--ink-2), var(--ink-1));
    text-decoration: none;
    color: inherit;
}

.card.current {
    border-color: var(--accent);
    cursor: default;
    box-shadow: var(--glow-accent);
}

.tag {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
}

.card h3 {
    margin-top: 0.85rem;
    font-family: var(--font-mono);
    font-size: 1.35rem;
}

.card p {
    margin-top: 0.65rem;
    color: var(--paper-dim);
    font-size: 0.94rem;
    line-height: 1.6;
}

.cta {
    margin-top: 1.25rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--paper-faint);
}

.card.current .cta {
    color: var(--accent);
}

a.card:hover .cta {
    color: var(--accent);
}

@media (max-width: 900px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 620px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>
