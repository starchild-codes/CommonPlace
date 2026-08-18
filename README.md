# Commonplace

**A local-first digital junk journal that is allowed to be a little ridiculous.**

Commonplace is for the page with a photo, three lines of writing, a train ticket, two pieces of tape, a wax seal and a sticker that has absolutely no practical reason to be there.

It is a browser-based scrapbook diary with customizable covers, plain/ruled/dotted/grid paper, draggable journal pieces, photos, styled text, theme packs, reflection prompts and a tiny candle you can light because apparently that matters. It does.

There are no streaks, word-count goals, “you missed a day” notifications, social feeds or mood scores.

## What is in v0.3

- **Journal shelf** with multiple journals and custom covers
- **Cover designer** with palettes, textures and little emblems
- **Plain, ruled, dotted and grid pages**
- **Six paper colors**: ivory, white, blush, sage, lavender and sky
- **Freeform canvas** with drag, resize, rotate, layer, duplicate, lock and delete
- **Six bundled writing voices** from handwritten to typewriter
- **245 original built-in craft assets**
- **Stickers, washi, torn paper, ephemera, stamps and wax seals**
- **20 wax seals** in colors from rose and lavender to midnight, cricket green and cosmic blue
- **29 built-in theme packs** across story vibes, aesthetics, hobbies, places, sports and colors
- **Custom theme-pack maker** for extremely specific obsessions
- **Up to 40 built-in pieces + eight small personal images per custom pack**
- **Reading, travel, space, ocean, city, cricket, football, dark academia, fairycore and color packs**
- **Story-vibe packs** such as Wizard School After Dark, Silver & Green, Golden & Kind, Brilliant Bookworm, Midnight Diary, Coastal Summer, Apartment Hangout and Young Genius Desk
- **Photo uploads** that stay with the local journal
- **Optional prompt deck** for when your brain has nothing useful to say to “dear diary”
- **Feeling-word palette** with no mood score attached
- **Candle corner** with eight pretend scents and an animated flame
- **Undo / redo**
- **Autosave in the browser**
- **Focus mode**
- **PNG page export**
- **JSON backup / restore** for the whole shelf

## Theme packs

The Theme Packs tab is basically a shortcut through the giant craft drawer.

Pick **Space Dreamer** and you get observatory scraps, planets, night-blue tape, cosmic wax and starry pieces. Pick **Cricket Day** and you get match stubs, green tape, score-card bits and sport-themed seals. Pick **Pink Everything** and the design brief is, very seriously, “pink.”

Built-in packs are original atmosphere packs. They do not ship copyrighted character art, actor photos, show logos, team logos or celebrity likenesses.

For fandoms, favorite characters, players, inside jokes, cities, specific books, or one weirdly exact aesthetic, use **Make your own pack**. A custom pack can be named anything, can collect built-in pieces, and can hold a few personal images. Those packs stay in the browser.

See [`docs/THEME_PACKS.md`](docs/THEME_PACKS.md).

## Why it is designed like this

Commonplace tries to make the start of a page easy without turning journaling into a performance.

- **Small tool surfaces:** writing, paper, photos, decoration, themes and prompts live in separate tabs instead of throwing every control at the user at once.
- **Visual grouping:** theme packs make hundreds of objects easier to browse by giving them recognizable contexts.
- **Spatial memory:** overlap, position, rotation and grouping stay part of the page instead of being flattened into a text document.
- **Cheap experimentation:** undo/redo, autosave, duplicate and non-destructive styling make it safe to mess around.
- **No re-entry guilt:** a journal can sit untouched for weeks. Nothing scolds you when you come back.
- **Optional reflection:** prompts are there when useful and ignorable when not. No diagnosis, treatment claim or forced gratitude exercise.

The evidence and limits are documented in [`docs/PSYCHOLOGY.md`](docs/PSYCHOLOGY.md) and [`docs/REFERENCES.md`](docs/REFERENCES.md). The app itself keeps the research-y language out of the way.

## Editor tabs

- **Write** — type something and put it on the page
- **Bits** — stickers, tape, paper, ephemera, stamps and wax seals
- **Themes** — browse built-in packs or make your own
- **Paper** — choose the page pattern and paper color
- **Photos** — add local images
- **Prompts** — optional reflection questions and feeling words
- **Candle** — choose an imaginary scent and light the tiny candle

Select any page element to open its inspector for size, rotation, opacity, layering and text styling.

## Tech

- React + TypeScript
- Vite
- Konva / react-konva for the freeform page canvas
- Zustand for local journal persistence
- `@fontsource` packages for bundled fonts
- Vitest for model, asset, pack and data tests
- GitHub Actions for typecheck, tests and production build

## Run locally

Requires Node 22+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Verify

```bash
npm run check
```

That runs typecheck, tests and a production build.

## Repository structure

```text
Commonplace/
├── .github/workflows/ci.yml
├── docs/
│   ├── DESIGN.md
│   ├── PRIVACY.md
│   ├── PSYCHOLOGY.md
│   ├── REFERENCES.md
│   ├── ROADMAP.md
│   └── THEME_PACKS.md
├── src/
│   ├── components/
│   │   ├── ThemePackBrowser.tsx
│   │   ├── CandleTool.tsx
│   │   └── ...
│   ├── data/
│   │   ├── assets.ts
│   │   ├── extraAssets.ts
│   │   ├── themeAssets.ts
│   │   ├── themePacks.ts
│   │   ├── candles.ts
│   │   └── reflectionPrompts.ts
│   ├── store/useJournalStore.ts
│   ├── tests/
│   ├── utils/model.ts
│   ├── App.tsx
│   ├── styles.css
│   └── types.ts
├── package.json
└── vite.config.ts
```

## Asset policy

Built-in stickers, tape, paper, ephemera, stamps and wax seals are original SVGs defined in the repository. Fictional tickets, receipts and cards use familiar junk-journal material language without copying real commercial assets.

Commonplace does **not** bundle official franchise art, celebrity/player likenesses, studio imagery, team logos or commercial sticker packs. The custom-pack feature lets users add their own small personal images locally instead.

## Privacy

Commonplace is local-first:

- no login
- no analytics
- no remote database
- no advertising SDK
- no social feed

Journal state and custom packs live in browser storage. Photo-heavy journals and image-heavy custom packs can eventually hit browser storage limits, so the app includes backup/export and caps custom-pack image size.

See [`docs/PRIVACY.md`](docs/PRIVACY.md).

## Scope

This is not trying to become Canva with a diary icon taped onto it. The point is a smaller, warmer editor built around personal pages.

Future work includes larger IndexedDB-backed media storage, freehand drawing, printable spreads, encrypted local journals, stronger keyboard accessibility, local font import and a PWA/offline shell.

## License

MIT.
