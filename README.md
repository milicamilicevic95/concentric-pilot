# Concentric site

Full-site redesign. Brand colours are locked to #333A22, #F2EDE1 and #C2963C.

## Fonts
The CSS references the existing licensed Recoleta and Neue Montreal files at `/assets/fonts/Recoleta-RegularDEMO.otf` and `/assets/fonts/neuemontreal-bold.otf`. Font binaries are intentionally not included in this package. Keep the licensed font files in those paths on deployment.

## Application
The application posts to `/.netlify/functions/apply`. Set `AIRTABLE_PAT` in Netlify environment variables with write access to the configured Airtable base.
