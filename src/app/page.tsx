import styles from "./page.module.css";
import { Wordmark } from "@/components/Wordmark";
import { AxisRadar } from "@/components/AxisRadar";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.header}>
        <Wordmark className={styles.logo} height={26} />
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

        <div
          className={`${styles.radarWrap} ${styles.reveal}`}
          style={{ "--delay": "400ms" } as React.CSSProperties}
        >
          <AxisRadar className={styles.radar} />
          <span className={styles.radarCaption}>Six axes. One portrait.</span>
        </div>
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
