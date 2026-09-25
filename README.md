# Concentric website — release build

This build preserves the approved Concentric visual direction while tightening alignment, responsiveness and interaction.

## Interaction included
- one-session brand intro on the homepage
- auto-cycling + hover/focus/click hero Council orbit
- hover/focus/click Council-seat explainer
- keyboard-accessible Edition One tabs
- animated research accordion
- scroll progress and restrained reveal motion
- mobile navigation and responsive layouts
- reduced-motion support

## Fonts
Licensed font binaries are intentionally not included. Keep your existing licensed Recoleta / Neue Montreal font files in `assets/fonts/`, or update the `@font-face` references in `styles.css` to your current hosted font URLs.

## Apply / Airtable
The browser submits to `/.netlify/functions/apply`. Keep the Airtable token in Netlify environment variables, never in client code.

Required Airtable fields: First name, Last name, Email, Based, Navigating, Submitted.
