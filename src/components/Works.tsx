"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // gsap.matchMedia：仅在系统未开启「减弱动态效果」时运行入场动画，
    // 否则元素保持自然（可见）状态。
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".section-header", {
          scrollTrigger: { trigger: ".section-header", start: "top 85%" },
          y: 60, opacity: 0, duration: 1, ease: "power3.out",
        });
        gsap.utils.toArray<HTMLElement>(".work-card").forEach((card, i) => {
          gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 85%" },
            y: 80, opacity: 0, duration: 0.8, delay: i * 0.1, ease: "power3.out",
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="works" className="relative py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-header text-center mb-16 md:mb-24">
          <p className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] mb-3" style={{ color: "var(--c-accent)" }}>
            精选作品 / Selected Work
          </p>
          <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter" style={{ color: "var(--c-fg)" }}>
            Featured<br /><span className="gradient-text">Projects</span>
          </h2>
          <p className="max-w-lg mx-auto text-base md:text-lg font-light mt-6" style={{ color: "var(--c-muted)" }}>
            从动画摄影到 AIGC 流程，记录创作进化的每一步。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => {
            // 有外链则整卡可点击跳转，否则用普通容器。
            const Wrapper = project.href ? "a" : "div";
            const wrapperProps = project.href
              ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Wrapper
                key={project.id}
                {...wrapperProps}
                className="work-card group interactive relative block overflow-hidden rounded-2xl transition-all duration-500"
              >
                <div className={`relative overflow-hidden ${project.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]"}`}>
                  {project.image ? (
                    // 真实作品图
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    // 占位块（无真图时）
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{ background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full opacity-20 blur-sm" style={{ background: project.color }} />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="text-8xl md:text-9xl font-extrabold uppercase"
                          style={{ color: project.color, opacity: "var(--c-card-number-opacity)" }}
                        >
                          {String(project.id).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  )}

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to top, var(--c-bg), transparent, transparent)` }}
                  />

                  <div className="absolute top-4 left-4">
                    <span
                      className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border"
                      style={{ borderColor: `${project.color}40`, color: project.color }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center" style={{ borderColor: project.color }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={project.color} strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5 text-center">
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight transition-colors duration-300" style={{ color: "var(--c-fg)" }}>
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono mt-1 inline-block" style={{ color: "var(--c-muted)" }}>{project.category} · {project.year}</span>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
