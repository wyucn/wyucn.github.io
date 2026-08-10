"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
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
          <div className="flex flex-col gap-3 rounded-md border border-white/10 bg-black/35 p-4 backdrop-blur-sm md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((item) => (
                  <span key={item} className="h-2 w-2 rounded-full" style={{ background: item === 0 ? color : "rgba(255,255,255,.18)" }} />
                ))}
              </div>
              <span className="text-[9px] tracking-[0.08em] text-white/40 md:text-[10px]">HAITUN POST STUDIO</span>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-2 md:gap-3">
              {["图像", "视频", "音乐", "配音"].map((label, index) => (
                <div key={label} className="relative overflow-hidden rounded-sm border border-white/8 bg-white/[0.04] p-3">
                  <span className="text-[9px] tracking-[0.08em] text-white/40">{label}</span>
                  <div className="absolute bottom-3 left-3 right-3 h-1 rounded-full bg-white/8">
                    <div className="h-full rounded-full" style={{ width: `${48 + index * 12}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 md:gap-5">
            <div className="flex-1 rounded-md border border-white/10 bg-white/[0.04] p-3 md:p-5">
              <span className="text-[9px] tracking-[0.08em] text-white/40">任务</span>
              <div className="mt-4 space-y-2">
                {[82, 64, 91].map((width, index) => (
                  <div key={width} className="rounded-sm border border-white/8 p-2">
                    <div className="mb-2 h-1.5 rounded-full bg-white/10" style={{ width: `${54 + index * 14}%` }} />
                    <div className="h-1 rounded-full" style={{ width: `${width}%`, background: `${color}99` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-md border p-4" style={{ borderColor: `${color}55`, background: `${color}12` }}>
              <div className="text-2xl font-extrabold md:text-4xl" style={{ color }}>AI</div>
              <div className="mt-1 text-[9px] tracking-[0.08em] text-white/45 md:text-[10px]">创作<span className="keep-phrase">工作空间</span></div>
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
        <div className="absolute h-10 w-10 rounded-full" style={{ background: color, boxShadow: `0 0 34px ${color}55` }} />
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
            <div key={line} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm" style={{ transform: `translateX(${index % 2 === 0 ? -10 : 10}px)` }}>
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
        <div className="whitespace-nowrap font-serif text-[clamp(1.35rem,7vw,1.875rem)] text-white/85 md:text-5xl">∫ f(x) dx = F(x) + C</div>
        <div className="mt-7 flex w-full max-w-sm items-center gap-3">
          <span className="font-mono text-[9px] tracking-widest text-white/35">LaTeX</span>
          <div className="h-px flex-1" style={{ background: `${color}88` }} />
          <span className="font-mono text-[9px] tracking-widest" style={{ color }}>AE SVG</span>
        </div>
        <div className="mt-6 grid w-full max-w-sm grid-cols-3 gap-2">
          {["文本", "图像", "导出"].map((item, index) => (
            <div key={item} className="rounded-sm border border-white/10 bg-white/[0.04] px-2 py-3 text-center text-[9px] tracking-[0.08em]" style={{ color: index === 2 ? color : "rgba(255,255,255,.4)" }}>{item}</div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "slides") {
    return (
      <div className="absolute inset-0 flex items-center justify-center gap-4 px-6 md:gap-8" aria-hidden="true">
        <div className="relative aspect-[4/3] w-[38%] rotate-[-5deg] rounded-md border border-white/15 bg-white/[0.06] p-3 shadow-2xl md:p-5">
          <div className="h-2 w-1/2 rounded-full" style={{ background: color }} />
          <div className="mt-4 space-y-2">
            <div className="h-1.5 w-full rounded-full bg-white/12" />
            <div className="h-1.5 w-4/5 rounded-full bg-white/12" />
          </div>
          <span className="absolute bottom-3 right-3 font-mono text-[10px] text-white/35">PPT</span>
        </div>
        <div className="font-mono text-xl" style={{ color }}>→</div>
        <div className="relative aspect-[4/3] w-[38%] rotate-[5deg] rounded-md border bg-black/40 p-3 shadow-2xl md:p-5" style={{ borderColor: `${color}66` }}>
          <div className="absolute inset-3 rounded-sm border border-dashed border-white/15" />
          <div className="absolute left-[28%] top-[32%] h-[30%] w-[44%] rounded-sm" style={{ background: `${color}55` }} />
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
        {["音色设计", "TTS", "克隆", "RVC"].map((item, index) => (
          <span key={item} className="border-b px-1 py-1 text-[9px] tracking-[0.08em]" style={{ borderColor: index === 0 ? `${color}88` : "rgba(255,255,255,.12)", color: index === 0 ? color : "rgba(255,255,255,.45)" }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectMedia({ project, sizes }: { project: Project; sizes: string }) {
  if (!project.media?.length) {
    return <ProjectVisual type={project.visual} color={project.color} />;
  }

  const hasAlternate = project.media.length > 1;

  return (
    <figure className="absolute inset-3 overflow-hidden rounded-[5px] border border-white/15 shadow-[0_24px_70px_rgba(0,0,0,.28)] md:inset-5">
      {project.media.map((media, index) => {
        const isAlternate = index > 0;
        const visibilityClass = isAlternate
          ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          : hasAlternate
            ? "opacity-100 group-hover:opacity-0 group-focus-visible:opacity-0"
            : "opacity-100";

        return (
          <Image
            key={media.src}
            src={media.src}
            alt={media.alt}
            fill
            sizes={sizes}
            className={`transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.012] ${visibilityClass}`}
            style={{
              objectFit: media.fit ?? "cover",
              objectPosition: media.position ?? "center",
              background: media.background ?? "#0e1113",
            }}
          />
        );
      })}
      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" aria-hidden="true" />
    </figure>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isLead = project.id === 1;
  const isCompact = project.id >= 4;
  const gridClass = isLead
    ? "lg:col-span-6 xl:col-span-8"
    : project.id === 2
      ? "lg:col-span-6 xl:col-span-4"
      : "lg:col-span-6";
  const hasMedia = Boolean(project.media?.length);
  const visualHeight = isLead
    ? hasMedia
      ? "h-[190px] md:h-[500px]"
      : "h-[330px] md:h-[500px]"
    : project.id === 2
      ? "h-[270px] md:h-[500px]"
    : isCompact
      ? hasMedia
        ? "h-[190px] md:h-[340px]"
        : "h-[220px] md:h-[310px]"
      : hasMedia
        ? "h-[190px] md:h-[370px]"
        : "h-[270px] md:h-[370px]";
  const imageSizes = isLead
    ? "(min-width: 1280px) 64vw, (min-width: 1024px) 50vw, 100vw"
    : "(min-width: 1024px) 50vw, 100vw";

  const content = (
    <>
      <div className={`relative overflow-hidden ${visualHeight}`} style={{ background: `radial-gradient(circle at 22% 20%, ${project.color}28, transparent 38%), linear-gradient(145deg, #151915, #090b0d)` }}>
        <ProjectMedia project={project} sizes={imageSizes} />
        {project.media ? (
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,11,13,.14),transparent_34%,rgba(9,11,13,.42))]" aria-hidden="true" />
        ) : null}
        <div className="absolute inset-x-4 top-4 z-10 flex flex-wrap items-start justify-between gap-2 md:inset-x-5 md:top-5">
          <span className="border-l bg-[rgba(9,11,13,.78)] px-2 py-1.5 text-[9px] tracking-[0.07em] backdrop-blur-md md:text-[10px]" style={{ borderColor: `${project.color}aa`, color: project.color }}>{project.category}</span>
          {project.mediaLabel ? (
            <span className="shrink-0 rounded-sm border border-white/15 bg-[rgba(9,11,13,.78)] px-2 py-1.5 text-[8px] tracking-[0.08em] text-white/68 backdrop-blur-md md:text-[9px]">
              {project.mediaLabel}
            </span>
          ) : null}
        </div>
        <span className="display-title absolute bottom-2 right-4 z-10 text-[clamp(4rem,8vw,8rem)] leading-none text-white/[0.12] md:right-6">{String(project.id).padStart(2, "0")}</span>
      </div>

      <div className={`flex flex-1 flex-col p-5 text-white md:p-7 ${isLead ? "lg:grid lg:grid-cols-[1fr_1fr] lg:gap-x-16" : ""}`}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-[10px] tracking-[0.06em] text-white/45 md:text-[11px]">
          <span>{project.status}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="text-balance text-[clamp(1.7rem,3vw,2.8rem)] font-semibold leading-[1.15] tracking-[-0.025em] max-[520px]:text-[min(1.7rem,8.5vw)]">{project.title}</h3>
        <p className={`copy-pretty mt-3 text-sm leading-7 text-white/64 md:text-[15px] ${isLead ? "lg:col-start-2 lg:row-start-1 lg:mt-0" : ""}`}>{project.description}</p>
        <div className={`mt-4 flex flex-wrap gap-x-2 gap-y-1 border-l-2 pl-3 text-xs font-medium leading-6 text-white/80 md:text-sm ${isLead ? "lg:col-start-1" : ""}`} style={{ borderColor: project.color }}>
          {project.role.map((item, index) => (
            <span key={item} className="inline-flex whitespace-nowrap">
              {index > 0 ? <span className="mr-2 text-white/28" aria-hidden="true">·</span> : null}
              {item}
            </span>
          ))}
        </div>
        <div className={`mt-5 flex flex-wrap gap-x-3 gap-y-2 ${isLead ? "lg:col-start-2" : ""}`}>
          {project.tags.map((tag) => (
            <span key={tag} className="whitespace-nowrap border-r border-white/15 pr-3 text-[11px] text-white/48 last:border-r-0 last:pr-0">{tag}</span>
          ))}
        </div>
        {project.href && (
          <div className={`mt-auto flex items-center justify-end pt-6 text-xs font-semibold tracking-[0.08em] text-[#83e2ca] ${isLead ? "lg:col-start-2" : ""}`}>
            访问项目 <span className="ml-2" aria-hidden="true">↗</span>
          </div>
        )}
      </div>
    </>
  );

  const className = "group relative flex h-full min-w-0 flex-col overflow-hidden border border-white/12 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--project-accent)]";
  const wrapperClassName = `work-card-reveal ${gridClass}`;
  const cardStyle = {
    background: "#0e1113",
    borderRadius: "8px",
    "--project-accent": project.color,
  } as CSSProperties;

  if (project.href) {
    return (
      <div className={wrapperClassName}>
        <a href={project.href} target="_blank" rel="noopener noreferrer" className={className} style={cardStyle} aria-label={`打开 ${project.title}`}>
          {content}
        </a>
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
      <article className={className} style={cardStyle}>{content}</article>
    </div>
  );
}

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".work-card-reveal", {
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
    <section ref={sectionRef} id="works" className="section-dark relative py-28 md:py-44">
      <div className="shell">
        <div className="mb-16 grid gap-10 md:mb-20 md:grid-cols-[1.05fr_.95fr] md:items-end md:gap-20">
          <div>
            <p className="mb-5 font-mono text-[11px] tracking-[0.08em] text-[#83e2ca]">02 / 项目</p>
            <h2 className="font-sans text-[clamp(3.3rem,7.5vw,7.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em] max-[520px]:leading-[1.04]">
              <span className="block">项目与</span>
              <span className="mt-[0.08em] block text-white/45">工具实践</span>
            </h2>
          </div>
          <div className="max-w-xl md:justify-self-end">
            <p className="copy-pretty text-[clamp(1rem,1.45vw,1.35rem)] leading-[1.7] text-white/62">
              这些项目都从真实制作问题出发，把<span className="keep-phrase">AIGC 协作、</span>提示词、本地声音与后期自动化转化为可用的工具和流程。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
