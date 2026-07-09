<div align="center">
  <h1>Sileo</h1>
  <p>Landing page + docs hub for the Sileo toast notification family.</p>
  <p><a href="https://alann-estrada-ksh.github.io/sileo-notifications/">Visit the site</a></p>
</div>

### What lives here

This repo is only the marketing site and docs viewer — no library source. It shows the same gooey-pill toast philosophy ported natively across frameworks:

- [sileo](https://github.com/hiaaryan/sileo) — the original, React, by [@hiaaryan](https://github.com/hiaaryan)
- [sileo-vue](https://github.com/alann-estrada-KSH/sileo-vue) — Vue 3
- [sileo_flutter](https://github.com/alann-estrada-KSH/sileo-flutter) — Flutter, on [pub.dev](https://pub.dev/packages/sileo_flutter)

The docs page has a framework switcher (Vue / Flutter) backed by vendored copies of each repo's docs under `content/`.

### Keeping docs in sync

`content/vue/{en,es}/*.md` and `content/flutter/en/*.md` are copies, not symlinks — this repo has its own git history independent of the library repos. When `sileo-vue/docs/**` or `sileo-flutter/doc/**` change, re-copy the changed files here and open a PR. There's no automated sync yet; see `content/README.md`.

### Local development

```bash
bun install
bun run dev
```

### Build

```bash
bun run build
```

Production builds use `/sileo-notifications/` as the base path for GitHub Pages project sites. `bun run dev` / `bun run preview` stay at `/`.
