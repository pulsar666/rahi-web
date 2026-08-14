"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Direction = "up" | "down";

function sectionTargets() {
  return Array.from(
    document.querySelectorAll<HTMLElement>("main > section, main > footer")
  );
}

/** Index of the section the viewport is currently in: the last one whose
 *  top is at or above the scroll position. */
function indexAt(y: number, targets: HTMLElement[]) {
  let idx = 0;
  for (let i = 0; i < targets.length; i++) {
    if (targets[i].offsetTop <= y + 8) idx = i;
  }
  return idx;
}

/**
 * Floating up/down section stepper. Every press lands EXACTLY on a section
 * top — never a partial scroll:
 *
 * - Down: top of the next section.
 * - Up: top of the current section if you've scrolled into it, otherwise the
 *   top of the previous one (matches what "back up" means mid-section).
 * - While a smooth scroll is in flight, presses step from the PENDING target
 *   instead of the animated intermediate position, so mashing the button
 *   advances exactly one section per press instead of drifting.
 * - ArrowUp / ArrowDown / PageUp / PageDown snap the same way.
 */
export function ScrollCue({ className }: { className?: string }) {
  const [canMove, setCanMove] = useState({ up: false, down: true });
  /** Section index a smooth scroll is currently heading to, or null. */
  const pendingRef = useRef<number | null>(null);
  const settleTimer = useRef<number | undefined>(undefined);

  const update = useCallback(() => {
    const y = window.scrollY;
    const targets = sectionTargets();
    const idx = indexAt(y, targets);
    const remaining =
      document.documentElement.scrollHeight - window.innerHeight - y;

    // Clear the pending lock once the scroll has settled on its target.
    if (
      pendingRef.current !== null &&
      targets[pendingRef.current] &&
      Math.abs(targets[pendingRef.current].offsetTop - y) < 4
    ) {
      pendingRef.current = null;
    }

    setCanMove({
      up: y > 8,
      down: idx < targets.length - 1 && remaining > 8,
    });
  }, []);

  useEffect(() => {
    let frame = 0;
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [update]);

  const move = useCallback((direction: Direction) => {
    const y = window.scrollY;
    const targets = sectionTargets();
    if (!targets.length) return;

    let nextIdx: number;
    if (pendingRef.current !== null) {
      // A snap is already animating: step from where it will land.
      nextIdx = pendingRef.current + (direction === "down" ? 1 : -1);
    } else {
      const idx = indexAt(y, targets);
      if (direction === "down") {
        nextIdx = idx + 1;
      } else {
        // Scrolled into the current section → its own top comes first.
        nextIdx = y > targets[idx].offsetTop + 8 ? idx : idx - 1;
      }
    }

    nextIdx = Math.max(0, Math.min(targets.length - 1, nextIdx));
    pendingRef.current = nextIdx;

    // Safety: never leave the lock on if the scroll gets interrupted.
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      pendingRef.current = null;
    }, 1200);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: targets[nextIdx].offsetTop,
      behavior: reduce ? "auto" : "smooth",
    });
  }, []);

  /* Keyboard: arrows and page keys snap section-by-section too. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const el = event.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(el.tagName)) return;

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        move("down");
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        move("up");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  return (
    <nav className={className} aria-label="Page section navigation">
      <button
        type="button"
        data-direction="up"
        disabled={!canMove.up}
        aria-label="Scroll to the previous section"
        onClick={() => move("up")}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m7.5 14.5 4.5-4.5 4.5 4.5" />
        </svg>
      </button>
      <button
        type="button"
        data-direction="down"
        disabled={!canMove.down}
        aria-label="Scroll to the next section"
        onClick={() => move("down")}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.5 9.5 12 14l4.5-4.5" />
        </svg>
      </button>
    </nav>
  );
}
