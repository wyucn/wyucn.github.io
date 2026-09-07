"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 开场加载：计数器 0→100 + 玉青进度线 + 字标揭示，随后幕布上滑。
 * - 每个会话只播放一次（sessionStorage）。
 * - prefers-reduced-motion 下完全不渲染。
 * - 幕布升起前派发 wy:preloader-done，供 Hero 入场动画对齐时机。
 */
export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem("wy-preloaded")) return;
      sessionStorage.setItem("wy-preloaded", "1");
    } catch {
      return;
    }
    // 下一帧再挂载，避免在 effect 体内同步 setState 造成级联渲染。
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const root = rootRef.current;
    const counter = counterRef.current;
    const bar = barRef.current;
    if (!root || !counter || !bar) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();
    const COUNT_MS = 1500;
    const LIFT_MS = 850;
    let phase: "count" | "lift" = "count";
    let liftStart = 0;

    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const easeInExpoOut = (t: number) =>
      t < 0.6 ? Math.pow(2, 10 * (t / 0.6 - 1)) * 0.6 : 1 - Math.pow(2, -10 * ((t - 0.6) / 0.4)) * 0.4;

    const step = (now: number) => {
      if (phase === "count") {
        const t = Math.min(1, (now - start) / COUNT_MS);
        const eased = easeInOut(t);
        counter.textContent = String(Math.round(eased * 100)).padStart(3, "0");
        bar.style.transform = `scaleX(${eased})`;
        if (t >= 1) {
          phase = "lift";
          liftStart = now;
          window.dispatchEvent(new CustomEvent("wy:preloader-done"));
        }
      } else {
        const t = Math.min(1, (now - liftStart) / LIFT_MS);
        root.style.transform = `translateY(${-easeInExpoOut(t) * 100}%)`;
        if (t >= 1) {
          document.body.style.overflow = previousOverflow;
          setVisible(false);
          return;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#07090a] will-change-transform"
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 62%, rgba(131,226,202,.09), transparent 42%)",
        }}
      />
      <p className="site-wordmark text-[clamp(2.6rem,7vw,4.6rem)] leading-none text-[#f2f1ec]">
        WANGYU
      </p>
      <p className="mt-3 font-mono text-[10px] font-bold tracking-[0.32em] text-[#83e2ca] uppercase">
        Motion / Tools / 2026
      </p>
      <div className="mt-9 h-px w-[min(320px,58vw)] overflow-hidden bg-white/12">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-[#83e2ca]"
        />
      </div>
      <span
        ref={counterRef}
        className="mt-4 font-mono text-[11px] font-bold tabular-nums tracking-[0.24em] text-white/55"
      >
        000
      </span>
    </div>
  );
}
