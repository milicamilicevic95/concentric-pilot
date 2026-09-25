# Concentric website v3

Static Netlify site with a secure Airtable-backed application form.

## Fonts
Add the licensed font files to `assets/fonts/` using the filenames listed in `assets/fonts/README.txt` before deployment. Font binaries are intentionally excluded from this handoff.

## Airtable
The application form posts to `/.netlify/functions/apply`.

Set these Netlify environment variables:
- `AIRTABLE_PAT` — Airtable personal access token with create-record permission for the target base/table.
- `AIRTABLE_BASE_ID` — optional; defaults to `appDhFT8ijd9EofI4`.
- `AIRTABLE_TABLE_ID` — optional; defaults to `tblAXeR08XGjKsF5y`.

The function currently writes these Airtable field names exactly:
- `First name`
- `Last name`
- `Email`
- `Based`
- `Navigating`
- `Submitted`

If the actual Airtable column capitalization differs, edit the keys in `netlify/functions/apply.js` before deployment.
