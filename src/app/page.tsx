import styles from "./page.module.css";

/** The app's six public axes (driving_signature.py). Fill values are
 *  illustrative brand furniture, NOT real fleet numbers — nothing on this
 *  placeholder should read as a published statistic. */
const AXES = [
  { name: "Cornering", fill: "78%" },
  { name: "Acceleration", fill: "64%" },
  { name: "Braking", fill: "83%" },
  { name: "Composure", fill: "71%" },
  { name: "Awareness", fill: "88%" },
  { name: "Focus", fill: "76%" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.header}>
        <span className={styles.wordmark}>
          Rahi<span className={styles.wordmarkDot}>.</span>
        </span>
        <a className={styles.headerLink} href="/privacy/">
          Privacy
        </a>
      </header>

      <main className={styles.main}>
        <span
          className={`${styles.eyebrow} ${styles.reveal}`}
          style={{ "--delay": "80ms" } as React.CSSProperties}
        >
          <span className={styles.pulse} />
          Coming soon
        </span>

        <h1
          className={`${styles.title} ${styles.reveal}`}
          style={{ "--delay": "180ms" } as React.CSSProperties}
        >
          Know how you <span className={styles.titleAccent}>drive</span>.
        </h1>

        <p
          className={`${styles.subtitle} ${styles.reveal}`}
          style={{ "--delay": "300ms" } as React.CSSProperties}
        >
          Rahi turns your phone into a driving coach. Record a drive and get a
          skill score, coaching tied to the exact moments that shaped it, and a
          heads-up when the road ahead turns rough.
        </p>

        <ul className={styles.axes}>
          {AXES.map((axis, i) => (
            <li
              key={axis.name}
              className={`${styles.axis} ${styles.reveal}`}
              style={{ "--delay": `${420 + i * 70}ms` } as React.CSSProperties}
            >
              <span className={styles.axisName}>{axis.name}</span>
              <div className={styles.axisTrack}>
                <div
                  className={styles.axisFill}
                  style={
                    {
                      "--fill": axis.fill,
                      "--delay": `${560 + i * 70}ms`,
                    } as React.CSSProperties
                  }
                />
              </div>
            </li>
          ))}
        </ul>
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
