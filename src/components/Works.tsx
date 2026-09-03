"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type UIEvent,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRightIcon from "@/components/ArrowUpRightIcon";
import ViewportEffect from "@/components/ViewportEffect";
import FaultyTerminal from "@/components/react-bits/FaultyTerminal";
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
        <span style={{ color }}>
          <ArrowUpRightIcon className="rotate-45 text-xl" />
        </span>
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

function SwipeableProjectMedia({ project, sizes }: { project: Project; sizes: string }) {
  const mediaItems = project.media ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const swipeHintId = useId();

  const scrollToSlide = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const nextIndex = Math.min(Math.max(index, 0), mediaItems.length - 1);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    scroller.scrollTo({
      left: nextIndex * scroller.clientWidth,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActiveIndex(nextIndex);
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const scroller = event.currentTarget;
    if (!scroller.clientWidth) return;

    const nextIndex = Math.min(
      Math.max(Math.round(scroller.scrollLeft / scroller.clientWidth), 0),
      mediaItems.length - 1,
    );
    setActiveIndex((currentIndex) =>
      currentIndex === nextIndex ? currentIndex : nextIndex,
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowLeft") nextIndex = activeIndex - 1;
    if (event.key === "ArrowRight") nextIndex = activeIndex + 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = mediaItems.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    scrollToSlide(nextIndex);
  };

  return (
    <figure className="absolute inset-3 overflow-hidden rounded-[5px] border border-white/15 shadow-[0_24px_70px_rgba(0,0,0,.28)] md:hidden">
      <div
        ref={scrollerRef}
        role="region"
        aria-roledescription="图片轮播"
        aria-label={`${project.title}，共 ${mediaItems.length} 张界面`}
        aria-describedby={swipeHintId}
        tabIndex={project.href ? undefined : 0}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        className="relative flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-[var(--project-accent)] focus-visible:ring-inset motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {mediaItems.map((media, index) => {
          const imageAlt = media.alt || `${project.title} 的第 ${index + 1} 张界面`;

          return (
            <div
              key={media.src}
              role="group"
              aria-roledescription="幻灯片"
              aria-label={`第 ${index + 1} 张，共 ${mediaItems.length} 张`}
              className="relative h-full w-full shrink-0 snap-center snap-always overflow-hidden"
            >
              <Image
                src={media.src}
                alt={imageAlt}
                fill
                sizes={sizes}
                draggable={false}
                className="pointer-events-none select-none"
                style={{
                  objectFit: media.fit ?? "cover",
                  objectPosition: media.position ?? "center",
                  background: media.background ?? "#0e1113",
                }}
              />
            </div>
          );
        })}
      </div>

      <span id={swipeHintId} className="sr-only">
        横向滑动，或使用左右方向键切换界面。
      </span>
      <div className="pointer-events-none absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/78 px-3 py-2 text-white/88 shadow-lg backdrop-blur-md">
        <span className="text-[11px] tracking-[0.06em]">
          左右滑动
        </span>
        <span className="h-3 w-px bg-white/20" aria-hidden="true" />
        <span
          className="min-w-[2.75rem] text-center font-mono text-[11px] tabular-nums"
          aria-live="polite"
          aria-atomic="true"
        >
          {activeIndex + 1} / {mediaItems.length}
        </span>
        <span className="flex items-center gap-1" aria-hidden="true">
          {mediaItems.map((media, index) => (
            <span
              key={media.src}
              className={`h-1 rounded-full transition-[width,background-color] motion-reduce:transition-none ${
                index === activeIndex ? "w-3 bg-[#83e2ca]" : "w-1 bg-white/35"
              }`}
            />
          ))}
        </span>
      </div>

      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" aria-hidden="true" />
    </figure>
  );
}

function DesktopProjectMedia({ project, sizes }: { project: Project; sizes: string }) {
  const mediaItems = project.media ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const hasCardLink = Boolean(project.href);

  return (
    <figure className="absolute inset-5 hidden overflow-hidden rounded-[5px] border border-white/15 shadow-[0_24px_70px_rgba(0,0,0,.28)] md:block">
      {mediaItems.map((media, index) => {
        const isActive = index === activeIndex;
        const imageAlt = media.alt || `${project.title} 的第 ${index + 1} 张界面`;

        return (
          <Image
            key={media.src}
            src={media.src}
            alt={isActive ? imageAlt : ""}
            aria-hidden={!isActive}
            fill
            sizes={sizes}
            draggable={false}
            className={`pointer-events-none select-none transition-opacity duration-500 motion-reduce:transition-none ${isActive ? "opacity-100" : "opacity-0"}`}
            style={{
              objectFit: media.fit ?? "cover",
              objectPosition: media.position ?? "center",
              background: media.background ?? "#0e1113",
            }}
          />
        );
      })}

      {!hasCardLink ? (
        <>
          <div
            role="group"
            aria-label={`${project.title} 界面切换`}
            className="absolute bottom-3 left-3 z-20 flex items-center gap-1 rounded-full border border-white/15 bg-black/80 p-1 shadow-lg backdrop-blur-md"
          >
            <span className="px-1.5 text-[11px] tracking-[0.06em] text-white/65">界面</span>
            {mediaItems.map((media, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={media.src}
                  type="button"
                  aria-label={`显示 ${project.title} 的第 ${index + 1} 张界面`}
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#83e2ca] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    isActive
                      ? "border-[#83e2ca] bg-[#83e2ca] text-[#07090a]"
                      : "border-white/20 text-white/72 hover:border-white/45 hover:text-white"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            当前显示第 {activeIndex + 1} 张，共 {mediaItems.length} 张
          </span>
        </>
      ) : null}

      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" aria-hidden="true" />
    </figure>
  );
}

function ProjectMedia({ project, sizes }: { project: Project; sizes: string }) {
  if (!project.media?.length) {
    return <ProjectVisual type={project.visual} color={project.color} />;
  }

  const hasAlternate = project.media.length > 1;

  if (hasAlternate) {
    return (
      <>
        <SwipeableProjectMedia project={project} sizes={sizes} />
        <DesktopProjectMedia project={project} sizes={sizes} />
      </>
    );
  }

  const [media] = project.media;

  return (
    <figure className="absolute inset-3 overflow-hidden rounded-[5px] border border-white/15 shadow-[0_24px_70px_rgba(0,0,0,.28)] md:inset-5">
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        draggable={false}
        className={`pointer-events-none select-none transition-transform duration-700 ease-out motion-reduce:transition-none ${project.href ? "group-hover:scale-[1.012]" : ""}`}
        style={{
          objectFit: media.fit ?? "cover",
          objectPosition: media.position ?? "center",
          background: media.background ?? "#0e1113",
        }}
      />
      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" aria-hidden="true" />
    </figure>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isLead = Boolean(project.featured);
  const isCompact = project.id >= 4;
  const gridClass = isLead
    ? "lg:col-span-12"
    : project.id === 2
      ? "lg:col-span-6"
      : "lg:col-span-6";
  const hasMedia = Boolean(project.media?.length);
  const visualHeight = isLead
    ? hasMedia
      ? "h-[300px] sm:h-[420px] md:h-[min(62vw,690px)] lg:h-[650px]"
      : "h-[330px] md:h-[500px]"
    : project.id === 2
      ? "h-[240px] sm:h-[300px] md:h-[420px] lg:h-[500px]"
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
        <div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex flex-wrap items-start justify-between gap-2 md:inset-x-5 md:top-5">
          <span className="border-l bg-[rgba(9,11,13,.82)] px-2.5 py-1.5 text-[11px] font-medium tracking-[0.06em] backdrop-blur-md" style={{ borderColor: `${project.color}aa`, color: project.color }}>{project.category}</span>
          {project.mediaLabel ? (
            <span className="shrink-0 rounded-sm border border-white/20 bg-[rgba(9,11,13,.82)] px-2.5 py-1.5 text-[11px] tracking-[0.06em] text-white/78 backdrop-blur-md">
              {project.mediaLabel}
            </span>
          ) : null}
        </div>
        <span className="display-title pointer-events-none absolute bottom-2 right-4 z-10 text-[clamp(4rem,8vw,8rem)] leading-none text-white/[0.12] md:right-6">{String(project.id).padStart(2, "0")}</span>
      </div>

      <div className={`flex flex-1 flex-col p-5 text-white md:p-7 ${isLead ? "lg:grid lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:gap-x-20 lg:p-10" : ""}`}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-[11px] tracking-[0.06em] text-white/60 md:text-xs">
          {isLead ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(131,226,202,.42)] bg-[rgba(131,226,202,.1)] px-3 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-[#a7f0dd] md:text-xs">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#83e2ca] shadow-[0_0_12px_rgba(131,226,202,.72)]" aria-hidden="true" />
              核心项目 · {project.status}
            </span>
          ) : (
            <span>{project.status}</span>
          )}
          <span className={isLead ? "font-mono text-white/62" : undefined}>{project.year}</span>
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
            <span key={tag} className="whitespace-nowrap border-r border-white/18 pr-3 text-xs text-white/62 last:border-r-0 last:pr-0">{tag}</span>
          ))}
        </div>
        {isLead && project.proof ? (
          <dl className="mt-8 grid border-l border-t border-white/15 sm:grid-cols-3 lg:col-span-2">
            {project.proof.map((item) => (
              <div key={item.label} className="min-w-0 border-b border-r border-white/15 p-4 md:p-5">
                <dt className="font-mono text-[10px] tracking-[0.12em] text-[#83e2ca]">{item.label}</dt>
                <dd className="mt-2 text-sm font-semibold leading-6 text-white/88 md:text-[15px]">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {project.href && (
          <div className={`mt-auto flex items-center justify-end pt-6 text-xs font-semibold tracking-[0.08em] text-[#83e2ca] ${isLead ? "lg:col-start-2" : ""}`}>
            访问项目 <ArrowUpRightIcon className="ml-2 text-sm" />
          </div>
        )}
      </div>
    </>
  );

  const className = `group relative flex h-full min-w-0 flex-col overflow-hidden border border-white/12 ${
    project.href
      ? "transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--project-accent)]"
      : ""
  }`;
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
    <section ref={sectionRef} id="works" className="section-dark relative overflow-hidden py-24 md:py-36">
      <ViewportEffect className="mobile-terminal absolute inset-x-0 top-0 h-[38rem] opacity-[.16] [mask-image:linear-gradient(to_bottom,black,transparent)]">
        <FaultyTerminal
          className=""
          style={{}}
          tint="#83e2ca"
          scale={1.7}
          gridMul={[2, 1]}
          digitSize={1.1}
          timeScale={0.36}
          scanlineIntensity={0.45}
          glitchAmount={0.72}
          flickerAmount={0.5}
          noiseAmp={0.25}
          curvature={0.04}
          mouseReact={false}
          brightness={0.72}
        />
      </ViewportEffect>
      <div className="shell relative z-10">
        <div className="mb-14 grid gap-9 md:mb-16 md:grid-cols-[1.05fr_.95fr] md:items-end md:gap-20">
          <div>
            <p className="mb-5 font-mono text-[11px] tracking-[0.08em] text-[#83e2ca]">02 / 项目</p>
            <h2 className="font-sans text-[clamp(3.3rem,7.5vw,7.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em] max-[520px]:leading-[1.04]">
              <span className="block">项目</span>
              <span className="mt-[0.08em] block text-white/45">工作流实践</span>
            </h2>
          </div>
          <div className="max-w-xl md:justify-self-end">
            <p className="copy-pretty text-[clamp(1rem,1.45vw,1.35rem)] leading-[1.7] text-white/62">
              <span className="keep-phrase">Haitun Post Studio</span> 已投入团队使用并持续迭代。围绕提示词、本地声音与后期自动化的其他实践，也都来自真实制作中的具体问题。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          <ProjectCard project={projects[0]} />
          <div className="work-card-reveal flex items-center justify-between gap-5 border-y border-white/15 py-5 lg:col-span-12">
            <span className="font-mono text-[11px] tracking-[0.12em] text-[#83e2ca]">SELECTED PRACTICES</span>
            <span className="text-[11px] tracking-[0.08em] text-white/45">05 个制作现场中的工具实践</span>
          </div>
          {projects.slice(1).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
