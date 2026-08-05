"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".hero-enter", {
          y: 28,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
        });

        gsap.to(".hero-bg-gradient", {
          rotation: 360,
          duration: 45,
          repeat: -1,
          ease: "none",
        });

        gsap.to(".floating-shape", {
          y: -14,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          stagger: 0.4,
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-12 pt-24 md:min-h-[min(900px,100svh)] md:px-10 md:pb-16 md:pt-28">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-bg-gradient absolute -left-1/2 -top-1/2 h-[200%] w-[200%] opacity-20">
          <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full blur-[130px] md:h-96 md:w-96" style={{ background: "var(--c-accent)" }} />
          <div className="absolute bottom-1/3 right-1/4 h-64 w-64 rounded-full blur-[120px] md:h-80 md:w-80" style={{ background: "var(--c-gradient-secondary)" }} />
          <div className="absolute left-1/2 top-1/2 h-52 w-52 rounded-full blur-[110px] md:h-64 md:w-64" style={{ background: "var(--c-gradient-tertiary)" }} />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="floating-shape absolute right-[9%] top-[17%] h-14 w-14 rotate-45 md:h-20 md:w-20" style={{ border: "1px solid var(--c-accent-20)" }} />
        <div className="floating-shape absolute bottom-[23%] left-[7%] h-12 w-12 rounded-full md:h-16 md:w-16" style={{ border: "1px solid var(--c-accent-15)" }} />
        <div className="floating-shape absolute right-[17%] top-[62%] h-9 w-9 rotate-12 md:h-12 md:w-12" style={{ background: "var(--c-accent-5)" }} />
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ opacity: "var(--c-grid-opacity)" }} aria-hidden="true">
        <div className="h-full w-full" style={{ backgroundImage: "linear-gradient(var(--c-grid) 1px, transparent 1px), linear-gradient(90deg, var(--c-grid) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="hero-enter mb-7 flex flex-wrap items-center justify-between gap-3 md:mb-10">
          <span className="rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] md:text-xs" style={{ borderColor: "var(--c-accent-30)", color: "var(--c-accent)" }}>
            Currently working · Open to the right opportunity
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] md:text-xs" style={{ color: "var(--c-muted)" }}>Wang Yu · China</span>
        </div>

        <h1 className="display-title hero-enter select-none text-[clamp(3.4rem,15vw,11rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.075em]" aria-label="Motion by AI">
          <span className="block whitespace-nowrap" style={{ color: "var(--c-fg)" }}>Motion</span>
          <span className="gradient-text block whitespace-nowrap">× AI</span>
        </h1>

        <div className="mt-9 grid gap-7 md:mt-12 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
          <div className="hero-enter max-w-2xl">
            <p className="text-lg font-semibold leading-relaxed md:text-2xl" style={{ color: "var(--c-fg-secondary)" }}>
              视频后期 · Motion Design · AI Creative Workflow
            </p>
            <p className="mt-3 max-w-xl text-sm leading-7 md:text-base md:leading-8" style={{ color: "var(--c-muted)" }}>
              以视频后期与动态视觉为专业基础，持续探索生成式影像、AI 声音与 AI 协作式工具创造，将创意、工具和真实制作流程连接起来。
            </p>
          </div>

          <div className="hero-enter flex flex-wrap gap-3 md:justify-end">
            <a href="#showreel" className="btn-accent interactive inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5">
              观看 Showreel <span aria-hidden="true">↓</span>
            </a>
            <a href="#works" className="btn-outline interactive inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5">
              查看 AI 实践
            </a>
          </div>
        </div>

        <div className="hero-enter mt-12 grid grid-cols-3 gap-3 border-t pt-5 md:mt-16 md:max-w-2xl md:gap-8 md:pt-6" style={{ borderColor: "var(--c-border)" }}>
          {[
            ["2020—NOW", "内容视频行业"],
            ["POST / MOTION", "专业主轴"],
            ["AIGC / TOOLS", "持续探索"],
          ].map(([value, label]) => (
            <div key={value}>
              <div className="font-mono text-[10px] font-bold tracking-[0.08em] md:text-xs" style={{ color: "var(--c-fg)" }}>{value}</div>
              <div className="mt-1 text-[10px] md:text-xs" style={{ color: "var(--c-muted)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
