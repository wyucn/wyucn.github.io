"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const proofPoints = [
  { value: "2020—NOW", label: "视频内容经验" },
  { value: "POST / MOTION", label: "剪辑与动态视觉" },
  { value: "AIGC", label: "生成式内容实践" },
  { value: "AI WORKFLOW", label: "工具与流程探索" },
];

export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".showreel-reveal", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 92%" },
          y: 34,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="showreel" className="relative overflow-hidden px-5 py-20 md:px-10 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--c-accent-30), transparent)" }} />

      <div className="mx-auto max-w-[1400px]">
        <div className="showreel-reveal">
          <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between" style={{ borderColor: "var(--c-border)" }}>
            <p className="font-mono text-xs uppercase tracking-[0.32em] md:text-sm" style={{ color: "var(--c-accent)" }}>
              Motion Reel / 2022—2025
            </p>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] md:text-[10px]" style={{ color: "var(--c-muted)" }}>
              <span>60 seconds</span>
              <span className="h-1 w-1 rounded-full" style={{ background: "var(--c-accent)" }} />
              <span>Edit · Motion · Compositing</span>
            </div>
          </div>

          <div className="relative py-7 md:py-10">
            <h2 className="display-title flex flex-col text-[clamp(2.75rem,7vw,8rem)] font-extrabold uppercase leading-[0.76] tracking-[-0.065em] sm:flex-row sm:items-baseline" aria-label="Showreel">
              <span style={{ color: "var(--c-fg)" }}>Show</span>
              <span className="gradient-text sm:ml-[0.035em]">reel</span>
            </h2>
          </div>

          <div className="grid gap-5 border-t pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end" style={{ borderColor: "var(--c-border)" }}>
            <p className="max-w-2xl text-sm leading-7 md:text-base md:leading-8" style={{ color: "var(--c-muted)" }}>
              60 秒动态视觉与后期作品节选。先看作品，再了解我如何把 AIGC 与工具探索带进真实制作流程。
            </p>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {["SELECTED MOTION", "2022—2025", "01 / 01"].map((item) => (
                <span key={item} className="rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em]" style={{ borderColor: "var(--c-border)", color: "var(--c-muted)" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="showreel-reveal mt-10 rounded-[1.6rem] p-px md:mt-14 md:rounded-[2rem]" style={{ background: "linear-gradient(135deg, var(--c-accent-40), var(--c-border) 38%, var(--c-gradient-tertiary))" }}>
          <div className="relative aspect-video overflow-hidden rounded-[calc(1.6rem-1px)] bg-black md:rounded-[calc(2rem-1px)]">
            <video
              src="/videos/2022-2025.mp4"
              poster="/images/showreel-poster.jpg"
              className="absolute inset-0 h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              aria-label="王玉 2022 至 2025 视频后期与动态视觉 Showreel"
            />
            <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border bg-black/50 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/75 backdrop-blur-md md:left-5 md:top-5" style={{ borderColor: "rgba(255,255,255,.16)" }}>
              Wang Yu / Motion Reel
            </div>
          </div>
        </div>

        <div className="showreel-reveal mx-auto mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border md:mt-10 md:grid-cols-4" style={{ background: "var(--c-border)", borderColor: "var(--c-border)" }}>
          {proofPoints.map((item) => (
            <div key={item.value} className="min-h-28 p-5 md:min-h-32 md:p-6" style={{ background: "var(--c-surface)" }}>
              <div className="text-base font-extrabold md:text-xl" style={{ color: "var(--c-fg)" }}>{item.value}</div>
              <div className="mt-2 text-xs leading-5" style={{ color: "var(--c-muted)" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
