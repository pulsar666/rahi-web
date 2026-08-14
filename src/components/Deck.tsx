"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import styles from "./Deck.module.css";

/**
 * Full-screen horizontal deck. Native scroll + CSS scroll-snap does the
 * actual movement (compositor-driven, no per-frame JS); this component only
 * flips `data-inview` on a slide the first time it becomes current — which
 * triggers the same CSS reveal system the vertical page used — and runs the
 * auto-advance timer.
 *
 * Auto-advance pauses while the pointer is over the deck or a slide has
 * focus, stops entirely under prefers-reduced-motion, and any manual
 * navigation resets the clock.
 */
export function Deck({
  children,
  interval = 8000,
}: {
  children: React.ReactNode;
  interval?: number;
}) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const pausedRef = useRef(false);

  const goTo = useCallback(
    (i: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const idx = ((i % count) + count) % count;
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({
        left: idx * el.clientWidth,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [count]
  );

  /* Track which slide is current + reveal it. */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const kids = Array.from(el.children);
    if (typeof IntersectionObserver === "undefined") {
      kids.forEach((k) => k.setAttribute("data-inview", "true"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = kids.indexOf(e.target);
          if (idx < 0) continue;
          e.target.setAttribute("data-inview", "true");
          activeRef.current = idx;
          setActive(idx);
        }
      },
      { root: el, threshold: 0.6 }
    );
    kids.forEach((k) => io.observe(k));
    return () => io.disconnect();
  }, [count]);

  /* Auto-advance. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      const el = scrollerRef.current;
      if (!el) return;
      /* Don't fight a half-finished manual swipe. */
      if (Math.abs(el.scrollLeft - activeRef.current * el.clientWidth) > 4) return;
      const next = ((activeRef.current + 1) % count + count) % count;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, interval);
    return () => clearInterval(id);
  }, [count, interval]);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);
  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  return (
    <section
      className={styles.deck}
      aria-roledescription="carousel"
      onPointerEnter={pause}
      onPointerLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          goTo(activeRef.current + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          goTo(activeRef.current - 1);
        }
      }}
    >
      <div className={styles.scroller} ref={scrollerRef} tabIndex={0}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${count}`}
          >
            {slide}
          </div>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowLeft}`}
        aria-label="Previous slide"
        onClick={() => goTo(activeRef.current - 1)}
      >
        <svg viewBox="0 0 24 24" width={20} height={20} fill="none" aria-hidden="true">
          <path
            d="M14.5 5.5 L8 12 L14.5 18.5"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowRight}`}
        aria-label="Next slide"
        onClick={() => goTo(activeRef.current + 1)}
      >
        <svg viewBox="0 0 24 24" width={20} height={20} fill="none" aria-hidden="true">
          <path
            d="M9.5 5.5 L16 12 L9.5 18.5"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={styles.dots} role="tablist" aria-label="Slides">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to slide ${i + 1}`}
            className={i === active ? styles.dotActive : styles.dot}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
