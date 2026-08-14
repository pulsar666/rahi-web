/**
 * The floating glass stat card from the reference boards: lime hairline
 * border, dark translucent fill, a soft outer glow, and a sparkline.
 *
 * Everything animates on transform/opacity ONLY — never width/height/top/left
 * — so the compositor handles it and the cards stay at 60fps on a mid-range
 * phone. `will-change` is deliberately NOT set here: it is applied in CSS for
 * the entrance only, because a permanent will-change pins a GPU layer per card
 * and costs more than it saves.
 */

export function Sparkline({
  points,
  className,
  delay = 0,
}: {
  points: number[];
  className?: string;
  delay?: number;
}) {
  const W = 120;
  const H = 34;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * W;
    // Inset by 3px top and bottom so the stroke never clips at the extremes.
    const y = H - 3 - ((p - min) / span) * (H - 6);
    return [x, y] as const;
  });

  const d = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");

  const [lastX, lastY] = coords[coords.length - 1];

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {/* Area fill under the line, for weight. */}
      <path
        d={`${d} L${W},${H} L0,${H} Z`}
        fill="var(--accent)"
        opacity={0.1}
        className="sparkArea"
        style={{ animationDelay: `${delay + 220}ms` }}
      />
      <path
        d={d}
        stroke="var(--accent)"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="sparkDraw"
        style={{ animationDelay: `${delay}ms` }}
      />
      <circle
        cx={lastX}
        cy={lastY}
        r={2.75}
        fill="var(--accent)"
        className="sparkDot"
        style={{ animationDelay: `${delay + 700}ms` }}
      />
    </svg>
  );
}
