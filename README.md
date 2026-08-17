# Commonplace

**A tactile, local-first digital junk journal for people who want a diary to feel handmade.**

Commercial digital journals often optimize for consistency: streaks, reminders, templates, dashboards, and metrics. Commonplace optimizes for something else: *wanting to return to the page*.

It is a browser-based scrapbook diary where every journal has a customizable cover and every page can be plain, ruled, dotted, or gridded. Users can write in multiple voices, layer photos with torn paper, add stickers and washi tape, rotate and resize scraps, lock finished background pieces, and export finished pages as PNGs.

Commonplace deliberately has no streak counter, no word-count goal, no social feed, and no account requirement in v0.1.

## What it does

- **Journal shelf** with multiple journals and custom covers
- **Cover designer** with original patterns, palettes, motifs, and book-like previews
- **Per-page paper choice:** plain, ruled, dotted, or grid
- **Six paper tones** from ivory to lavender
- **Freeform page canvas** with drag, resize, rotate, layer, duplicate, lock, and delete
- **Text styling** with handwriting, serif, literary, rounded, clean, and typewriter voices
- **130+ original decorative assets** across stickers, washi, torn papers, ephemera, and stamps
- **Ephemera drawer** with fictional tickets, library cards, postcards, receipts, map fragments, astronomy charts, photo strips, and more
- **Photo uploads** stored locally with the journal
- **Undo / redo**
- **Autosave to the browser**
- **Focus mode** that removes the editor chrome
- **Calm mode** that keeps performance-like feedback out of the experience
- **Optional Reflect deck** with low-pressure prompts for noticing, emotion vocabulary, perspective, values, memory, and closure
- **Feeling palette** for more precise emotion words without mood scores or diagnoses
- **PNG export** for finished pages
- **JSON backup / restore** for the whole journal shelf
- **No analytics or cloud account** in v0.1

## Why the interface works this way

Commonplace is designed around a few behavioral and cognitive principles rather than around engagement metrics:

1. **Progressive disclosure.** Writing, decoration, paper, photos, and element inspection live in separate surfaces. The page does not show every control at once.
2. **External cognition.** Position, overlap, rotation, grouping, and visual salience are treated as meaningful parts of journaling rather than flattened into a text document.
3. **Recognition over recall.** Decorative materials are presented visually, with categories and search, instead of requiring users to remember commands.
4. **Low-pressure re-entry.** There are no streaks or missed-day warnings. A blank page is explicitly treated as a valid state.
5. **Autonomy.** Users can change the paper beneath an existing collage without losing their work, and can lock settled elements while continuing elsewhere.
6. **Memory cues.** Photos, ephemera-like scraps, stamps, and visual clusters support cue-rich pages rather than chronological text only.
7. **Forgiveness.** Undo/redo, autosave, duplicate, and non-destructive styling make experimentation cheap.

See [`docs/PSYCHOLOGY.md`](docs/PSYCHOLOGY.md) for the full design rationale and [`docs/REFERENCES.md`](docs/REFERENCES.md) for the research references behind the broad interaction principles.

## Screens

### Shelf

A quiet library-like home screen showing journals as tactile covers rather than generic dashboard cards.

### Cover designer

Choose a palette, cover texture, and emblem before opening the journal. The cover is not metadata; it is part of the object.

### Page editor

The editor has five primary tools:

- **Write** — add a text fragment and style its voice
- **Decorate** — stickers, washi, scraps, and stamps
- **Paper** — page pattern and tone
- **Photos** — local image uploads
- **Reflect** — optional psychology-informed prompts with no scoring, diagnosis, or forced positivity

Select anything on the page to reveal its inspector. Unselected tools stay out of the way.

## Tech

- React + TypeScript
- Vite
- Konva / react-konva for the tactile canvas
- Zustand persistence for local-first journal state
- `@fontsource` packages for bundled offline fonts
- Vitest for model and catalog tests
- GitHub Actions for typecheck, tests, and production build

## Run locally

Requires Node 22+.

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Verify

```bash
npm run check
```

That runs:

```text
typecheck
tests
production build
```

## Repository structure

```text
Commonplace/
├── .github/workflows/ci.yml
├── docs/
│   ├── DESIGN.md
│   ├── PSYCHOLOGY.md
│   ├── PRIVACY.md
│   ├── REFERENCES.md
│   └── ROADMAP.md
├── src/
│   ├── components/
│   ├── data/assets.ts
│   ├── data/extraAssets.ts
│   ├── data/reflectionPrompts.ts
│   ├── store/useJournalStore.ts
│   ├── tests/
│   ├── utils/model.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles.css
│   └── types.ts
├── index.html
├── package.json
└── vite.config.ts
```

## Asset policy

All starter stickers, washi patterns, paper scraps, ephemera, and stamps are original SVGs defined in the repository. The ephemera are intentionally fictional: no real ticket, receipt, newspaper, postal, or brand artwork is copied. They use familiar physical craft motifs—flowers, tape, paper, labels, stars, books—but are not copied from Pinterest images, commercial sticker packs, or other journal applications.

Pinterest and physical junk-journal culture were used only as broad interaction and material-language inspiration.

## Privacy

Commonplace v0.1 is local-first:

- no login
- no analytics
- no remote database
- no advertising SDK
- no server upload

Journal state is persisted in browser storage. Large photo-heavy journals can eventually hit browser-storage limits, which is why the UI includes library backup/export. See [`docs/PRIVACY.md`](docs/PRIVACY.md).

## Scope

Commonplace is not trying to reproduce every feature of Canva, Goodnotes, Notion, or a professional illustration editor. The aim is narrower: make freeform personal journaling feel delightful without making the user manage a design application.

## Roadmap

The next serious features would be:

- IndexedDB-backed media storage for larger photo journals
- freehand pencil / highlighter / eraser
- reusable page spreads
- optional password-encrypted local journals
- printable two-page PDF export
- keyboard nudging and stronger accessibility
- user-made sticker packs
- local font import
- PWA install / offline shell

See [`docs/ROADMAP.md`](docs/ROADMAP.md).

## License

MIT.
