# Visual and interaction system

## Product feeling

Commonplace should feel like opening a small craft drawer beside a notebook:
soft paper, tiny objects, imperfect rotations, warm shadows, clear controls.

It should **not** feel like:
- a corporate dashboard
- a template marketplace
- a social media composer
- a productivity database
- a clone of a professional design suite

## Design tokens

Core visual family:
- ivory paper
- sage
- dusty rose
- lavender
- powder blue
- warm kraft
- charcoal-brown ink

Typography:
- Playfair Display — journal/object titles
- Source Serif 4 — reflective/help copy
- DM Sans — UI
- Nunito — soft alternative UI/text
- Caveat — handwriting
- Space Mono — typewriter/metadata

Fonts are bundled through `@fontsource` rather than loaded from a remote font CDN.

## Tactility

Tactility is created with:
- book-spine shading
- offset paper shadows
- slight rotations
- torn SVG edges
- translucent tape
- paper-colored panels
- restrained animation

The interface does not simulate photorealistic paper fibers. That would add visual noise and potentially reduce text contrast.

## Layout

Desktop v0.1:

```text
┌───────────────────────────────────────────────────────────┐
│ topbar: journal · undo · saved · calm · focus · export   │
├──────┬───────────────┬──────────────────────┬─────────────┤
│pages │ tool + drawer │      page canvas     │ inspector   │
└──────┴───────────────┴──────────────────────┴─────────────┘
```

The tool drawer has stable top-level verbs. Contextual details live in the inspector.

## Original asset library

The starter asset library is intentionally code-native SVG.

Benefits:
- no remote requests
- crisp scaling
- tiny repository size
- easy recoloring / extension
- clear provenance
- safe PNG export

## Accessibility direction

v0.1 includes:
- visible keyboard focus
- labelled icon buttons
- text labels alongside important icons
- strong foreground/background contrast for primary UI
- reduced dependence on color alone for selection

Still needed:
- full keyboard canvas manipulation
- announced selection state
- alternative list editing for canvas objects
- reduced-motion preference handling
