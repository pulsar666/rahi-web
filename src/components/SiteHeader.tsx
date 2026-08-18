import { Wordmark } from "./Wordmark";
import styles from "./SiteHeader.module.css";

const links = [
  { href: "/", label: "Home", page: "home" },
  { href: "/about/", label: "About us", page: "about" },
  { href: "/privacy/", label: "Privacy policy", page: "privacy" },
];

export function SiteHeader({ current }: { current: "home" | "about" | "privacy" }) {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="/" aria-label="Rahi home">
        <Wordmark height={25} />
      </a>

      <nav className={styles.desktopNav} aria-label="Main navigation">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={link.page === current ? "page" : undefined}
          >
            {link.label}
          </a>
        ))}
        <a className={styles.cta} href="mailto:support@drivewithrahi.com?subject=Rahi%20early%20access">
          Get early access
        </a>
      </nav>

      <details className={styles.mobileMenu}>
        <summary aria-label="Open site navigation">
          <span>Menu</span>
          <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3 5h12M3 9h12M3 13h12" /></svg>
        </summary>
        <nav aria-label="Mobile navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} aria-current={link.page === current ? "page" : undefined}>
              {link.label}
            </a>
          ))}
          <a className={styles.mobileCta} href="mailto:support@drivewithrahi.com?subject=Rahi%20early%20access">
            Get early access <span>↗</span>
          </a>
        </nav>
      </details>
    </header>
  );
}
