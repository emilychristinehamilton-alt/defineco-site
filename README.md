# Define Co. — defineco.studio

Design source for the Define Co. website: working HTML prototypes the live Wix site is built from.

## Pages
- `index.dc.html` — Homepage
- `about.dc.html` — About / My Story
- `training.dc.html` — Inquire About Training (form)
- `resources.dc.html` — Resources library (never gated)
- `trade-show-playbook.dc.html` — The Non-Negotiable Trade Show Playbook
- `marketers-audit.dc.html` — The Overwhelmed Marketer's Audit (interactive, scores live)

`support.js` and `image-slot.js` must sit beside the pages.

## Speed
- Every image is resized to its display size and compressed. 18 images, 1557KB total across all six pages.
- Below-the-fold images use `loading="lazy"` and `decoding="async"`. The hero images and logos load right away.
- Fonts come from Google Fonts with preconnect and `display=swap`, so text shows immediately.
- When rebuilding in Wix, upload these exact files from `assets/`. Wix will also serve them as WebP automatically.

## Design tokens
Ivory #F3EFE6 · Taupe #C9C0B2 · Forest #354C41 · Ink #21221F · Cordovan #6B2F2B · Playfair Display (headlines) + Montserrat (body) · 2px radius

## Still open
- All contact and training forms need to be connected to an inbox. They don't submit yet.
- Resource card images for the Playbook and the Audit, and the Playbook header image, are empty placeholder slots.
- Service detail pages don't exist yet, so the service cards and footer items are intentionally unlinked.
- The GLADA logo still includes its small tagline. Ask GLADA for vector artwork.
