# Working on rahi-web

Everything a fresh session needs to pick this up. Read this before changing the
build, the deploy, or anything that animates.

---

## 1. What this is

The public marketing site for Rahi — [drivewithrahi.com](https://drivewithrahi.com).

**Deliberately a separate repo from `driving-recorder`.** The dashboard in that
monorepo holds service-role database credentials; a public site must never share
a blast radius with it.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export -> out/
```

---

## 2. Deploy chain

```
push to main
  → .github/workflows/deploy.yml
  → npm ci && npm run build   (Next.js static export)
  → out/
  → actions/upload-pages-artifact
  → actions/deploy-pages
  → GitHub Pages
  → apex domain drivewithrahi.com
```

Pages source is **GitHub Actions**, not "deploy from branch". There is no
`gh-pages` branch and `out/` is never committed.

### `public/CNAME` is load-bearing

It contains `drivewithrahi.com` and is copied into `out/` on every build. Delete
it and Pages drops the custom domain on the next deploy, and the site 404s.

### Domain + DNS (GoDaddy)

The domain is registered at GoDaddy; hosting is GitHub Pages. GoDaddy is **only
a registrar here** — no GoDaddy hosting product is involved.

DNS records to set in **GoDaddy → My Products → drivewithrahi.com → DNS →
Manage DNS**. Delete GoDaddy's parked `A` @ record and parked `www` CNAME first.

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | pulsar666.github.io |

Then:

```bash
# already done once; re-run only if the domain is reset
gh api -X PUT repos/pulsar666/rahi-web/pages -f cname=drivewithrahi.com

# only AFTER dns resolves — 404s with "certificate does not exist yet" before that
gh api -X PUT repos/pulsar666/rahi-web/pages -f cname=drivewithrahi.com -F https_enforced=true

# verify
dig +short drivewithrahi.com A
```

**Do not add `basePath`.** On `pulsar666.github.io/rahi-web/` the CSS and fonts
404 because the site is built for the apex domain. That is correct and resolves
itself once DNS lands. Adding `basePath` would break the apex deploy.

---

## 3. Static export — what you cannot do

`output: 'export'` means **there is no server at runtime**:

- no API routes, server actions, middleware, ISR
- `images: { unoptimized: true }` is **required** or the build fails
- anything dynamic runs in the browser or is baked in at build time

### Live stats from Supabase

Do **not** query Supabase from the browser — that ships a credential to every
visitor, and the service-role key (full read of every user's trips) is
categorically out.

Two acceptable options:

1. **Build-time snapshot (preferred).** Query during `next build`, bake numbers
   into the HTML. A scheduled Action can rebuild nightly.
2. **One pre-aggregated public endpoint** — a Supabase edge function or
   `security definer` RPC returning totals only, never rows.

Either way: filter `dominant_pattern IS DISTINCT FROM 'not_a_drive'` **at the
source CTE**. Rejected recordings are listed in the app but must never be
counted; skipping this overstates your own numbers.

### If you later need a server

Move to **Cloudflare Pages + Functions** — same static model, adds serverless
endpoints on the same deploy, and a faster CDN in India. That's the migration
path for a web app, share links, or a live hazard map.

---

## 4. Brand parity with the Android app

The site and the app must read as one product.

| Thing | Source of truth | Mirrored here |
|---|---|---|
| Palette | `app-rahi/.../ui/theme/Color.kt` (`RahiPalette`) | `src/app/globals.css` |
| Typeface | `app-rahi/src/main/res/font/sora_*.ttf` | `public/fonts/sora-*.woff2` |
| Wordmark | `app-rahi/src/main/res/drawable/header_logo.xml` | `src/components/Wordmark.tsx` |

- Dark: lime `#7EE640` on pure black. Light: burnt orange `#E8742C` on `#F8F8F6`.
  **If the app's palette moves, move these together.**
- The wordmark uses the app's vector paths **verbatim**. It is filled *and*
  stroked in the same colour because the letterforms are thin and need the
  weight. Don't re-trace it; copy `pathData` across.
- Colour comes from `currentColor`, so one copy serves both themes.

**Unresolved:** the reference boards in `~/Downloads/rahi-website/` show a
different mark (a lime "R" monogram, one variant with a mountain in the "A")
than the app's wordmark. Decide which is canonical before the full build.

---

## 5. The page

The landing page is a **vertical editorial scroll**: full-bleed photography
sections with copy carved out of the shade, one shared horizontal grid
(`--pad`), and a floating section-by-section scroll cue (`ScrollCue.tsx`).
It replaced the earlier horizontal deck (`Deck.tsx` is retired but kept in
`src/components/` for reference).

`page.module.css` is ONE consolidated stylesheet with design tokens on
`.page` (`--accent`, `--line`, `--ink-*`, `--pad`, `--gold`). Rules to keep:

- **Never stack override passes.** Edit the rule in place; the file has been
  flattened once already and layered passes are how misalignment creeps in.
- **Type floors:** 9px minimum on desktop, 8px on phones.
- The tier metals (bronze/silver/gold/diamond) are the only non-brand
  colours, and only inside the rank graphic.
- On phones (portrait media block) every section is tuned to fit one
  screen — check 1440×900 AND ~500×850 before shipping.

Headless-Chrome notes: `--virtual-time-budget` screenshots can miss
JS-driven state (use `--timeout=6000` wall-clock waits); window width clamps
at ~500px while saving the requested size, so a 390px capture looks
right-clipped — tool artifact. To screenshot one section, inject
`main>section{display:none!important}main>section:nth-of-type(N){display:flex!important}`
into a copy of `out/index.html`.

## 6. Performance contract

The brief was "pristine and very high quality" **and** "must run smoothly on
normal phones and laptops". Those pull against each other, so the budget below
is a contract, not a suggestion. It is also commented into `page.module.css`.

- **Animate `transform`, `opacity` and `stroke-dashoffset` only.** Never
  `width`, `height`, `top`, `margin` or `box-shadow` — they force layout or
  paint every frame and are what make a site janky on mid-range hardware.
- **No `backdrop-filter`.** The most expensive common CSS effect. The "glass"
  look here is a translucent background colour — equivalent on a dark ground,
  and free.
- **No SVG blur filters on animated elements.** The route glow is two stacked
  translucent strokes, *not* `feGaussianBlur`. A blur filter re-rasterises the
  whole SVG every frame while the line animates; on a budget Android phone that
  alone drops the hero to ~20fps.
- **`pathLength={1}`** on any path that draws itself, so a single
  `stroke-dashoffset: 1 → 0` works regardless of the path's real length.
- **Fonts are WOFF2** (300KB → 115KB). Preload only the two above-the-fold
  weights; preloading all five competes with CSS/JS and makes first paint later.
- **Keep infinite animations rare.** Currently three small SVG circles and one
  dash offset. Everything else runs once and settles to zero CPU.
- One shared easing curve — `cubic-bezier(0.22, 1, 0.36, 1)` — so the page feels
  like one hand made it.
- `prefers-reduced-motion` is honoured globally in `globals.css`. An animated
  tour is exactly the content that triggers vestibular disorders; don't bypass it.

### Keyframes and CSS Modules

`@keyframes` referenced from **inline styles in SVG components** must live in
`globals.css`, not a `.module.css` — CSS Modules mangle keyframe names and the
inline reference would silently resolve to nothing.

---

## 7. The privacy page

`/privacy` is deliberately plain, animation-free and JS-light. It is the page
Play reviewers and regulators open, and it must render instantly and completely
without waiting on a bundle. **Do not add motion to it.**

Policy text's source of truth is `backend/legal/privacy-policy.md` in the
`driving-recorder` repo. Edit there first, then mirror.

⚠️ The live Play Console listing still points at
`https://pulsar666.github.io/rahi-privacy/`. **Do not switch the console field
while production access is under review** — changing listing fields mid-review
restarts clocks. Switch during a deliberate listing update after access lands.

The policy also has known drift from the app's actual behaviour (it claims
microphone and physical-activity permissions the manifest does not have, and
understates what crash reports carry). Fix that in `driving-recorder` before the
first open-testing release.

---

## 8. Reference material & imagery

42 concept boards live in `~/Downloads/rahi-website/`. Consistent language:

- dark base, lime accent
- **real Indian road photography** with a dark gradient overlay
- floating cards with lime hairline borders and a soft glow
- glowing route lines with waypoint pins
- sparkline charts, big percentage deltas

### `public/images/` provenance

The four photos on the landing page (`city`, `valley`, `beach`, `dusk`) are
**crops of those AI-generated concept boards** — clean photographic regions cut
out with ffmpeg, avoiding the boards' baked-in text and UI. They are
placeholders with the right mood, not real captures. When real trip photography
exists (the app records video; stills from real drives are the honest version),
swap these in place and keep the filenames — the page's captions and layout
don't need to change.

Two crops keep a small piece of baked-in board art *on purpose*: `beach.jpg`
has a lime HUD timestamp (reads as dashcam footage) and `dusk.jpg` has a lime
route line on the road (it IS the product's motif). Don't clone them out.

Keep photos as framed cards, not full-bleed backdrops — the crops are only
~450–650px wide, which is sharp inside a card and soft stretched across a hero.
