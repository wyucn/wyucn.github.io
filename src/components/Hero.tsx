"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const facts = [
  ["2020—NOW", "内容视频行业"],
  ["POST / MOTION", "专业主轴"],
  ["AIGC / TOOLS", "持续探索"],
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".hero-enter", {
          y: 24,
          duration: 0.52,
          stagger: 0.055,
          ease: "power3.out",
        });

        gsap.to(".hero-orbit", {
          rotation: 360,
          duration: 55,
          repeat: -1,
          ease: "none",
        });

        gsap.to(".hero-reel-card", {
          y: -9,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-24 md:px-10 md:pb-24 md:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -right-[12%] top-[2%] h-[32rem] w-[32rem] rounded-full blur-[150px] md:h-[44rem] md:w-[44rem]"
          style={{ background: "var(--c-accent-15)" }}
        />
        <div
          className="absolute -left-[10%] bottom-[-18%] h-[24rem] w-[24rem] rounded-full blur-[145px] md:h-[34rem] md:w-[34rem]"
          style={{ background: "var(--c-action-soft)" }}
        />
        <div className="hero-orbit absolute right-[7%] top-[14%] h-48 w-48 rounded-full border md:h-72 md:w-72" style={{ borderColor: "var(--c-accent-15)" }}>
          <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full" style={{ background: "var(--c-action)" }} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0" style={{ opacity: "var(--c-grid-opacity)" }} aria-hidden="true">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(var(--c-grid) 1px, transparent 1px), linear-gradient(90deg, var(--c-grid) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="hero-enter mb-8 flex flex-wrap items-center justify-between gap-3 border-b pb-5 md:mb-10 md:pb-6" style={{ borderColor: "var(--c-border)" }}>
          <span className="inline-flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.2em] md:text-xs">
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full border" style={{ borderColor: "var(--c-accent-30)" }} aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--c-action)" }} />
            </span>
            <span style={{ color: "var(--c-accent-dark)" }}>Currently working · Open to the right opportunity</span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] md:text-xs" style={{ color: "var(--c-muted)" }}>
            Wang Yu · China / GMT+8
          </span>
        </div>

        <h1 className="hero-enter display-title select-none uppercase" aria-label="王玉，视频后期、Motion Design 与 AI 创意工作流实践者">
          <span className="block text-[clamp(3rem,14.5vw,11.5rem)] font-extrabold leading-[0.72] tracking-[-0.075em]" style={{ color: "var(--c-fg)" }}>
            Motion
          </span>
          <span className="mt-3 flex items-end justify-between gap-4 md:mt-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] md:text-xs" style={{ color: "var(--c-muted)" }}>
              Video Post-Production · Motion Design
            </span>
            <span className="hero-accent-serif whitespace-nowrap text-[clamp(3.4rem,8vw,7.5rem)] italic leading-[0.72] tracking-[-0.06em]" style={{ color: "var(--c-accent)" }}>
              × AI
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-9 lg:mt-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-12">
          <div className="hero-enter">
            <p className="max-w-xl text-xl font-semibold leading-snug md:text-2xl md:leading-snug" style={{ color: "var(--c-fg-secondary)" }}>
              以视频后期与动态视觉为专业基础，把生成式影像、AI 声音和 AI 协作工具带进真实制作流程。
            </p>
            <p className="mt-4 max-w-lg text-sm leading-7 md:text-base md:leading-8" style={{ color: "var(--c-muted)" }}>
              我关注的不只是新模型，而是它们适合解决什么问题，以及如何转化为稳定、可复用的创作方式。
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#showreel" className="btn-accent interactive inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5">
                观看 Showreel <span aria-hidden="true">↓</span>
              </a>
              <a href="#works" className="btn-outline interactive inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5">
                查看 AI 实践 <span aria-hidden="true">↗</span>
              </a>
            </div>

            <dl className="mt-9 grid grid-cols-3 gap-3 border-t pt-5 md:mt-11 md:gap-6 md:pt-6" style={{ borderColor: "var(--c-border)" }}>
              {facts.map(([value, label]) => (
                <div key={value}>
                  <dt className="font-mono text-[9px] font-bold tracking-[0.06em] md:text-xs" style={{ color: "var(--c-fg)" }}>{value}</dt>
                  <dd className="mt-1 text-[10px] leading-4 md:text-xs" style={{ color: "var(--c-muted)" }}>{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-enter">
            <a
              href="#showreel"
              className="hero-reel-card interactive group relative block overflow-hidden rounded-[1.6rem] border p-2 md:rounded-[2rem] md:p-3"
              style={{ borderColor: "var(--c-border-control)", background: "var(--c-surface)" }}
              aria-label="前往观看王玉 2022 至 2025 Showreel"
            >
              <div className="relative aspect-video overflow-hidden rounded-[1.15rem] bg-black md:rounded-[1.45rem]">
                <Image
                  src="/images/showreel-poster.jpg"
                  alt="王玉 2022 至 2025 视频后期与动态视觉 Showreel 封面"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10" />
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-md md:left-5 md:top-5 md:text-[10px]">
                  Motion Reel / 2022—2025
                </div>
                <span className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full text-lg transition-transform duration-300 group-hover:scale-110 md:right-5 md:top-5 md:h-16 md:w-16 md:text-xl" style={{ background: "var(--c-action)", color: "var(--c-bg)" }} aria-hidden="true">
                  ▶
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 md:bottom-5 md:left-5 md:right-5">
                  <span className="max-w-[70%] text-sm font-bold uppercase tracking-[0.08em] text-white md:text-lg">Edit · Motion · Compositing</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/70 md:text-[10px]">60 sec</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
