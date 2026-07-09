// One-off: rasterizes public/og-image.svg to a real PNG. Not wired into the
// build — social-preview scrapers (Facebook, LinkedIn, Slack, etc.) render
// og:image far more reliably as a raster than as SVG, but the source stays
// SVG since it's easy to hand-edit. Re-run manually after editing the SVG.
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const SRC = fileURLToPath(new URL("../public/og-image.svg", import.meta.url));
const OUT = fileURLToPath(new URL("../public/og-image.png", import.meta.url));

const svg = await readFile(SRC);
await sharp(svg, { density: 144 }).resize(1200, 630).png({ quality: 90 }).toFile(OUT);
console.log(`[build-og-image] wrote ${OUT}`);
