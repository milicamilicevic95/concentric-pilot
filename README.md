# Concentric website

Standalone Netlify build.

## Brand system
- Olive: `#333A22`
- Cream: `#F2EDE1`
- Gold: `#C2963C`
- Heading font: Recoleta
- Body/UI font: Neue Montreal

Licensed font binaries are intentionally not included. Keep your existing licensed files in `assets/fonts/` with these filenames:
- `Recoleta-RegularDEMO.otf`
- `NeueMontreal-Regular.otf`
- `neuemontreal-bold.otf`

The site includes robust fallback fonts, so layout remains intact if a font file is temporarily unavailable.

## Application -> Airtable
The form submits to a Netlify Function and never exposes Airtable credentials in browser code.

Set this environment variable in Netlify:
- `AIRTABLE_PAT` — a Personal Access Token with record-write access to the Concentric base.

The integration targets:
- Base: `appDhFT8ijd9EofI4`
- Table: `tblAXeR08XGjKsF5y`

Expected Airtable fields:
- First name
- Last name
- Email
- Based
- Navigating
- Submitted

## Deploy
Publish directory: repository root (`.`).
Functions directory: `netlify/functions`.
