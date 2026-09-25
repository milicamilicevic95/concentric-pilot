# Concentric — final locked build

Design direction: preserve the approved Concentric visual language (dark olive / cream / gold, Recoleta + Neue Montreal, editorial scale, circular Council imagery) while simplifying copy and making interaction purposeful.

## Deploy
- Publish directory: repository root (`.`)
- Netlify Functions: `netlify/functions`
- Environment variable required for application writes: `AIRTABLE_PAT`
- Optional overrides: `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_ID`

The function defaults to the Airtable base/table IDs supplied for the Applicant Pipeline link.

## Fonts
Licensed font binaries are intentionally not included. Add your licensed files under `assets/fonts/` using the filenames referenced in `styles.css`.

## Preserved routes
- `/research-report`
- `/journal/open-inquiry`
- `/journal/why-six`
- `/journal/the-neutral-zone`
- `/journal/several-selves`
- `/journal/the-room-full-of-women`

Journal article routes are preserved without inventing article bodies that were not supplied in the source package.
