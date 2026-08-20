import styles from "./page.module.css";
import { Wordmark } from "@/components/Wordmark";
import { SiteHeader } from "@/components/SiteHeader";
import { ScrollCue } from "@/components/ScrollCue";
import { PLAY_STORE_URL } from "@/lib/links";

const pillars = [
  { number: "01", title: "Feel the drive", copy: "Your phone reads every brake, corner and surge — quietly, while you focus on the road." },
  { number: "02", title: "See the pattern", copy: "Rahi turns thousands of tiny signals into a driving portrait that is unmistakably yours." },
  { number: "03", title: "Move forward", copy: "Useful coaching, tied to real moments. One clear thing to carry into the next drive." },
];

const scores = [
  ["Anticipation", "91"],
  ["Composure", "87"],
  ["Smoothness", "84"],
];

const tiers = ["Bronze", "Silver", "Gold", "Diamond"];

/** The metallic badge shield — shared by the tier track and the example
 *  badge chip so the two always render identically. */
function BadgeShield({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 34 40" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="white" stopOpacity=".75" />
          <stop offset=".26" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".55" />
        </linearGradient>
      </defs>
      <path className={styles.shieldBody} fill={`url(#${id})`} d="M8 2h18c3.3 0 6 2.7 6 6v12c0 9.2-6.5 15.8-15 19C8.5 35.8 2 29.2 2 20V8c0-3.3 2.7-6 6-6Z" />
      <path className={styles.shieldInset} d="M8.5 6h17c1.4 0 2.5 1.1 2.5 2.5v11c0 6.8-4.5 11.9-11 15-6.5-3.1-11-8.2-11-15v-11C6 7.1 7.1 6 8.5 6Z" />
      <path className={styles.hawkMark} d="M9.5 23.5c3.4-6.8 8.8-10.2 16.3-10.4-3.1 1.4-5.3 3.1-6.7 5.1 2.8-.6 5.1-.2 6.9 1.1-5.4-.2-9.5 2.2-12.2 7.1-1.3-1.2-2.7-2.1-4.3-2.9Z" />
    </svg>
  );
}

/** Editorial long-tail arrow used between the relay steps. */
function RelayArrow() {
  return (
    <b aria-hidden="true">
      <svg viewBox="0 0 44 12">
        <path d="M1 6h39m0 0-5.5-4.5M40 6l-5.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </b>
  );
}

export default function Home() {
  return (
    <main className={styles.page}>
      <ScrollCue className={styles.scrollCue} />
      <SiteHeader current="home" />

      <section className={styles.hero} id="top">
        <img className={styles.heroImage} src="/images/rahi-himalayan-hero.jpg" alt="A graphite SUV following a mountain road beneath the Himalayas" fetchPriority="high" />
        <div className={styles.heroShade} />
        <div className={styles.heroGrid} />
        <div className={styles.heroContent}>
          <p className={styles.kicker}><span /> Built for the road ahead</p>
          <h1>Know your drive.<br /><em>Own the next one.</em></h1>
          <p className={styles.heroCopy}>Rahi turns your phone into a thoughtful driving coach — reading every journey, revealing your habits, and helping you get better where it matters.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryCta} href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">Get it on Google Play <span>↗</span></a>
            <a className={styles.textCta} href="#how">Discover Rahi <span>↓</span></a>
          </div>
        </div>
        <div className={styles.heroTelemetry} aria-hidden="true">
          <span className={styles.telemetryLabel}>LIVE DRIVE</span>
          <svg viewBox="0 0 220 48"><path pathLength="1" d="M1 37C20 37 26 35 38 35S52 16 66 18s17 17 30 13 15-23 29-20 18 30 34 24 18-15 30-12 13 10 30 9" /></svg>
          <div><strong>2,842 m</strong><small>ALTITUDE</small></div>
        </div>
        <span className={styles.scrollHint}>SCROLL TO EXPLORE</span>
      </section>

      <section className={styles.intro} id="how">
        <p className={styles.sectionLabel}>A different kind of driving app</p>
        <h2>Not a dashboard full of numbers.<br /><span>A clearer view of you.</span></h2>
        <div className={styles.rankGraphic} aria-label="Illustrative score of 87, earning Gold rank on a path from Bronze to Diamond">
          <div className={styles.scoreOverview}>
            <p className={styles.miniLabel}>Score + badge</p>
            <div className={styles.scoreBody}>
              <div className={styles.scoreDial}>
                <div className={styles.dialRing}>
                  <svg viewBox="0 0 96 96" aria-hidden="true">
                    <circle className={styles.scoreRail} cx="48" cy="48" r="39" pathLength="100" />
                    <circle className={styles.scoreArc} cx="48" cy="48" r="39" pathLength="100" />
                  </svg>
                  <b>87<i>/100</i></b>
                </div>
                <small>Drive score</small>
              </div>
              <div className={styles.scoreMeta}>
                <BadgeShield id="badge-hawk" className={styles.badgeIcon} />
                <div><small>Example badge</small><strong>Hawk</strong><span>Anticipation</span></div>
              </div>
            </div>
          </div>
          <div className={styles.rankProgress}>
            <p className={styles.miniLabel}>Tier progress · <strong>Gold</strong> · Driving strong</p>
            <div className={styles.tierTrack}>
              {tiers.map((tier, index) => (
                <div key={tier} className={`${styles.tier} ${tier === "Gold" ? styles.tierActive : ""}`}>
                  <span className={styles.tierMark}>
                    <BadgeShield id={`metal-${index}`} />
                  </span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{tier}</strong>
                </div>
              ))}
            </div>
            <p className={styles.tierCaption}>Cleaner, more consistent drives unlock higher tiers. <span>Diamond is next →</span></p>
          </div>
        </div>
        <div className={styles.pillars}>
          {pillars.map((item) => <article key={item.number} className={styles.pillar}><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}
        </div>
      </section>

      <section className={styles.featureStory}>
        <div className={styles.featureCopy}>
          <p className={styles.sectionLabel}>Your driving portrait</p>
          <h2>One drive.<br /><span>More than a score.</span></h2>
          <p>Rahi learns the rhythm beneath your route: how early you ease off, how calmly you carry speed, how smoothly you ask the car to move.</p>
          <div className={styles.scoreList}>
            {scores.map(([label, value], index) => <div className={styles.scoreRow} key={label}><span>{label}</span><i><b style={{ width: `${91 - index * 8}%` }} /></i><strong>{value}</strong></div>)}
          </div>
        </div>
        <figure className={styles.featureVisual}>
          <img src="/images/rahi-driving-portrait-clean.jpg" alt="A graphite SUV following a mountain road through the Himalayas" loading="lazy" />
          <figcaption><span>DRIVER PORTRAIT</span><strong>Composed Explorer</strong></figcaption>
        </figure>
      </section>

      <section className={styles.dna}>
        <div className={styles.dnaCopy}>
          <p className={styles.sectionLabel}>Style, not skill</p>
          <h2>Your driving<br />has a <em>DNA.</em></h2>
          <p>No two people drive alike. Across trips, Rahi learns the shape of how you drive — the way you feed the pedal, carry a corner, hold your pace — until the pattern is a signature only you could leave.</p>
          <div className={styles.dnaTraits}>
            {["Pedal work", "Cornering", "Consistency", "Pace", "Anticipation"].map((trait, index) => (
              <span key={trait}><i>{String(index + 1).padStart(2, "0")}</i>{trait}</span>
            ))}
          </div>
        </div>
        <figure className={styles.dnaVisual}>
          <img src="/images/dna.jpg" width={660} height={775} loading="lazy" decoding="async" alt="A fingerprint drawn from road lane markings, with a car driving up into its centre" />
        </figure>
      </section>

      <section className={styles.coach}>
        <img src="/images/rahi-coach-city-clean.jpg" alt="A calm monsoon drive through an Indian city at blue hour" loading="lazy" />
        <div className={styles.coachOverlay} />
        <div className={styles.coachCopy}>
          <p className={styles.sectionLabel}>Coaching that remembers</p>
          <h2>Your coach changes<br /><span>as you do.</span></h2>
          <p>Not generic advice. Rahi returns to the exact moment, explains what shaped it, and gives you one useful thought for the next road.</p>
          <blockquote>“Lovely anticipation on that slowdown — you eased off early, stayed settled, and never needed a hard brake.”</blockquote>
        </div>
      </section>

      <section className={styles.roads} id="roads">
        <div className={styles.roadsHead}>
          <p className={styles.sectionLabel}>The road remembers</p>
          <h2>Every drive makes the road<br /><span>smarter for the next.</span></h2>
        </div>
        <div className={styles.roadVisual}>
          <img src="/images/rahi-road-awareness-clean.jpg" alt="A rain-washed road winding through the misty Western Ghats" loading="lazy" />
          <div className={styles.roadBadge}><i /><div><small>ROUGH PATCH AHEAD</small><strong>Slow gently in 180 m</strong></div></div>
        </div>
        <div className={styles.relay}>
          <p><strong>You feel it once.</strong><span>Rahi senses the jolt and marks the spot.</span></p>
          <RelayArrow /><p><strong>The road remembers.</strong><span>Each drive sharpens a living map.</span></p>
          <RelayArrow /><p><strong>The next driver knows.</strong><span>A quiet warning arrives in time.</span></p>
        </div>
      </section>

      <section className={styles.memories}>
        <div className={styles.memoriesCopy}>
          <p className={styles.sectionLabel}>More than metrics</p>
          <h2>Your drives become<br /><span>stories worth keeping.</span></h2>
          <p>The rain-day commute. The open highway. The wrong turn that became the best part. Rahi keeps the route, weather, score and moments together.</p>
        </div>
        <div className={styles.photoRail}>
          <figure className={styles.photoTall}><img src="/images/city.jpg" alt="Rainy city drive beside the sea" loading="lazy" /><figcaption><small>MONSOON · 18:42</small><strong>Held your composure</strong></figcaption></figure>
          <figure><img src="/images/beach.jpg" alt="Car at a quiet beach after a coastal drive" loading="lazy" /><figcaption><small>COAST RUN · 96 KM</small><strong>One for the memories</strong></figcaption></figure>
          <figure><img src="/images/dusk.jpg" alt="City drive at dusk with a route line" loading="lazy" /><figcaption><small>EVENING DRIVE · 42 MIN</small><strong>Patience, rewarded</strong></figcaption></figure>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalRoute} aria-hidden="true"><svg viewBox="0 0 900 180"><path pathLength="1" d="M-30 150C100 120 170 170 268 112S430 18 520 65s112 107 205 58S830 30 940 16" /></svg></div>
        <p className={styles.sectionLabel}>Now on Google Play</p>
        <h2>Drive for the one<br /><span>behind you.</span></h2>
        <p>Built in India, for Indian roads.</p>
        <a className={styles.primaryCta} href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">Get it on Google Play <span>↗</span></a>
      </section>

      <footer className={styles.footer}><Wordmark height={22} /><p>Drive · Score · Improve</p><div><a href="/about/">Our story</a><a href="/privacy/">Privacy</a><a href="mailto:support@drivewithrahi.com">Contact</a><span>© {new Date().getFullYear()} Rahi</span></div></footer>
    </main>
  );
}
