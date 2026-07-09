import { ref } from "vue";

export type Locale = "en" | "es";

const STORAGE_KEY = "sileo-landing-locale";

const detectDefault = (): Locale => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") return stored;
    return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
};

export const locale = ref<Locale>(detectDefault());

if (typeof document !== "undefined") {
    document.documentElement.lang = locale.value;
}

export const setLocale = (next: Locale) => {
    locale.value = next;
    if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next);
    }
    if (typeof document !== "undefined") {
        document.documentElement.lang = next;
    }
};

interface Feature {
    tag: string;
    title: string;
    body: string;
}

// id ties each card back to the LINKS array in EcosystemSection.vue, which
// carries the language-agnostic href/framework-match — same split as
// FeatureGrid.vue's SPANS.
interface EcosystemItem {
    id: "react" | "vue" | "flutter";
    name: string;
    tag: string;
    body: string;
    cta: string;
}

interface Messages {
    meta: { title: string; description: string };
    nav: { playground: string; features: string; docs: string; github: string };
    hero: {
        eyebrowSuffix: string;
        headline1: string;
        headline2: string;
        subhead: string;
        copy: string;
        copied: string;
        tryLive: string;
        viewSource: string;
        viaCdn: string;
    };
    playground: {
        eyebrow: string;
        title: string;
        lede: string;
        btnSuccess: string;
        btnError: string;
        btnWarning: string;
        btnInfo: string;
        btnAction: string;
        btnPromise: string;
        btnGroup: string;
        btnCustom: string;
        btnClear: string;
        themeDark: string;
        themeLight: string;
        themeColored: string;
        flutterNote: string;
        flutterCta: string;
        toasts: {
            successTitle: string;
            successDesc: string;
            errorTitle: string;
            errorDesc: string;
            warningTitle: string;
            warningDesc: string;
            infoTitle: string;
            infoDesc: string;
            actionTitle: string;
            actionDesc: string;
            actionButton: string;
            actionOpenedTitle: string;
            promiseLoadingTitle: string;
            promiseLoadingDesc: string;
            promiseSuccessTitle: string;
            promiseSuccessDesc: string;
            promiseErrorTitle: string;
            groupTitles: string[];
            customTitle: string;
            customDesc: string;
        };
    };
    features: { eyebrow: string; title: string; items: Feature[] };
    ecosystem: {
        eyebrow: string;
        title: string;
        lede: string;
        currentCta: string;
        items: EcosystemItem[];
    };
    docs: { eyebrow: string; title: string };
    community: {
        eyebrow: string;
        title: string;
        body: string;
        issuesCta: string;
        discussionsCta: string;
    };
    docsPage: {
        backHome: string;
        viewOnGithub: string;
    };
    footer: { docs: string; metaPrefix: string; credit: string };
}

const messages: Record<Locale, Messages> = {
    en: {
        meta: {
            title: "Sileo — toasts with manners",
            description:
                "Sileo is an opinionated toast notification family — gooey pill toasts, promise flows, grouping, swipe-to-dismiss, and full color theming, natively for Vue 3 and Flutter.",
        },
        nav: { playground: "Playground", features: "Features", docs: "Docs", github: "GitHub" },
        hero: {
            eyebrowSuffix: "toast library",
            headline1: "Say it once.",
            headline2: "Say it well.",
            subhead:
                "An opinionated toast library built around gooey SVG pills that expand on demand, merge into a count when they pile up, and dismiss themselves without asking for applause.",
            copy: "copy",
            copied: "copied",
            tryLive: "Try it live ↓",
            viewSource: "View source",
            viaCdn: "Also on jsDelivr (CDN, no bundler) ↗",
        },
        playground: {
            eyebrow: "try it",
            title: "Poke it. It won't bite.",
            lede: "These buttons call the exact same API shown in the snippets below. Fire a few at once to see grouping and the gooey expand animation kick in.",
            btnSuccess: "success",
            btnError: "error",
            btnWarning: "warning",
            btnInfo: "info",
            btnAction: "action + button",
            btnPromise: "promise flow",
            btnGroup: "grouped burst",
            btnCustom: "custom fill",
            btnClear: "clear all",
            themeDark: "dark",
            themeLight: "light",
            themeColored: "colored",
            flutterNote:
                "This live playground runs the Vue build — Flutter widgets can't run in a browser tab. The same API is available natively; see the docs and the in-repo example app.",
            flutterCta: "Browse the sileo_flutter example ↗",
            toasts: {
                successTitle: "Deploy complete",
                successDesc: "All containers are healthy.",
                errorTitle: "Sync failed",
                errorDesc: "Retrying in 30 seconds.",
                warningTitle: "Quota almost full",
                warningDesc: "You're at 92% of your plan.",
                infoTitle: "Nightly backup",
                infoDesc: "Completed 3 minutes ago.",
                actionTitle: "New comment",
                actionDesc: "Someone replied on your thread.",
                actionButton: "Open",
                actionOpenedTitle: "Thread opened",
                promiseLoadingTitle: "Creating invoice",
                promiseLoadingDesc: "Preparing PDF...",
                promiseSuccessTitle: "Invoice ready",
                promiseSuccessDesc: "Reference INV-1290",
                promiseErrorTitle: "Could not create invoice",
                groupTitles: [
                    "File 1 uploaded",
                    "File 2 uploaded",
                    "File 3 uploaded",
                    "File 4 uploaded",
                ],
                customTitle: "Branded toast",
                customDesc: "This one ignores the theme entirely.",
            },
        },
        features: {
            eyebrow: "under the hood",
            title: "Built for the notification, not the demo.",
            items: [
                {
                    tag: "signature",
                    title: "Gooey by construction",
                    body: "Every pill is an SVG shape run through a blur + contrast filter, not a border-radius trick. Expanding a toast is a genuine metaball merge between the header and the body.",
                },
                {
                    tag: "theming",
                    title: "Full color control",
                    body: "Override background, text, and every state accent with a single colors prop — on top of light, dark, a fully custom palette, or a toastify-style colored theme that fills each toast with its own state color.",
                },
                {
                    tag: "stacking",
                    title: "Groups when it piles up",
                    body: "Burst notifications collapse into a single count pill past your threshold, so five uploads don't turn into five toasts.",
                },
                {
                    tag: "async",
                    title: "Promise-aware",
                    body: "One call carries a toast through loading, success, error, and an optional follow-up action state.",
                },
                {
                    tag: "touch",
                    title: "Swipe to dismiss",
                    body: "Gesture-based swipe dismissal on touch devices, opt-out per toast when you need a pinned notification.",
                },
                {
                    tag: "control",
                    title: "Lifecycle hooks",
                    body: "onShow, onExpand, onCollapse, onDismiss — wire toasts into analytics or orchestration without polling state.",
                },
                {
                    tag: "a11y",
                    title: "Accessible by default",
                    body: "Configurable aria-live region (polite, assertive, or off) on the viewport, keyboard-safe focus, and reduced-motion support baked in.",
                },
            ],
        },
        ecosystem: {
            eyebrow: "same manners, more frameworks",
            title: "One toast philosophy, ported natively.",
            lede: "Every port keeps the same gooey pill, the same imperative API shape, and the same grouping/promise/theming model — just idiomatic to its own framework, not a wrapper around another one.",
            currentCta: "You're browsing these docs ↓",
            items: [
                {
                    id: "react",
                    name: "sileo",
                    tag: "React · original",
                    body: "The original implementation by @hiaaryan. This whole family started here.",
                    cta: "View sileo on GitHub ↗",
                },
                {
                    id: "vue",
                    name: "sileo-vue",
                    tag: "Vue 3",
                    body: "Composition API, teleported viewport, full color theming. Extended with grouping, promise flows, and swipe-to-dismiss.",
                    cta: "View sileo-vue on GitHub ↗",
                },
                {
                    id: "flutter",
                    name: "sileo_flutter",
                    tag: "Flutter · pub.dev",
                    body: "Pure Dart/Flutter port — no platform channels. Same gooey-pill silhouette, grouping, and promise flow, native on Android, iOS, web, and desktop.",
                    cta: "View sileo_flutter on pub.dev ↗",
                },
            ],
        },
        docs: { eyebrow: "read more", title: "Documentation" },
        community: {
            eyebrow: "get help",
            title: "Found a bug? Missing something?",
            body: "Every Sileo port is maintained in the open. Bug reports, feature requests, and questions all go through GitHub Issues on the repo for the framework you're using — that's the fastest way to reach a real answer.",
            issuesCta: "Open an issue ↗",
            discussionsCta: "Browse existing issues ↗",
        },
        docsPage: {
            backHome: "← Back to home",
            viewOnGithub: "View on GitHub ↗",
        },
        footer: {
            docs: "Docs",
            metaPrefix: "MIT · built with",
            credit:
                "Sileo started as a React toast library by @hiaaryan, then got an improved, from-scratch Vue 3 rebuild with grouping, promise flows, and custom theming — and a native Flutter port of that Vue implementation.",
        },
    },
    es: {
        meta: {
            title: "Sileo — notificaciones con modales",
            description:
                "Sileo es una familia de librerías de notificaciones (toasts) con opinión propia — píldoras gooey, flujos de promesas, agrupación, deslizar para descartar y temas de color completos, nativas para Vue 3 y Flutter.",
        },
        nav: { playground: "Demo", features: "Funciones", docs: "Docs", github: "GitHub" },
        hero: {
            eyebrowSuffix: "librería de notificaciones",
            headline1: "Dilo una vez.",
            headline2: "Dilo bien.",
            subhead:
                "Una librería de notificaciones con opinión propia, construida con píldoras SVG “gooey” que se expanden a demanda, se agrupan en un contador cuando se acumulan, y se despiden solas sin pedir aplausos.",
            copy: "copiar",
            copied: "copiado",
            tryLive: "Pruébalo en vivo ↓",
            viewSource: "Ver código fuente",
            viaCdn: "También en jsDelivr (CDN, sin bundler) ↗",
        },
        playground: {
            eyebrow: "pruébalo",
            title: "Tócalo. No muerde.",
            lede: "Estos botones llaman exactamente a la misma API que ves en los fragmentos de abajo. Dispara varios a la vez para ver la agrupación y la animación gooey en acción.",
            btnSuccess: "éxito",
            btnError: "error",
            btnWarning: "advertencia",
            btnInfo: "info",
            btnAction: "acción + botón",
            btnPromise: "flujo de promesa",
            btnGroup: "ráfaga agrupada",
            btnCustom: "color personalizado",
            btnClear: "limpiar todo",
            themeDark: "oscuro",
            themeLight: "claro",
            themeColored: "colored",
            flutterNote:
                "Este playground en vivo corre la versión Vue — los widgets de Flutter no pueden ejecutarse en una pestaña del navegador. La misma API está disponible de forma nativa; revisa la documentación y la app de ejemplo del repo.",
            flutterCta: "Ver el ejemplo de sileo_flutter ↗",
            toasts: {
                successTitle: "Despliegue completo",
                successDesc: "Todos los contenedores están saludables.",
                errorTitle: "Sincronización fallida",
                errorDesc: "Reintentando en 30 segundos.",
                warningTitle: "Cuota casi al límite",
                warningDesc: "Estás al 92% de tu plan.",
                infoTitle: "Respaldo nocturno",
                infoDesc: "Completado hace 3 minutos.",
                actionTitle: "Nuevo comentario",
                actionDesc: "Alguien respondió en tu hilo.",
                actionButton: "Abrir",
                actionOpenedTitle: "Hilo abierto",
                promiseLoadingTitle: "Creando factura",
                promiseLoadingDesc: "Preparando PDF...",
                promiseSuccessTitle: "Factura lista",
                promiseSuccessDesc: "Referencia INV-1290",
                promiseErrorTitle: "No se pudo crear la factura",
                groupTitles: [
                    "Archivo 1 subido",
                    "Archivo 2 subido",
                    "Archivo 3 subido",
                    "Archivo 4 subido",
                ],
                customTitle: "Notificación personalizada",
                customDesc: "Esta ignora el tema por completo.",
            },
        },
        features: {
            eyebrow: "por dentro",
            title: "Construido para la notificación, no para la demo.",
            items: [
                {
                    tag: "distintivo",
                    title: "Gooey por construcción",
                    body: "Cada píldora es una forma SVG procesada con un filtro de blur + contraste, no un truco de border-radius. Expandir una notificación es una fusión real de metaballs entre el encabezado y el cuerpo.",
                },
                {
                    tag: "temas",
                    title: "Control total de color",
                    body: "Sobrescribe el fondo, el texto y cada color de estado con una sola prop colors, sobre el tema claro, oscuro, una paleta totalmente personalizada, o un tema colored al estilo toastify que rellena cada notificación con el color de su propio estado.",
                },
                {
                    tag: "apilado",
                    title: "Se agrupa cuando se acumula",
                    body: "Las ráfagas de notificaciones colapsan en una sola píldora con contador al superar tu umbral, para que cinco subidas no se conviertan en cinco notificaciones.",
                },
                {
                    tag: "async",
                    title: "Consciente de promesas",
                    body: "Una sola llamada lleva la notificación por los estados de carga, éxito, error y una acción de seguimiento opcional.",
                },
                {
                    tag: "táctil",
                    title: "Deslizar para descartar",
                    body: "Descarte por gesto de deslizamiento en dispositivos táctiles, desactivable por notificación cuando necesites una fijada.",
                },
                {
                    tag: "control",
                    title: "Hooks de ciclo de vida",
                    body: "onShow, onExpand, onCollapse, onDismiss — conecta las notificaciones a analítica u orquestación sin sondear el estado.",
                },
                {
                    tag: "a11y",
                    title: "Accesible por defecto",
                    body: "Región aria-live configurable (polite, assertive u off) en el viewport, foco seguro para teclado y soporte de movimiento reducido integrado.",
                },
            ],
        },
        ecosystem: {
            eyebrow: "mismos modales, más frameworks",
            title: "Una sola filosofía de notificaciones, portada nativamente.",
            lede: "Cada port mantiene la misma píldora gooey, la misma forma de API imperativa, y el mismo modelo de agrupación/promesas/temas — pero idiomático a su propio framework, no un wrapper alrededor de otro.",
            currentCta: "Estás viendo esta documentación ↓",
            items: [
                {
                    id: "react",
                    name: "sileo",
                    tag: "React · original",
                    body: "La implementación original de @hiaaryan. Toda esta familia empezó aquí.",
                    cta: "Ver sileo en GitHub ↗",
                },
                {
                    id: "vue",
                    name: "sileo-vue",
                    tag: "Vue 3",
                    body: "Composition API, viewport con teleport, temas de color completos. Extendida con agrupación, flujos de promesas y deslizar para descartar.",
                    cta: "Ver sileo-vue en GitHub ↗",
                },
                {
                    id: "flutter",
                    name: "sileo_flutter",
                    tag: "Flutter · pub.dev",
                    body: "Port en Dart/Flutter puro — sin platform channels. Misma silueta de píldora gooey, agrupación y flujo de promesas, nativo en Android, iOS, web y escritorio.",
                    cta: "Ver sileo_flutter en pub.dev ↗",
                },
            ],
        },
        docs: { eyebrow: "leer más", title: "Documentación" },
        community: {
            eyebrow: "obtén ayuda",
            title: "¿Encontraste un bug? ¿Falta algo?",
            body: "Cada port de Sileo se mantiene de forma abierta. Reportes de bugs, solicitudes de funciones y preguntas pasan todos por GitHub Issues en el repo del framework que estés usando — es la forma más rápida de llegar a una respuesta real.",
            issuesCta: "Abrir un issue ↗",
            discussionsCta: "Ver issues existentes ↗",
        },
        docsPage: {
            backHome: "← Volver al inicio",
            viewOnGithub: "Ver en GitHub ↗",
        },
        footer: {
            docs: "Documentación",
            metaPrefix: "MIT · hecho con",
            credit:
                "Sileo empezó como una librería de notificaciones para React de @hiaaryan, luego tuvo una reconstrucción mejorada desde cero para Vue 3 con agrupación, flujos de promesas y temas personalizados — y un port nativo a Flutter de esa implementación en Vue.",
        },
    },
};

export const t = <K extends keyof Messages>(key: K): Messages[K] => messages[locale.value][key];
