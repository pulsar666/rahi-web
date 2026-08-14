import styles from "./page.module.css";
import { Wordmark } from "@/components/Wordmark";
import { AxisRadar } from "@/components/AxisRadar";
import { RouteLine } from "@/components/RouteLine";
import { Sparkline } from "@/components/StatCard";

/** Illustrative brand furniture — NOT fleet statistics. Nothing on this
 *  placeholder should be readable as a published number. */
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

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.header}>
        <Wordmark className={styles.logo} height={24} />
        <a className={styles.headerLink} href="/privacy/">
          Privacy
        </a>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
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

          <div
            className={`${styles.tagline} ${styles.reveal}`}
            style={{ "--delay": "380ms" } as React.CSSProperties}
          >
            <span>Drive.</span>
            <span className={styles.dot} />
            <span>Score.</span>
            <span className={styles.dot} />
            <span>Improve.</span>
          </div>
        </section>

        {/* The route is the connective tissue between the promise and the
            proof — it draws itself, then the cards land on it. */}
        <div className={styles.routeWrap} aria-hidden="true">
          <RouteLine className={styles.route} />
        </div>

        <section className={styles.cards}>
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
        </section>

        <section className={styles.radarSection}>
          <div
            className={`${styles.radarCopy} ${styles.reveal}`}
            style={{ "--delay": "0ms" } as React.CSSProperties}
          >
            <h2 className={styles.h2}>
              Six axes. <span className={styles.titleAccent}>One portrait.</span>
            </h2>
            <p className={styles.sectionSub}>
              Every drive is scored across the six things that actually separate
              a good driver from a lucky one — then shown back to you as one
              shape you can watch change.
            </p>
          </div>
          <AxisRadar className={styles.radar} />
        </section>
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Rahi</span>
        <nav className={styles.footerLinks}>
          <a className={styles.footerLink} href="/privacy/">
            Privacy
          </a>
          <a className={styles.footerLink} href="mailto:rahaanirban91@gmail.com">
            Contact
          </a>
        </nav>
      </footer>
    </div>
  );
}
