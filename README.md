# Concentric website — final rebuild

Static HTML/CSS/JS site for Netlify.

## Airtable
The Apply form posts to `/.netlify/functions/apply` and writes to base `appDhFT8ijd9EofI4`, table `tblAXeR08XGjKsF5y`. Set `AIRTABLE_PAT` in Netlify environment variables. Expected Airtable fields: `First name`, `Last name`, `Email`, `Based`, `Navigating`, `submitted`.

## Fonts
The CSS references the licensed Recoleta and Neue Montreal font filenames from the existing project. Font binaries are intentionally not included in this handoff. Keep the licensed files in `assets/fonts/` in your deployed project.
