# Define Co. frontend (static site)

A ready-to-host static site. There's no build step. Upload the folder as-is to any static host.

## Files
- `index.html`: Homepage
- `about.html`, `training.html`, `resources.html`, `trade-show-playbook.html`, `marketers-audit.html`
- `support.js`: the page runtime. It must stay beside the pages.
- `image-slot.js`: powers the empty image placeholders
- `assets/`: all 18 optimized images

## For Claude Code: Wix Headless setup
1. Host this folder on a static host (Netlify, Vercel, Cloudflare Pages, or GitHub Pages). Publish directory: the folder root. Build command: none.
2. In the Wix dashboard, open **Add a link to your frontend** and paste the hosted URL.
3. Connect defineco.studio to the host, and keep Wix for the back end.
4. **Forms:** done. See the Forms section below.
5. Check that every internal link works. They're relative links between the .html files.

## Where it lives
- Hosted on GitHub Pages from the `site/` folder of this repo. `.github/workflows/pages.yml` redeploys on every push to `main` that touches `site/`.
- Live URL: https://emilychristinehamilton-alt.github.io/defineco-site/

## Forms
`wix-forms.js` sends every form to Wix Forms on the Define Co. Wix Headless project (client ID `c9020b8c-7ca9-41e4-8704-3838fdac3f86`). It gets an anonymous visitor token, then creates a submission. Each submission creates or updates a contact.
- Homepage, Trade Show Playbook, and Marketer's Audit forms go to **Define Co. — Contact** (`a55208ab-0b1a-4e30-bbb7-dc63ccb299a2`).
- The training form goes to **Define Co. — Training Inquiry** (`c360f625-0a5a-457c-91a5-dec51d0d6704`).
- The page input names map to the Wix field keys in the `FORMS` table at the top of `wix-forms.js`. If you rename a field in Wix, update that table.
- Required fields use `required="required"`. The page runtime reads `required=""` as off.

## Speed
18 images, about 1.5MB across all six pages. Below-the-fold images lazy-load. Fonts load from Google Fonts with display=swap.
