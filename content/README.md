# Vendored docs

These are copies of each source repo's docs, not the source of truth:

- `vue/en/*.md`, `vue/es/*.md` ← `sileo-vue/docs/*.md`, `sileo-vue/docs/es/*.md`
- `flutter/en/*.md` ← `sileo-flutter/doc/*.md` (no Spanish translation upstream yet)

## Re-syncing after an upstream docs change

```bash
# from this repo's root, with sileo-vue and sileo-flutter checked out as siblings
cp ../sileo-vue/docs/*.md content/vue/en/
cp ../sileo-vue/docs/es/*.md content/vue/es/
cp ../sileo-flutter/doc/*.md content/flutter/en/
```

Then check `src/docs-content/index.ts` — if a slug was added or removed upstream, update the per-framework list (and its `title`/`desc` in both locales) there too.
