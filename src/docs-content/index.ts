// Raw-imports vendored copies of each framework repo's docs at build time.
// This site lives in its own repo now, so these are *copies*, not the
// original source of truth — see content/README.md for the sync process
// when the source repos' docs change.
import vueOverviewEn from "../../content/vue/en/index.md?raw";
import vueGettingStartedEn from "../../content/vue/en/getting-started.md?raw";
import vueApiReferenceEn from "../../content/vue/en/api-reference.md?raw";
import vueExamplesEn from "../../content/vue/en/examples.md?raw";
import vueStylingEn from "../../content/vue/en/styling.md?raw";
import vueAdvancedFeaturesEn from "../../content/vue/en/advanced-features.md?raw";
import vueImplementationNotesEn from "../../content/vue/en/implementation-notes.md?raw";
import vueMigrationGuideEn from "../../content/vue/en/migration-guide.md?raw";

import vueOverviewEs from "../../content/vue/es/index.md?raw";
import vueGettingStartedEs from "../../content/vue/es/getting-started.md?raw";
import vueApiReferenceEs from "../../content/vue/es/api-reference.md?raw";
import vueExamplesEs from "../../content/vue/es/examples.md?raw";
import vueStylingEs from "../../content/vue/es/styling.md?raw";
import vueAdvancedFeaturesEs from "../../content/vue/es/advanced-features.md?raw";
import vueImplementationNotesEs from "../../content/vue/es/implementation-notes.md?raw";
import vueMigrationGuideEs from "../../content/vue/es/migration-guide.md?raw";

// sileo_flutter's docs aren't translated — the switcher's language toggle
// only affects site chrome for the Flutter tab, not doc body text.
import flutterOverviewEn from "../../content/flutter/en/index.md?raw";
import flutterGettingStartedEn from "../../content/flutter/en/getting-started.md?raw";
import flutterApiReferenceEn from "../../content/flutter/en/api-reference.md?raw";
import flutterStylingEn from "../../content/flutter/en/styling.md?raw";
import flutterAdvancedFeaturesEn from "../../content/flutter/en/advanced-features.md?raw";

import type { Locale } from "../i18n";
import type { Framework } from "../framework";

export interface DocEntry {
    slug: string;
    title: string;
    desc: Record<Locale, string>;
    raw: Record<Locale, string>;
}

const en = (raw: string): Record<Locale, string> => ({ en: raw, es: raw });

// slug doubles as the vue-router param (/docs/:slug) and the key used to
// look up sidebar title/description.
export const DOCS_BY_FRAMEWORK: Record<Framework, DocEntry[]> = {
    vue: [
        {
            slug: "index",
            title: "Overview",
            desc: { en: "Where to start and what sileo-vue is good at.", es: "Por dónde empezar y en qué destaca sileo-vue." },
            raw: { en: vueOverviewEn, es: vueOverviewEs },
        },
        {
            slug: "getting-started",
            title: "Getting Started",
            desc: { en: "Install, mount Toaster, fire your first toast.", es: "Instala, monta el Toaster y dispara tu primera notificación." },
            raw: { en: vueGettingStartedEn, es: vueGettingStartedEs },
        },
        {
            slug: "api-reference",
            title: "API Reference",
            desc: { en: "Every sileo.*() method, option, and prop.", es: "Cada método sileo.*(), opción y prop." },
            raw: { en: vueApiReferenceEn, es: vueApiReferenceEs },
        },
        {
            slug: "examples",
            title: "Examples",
            desc: { en: "Copy-paste patterns for real app flows.", es: "Patrones listos para copiar y pegar en flujos reales." },
            raw: { en: vueExamplesEn, es: vueExamplesEs },
        },
        {
            slug: "styling",
            title: "Styling & Theming",
            desc: { en: "Colors, fill, roundness, and the custom palette.", es: "Colores, relleno, bordes redondeados y la paleta personalizada." },
            raw: { en: vueStylingEn, es: vueStylingEs },
        },
        {
            slug: "advanced-features",
            title: "Advanced Features",
            desc: { en: "Grouping, hooks, containers, and more.", es: "Agrupación, hooks, contenedores y más." },
            raw: { en: vueAdvancedFeaturesEn, es: vueAdvancedFeaturesEs },
        },
        {
            slug: "implementation-notes",
            title: "Implementation Notes",
            desc: { en: "Integration guidance for teams adopting sileo-vue.", es: "Guía de integración para equipos que adoptan sileo-vue." },
            raw: { en: vueImplementationNotesEn, es: vueImplementationNotesEs },
        },
        {
            slug: "migration-guide",
            title: "Migration Guide",
            desc: { en: "Coming from another toast library.", es: "Si vienes de otra librería de notificaciones." },
            raw: { en: vueMigrationGuideEn, es: vueMigrationGuideEs },
        },
    ],
    flutter: [
        {
            slug: "index",
            title: "Overview",
            desc: { en: "Where to start and what sileo_flutter is good at.", es: "Por dónde empezar y en qué destaca sileo_flutter." },
            raw: en(flutterOverviewEn),
        },
        {
            slug: "getting-started",
            title: "Getting Started",
            desc: { en: "Install, mount Toaster, fire your first toast.", es: "Instala, monta el Toaster y dispara tu primera notificación." },
            raw: en(flutterGettingStartedEn),
        },
        {
            slug: "api-reference",
            title: "API Reference",
            desc: { en: "Every sileo.*() method, option, and prop.", es: "Cada método sileo.*(), opción y prop." },
            raw: en(flutterApiReferenceEn),
        },
        {
            slug: "styling",
            title: "Styling & Theming",
            desc: { en: "Colors, fill, roundness, and the custom palette.", es: "Colores, relleno, bordes redondeados y la paleta personalizada." },
            raw: en(flutterStylingEn),
        },
        {
            slug: "advanced-features",
            title: "Advanced Features",
            desc: { en: "Grouping, hooks, containers, and more.", es: "Agrupación, hooks, contenedores y más." },
            raw: en(flutterAdvancedFeaturesEn),
        },
    ],
};

export const DEFAULT_SLUG = "index";

export const findDoc = (framework: Framework, slug: string | undefined): DocEntry => {
    const docs = DOCS_BY_FRAMEWORK[framework];
    return docs.find((doc) => doc.slug === slug) ?? docs.find((doc) => doc.slug === DEFAULT_SLUG)!;
};

export const DOC_REPO_PATH: Record<Framework, string> = {
    vue: "https://github.com/alann-estrada-KSH/sileo-vue/blob/main/docs",
    flutter: "https://github.com/alann-estrada-KSH/sileo-flutter/blob/main/doc",
};
