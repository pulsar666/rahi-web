"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";
import { InstagramGlyph } from "./InstagramGlyph";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PLAY_STORE_URL } from "@/lib/links";
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

  /* Dismiss the phone menu on an outside tap / Escape.

     A bare <details> only toggles from its own <summary>, so an open menu
     could ONLY be closed by finding the Menu button again — tapping the page
     behind it did nothing, which is not how any overlay is expected to
     behave. <details> is kept (it still opens with no JS, and carries the
     expanded/collapsed semantics for free); this only adds the dismissal.

     `pointerdown`, not `click`: it fires before the tap can activate whatever
     is underneath, so the first tap outside closes the menu instead of
     closing it AND triggering a link. Listening on the document in the
     CAPTURE phase means a stopPropagation() somewhere in the page can't
     leave the menu stuck open. */
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const close = () => {
      const el = menuRef.current;
      if (el?.open) el.open = false;
    };
    const onPointerDown = (e: PointerEvent) => {
      const el = menuRef.current;
      if (el?.open && !el.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
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
        {/* Icon-only inside the pill: the nav already carries one long label
            ("Get it on Google Play") and a second worded link made the pill
            wrap on narrow desktop widths. The glyph keeps the community one
            click away from every section of every page. */}
        <a
          className={styles.social}
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Rahi on Instagram, ${INSTAGRAM_HANDLE}`}
          title={`Rahi on Instagram · ${INSTAGRAM_HANDLE}`}
        >
          <InstagramGlyph size={17} />
        </a>
        <a
          className={styles.cta}
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get it on Google Play
        </a>
      </nav>

      <details className={styles.mobileMenu} ref={menuRef}>
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
            className={styles.mobileSocial}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramGlyph size={16} />
            Instagram
            <em>{INSTAGRAM_HANDLE}</em>
          </a>
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
