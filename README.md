# rahi-web

Marketing site for **Rahi** — [drivewithrahi.com](https://drivewithrahi.com).

Next.js static export, deployed to GitHub Pages by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to
`main`.

## Local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export -> out/
```

## Constraints

**This is a static export.** There is no server at runtime: no API routes, no
server actions, no middleware, no ISR, and `next/image` optimization is off
(`images.unoptimized`). Anything dynamic has to run in the browser or be baked
in at build time.

**Live stats need care.** Pulling fleet numbers from Supabase in the browser
would mean shipping a credential to every visitor — the service-role key is
categorically out. Query at build time and bake the numbers in, or expose a
single pre-aggregated public endpoint. Either way filter
`dominant_pattern IS DISTINCT FROM 'not_a_drive'` at the source, or the numbers
overstate reality (rejected recordings are listed but must never be counted).

**`public/CNAME` is load-bearing.** It carries the apex domain into `out/` on
every build. Delete it and Pages drops the custom domain on the next deploy.

## Theme

Colours in [`globals.css`](src/app/globals.css) are the same tokens as the
Android app's `RahiPalette` (`app-rahi/.../ui/theme/Color.kt`) — dark is lime on
pure black, light is warm off-white with burnt orange. The typeface is **Sora**,
self-hosted from `public/fonts/` (copied from the app's `res/font/`). If the
app's palette moves, move these together.

## Privacy policy

`/privacy` is deliberately plain and animation-free — it is the page Play
reviewers open, and it must render instantly.

The source of truth for policy text is `backend/legal/privacy-policy.md` in the
`driving-recorder` repo. The live Play Console listing currently points at
`pulsar666.github.io/rahi-privacy`; **do not switch the console field while
production access is under review.**
