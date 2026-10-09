# Define Co. frontend (static site)

A ready-to-host static site. There's no build step. Upload the folder as-is to any static host.

## Files
- `index.html`: Homepage
- `about.html`, `resources.html`, `trade-show-playbook.html`, `marketers-audit.html`
- Service pages: `brand-messaging.html`, `social-strategy.html`, `trade-show-strategy.html`, `website-strategy.html`, `ad-strategy.html`, `training.html`
- `forms.js`: sends the forms to Formspree
- `support.js`: the page runtime. It must stay beside the pages.
- `image-slot.js`: powers the empty image placeholders
- `assets/`: images, share images, and icons
- `sitemap.xml`, `robots.txt`, `404.html`

## Where it lives
- Hosted on GitHub Pages from the `site/` folder of this repo. `.github/workflows/pages.yml` redeploys on every push to `main` that touches `site/`.
- Live URL: https://www.defineco.studio/ (DNS at GoDaddy, HTTPS enforced)
- Google Analytics 4: `G-NJ4FXRKRLF`, on every page. Successful form submits also fire a `generate_lead` event.

## Forms
`forms.js` posts each form to Formspree with fetch, so visitors stay on the page. Formspree emails the submission to emily@defineco.studio.
- Contact form (homepage, the five strategy pages, Trade Show Playbook, Marketer's Audit): `https://formspree.io/f/mkjorkkk`
- Training form (`training.html`): `https://formspree.io/f/mwlvoaaz`
- Fields are sent with their page input names, plus `page` (where it came from) and `_subject`.
- On success the contact forms swap to a "Message received." card and the training form to "Inquiry received." On failure an alert box shows Emily's email and phone, and the form keeps what was typed.
- Required fields use `required="required"`. The page runtime reads `required=""` as off.

## Speed
Below-the-fold images lazy-load. Fonts load from Google Fonts with display=swap.
