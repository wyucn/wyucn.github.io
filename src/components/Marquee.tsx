"use client";

interface MarqueeProps {
  text: string;
  className?: string;
  border?: boolean;
}

export default function Marquee({ text, className = "", border }: MarqueeProps) {
  const repeated = Array(6).fill(text);

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={border ? { borderTop: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)" } : undefined}
    >
      <div className="animate-marquee inline-flex">
        {repeated.map((t, i) => (
          <span
            key={i}
            className="text-[clamp(3rem,8vw,7rem)] font-extrabold uppercase tracking-tight text-transparent mx-4"
            style={{ WebkitTextStroke: `var(--c-stroke-outline)` }}
          >
            {t}
            <span className="mx-6 text-4xl align-middle" style={{ color: "var(--c-accent)" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
