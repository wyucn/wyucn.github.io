"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type NetworkInformationLike = {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformationLike;
};

type ViewportEffectProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export default function ViewportEffect({
  children,
  className = "",
  interactive = false,
}: ViewportEffectProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as NavigatorWithConnection).connection;
    const isConstrained = () => {
      const type = connection?.effectiveType;
      return Boolean(
        reducedMotion.matches ||
          connection?.saveData ||
          (type && ["slow-2g", "2g"].includes(type)),
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && !isConstrained()),
      { rootMargin: "240px 0px" },
    );

    const syncPreference = () => {
      if (isConstrained()) setActive(false);
      else observer.observe(host);
    };

    observer.observe(host);
    reducedMotion.addEventListener("change", syncPreference);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPreference);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={`${interactive ? "pointer-events-auto" : "pointer-events-none"} ${className}`}
      aria-hidden="true"
    >
      {active ? children : null}
    </div>
  );
}
