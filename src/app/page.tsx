import styles from "./page.module.css";
import { Wordmark } from "@/components/Wordmark";
import { AxisRadar } from "@/components/AxisRadar";
import { RouteLine } from "@/components/RouteLine";
import { Sparkline } from "@/components/StatCard";
import { Deck } from "@/components/Deck";
import { HazardRelay } from "@/components/HazardRelay";

/** Illustrative brand furniture — NOT fleet statistics. Nothing on this
 *  page should be readable as a published number. */
const CARDS = [
  {
    label: "Smoothness",
    hint: "Gentle inputs. No jerks.",
    points: [3, 4, 3.4, 5, 4.6, 6, 5.6, 7.2, 8],
  },
  {
    label: "Anticipation",
    hint: "See ahead. React early.",
    points: [2.4, 3, 4.2, 3.8, 5.4, 5, 6.6, 7, 8.4],
  },
  {
    label: "Composure",
    hint: "Stay centred under pressure.",
    points: [4, 3.6, 4.8, 4.4, 5.8, 6.4, 6, 7.4, 7.8],
  },
];

/** The trip-timeline vignette: one drive, five moments, one graded hard. */
const MOMENTS = [
  { time: "02:12", name: "Hard accel" },
  { time: "02:47", name: "Cornering" },
  { time: "03:18", name: "Harsh brake", hot: true },
  { time: "04:05", name: "Pothole" },
  { time: "05:32", name: "Smooth merge" },
];

/** Coaching focus bars — illustrative, same rule as above. */
const FOCUS = [
  { name: "Anticipation", value: 0.91 },
  { name: "Braking", value: 0.84 },
  { name: "Corner entry", value: 0.72 },
];

const RELAY_STEPS = [
  {
    index: "01",
    title: "You feel it once",
    body: "A hard jolt on a dark road. Rahi feels it too — and marks the exact spot.",
  },
  {
    index: "02",
    title: "The road remembers",
    body: "That rough patch joins a living map, redrawn by every drive that passes it.",
  },
  {
    index: "03",
    title: "The next driver hears it coming",
    body: "A soft chime, in time to slow down. From a stranger, for a stranger.",
  },
];

const STORIES = [
  {
    src: "/images/city.jpg",
    width: 445,
    height: 560,
    alt: "Rain-washed city seafront road at dusk, headlights reflecting off the wet tarmac",
    title: "Rain-day commute",
    caption: "Composure, held through the downpour",
  },
  {
    src: "/images/dusk.jpg",
    width: 520,
    height: 600,
    alt: "City avenue at dusk with a recorded route line tracing through the evening traffic",
    title: "Signal to signal",
    caption: "Patience, finally rewarded",
  },
  {
    src: "/images/beach.jpg",
    width: 640,
    height: 680,
    alt: "Car parked on an empty beach at low tide beside a fishing boat under a heavy sky",
    title: "The coast run",
    caption: "One for the memories",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.header}>
        <Wordmark className={styles.logo} height={24} />
        <nav className={styles.headerNav}>
          <a className={styles.headerLink} href="/privacy/">
            Privacy
          </a>
        </nav>
      </header>

      <Deck interval={8000}>
        {/* ---- 1 · Hero ------------------------------------------------- */}
        <div className={`${styles.slideInner} ${styles.hero}`}>
          <span
            className={`${styles.eyebrow} ${styles.reveal}`}
            style={{ "--delay": "60ms" } as React.CSSProperties}
          >
            <span className={styles.pulse} />
            Coming soon
          </span>

          <h1
            className={`${styles.title} ${styles.reveal}`}
            style={{ "--delay": "160ms" } as React.CSSProperties}
          >
            Know how you
            <br />
            <span className={styles.titleAccent}>actually</span> drive.
          </h1>

          <p
            className={`${styles.subtitle} ${styles.reveal}`}
            style={{ "--delay": "280ms" } as React.CSSProperties}
          >
            Rahi turns your phone into a driving coach. Record a drive and get a
            skill score, coaching tied to the exact moments that shaped it, and
            a heads-up when the road ahead turns rough.
          </p>

          {/* The route is the connective tissue between the promise and the
              proof — it draws itself, then the cards land on it. */}
          <div className={styles.routeWrap} aria-hidden="true">
            <RouteLine className={styles.route} />
          </div>

          <div className={styles.cards}>
            {CARDS.map((card, i) => (
              <article
                key={card.label}
                className={`${styles.card} ${styles.rise}`}
                style={{ "--delay": `${900 + i * 130}ms` } as React.CSSProperties}
              >
                <div className={styles.cardHead}>
                  <span className={styles.cardLabel}>{card.label}</span>
                  <span className={styles.cardHint}>{card.hint}</span>
                </div>
                <Sparkline
                  className={styles.spark}
                  points={card.points}
                  delay={1200 + i * 130}
                />
              </article>
            ))}
          </div>
        </div>

        {/* ---- 2 · It starts with a moment ------------------------------ */}
        <div className={styles.slideInner}>
          <div className={`${styles.sectionHead} ${styles.sr}`}>
            <h2 className={styles.h2}>
              It starts with a <span className={styles.titleAccent}>moment</span>.
            </h2>
            <p className={styles.sectionSub}>
              Rahi watches the drive the way a coach would — every brake,
              corner, pothole and surge caught, timestamped and graded while
              you just drive.
            </p>
          </div>

          <div
            className={`${styles.momentCard} ${styles.sr}`}
            style={{ "--delay": "150ms" } as React.CSSProperties}
          >
            <div className={styles.momentCardTop}>
              <span className={styles.momentCardTitle}>Trip timeline</span>
              <span className={styles.momentCardHint}>severity graded live</span>
            </div>

            <div className={styles.momentRow} role="list">
              {MOMENTS.map((m, i) => (
                <div
                  key={m.time}
                  role="listitem"
                  className={`${styles.moment} ${m.hot ? styles.momentHot : ""} ${styles.sr}`}
                  style={{ "--delay": `${300 + i * 120}ms` } as React.CSSProperties}
                >
                  <span className={styles.momentTime}>{m.time}</span>
                  <span className={styles.momentNode} aria-hidden="true" />
                  <span className={styles.momentName}>{m.name}</span>
                </div>
              ))}
            </div>

            <div
              className={`${styles.momentDetail} ${styles.sr}`}
              style={{ "--delay": "950ms" } as React.CSSProperties}
            >
              <div className={styles.momentDetailHead}>
                <span className={styles.momentDetailTitle}>
                  Harsh brake · 03:18
                </span>
                <span className={styles.riskChip}>High</span>
              </div>
              <p className={styles.momentDetailSub}>
                Marked on the map, matched to the video, waiting in your replay
                — with the sensor trace to prove exactly how it felt.
              </p>
              <svg
                className={styles.decel}
                viewBox="0 0 480 84"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <line
                  x1={0}
                  y1={22}
                  x2={480}
                  y2={22}
                  stroke="var(--divider)"
                  strokeWidth={1}
                  strokeDasharray="4 6"
                />
                <path
                  d="M0,22 C60,22 96,23 132,28 C168,33 186,70 228,70 C270,70 282,34 330,26 C378,20 420,22 480,22"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  pathLength={1}
                  className="vDraw"
                  style={{ "--d": "1200ms" } as React.CSSProperties}
                />
                <path
                  d="M168,48 C186,62 200,70 228,70 C254,70 268,56 282,44"
                  stroke="var(--risk)"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  pathLength={1}
                  className="vDraw"
                  style={{ "--d": "1900ms" } as React.CSSProperties}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ---- 3 · Six axes --------------------------------------------- */}
        <div className={`${styles.slideInner} ${styles.radarSection}`}>
          <div className={`${styles.radarCopy} ${styles.sr}`}>
            <h2 className={styles.h2}>
              Six axes. <span className={styles.titleAccent}>One portrait.</span>
            </h2>
            <p className={styles.sectionSub}>
              Every drive is scored across the six things that actually
              separate a good driver from a lucky one — then shown back to
              you as one shape you can watch change.
            </p>
          </div>
          <AxisRadar className={styles.radar} />
        </div>

        {/* ---- 4 · The coach -------------------------------------------- */}
        <div className={`${styles.slideInner} ${styles.coachSection}`}>
          <figure
            className={`${styles.photoCard} ${styles.coachPhoto} ${styles.sr}`}
          >
            <img
              src="/images/valley.jpg"
              width={425}
              height={800}
              loading="lazy"
              decoding="async"
              alt="Himalayan valley road with snow peaks above a village — the kind of drive Rahi coaches you through"
            />
            <div className={styles.photoShade} aria-hidden="true" />
            <figcaption className={styles.photoTag}>
              <span className={styles.photoTitle}>The ghat run</span>
              <span className={styles.photoCaption}>
                Where good habits earn their keep
              </span>
            </figcaption>
          </figure>

          <div className={styles.coachCopy}>
            <div className={styles.sr}>
              <h2 className={styles.h2}>
                A coach that changes{" "}
                <span className={styles.titleAccent}>as you do</span>.
              </h2>
              <p className={styles.sectionSub}>
                After every drive, Rahi talks you through the moments that
                mattered — praise for the hazard you read early, a nudge for
                the corner you rushed. No lectures. Just the next thing to get
                better at.
              </p>
            </div>

            <div
              className={`${styles.coachCard} ${styles.sr}`}
              style={{ "--delay": "180ms" } as React.CSSProperties}
            >
              <span className={styles.coachCardLabel}>After the drive</span>
              <p className={styles.coachQuote}>
                &ldquo;Lovely read on the truck at 12:40 — you lifted early and
                never needed the brake. Next drive, carry that same patience
                into your corner entries.&rdquo;
              </p>
              <div className={styles.focusList}>
                {FOCUS.map((f, i) => (
                  <div key={f.name} className={styles.focusRow}>
                    <span className={styles.focusName}>{f.name}</span>
                    <span className={styles.focusTrack} aria-hidden="true">
                      <span
                        className={`${styles.focusFill} vGrow`}
                        style={
                          {
                            "--d": `${500 + i * 160}ms`,
                            "--sx": f.value,
                            transform: "scaleX(var(--sx))",
                          } as React.CSSProperties
                        }
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---- 5 · The mission ------------------------------------------ */}
        <div className={styles.slideInner}>
          <div className={styles.mission}>
            <div className={`${styles.sectionHead} ${styles.sr}`}>
              <span className={styles.eyebrow}>Why Rahi exists</span>
              <h2 className={styles.h2}>
                Your pothole is{" "}
                <span className={styles.titleAccent}>
                  someone else&rsquo;s warning.
                </span>
              </h2>
              <p className={styles.sectionSub}>
                The first car hits it blind. Rahi feels the jolt, marks the
                spot, and remembers. The next driver on that road gets a soft
                chime before the rough patch — from a stranger they&rsquo;ll
                never meet.
              </p>
            </div>

            <div
              className={`${styles.relayWrap} ${styles.sr}`}
              style={{ "--delay": "200ms" } as React.CSSProperties}
            >
              <HazardRelay className={styles.relay} />
            </div>

            <div className={styles.relaySteps}>
              {RELAY_STEPS.map((step, i) => (
                <div
                  key={step.index}
                  className={`${styles.relayStep} ${styles.sr}`}
                  style={{ "--delay": `${350 + i * 150}ms` } as React.CSSProperties}
                >
                  <span className={styles.relayIndex}>{step.index}</span>
                  <span className={styles.relayTitle}>{step.title}</span>
                  <span className={styles.relayBody}>{step.body}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- 6 · Stories ----------------------------------------------- */}
        <div className={styles.slideInner}>
          <div className={`${styles.sectionHead} ${styles.sr}`}>
            <h2 className={styles.h2}>
              Every drive becomes a{" "}
              <span className={styles.titleAccent}>story</span>.
            </h2>
            <p className={styles.sectionSub}>
              Score, route, weather and the moments that mattered — kept
              together and replayable. The everyday commute and the
              once-a-year road trip both deserve remembering.
            </p>
          </div>

          <div className={styles.storyGrid}>
            {STORIES.map((s, i) => (
              <figure
                key={s.src}
                className={`${styles.photoCard} ${styles.storyCard} ${styles.sr}`}
                style={{ "--delay": `${180 + i * 150}ms` } as React.CSSProperties}
              >
                <img
                  src={s.src}
                  width={s.width}
                  height={s.height}
                  loading="lazy"
                  decoding="async"
                  alt={s.alt}
                />
                <div className={styles.photoShade} aria-hidden="true" />
                <figcaption className={styles.photoTag}>
                  <span className={styles.photoTitle}>{s.title}</span>
                  <span className={styles.photoCaption}>{s.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* ---- 7 · Manifesto ---------------------------------------------- */}
        <div className={`${styles.slideInner} ${styles.manifesto}`}>
          <h2 className={`${styles.manifestoLine} ${styles.sr}`}>
            Drive for the one{" "}
            <span className={styles.titleAccent}>behind you</span>.
          </h2>
          <p
            className={`${styles.manifestoBody} ${styles.sr}`}
            style={{ "--delay": "150ms" } as React.CSSProperties}
          >
            Built in India, for Indian roads. Rahi starts with one phone on
            one dashboard — and grows into every driver quietly watching out
            for every other.
          </p>
          <div
            className={`${styles.manifestoCta} ${styles.sr}`}
            style={{ "--delay": "300ms" } as React.CSSProperties}
          >
            <span className={styles.eyebrow}>
              <span className={styles.pulse} />
              Coming soon to Android
            </span>
            <a
              className={styles.ctaLink}
              href="mailto:rahaanirban91@gmail.com?subject=Rahi%20early%20access"
            >
              Ask for early access →
            </a>
          </div>
          <div
            className={`${styles.slideFooter} ${styles.sr}`}
            style={{ "--delay": "420ms" } as React.CSSProperties}
          >
            <span>© {new Date().getFullYear()} Rahi</span>
            <a className={styles.footerLink} href="/privacy/">
              Privacy
            </a>
            <a className={styles.footerLink} href="mailto:rahaanirban91@gmail.com">
              Contact
            </a>
          </div>
        </div>
      </Deck>
    </div>
  );
}
