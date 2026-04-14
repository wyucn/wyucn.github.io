"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "动画摄影", "MG动画", "风格化渲染", "AIGC Workflow",
  "合成特效", "调色", "三维动画", "视觉设计",
];

const tools = [
  "After Effects", "Premiere Pro", "Blender",
  "ComfyUI", "Cursor", "DaVinci Resolve",
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-text-block", {
        scrollTrigger: { trigger: ".about-text-block", start: "top 80%" },
        y: 50, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.15,
      });
      gsap.from(".about-portrait", {
        scrollTrigger: { trigger: ".about-portrait", start: "top 80%" },
        scale: 0.9, opacity: 0, duration: 1, ease: "power3.out",
      });
      gsap.from(".skill-tag", {
        scrollTrigger: { trigger: ".skills-area", start: "top 85%" },
        y: 20, opacity: 0, duration: 0.5, ease: "power2.out", stagger: 0.05,
      });
      gsap.from(".about-portrait-inner", {
        scrollTrigger: { trigger: ".about-portrait", start: "top bottom", end: "bottom top", scrub: true },
        yPercent: -15, ease: "none",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="about-text-block text-center mb-16 md:mb-24">
          <p className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] mb-3" style={{ color: "var(--c-accent)" }}>
            About Me
          </p>
          <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter" style={{ color: "var(--c-fg)" }}>
            Motion<br /><span className="gradient-text">Crafter</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Portrait */}
          <div className="about-portrait relative mx-auto w-full">
            <div
              className="relative rounded-2xl overflow-hidden aspect-[3/4]"
              style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}
            >
              <div className="about-portrait-inner absolute inset-0">
                <Image src="/images/avatar.png" alt="王玉" fill className="object-cover object-center" priority />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--c-bg-alpha40), transparent)" }} />
              </div>
            </div>
            <div className="absolute -top-3 -right-3 w-20 h-20 rounded-tr-2xl" style={{ borderTop: "2px solid var(--c-accent-30)", borderRight: "2px solid var(--c-accent-30)" }} />
            <div className="absolute -bottom-3 -left-3 w-20 h-20 rounded-bl-2xl" style={{ borderBottom: "2px solid var(--c-accent-30)", borderLeft: "2px solid var(--c-accent-30)" }} />
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-8">
            <div className="about-text-block space-y-4">
              <p className="text-lg md:text-xl leading-relaxed font-light" style={{ color: "var(--c-fg-secondary)" }}>
                视频后期创作者，专注动画摄影与风格化视觉表达，始终追随 AIGC 前沿。现就职于猿力未来。
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--c-muted)" }}>
                从平面 MG 动画到三维风格化渲染，我在后期创作中不断探索视觉的边界。结合 ComfyUI 与 Cursor 等 AI 工具，将 AIGC 融入实际制作流程，用技术驱动创意。
              </p>
            </div>

            <div className="about-text-block skills-area">
              <h3 className="text-sm font-mono uppercase tracking-[0.2em] mb-4" style={{ color: "var(--c-muted)" }}>
                Skills &amp; Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag px-4 py-2 rounded-full text-sm interactive transition-colors duration-300"
                    style={{ border: "1px solid var(--c-border)", color: "var(--c-fg-secondary)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--c-accent)"; e.currentTarget.style.color = "var(--c-accent)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--c-border)"; e.currentTarget.style.color = "var(--c-fg-secondary)"; }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="about-text-block">
              <h3 className="text-sm font-mono uppercase tracking-[0.2em] mb-4" style={{ color: "var(--c-muted)" }}>
                Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono transition-colors duration-300"
                    style={{ background: "var(--c-surface)", color: "var(--c-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-muted)")}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="about-text-block">
              <a
                href="#contact"
                className="interactive inline-flex items-center gap-3 px-6 py-3 font-bold uppercase tracking-wider text-sm rounded-full transition-colors duration-300"
                style={{ background: "var(--c-accent)", color: "var(--c-bg)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--c-accent-dark)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--c-accent)")}
              >
                下载简历
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
