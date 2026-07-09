// Refreshes src/generated/versions.json with the latest published version of
// each port before every build, so the version badges on the landing page
// stay accurate without a manual edit per release. Falls back to whatever
// is already committed in that file if a registry is unreachable (offline
// dev, registry hiccup) instead of failing the build.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const OUT_PATH = fileURLToPath(new URL("../src/generated/versions.json", import.meta.url));

const fetchJson = async (url) => {
    const res = await fetch(url, { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(`${url} responded ${res.status}`);
    return res.json();
};

const fetchVueVersion = async () => {
    const data = await fetchJson("https://registry.npmjs.org/@alann-estrada-ksh%2Fsileo-vue/latest");
    return data.version;
};

const fetchFlutterVersion = async () => {
    const data = await fetchJson("https://pub.dev/api/packages/sileo_flutter");
    return data.latest?.version ?? data.latest?.pubspec?.version;
};

const current = JSON.parse(await readFile(OUT_PATH, "utf8").catch(() => "{}"));

const [vue, flutter] = await Promise.all([
    fetchVueVersion().catch((err) => {
        console.warn(`[fetch-versions] npm lookup failed, keeping ${current.vue ?? "unknown"}: ${err.message}`);
        return current.vue ?? null;
    }),
    fetchFlutterVersion().catch((err) => {
        console.warn(`[fetch-versions] pub.dev lookup failed, keeping ${current.flutter ?? "unknown"}: ${err.message}`);
        return current.flutter ?? null;
    }),
]);

await writeFile(OUT_PATH, `${JSON.stringify({ vue, flutter }, null, 4)}\n`);
console.log(`[fetch-versions] vue ${vue} · flutter ${flutter}`);
