"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".showreel-reveal", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
          y: 48,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showreel"
      className="section-dark relative overflow-hidden py-28 md:py-40"
    >
      <div
        className="pointer-events-none absolute left-[-12%] top-[-28%] h-[44rem] w-[44rem] rounded-full bg-[rgba(131,226,202,.055)] blur-[150px]"
        aria-hidden="true"
      />

      <div className="shell relative z-10">
        <div className="showreel-reveal grid gap-10 md:grid-cols-[1.15fr_.85fr] md:items-end md:gap-16">
          <div>
            <p className="font-mono text-[9px] font-bold tracking-[0.14em] text-[#83e2ca]">
              01 / 视频作品
            </p>
            <h2 className="mt-5 max-w-3xl text-[clamp(3.8rem,8.5vw,8rem)] font-extrabold leading-[.98] tracking-[-0.045em] max-[820px]:leading-[1.02] max-[520px]:leading-[1.04] max-[520px]:tracking-[-0.025em]">
              <span className="block">视频作品</span>
              <span className="mt-[.08em] block text-white/40">选集</span>
            </h2>
          </div>
          <p className="copy-pretty max-w-xl text-[clamp(1rem,1.5vw,1.35rem)] leading-[1.7] text-white/66 md:justify-self-end">
            收录 2022—2025 年的剪辑、动态视觉、合成与<span className="keep-phrase">声音处理</span>作品。
          </p>
        </div>

        <figure className="showreel-reveal relative mt-16 rounded-[10px] border border-white/15 bg-[#0d1011] px-4 pb-4 pt-14 md:px-10 md:pb-10 md:pt-20">
          <span className="absolute left-5 top-5 font-mono text-[9px] tracking-[0.13em] text-[#83e2ca]">
            作品选集 · 2022—2025
          </span>
          <span className="absolute right-5 top-5 hidden font-mono text-[9px] tracking-[0.12em] text-white/55 sm:block">
            60 秒 / 剪辑 · 动态视觉 · 合成
          </span>
          <span
            className="absolute left-4 top-4 h-5 w-5 border-l border-t border-[#83e2ca]"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-[#83e2ca]"
            aria-hidden="true"
          />

          <div className="relative aspect-video overflow-hidden rounded-[4px] bg-black">
            <video
              src="/videos/2022-2025.mp4"
              poster="/images/showreel-poster.jpg"
              className="absolute inset-0 h-full w-full object-cover"
              controls
              playsInline
              preload="none"
              aria-label="王玉 2022 至 2025 视频后期与动态视觉作品选集"
            />
          </div>
          <figcaption className="copy-pretty mt-4 text-xs leading-6 text-white/56 md:text-sm">
            聚焦剪辑节奏、动态设计、合成与<span className="keep-phrase">声音处理；</span>下方项目展示对应职责与<span className="keep-phrase">工作流程。</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
