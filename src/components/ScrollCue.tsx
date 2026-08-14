"use client";

import { useCallback, useEffect, useState } from "react";

type Direction = "up" | "down";

function sectionTargets() {
  return Array.from(
    document.querySelectorAll<HTMLElement>("main > section, main > footer")
  );
}

export function ScrollCue({ className }: { className?: string }) {
  const [canMove, setCanMove] = useState({ up: false, down: true });

  const update = useCallback(() => {
    const y = window.scrollY;
    const remaining =
      document.documentElement.scrollHeight - window.innerHeight - y;
    const hasNext = sectionTargets().some(
      (target) => target.getBoundingClientRect().top + y > y + 8
    );

    setCanMove({ up: y > 8, down: remaining > 8 && hasNext });
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

  const move = (direction: Direction) => {
    const y = window.scrollY;
    const targets = sectionTargets();
    const target =
      direction === "down"
        ? targets.find((item) => item.offsetTop > y + 8)
        : targets.reverse().find((item) => item.offsetTop < y - 8);

    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
