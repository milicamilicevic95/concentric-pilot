# Concentric redesign v3

This build locks the brand palette to:
- Olive `#333A22`
- Cream `#F2EDE1`
- Gold `#C2963C`

## Fonts
The CSS expects the existing licensed brand fonts at:
- `assets/fonts/Recoleta-RegularDEMO.otf`
- `assets/fonts/neuemontreal-bold.otf`

Font binaries are intentionally not included in this package. Keep/copy the existing licensed font files in those paths when deploying.

## Logo
The header uses the supplied Concentric horizontal lockup. The footer uses the existing cream lockup for contrast on olive.

## Interaction
Homepage includes scroll reveal, progress indicator, animated scroll cue, interactive Council thinking sequence, research hover states, and responsive motion. `prefers-reduced-motion` is respected.
