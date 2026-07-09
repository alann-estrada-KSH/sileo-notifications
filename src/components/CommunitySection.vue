<script setup lang="ts">
import { t } from "../i18n";
import { framework, FRAMEWORK_META } from "../framework";
</script>

<template>
    <section id="community" class="community container">
        <div v-reveal class="panel">
            <div class="goo-field" aria-hidden="true">
                <span style="width: 42%; aspect-ratio: 1; left: -8%; bottom: -18%; background: var(--state-warning); opacity: 0.16; animation: blob-drift-b 24s ease-in-out infinite;"></span>
                <span style="width: 30%; aspect-ratio: 1; right: 4%; top: -14%; background: var(--accent); opacity: 0.2; animation: blob-drift-a 20s ease-in-out infinite;"></span>
            </div>
            <div class="copy">
                <p class="eyebrow">{{ t("community").eyebrow }}</p>
                <h2 class="section-title">{{ t("community").title }}</h2>
                <p class="body">{{ t("community").body }}</p>
            </div>
            <div class="actions">
                <a
                    class="btn primary"
                    :href="`${FRAMEWORK_META[framework].repo}/issues/new`"
                    target="_blank"
                    rel="noreferrer"
                >{{ t("community").issuesCta }}</a>
                <a
                    class="btn"
                    :href="`${FRAMEWORK_META[framework].repo}/issues`"
                    target="_blank"
                    rel="noreferrer"
                >{{ t("community").discussionsCta }}</a>
            </div>
        </div>
    </section>
</template>

<style scoped>
.community {
    padding-block: 6rem;
}

.panel {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 2.5rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--line);
    background: linear-gradient(155deg, var(--ink-2), var(--ink-1));
}

.panel > *:not(.goo-field) {
    position: relative;
    z-index: 1;
}

.copy {
    max-width: 48ch;
}

.section-title {
    margin-top: 0.6rem;
    font-size: clamp(1.6rem, 3.2vw, 2.1rem);
}

.body {
    margin-top: 0.85rem;
    font-size: 0.96rem;
    line-height: 1.6;
    color: var(--paper-dim);
}

.actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    flex-shrink: 0;
}

.btn {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.3rem;
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid var(--line);
    color: var(--paper);
    transition: border-color 180ms var(--ease-out-expo), background 180ms var(--ease-out-expo), color 180ms var(--ease-out-expo);
}

.btn:hover {
    border-color: var(--accent);
}

.btn.primary {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--ink-0);
}

.btn.primary:hover {
    opacity: 0.9;
    box-shadow: var(--glow-accent);
}

@media (max-width: 700px) {
    .panel {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
