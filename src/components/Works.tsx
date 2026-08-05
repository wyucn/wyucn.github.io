"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  projects,
  type Project,
  type ProjectVisual as ProjectVisualType,
} from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

function ProjectVisual({ type, color }: { type: ProjectVisualType; color: string }) {
  if (type === "studio") {
    return (
      <div className="absolute inset-0 p-5 md:p-8" aria-hidden="true">
        <div className="grid h-full grid-cols-[1.35fr_0.65fr] gap-3 md:gap-5">
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-sm md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((item) => (
                  <span key={item} className="h-2 w-2 rounded-full" style={{ background: item === 0 ? color : "rgba(255,255,255,.18)" }} />
                ))}
              </div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-white/35 md:text-[10px]">POST STUDIO</span>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-2 md:gap-3">
              {["IMAGE", "VIDEO", "MUSIC", "VOICE"].map((label, index) => (
                <div key={label} className="relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.04] p-3">
                  <span className="font-mono text-[9px] tracking-widest text-white/35">{label}</span>
                  <div className="absolute bottom-3 left-3 right-3 h-1 rounded-full bg-white/8">
                    <div className="h-full rounded-full" style={{ width: `${48 + index * 12}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 md:gap-5">
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-3 md:p-5">
              <span className="font-mono text-[9px] tracking-widest text-white/35">TASKS</span>
              <div className="mt-4 space-y-2">
                {[82, 64, 91].map((width, index) => (
                  <div key={width} className="rounded-lg border border-white/8 p-2">
                    <div className="mb-2 h-1.5 rounded-full bg-white/10" style={{ width: `${54 + index * 14}%` }} />
                    <div className="h-1 rounded-full" style={{ width: `${width}%`, background: `${color}99` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border p-4" style={{ borderColor: `${color}55`, background: `${color}12` }}>
              <div className="text-2xl font-extrabold md:text-4xl" style={{ color }}>AI</div>
              <div className="mt-1 font-mono text-[8px] tracking-[0.18em] text-white/45 md:text-[10px]">CREATIVE WORKSPACE</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "music") {
    const bars = [24, 42, 68, 34, 78, 52, 88, 46, 70, 30, 58, 82, 44, 66, 26];
    return (
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="absolute h-44 w-44 rounded-full border border-white/10 md:h-56 md:w-56" />
        <div className="absolute h-28 w-28 rounded-full border md:h-36 md:w-36" style={{ borderColor: `${color}60` }} />
        <div className="absolute h-10 w-10 rounded-full" style={{ background: color, boxShadow: `0 0 60px ${color}88` }} />
        <div className="absolute inset-x-8 bottom-10 flex h-20 items-end justify-center gap-1 md:inset-x-16 md:bottom-14 md:h-24 md:gap-1.5">
          {bars.map((height, index) => (
            <span key={`${height}-${index}`} className="w-1.5 rounded-full md:w-2" style={{ height: `${height}%`, background: index % 3 === 0 ? color : "rgba(255,255,255,.24)" }} />
          ))}
        </div>
      </div>
    );
  }

  if (type === "prompt") {
    return (
      <div className="absolute inset-0 p-6 md:p-8" aria-hidden="true">
        <div className="mx-auto flex h-full max-w-md flex-col justify-center gap-3">
          {["@图片1  主体与构图", "00:00—00:05  运镜与动作", "风格 / 光线 / 声音", "负向约束与收尾"].map((line, index) => (
            <div key={line} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm" style={{ transform: `translateX(${index % 2 === 0 ? -10 : 10}px)` }}>
              <span className="font-mono text-[10px]" style={{ color }}>{String(index + 1).padStart(2, "0")}</span>
              <span className="text-xs text-white/60 md:text-sm">{line}</span>
            </div>
          ))}
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[86%] rounded-full" style={{ background: color }} />
          </div>
        </div>
      </div>
    );
  }

  if (type === "formula") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6" aria-hidden="true">
        <div className="font-serif text-3xl text-white/85 md:text-5xl">∫ f(x) dx = F(x) + C</div>
        <div className="mt-7 flex w-full max-w-sm items-center gap-3">
          <span className="font-mono text-[9px] tracking-widest text-white/35">LATEX</span>
          <div className="h-px flex-1" style={{ background: `${color}88` }} />
          <span className="font-mono text-[9px] tracking-widest" style={{ color }}>AE SVG</span>
        </div>
        <div className="mt-6 grid w-full max-w-sm grid-cols-3 gap-2">
          {["TEXT", "IMAGE", "EXPORT"].map((item, index) => (
            <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-3 text-center font-mono text-[9px] tracking-wider" style={{ color: index === 2 ? color : "rgba(255,255,255,.35)" }}>{item}</div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "slides") {
    return (
      <div className="absolute inset-0 flex items-center justify-center gap-4 px-6 md:gap-8" aria-hidden="true">
        <div className="relative aspect-[4/3] w-[38%] rotate-[-5deg] rounded-xl border border-white/15 bg-white/[0.06] p-3 shadow-2xl md:p-5">
          <div className="h-2 w-1/2 rounded-full" style={{ background: color }} />
          <div className="mt-4 space-y-2">
            <div className="h-1.5 w-full rounded-full bg-white/12" />
            <div className="h-1.5 w-4/5 rounded-full bg-white/12" />
          </div>
          <span className="absolute bottom-3 right-3 font-mono text-[10px] text-white/35">PPT</span>
        </div>
        <div className="font-mono text-xl" style={{ color }}>→</div>
        <div className="relative aspect-[4/3] w-[38%] rotate-[5deg] rounded-xl border bg-black/40 p-3 shadow-2xl md:p-5" style={{ borderColor: `${color}66` }}>
          <div className="absolute inset-3 rounded-lg border border-dashed border-white/15" />
          <div className="absolute left-[28%] top-[32%] h-[30%] w-[44%] rounded-md" style={{ background: `${color}55` }} />
          <span className="absolute bottom-3 right-3 font-mono text-[10px]" style={{ color }}>AE</span>
        </div>
      </div>
    );
  }

  const bars = [38, 62, 28, 86, 48, 72, 35, 92, 56, 76, 31, 66, 44, 82, 52, 70, 36];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-7" aria-hidden="true">
      <div className="flex h-28 w-full max-w-lg items-center justify-center gap-1 md:gap-1.5">
        {bars.map((height, index) => (
          <span key={`${height}-${index}`} className="w-1.5 rounded-full md:w-2" style={{ height: `${height}%`, background: index % 4 === 0 ? color : "rgba(255,255,255,.2)" }} />
        ))}
      </div>
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        {["VOICE DESIGN", "TTS", "CLONE", "RVC"].map((item, index) => (
          <span key={item} className="rounded-full border px-3 py-1 font-mono text-[9px] tracking-widest" style={{ borderColor: index === 0 ? `${color}88` : "rgba(255,255,255,.12)", color: index === 0 ? color : "rgba(255,255,255,.4)" }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <div className={`relative overflow-hidden ${project.featured ? "aspect-[16/9] md:aspect-[21/8]" : "aspect-[16/10]"}`} style={{ background: `radial-gradient(circle at 22% 20%, ${project.color}28, transparent 38%), linear-gradient(145deg, #151515, #090909)` }}>
        <ProjectVisual type={project.visual} color={project.color} />
        <div className="absolute left-4 top-4 flex items-center gap-2 md:left-5 md:top-5">
          <span className="rounded-full border bg-black/35 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] backdrop-blur-md md:text-[10px]" style={{ borderColor: `${project.color}55`, color: project.color }}>{project.category}</span>
        </div>
        <span className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.2em] text-white/30 md:bottom-5 md:right-5">{String(project.id).padStart(2, "0")}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-7">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--c-muted)" }}>
          <span>{project.status}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl" style={{ color: "var(--c-fg)" }}>{project.title}</h3>
        <p className="mt-4 text-sm leading-7 md:text-base" style={{ color: "var(--c-muted)" }}>{project.description}</p>
        <p className="mt-5 border-l-2 pl-3 text-xs leading-6 md:text-sm" style={{ borderColor: project.color, color: "var(--c-fg-secondary)" }}>{project.role}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border px-3 py-1.5 text-[11px]" style={{ borderColor: "var(--c-border)", color: "var(--c-muted)" }}>{tag}</span>
          ))}
        </div>
        {project.href && (
          <div className="mt-auto flex items-center justify-end gap-2 pt-7 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: project.color }}>
            View live product
            <span aria-hidden="true">↗</span>
          </div>
        )}
      </div>
    </>
  );

  const className = `work-card group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 ${project.featured ? "md:col-span-2" : ""}`;

  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" className={`${className} interactive`} aria-label={`打开 ${project.title}`}>
        {content}
      </a>
    );
  }

  return <article className={className}>{content}</article>;
}

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".work-card", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
          y: 48,
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
    <section ref={sectionRef} id="works" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-8 md:mb-20 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] md:text-sm" style={{ color: "var(--c-accent)" }}>精选实践 / Selected Work</p>
            <h2 className="display-title text-[clamp(2.8rem,8vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-tighter" style={{ color: "var(--c-fg)" }}>
              Real Work<br /><span className="gradient-text">Real Use</span>
            </h2>
          </div>
          <div className="max-w-xl md:justify-self-end">
            <p className="text-base leading-8 md:text-lg" style={{ color: "var(--c-muted)" }}>
              从团队协作平台到提示词、公式、PPT 与本地声音工具，这些项目都来自真实制作问题。我的重点是定义需求、判断结果，并与 AI 持续协作把工具推进到可用。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  );
}
