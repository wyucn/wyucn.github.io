"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 仅在系统未开启「减弱动态效果」时播放动画（入场 + 无限装饰动画）。
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.3 });

        tl.from(".hero-line", {
          y: 120,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.15,
        })
          .from(
            subtitleRef.current,
            { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
            "-=0.4"
          )
          .from(
            ".hero-badge",
            { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(2)" },
            "-=0.3"
          )
          .from(
            scrollIndicatorRef.current,
            { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" },
            "-=0.2"
          );

        gsap.to(".hero-bg-gradient", {
          rotation: 360, duration: 30, repeat: -1, ease: "none",
        });

        gsap.to(".floating-shape", {
          y: -20, duration: 3, repeat: -1, yoyo: true, ease: "power1.inOut", stagger: 0.5,
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-bg-gradient absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[150px]" style={{ background: "var(--c-accent)" }} />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[130px]" style={{ background: "var(--c-gradient-secondary)" }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-[120px]" style={{ background: "var(--c-gradient-tertiary)" }} />
        </div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-shape absolute top-[15%] right-[10%] w-20 h-20 rotate-45" style={{ border: "1px solid var(--c-accent-20)" }} />
        <div className="floating-shape absolute bottom-[25%] left-[8%] w-16 h-16 rounded-full" style={{ border: "1px solid var(--c-accent-15)" }} />
        <div className="floating-shape absolute top-[60%] right-[20%] w-12 h-12 rotate-12" style={{ background: "var(--c-accent-5)" }} />
        <div className="floating-shape absolute top-[30%] left-[15%] w-3 h-3 rounded-full" style={{ background: "var(--c-accent)" }} />
        <div className="floating-shape absolute bottom-[35%] right-[12%] w-2 h-2 rounded-full" style={{ background: "var(--c-accent)" }} />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: "var(--c-grid-opacity)" }}>
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(var(--c-grid) 1px, transparent 1px), linear-gradient(90deg, var(--c-grid) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <span
            className="hero-badge inline-block px-4 py-1.5 rounded-full text-xs md:text-sm font-mono uppercase tracking-[0.3em]"
            style={{ border: "1px solid var(--c-accent-30)", color: "var(--c-accent)" }}
          >
            Video Post-Production / AIGC Explorer
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-[clamp(3rem,10vw,9rem)] font-extrabold leading-[0.9] tracking-tighter uppercase"
        >
          <div className="overflow-hidden">
            <div className="hero-line">
              <span style={{ color: "var(--c-fg)" }}>Motion</span>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="hero-line">
              <span className="gradient-text">&amp;</span>
              <span style={{ color: "var(--c-fg)" }}> Vision</span>
            </div>
          </div>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-8 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed"
          style={{ color: "var(--c-muted)" }}
        >
          用动画摄影与风格化渲染，创造令人屏息的视觉体验。
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--c-muted)" }}>
          Scroll
        </span>
        <div className="w-px h-12 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full animate-pulse"
            style={{ background: `linear-gradient(to bottom, var(--c-accent), transparent)` }}
          />
        </div>
      </div>
    </section>
  );
}
