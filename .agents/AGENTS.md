# Project Design Rules

## General Prohibitions (Strict)
- **Colors**: No purple or blue gradients.
- **Spacing**: No uniform padding or gaps (e.g., `p-6` or `gap-6`).
- **Layout**: No symmetric bento grids.
- **Assets**: No Lucide default icons, no emojis, no background blobs.
- **Enforcement**: Mandatory application of brand tokens and visual hierarchy in all work.

## Color & Gradients
- **No Gradients**: Strictly do not use purple, blue, or teal gradients.
- **Grayscale Base**: Use a strict grayscale color palette (shades of gray, white) with only one accent color.
- **Dark Neutral Background**: Use `#0A0A0E` as the primary dark neutral background.
- **Brand Accent Color**: Use `#F47920` as the brand accent color.
- **Buttons & CTAs**: Buttons and CTA elements must use only the accent color (`#F47920`).

## Layout & Structure
- **Asymmetric Layout**: Use asymmetric layouts instead of mirror symmetry.
- **Card Sizing**: Main card spans 2 rows (`3fr`), secondary cards are smaller (`2fr`).
- **No Perfect Bento Grids**: Avoid symmetric, perfectly aligned grids; introduce visual variety.
- **Visual Dominance**: Ensure exactly one element dominates the page or view visually.
- **No Mirror Symmetry**: Do not create layouts that mirror left-to-right or top-to-bottom.

## Spacing & Perceptual Rhythm
- **Non-uniform Spacing**: Avoid uniform padding (e.g., `p-6`).
- **Inner Padding**: Use smaller inner padding (`p-3`–`p-4`) to group related elements inside cards.
- **Outer Margins**: Use larger outer margins (`mt-12`–`mt-16`) to separate sections.
- **Tight Coupling**: Keep labels/titles and their associated body content tightly coupled (e.g., `gap-1`).
- **Generous Section Spacing**: Ensure generous space between distinct sections.

## Typography & Hierarchy (1.25x Modular Scale)
- **Label**: `12px` uppercase, tracked.
- **Body**: `18px` muted.
- **Subtitle**: `32px` weight 400.
- **H1**: `64px` weight 900.
- **Scale Constraints**: Each type hierarchy level must differ by at least `1.25x` in size, and no two font sizes can be within `4px` of each other.

## Assets & Icons
- **No Emojis or Blobs**: Do not use emoji icons, Lucide default icon packages, or background/decorative gradient blobs behind icons.
- **Icon Limits**: Maximum of 3 icons per section.
- **Custom SVGs**: Use custom SVG paths with `stroke-width="1.5"` and the brand accent color (`#F47920`) only.

## Visual Hierarchy & Testing
- **Dominant Element**: Exactly one dominant element per section (must be the largest, brightest, and contain the only filled CTA button).
- **Subordinate Elements**: All other items must be visually quieter.
- **Accent**: Use the single brand accent color (`#F47920`) exclusively for these actions.
- **Squint Test**: All designs must pass the squint test: the primary action must remain clearly visible when the page is blurred.

## Credentials & Deployment
- **Tokens Configuration**: Active credentials for deployments (Vercel, GitHub) are stored locally in the `.env` file in the workspace root.
- **Auto-Load**: Always read `VERCEL_TOKEN` and `GITHUB_TOKEN` from the `.env` file when performing deployments, pushes, or repository publishing tasks.
