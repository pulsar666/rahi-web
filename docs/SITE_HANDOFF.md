# rahi-web — state of work, design language, and how to continue

Written 2026-08-15, after the polish/fit/DNA sessions. Read this + `CONTRIBUTING.md`
(deploy chain, static-export limits, brand parity) before touching anything.
`CONTRIBUTING.md` is the *rules*; this doc is the *state and intent*.

---

## 1. Where things stand — V1 freeze

**V1 was frozen on 15 August 2026.** The freeze includes the eight-screen Home
page, eight-screen founder-story About page, complete card-based Privacy Policy,
shared four-destination navigation, aligned Sora typography, lime brand tokens,
section cues, separators, and route/event motion. The commit containing this
handoff is the local V1 checkpoint; deployment remains a separate deliberate
step.

Live at `pulsar666.github.io/rahi-web` (CSS 404s there **by design** — the build
targets the apex domain; see CONTRIBUTING §2). **drivewithrahi.com still points
at GoDaddy parking IPs — the DNS records have never been applied.** That is the
single blocker between "done" and "live". Records + verification commands are in
CONTRIBUTING §2; after propagation, re-run the `https_enforced=true` call.

Commit arc (all on `main`, every one deployed green):

| commit | what |
|---|---|
| `5c32c6e`…`d96ad95` | early placeholder → horizontal deck era (retired) |
| *(original user redesign)* | vertical editorial scroll, new AI hero imagery, ScrollCue |
| `1c8269f` | **polish overhaul**: 5 stacked CSS passes flattened into one tokened stylesheet; score/badge block rebuilt; BadgeShield component |
| `0bda02c` | deterministic section snapping + first readability pass (49 sizes raised) |
| `9f66410` | dead-press fix (48px NEAR tolerance) + arrows work when cue has focus |
| `47b6eca` | **every section = exactly one screen** (all viewports); phone hero telemetry into flow; dial 120/100px |
| `d86db61` | `allowedDevOrigins` (phone-on-LAN hydration) + sensor-truthful coaching copy |
| `34c438a` | **"Your driving has a DNA" section** (board #40 fingerprint art); gauge-style arc |
| `2c21250` | dial label moved below the ring — text can never overlap the stroke |
| *(V1 freeze; this handoff)* | About, shared navigation, Home animation/alignment overhaul, complete card-based Privacy page |

Dev server: `npm run dev -- --hostname 0.0.0.0` in `~/projects/rahi-web`, phone
review at `http://<mac-ip>:3000` (V1 was reviewed at 192.168.1.6; if it changes, update
`allowedDevOrigins` in `next.config.ts` or hydration silently dies on the
phone and **every button does nothing** — that exact bug cost a session).

---

## 2. The page (top to bottom)

Eight `<section>`s + footer, each **exactly one viewport tall** (see §4):

1. **Hero** — Himalayan road image, "Know your drive. *Own the next one.*",
   CTA pair, LIVE DRIVE telemetry card (absolute desktop; in-flow under the
   CTAs on portrait — it used to overlap them), grid overlay fading right.
2. **Intro / rank** (`#how`) — "Not a dashboard full of numbers." Score dial
   (87/100, gauge arc, label *below* the ring) + Hawk example badge (shared
   `BadgeShield`) | tier track Bronze→Silver→Gold→Diamond with progression
   line; three numbered pillars.
3. **Portrait** — "One drive. More than a score." + score bars + framed
   mountain-road image with DRIVER PORTRAIT caption chip.
4. **DNA** — "Your driving has a *DNA.*" (STYLE, NOT SKILL) + five trait
   chips (Pedal work / Cornering / Consistency / Pace / Anticipation) +
   fingerprint-of-lane-markings art (`public/images/dna.jpg`, cropped from
   board #40, radial-mask edge blend).
5. **Coach** — monsoon city image, "Your coach changes as you do.", quote
   blockquote. **Copy rule: sensors only — never imply Rahi can see
   (no "truck ahead"). It measures motion, not video.**
6. **Roads** (`#roads`) — "Every drive makes the road smarter…", ghat image
   with ROUGH PATCH AHEAD chip, three relay steps with drawn long-tail
   arrows (the pothole → memory → next-driver story).
7. **Memories** — photo rail (city / beach / dusk crops) with caption chips.
8. **Final CTA** — "Drive for the one behind you." + early-access mailto.
   Footer: wordmark, DRIVE · SCORE · IMPROVE, Privacy/Contact.

Navigation: `SiteHeader.tsx` is shared by Home, About, and Privacy, with the
same Home, About us, Privacy policy, and early-access destinations on all three
pages (an accessible compact menu on phones). `ScrollCue.tsx` provides
fixed bottom-centre up/down buttons + ArrowUp/Down/PageUp/Down on both editorial
pages. Index-based section snapping; **48px `NEAR`
tolerance** is load-bearing (trackpad-grazes cancel smooth scrolls a few px
short; a tight tolerance made the next press a dead 10px nudge). While a
smooth scroll is in flight, presses step from the *pending* target.

`/about/` is the non-technical founder story: eight one-viewport chapters from
the 2021 Kalyani–Kolkata drives through the first beta community. It carries
the poster language through its own non-overlapping asset set (`about-*.jpg`)
and includes code-native animated route/network graphics. Do not reuse Home
imagery or turn About into a second product-feature page. Like Home, every
direct section must remain exactly one viewport at the five verified sizes
below.

`/privacy/` mirrors `driving-recorder/backend/legal/privacy-policy.md`. It is a
complete, static, animation-free document: editorial hero, sticky contents card,
11 individual policy cards, permissions table, and contact card. Its dark
panels, hairline borders, 10–12px radii, lime number badges, and spacing are the
same card language as Home/About. Re-audit the manifest and `CrashReporter.kt`
before changing permission or diagnostic-data claims.

---

## 3. Design language (the system)

- **Tokens on `.page`** in `page.module.css`: `--accent #7ee640` (the app's canonical dark-brand lime),
  `--bg #050505`, `--panel #0b0c0a`, `--card #080a08`, `--line #292a27`,
  `--ink` scale (f5f5f1 / c2c3bd / 91938e / 74776f), `--gold #f2c14e`,
  `--pad clamp(24px, 8vw, 128px)` — the one horizontal grid every section
  aligns to.
- **Type**: Sora. Display headlines `clamp(2.5rem, 5vw, 5rem)`, tight
  letter-spacing (−0.055em), second line in muted `#7b7d77` via `h2 span`
  (accent word via `em` = lime). Eyebrows = `.sectionLabel` (lime, 11px,
  0.18em caps). Micro-headers on data blocks = `.miniLabel` (9.5px caps,
  one height). **Floors: 9px desktop, 8px phone — nothing smaller.**
- **Colour discipline**: lime + neutrals everywhere; the tier metals
  (bronze/silver/gold/diamond) are the ONLY exception and only inside the
  rank graphic. `--gold` also names the current tier in its header line.
- **Cards**: hairline `--line` borders, near-black fills, tiny radii (3px
  CTAs, 9–10px chips/tiers). Photography sits under dark gradient shades;
  captions pinned to shaded corners are fixed white.
- **Imagery**: AI concept-board crops (provenance + "keep the deliberate
  baked details" notes in CONTRIBUTING §8). `rahi-*.jpg` heroes, `dna.jpg`
  fingerprint. Blend crops with masks, frame as cards, never full-bleed
  stretch beyond source resolution. Swap for real trip stills when they
  exist — filenames are stable, captions won't need changes.
- **Motion**: minimal. Smooth scroll snapping; tiny looping opacity pulses
  on cue buttons; hover lifts. Perf contract in CONTRIBUTING §6 still the
  law (note: nav pill + cue buttons use small-area `backdrop-filter` — the
  one accepted deviation; if a budget phone janks, replace with solid fills).
- **The dial** (reference pattern for any future gauge): number stack only
  inside the ring (87 over /100), label as a caption *below*, arc gap
  rotated to sit symmetrically at the bottom (`rotate(113.4deg)` for an
  87/13 dasharray).

## 4. Layout invariants (do not regress)

1. **Every section fits one screen at every viewport.** `min-height:100svh`
   + svh-based clamps; height media queries drop flourishes in order
   (telemetry card → captions → shrink dial/tiers) before content.
   Verified sizes: 1440×900, 1280×800, 1512×982, 390×844, 360×700.
2. **One stylesheet, no stacked override passes** — edit rules in place.
3. Portrait phones get their own tuned block (`max-width:800 and portrait`),
   plus `max-height:700` and tiny-phone escalations.
4. Anything interactive must work without hover (phones) and with keyboard.

## 5. How to verify (the harness)

Scratch scripts lived in the session scratchpad (`drive/` with
puppeteer-core; recreate freely — ~40 lines each):

- **fit.js** — loads the page at the 5 viewports, asserts every
  `main > section` offsetHeight ≤ viewport. Run after ANY layout change.
- **human.js / cancel.js** — clicks the cue at human cadence and with a
  mid-flight wheel-tick cancel; every press must land exactly on a section
  top (`scrollend` logs).
- **shots.js / phone.js** — per-section screenshots desktop + 390×844
  mobile emulation (puppeteer viewport goes below the ~500px headless
  window clamp; plain `--screenshot` cannot).

Traps (each cost real debugging time):
- `--virtual-time-budget` screenshots miss JS-driven state → use wall-clock
  `--timeout`, or puppeteer with real waits.
- Puppeteer `page.evaluate` mid-flight counts as a user gesture and can
  cancel smooth scrolls → install passive loggers up front, don't poll.
- Headless window width clamps ~500px (390 captures look right-clipped).
- Phone-on-LAN needs `allowedDevOrigins` or nothing hydrates.
- A CSS `transform` animation overrides an SVG `transform` attribute —
  position on an outer `<g>`, animate the inner one.

## 6. Roadmap / open items (rough priority)

1. **DNS** (the launch blocker) — apply the GoDaddy records, verify, then
   enforce HTTPS. Everything else already deploys on push.
2. **Social/meta polish** — no `og:image` yet; generate a 1200×630 card in
   the site language (dark, lime, wordmark + "Know how you actually
   drive."). Also add a favicon/app icon set (public/ has none).
3. **Wordmark decision** (CONTRIBUTING §4): app wordmark (current) vs the
   boards' lime "R" monogram. Decide once, apply everywhere.
4. **Light theme**: the landing, About, and privacy pages are dark-only by
   design now (hardcoded editorial palette); `globals.css` still carries the
   app's light tokens for future product surfaces. Either keep the marketing
   site dark-forever (fine) or re-tokenise all three pages together.
5. **Real photography** — replace AI crops as real trip stills accumulate
   (R2 archive has the raw drives; `reference_pull_trip_videos_from_phone`).
6. **Waitlist**: mailto works but loses people; a real form needs a server →
   Cloudflare Pages + Functions migration path (CONTRIBUTING §3), or a
   third-party form endpoint.
7. **Dead code sweep**: `Deck.tsx`, `HazardRelay.tsx`, `AxisRadar.tsx`,
   `RouteLine.tsx`, `StatCard.tsx` are retired-but-present; the `data-inview`
   CSS system in `globals.css` is now unused by the landing page. Harmless
   (tree-shaken), delete when convenient.
8. **Live numbers** (later, tempting): build-time Supabase snapshot of fleet
   totals — MUST follow CONTRIBUTING §3 (no browser credentials, filter
   `not_a_drive` at source).
9. **Play-listing linkage**: when production access lands, point the store
   listing's website field here — and only then touch the privacy-policy URL
   (CONTRIBUTING §7 warning about mid-review changes).
