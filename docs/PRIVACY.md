# Privacy and data model

Commonplace v0.3 is local-first.

## What leaves the browser?

Nothing in the application code.

There is:
- no account system
- no analytics SDK
- no API client
- no database connection
- no advertising
- no crash telemetry

## What is stored?

The Zustand persistence layer stores the journal library in browser local storage.

That includes:
- journal metadata
- cover settings
- pages
- canvas positions and styles
- uploaded page images as data URLs

Custom theme packs use a separate local-storage key. A custom pack can contain:
- a name, emoji and color
- references to built-in journal pieces
- up to eight personal images stored as data URLs

The custom-pack UI rejects individual images larger than 700 KB to reduce the chance of silently exhausting browser storage.

## Important limitation

Browser local storage is not built for an unlimited photo archive. Photo-heavy journals or several image-heavy custom packs may eventually hit the browser's storage quota.

The journal shelf includes explicit JSON backup/restore. A larger future version should move image blobs to IndexedDB while keeping structured journal metadata separate.

## Threat model

Commonplace does not encrypt journal data at rest. Anyone with access to the same unlocked browser profile may be able to inspect local application storage.

A future encrypted-journal mode should use a well-reviewed browser cryptography design rather than home-grown encryption.
