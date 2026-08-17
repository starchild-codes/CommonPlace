# Privacy and data model

Commonplace v0.1 is intentionally local-first.

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
- canvas positions/styles
- uploaded images as data URLs

## Important limitation

Browser local storage is not appropriate for unlimited photo collections. Photo-heavy journals may eventually exceed storage quotas.

The current mitigation is explicit JSON backup/restore.

A production-scale version should move image blobs to IndexedDB while keeping structured journal metadata separate.

## Threat model

Commonplace v0.1 does not encrypt journal data at rest. Anyone with access to the same unlocked browser profile may be able to inspect local application storage.

A future encrypted-journal mode should use a well-reviewed browser cryptography design rather than home-grown encryption.
