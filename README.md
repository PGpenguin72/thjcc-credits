# THJCC Credits

## Run locally

```bash
pnpm install
pnpm dev
```

## Current implementation

- Public Total Credits index with search and Edition / Group / Position filters.
- Per-edition grouped Credits, Sponsors, shareable contributor detail panel, and mobile bottom sheet.
- Development previews for My Profile and Admin Settings, including AI JSON import validation.
- No production identity or data writes are enabled yet. PGID is only an SSO-flow reference; the actual login integration remains undecided.

## Data safety

`src/data.ts` only contains public-safe development records. The raw source CSV must not be committed or served. Replace development data only through the approved sanitized JSON import flow.

## License

MIT. The local `pokemon-cards-css` checkout is a separate GPL-3.0 reference project and is deliberately not included in this repository.
