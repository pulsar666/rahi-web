"use client";

/**
 * The six public axes drawn as a radar — the shape the app's own score is,
 * rather than six disconnected bars. A hexagon reads as ONE portrait of a
 * driver, which is what the score actually is; separate tiles read as six
 * unrelated meters.
 *
 * Values here are illustrative brand furniture, NOT fleet statistics. Nothing
 * on this placeholder should be readable as a published number.
 *
 * Geometry: unit circle, angle stepped by 60°, starting at -90° so
 * "Cornering" sits at top dead centre. Radius is a fraction of R so the
 * labels have room outside the grid.
 */

const AXES = [
  { name: "Cornering", value: 0.78 },
  { name: "Acceleration", value: 0.64 },
  { name: "Braking", value: 0.83 },
  { name: "Composure", value: 0.71 },
  { name: "Awareness", value: 0.88 },
  { name: "Focus", value: 0.76 },
];

const R = 100; // grid radius in viewBox units
const RINGS = [0.25, 0.5, 0.75, 1];

function point(i: number, r: number): [number, number] {
  const angle = (Math.PI / 180) * (i * 60 - 90);
  return [Math.cos(angle) * r, Math.sin(angle) * r];
}

function polygon(radii: number[]): string {
  return radii
    .map((r, i) => point(i, r * R).join(","))
    .join(" ");
}

export function AxisRadar({ className }: { className?: string }) {
  const shape = polygon(AXES.map((a) => a.value));

  return (
    <svg
      className={className}
      viewBox="-150 -132 300 268"
      role="img"
      aria-label="The six driving axes Rahi scores: cornering, acceleration, braking, composure, awareness and focus."
    >
      {/* Grid rings */}
      {RINGS.map((ring) => (
        <polygon
          key={ring}
          points={polygon(AXES.map(() => ring))}
          fill="none"
          stroke="var(--divider)"
          strokeWidth={1}
        />
      ))}

      {/* Spokes */}
      {AXES.map((axis, i) => {
        const [x, y] = point(i, R);
        return (
          <line
            key={axis.name}
            x1={0}
            y1={0}
            x2={x}
            y2={y}
            stroke="var(--divider)"
            strokeWidth={1}
          />
        );
      })}

      {/* The driver's shape. scale-in from the centre so it reads as the
          score resolving, not as a shape sliding in from off-canvas. */}
      <polygon
        points={shape}
        fill="var(--accent-muted)"
        stroke="var(--accent)"
        strokeWidth={2}
        strokeLinejoin="round"
        style={{
          transformOrigin: "center",
          animation: "radarIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.35s backwards",
        }}
      />

      {/* Vertex dots */}
      {AXES.map((axis, i) => {
        const [x, y] = point(i, axis.value * R);
        return (
          <circle
            key={axis.name}
            cx={x}
            cy={y}
            r={3.5}
            fill="var(--accent)"
            style={{
              animation: `dotIn 0.5s ease-out ${0.9 + i * 0.08}s backwards`,
            }}
          />
        );
      })}

      {/* Labels, pushed outside the grid. text-anchor flips by side so long
          words never overlap the shape. */}
      {AXES.map((axis, i) => {
        const [x, y] = point(i, R + 24);
        const anchor = Math.abs(x) < 1 ? "middle" : x > 0 ? "start" : "end";
        return (
          <text
            key={axis.name}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fill="var(--text-secondary)"
            fontSize={12.5}
            fontWeight={500}
            style={{
              animation: `dotIn 0.5s ease-out ${1 + i * 0.08}s backwards`,
            }}
          >
            {axis.name}
          </text>
        );
      })}
    </svg>
  );
}
