"use client";

import { useEffect, useRef } from "react";

/**
 * Flips `data-inview="true"` on its wrapper the first time it enters the
 * viewport, then disconnects. CSS does ALL the animating (transform / opacity
 * / stroke-dashoffset only — see the performance contract in page.module.css);
 * this component never re-renders and never touches styles from JS, so it
 * costs one observer callback per section and nothing per frame.
 *
 * The hidden starting states in CSS are gated on `@media (scripting:
 * enabled)`, so a no-JS visitor sees the full page instead of a blank one.
 */
export function InView({
  children,
  className,
  id,
  threshold = 0.18,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-inview", "true");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute("data-inview", "true");
          io.disconnect();
        }
      },
      // Fire slightly before the section's top edge is 8% into the viewport,
      // so the entrance is underway by the time the eye lands on it.
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}
