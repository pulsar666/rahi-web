"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";
import { PLAY_STORE_URL } from "@/lib/links";
import styles from "./SiteHeader.module.css";

const links = [
  { href: "/", label: "Home", page: "home" },
  { href: "/about/", label: "About us", page: "about" },
  { href: "/privacy/", label: "Privacy policy", page: "privacy" },
];

export function SiteHeader({ current }: { current: "home" | "about" | "privacy" }) {
  /* The header is position:fixed so navigation is reachable from any section.
     Past the first slice of the page it swaps its hero gradient for a solid
     blurred bar — over arbitrary section backgrounds a transparent header
     leaves the wordmark and links unreadable. */
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={styles.header} data-scrolled={scrolled ? "true" : undefined}>
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
        <a
          className={styles.cta}
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get it on Google Play
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
          <a
            className={styles.mobileCta}
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get it on Google Play <span>↗</span>
          </a>
        </nav>
      </details>
    </header>
  );
}
