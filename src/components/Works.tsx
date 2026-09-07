"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRightIcon from "@/components/ArrowUpRightIcon";
import { projects, type Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const waveform = [24, 42, 68, 38, 84, 54, 96, 44, 72, 30, 88, 58, 36, 78, 50, 66];

function PosterImage({ src, className = "" }: { src: string; className?: string }) {
  return <Image src={src} alt="" fill sizes="(min-width: 768px) 80vw, 100vw" className={`object-cover object-top ${className}`} />;
}

function StudioPoster() {
  return <div className="absolute inset-0 overflow-hidden bg-[#15110f]" aria-hidden="true">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_15%,rgba(255,126,74,.38),transparent_34%),linear-gradient(135deg,#211510_0%,#0d1515_60%,#081011_100%)]" />
    <span className="absolute left-[6%] top-[8%] font-mono text-[9px] tracking-[.18em] text-[#ff9567]">POST / TIMELINE / 01</span>
    <span className="absolute right-[4%] top-[3%] text-[clamp(4rem,11vw,9rem)] font-black leading-none tracking-[-.08em] text-white/[.055]">POST</span>
    <div className="absolute inset-x-[7%] bottom-[10%] top-[18%] overflow-hidden border border-white/18 bg-[#f3f3ed] shadow-[0_30px_80px_rgba(0,0,0,.55)] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-[.35deg]">
      <div className="absolute inset-x-0 top-0 z-10 flex h-5 items-center gap-1.5 border-b border-black/10 bg-[#e9e9e3] px-2.5"><i className="h-1.5 w-1.5 rounded-full bg-[#ff765c]"/><i className="h-1.5 w-1.5 rounded-full bg-[#e8b84c]"/><i className="h-1.5 w-1.5 rounded-full bg-[#8bbf59]"/><span className="ml-auto font-mono text-[7px] tracking-[.14em] text-black/40">HAITUN.POST / PROJECTS</span></div>
      <PosterImage src="/images/projects/post-studio-projects.webp" className="object-[center_28%] opacity-95 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080b0c]/20 via-transparent to-transparent" />
    </div>
    <div className="absolute bottom-[6%] left-[5%] right-[5%] flex h-1 items-end gap-1">{[18, 30, 10, 42, 22, 38, 16].map((width, index) => <i key={index} className="h-full origin-bottom bg-[#ff8656] transition-transform duration-500 group-hover:scale-y-[2.2]" style={{ width: `${width}%`, opacity: .34 + index * .07, transitionDelay: `${index * 35}ms` }} />)}</div>
  </div>;
}

function CanvasPoster() {
  return <div className="absolute inset-0 overflow-hidden bg-[#11101b]" aria-hidden="true">
    <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle,rgba(206,191,255,.3)_1px,transparent_1px)] [background-size:22px_22px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(151,108,255,.42),transparent_34%),radial-gradient(circle_at_80%_75%,rgba(92,231,202,.2),transparent_34%)]" />
    <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 800 560" fill="none"><path className="transition-[stroke-dashoffset] duration-1000 group-hover:[stroke-dashoffset:-28]" d="M70 400C230 390 180 175 360 210S540 120 730 175" stroke="#a890ff" strokeWidth="2" strokeDasharray="5 9"/><path className="transition-[stroke-dashoffset] duration-1000 group-hover:[stroke-dashoffset:24]" d="M90 120C250 120 250 330 430 330S580 420 730 380" stroke="#83e2ca" strokeOpacity=".6" strokeDasharray="10 6"/></svg>
    <div className="absolute left-[5%] top-[11%] h-[56%] w-[78%] overflow-hidden border border-[#b4a5ff]/35 bg-[#e8eded] shadow-[22px_28px_70px_rgba(0,0,0,.45)] transition duration-700 ease-out group-hover:-translate-y-2 group-hover:-rotate-[.6deg]">
      <div className="absolute inset-x-0 top-0 z-10 flex h-4 items-center gap-1 border-b border-black/10 bg-[#edf0ef] px-2"><i className="h-1 w-1 rounded-full bg-[#ff765c]"/><i className="h-1 w-1 rounded-full bg-[#e8b84c]"/><i className="h-1 w-1 rounded-full bg-[#66c8ac]"/><span className="ml-auto font-mono text-[6px] tracking-[.14em] text-black/35">A11IN / WORKFLOW MAP</span></div>
      <PosterImage src="/images/projects/a11in-overview.webp" className="object-center opacity-92" />
    </div>
    <div className="absolute bottom-[7%] right-[4%] h-[50%] w-[63%] overflow-hidden border border-[#83e2ca]/35 bg-[#eef3f2] shadow-[-18px_22px_55px_rgba(0,0,0,.4)] transition duration-700 ease-out group-hover:translate-x-1 group-hover:-translate-y-3 group-hover:rotate-[.7deg]">
      <div className="absolute inset-x-0 top-0 z-10 flex h-4 items-center border-b border-black/10 bg-[#edf0ef] px-2 font-mono text-[6px] tracking-[.14em] text-black/35"><span>NODE DETAIL / 124%</span><span className="ml-auto text-[#16896e]">RUN READY</span></div>
      <PosterImage src="/images/projects/a11in-detail.webp" className="object-center opacity-96" />
    </div>
    <span className="absolute right-[4%] top-[5%] border border-[#83e2ca]/50 bg-[#101417]/80 px-3 py-1 font-mono text-[9px] tracking-[.16em] text-[#9af3dd]">LIVE CANVAS</span>
  </div>;
}

function VoicePoster() {
  return <div className="absolute inset-0 overflow-hidden bg-[#071823]" aria-hidden="true">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(52,194,255,.38),transparent_38%),linear-gradient(145deg,#07111c,#081e2b_55%,#10152c)]" />
    <div className="absolute inset-x-[5%] top-[8%] flex h-[28%] items-center justify-center gap-[clamp(3px,.7vw,8px)]">{waveform.map((height, index) => <i key={index} className="block w-[3px] rounded-full bg-gradient-to-b from-[#7ce8ff] to-[#8172ff] transition-transform duration-500 group-hover:scale-y-125" style={{ height: `${height}%`, transitionDelay: `${index * 16}ms` }} />)}</div>
    <div className="absolute bottom-[9%] left-[6%] h-[57%] w-[61%] overflow-hidden border border-[#70dfff]/30 bg-[#09131c] shadow-[20px_24px_70px_rgba(0,0,0,.5)] transition duration-700 group-hover:-translate-y-2"><PosterImage src="/images/projects/voice-lab-builtins.webp" /></div>
    <div className="absolute bottom-[8%] right-[5%] grid aspect-square w-[31%] place-items-center rounded-full border border-[#7de6ff]/25 bg-[#0a1622]/90 shadow-[0_0_60px_rgba(69,198,255,.16)] transition duration-700 group-hover:scale-105"><div className="grid h-[68%] w-[68%] place-items-center rounded-full border border-[#8b79ff]/50 bg-[radial-gradient(circle,rgba(111,226,255,.38),transparent_65%)] font-mono text-[9px] tracking-[.12em] text-[#aeefff]">24 KHZ</div></div>
  </div>;
}

function FormulaPoster() {
  return <div className="absolute inset-0 overflow-hidden bg-[#e9e6d8] text-[#111412]" aria-hidden="true">
    <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(16,20,18,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(16,20,18,.12)_1px,transparent_1px)] [background-size:38px_38px]" />
    <span className="absolute -left-[2%] top-[1%] font-serif text-[clamp(5rem,14vw,11rem)] italic leading-none text-[#111412]/[.08]">∫</span><span className="absolute right-[5%] top-[7%] font-serif text-[clamp(2.2rem,6vw,5rem)] italic tracking-[-.06em] transition-transform duration-700 group-hover:-translate-x-3">E = mc²</span>
    <div className="absolute bottom-[9%] left-[6%] h-[59%] w-[66%] overflow-hidden border border-black/20 bg-[#171b18] shadow-[20px_24px_0_rgba(16,20,18,.13)] transition duration-700 group-hover:-translate-y-2 group-hover:rotate-[-.7deg]"><PosterImage src="/images/projects/formula-tool-editor.webp" /></div>
    <div className="absolute bottom-[12%] right-[5%] w-[28%] border-l-2 border-[#111412] pl-3 font-mono text-[8px] leading-5 tracking-[.12em]"><span className="block">FORMULA</span><span className="block transition-colors duration-500 group-hover:text-[#167a62]">ALPHA PNG</span><span className="block text-[#167a62] transition-transform duration-500 group-hover:translate-x-1">READY → AE</span></div>
  </div>;
}

function SlidesPoster() {
  return <div className="absolute inset-0 overflow-hidden bg-[#151018]" aria-hidden="true">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(255,86,113,.32),transparent_32%),radial-gradient(circle_at_20%_78%,rgba(93,114,255,.35),transparent_35%)]" />
    <span className="absolute left-[6%] top-[8%] font-mono text-[9px] tracking-[.2em] text-[#ff8aa1]">SLIDE → LAYERS → TIME</span>
    <div className="absolute left-[7%] top-[20%] h-[62%] w-[63%] overflow-hidden border border-white/20 bg-[#111] shadow-[24px_26px_70px_rgba(0,0,0,.5)] transition duration-700 group-hover:-translate-y-2 group-hover:rotate-[-1deg]"><PosterImage src="/images/projects/ppt2ae-empty-interface-wide.webp" /></div>
    <div className="absolute right-[6%] top-[18%] flex h-[62%] w-[22%] flex-col gap-2">{["PPT", "SHAPE", "TEXT", "AE"].map((label, index) => <div key={label} className="grid flex-1 place-items-center border border-white/15 bg-white/[.055] font-mono text-[9px] tracking-[.12em] text-white/70 transition duration-500 group-hover:border-[#ff8aa1]/45 group-hover:bg-[#ff6b91]/10 group-hover:text-white" style={{ transform: `translateX(${index * 5}px)`, transitionDelay: `${index * 55}ms` }}>{label}</div>)}</div>
    <div className="absolute bottom-[6%] right-[6%] h-px w-[38%] bg-gradient-to-r from-[#7f79ff] via-[#ff6b91] to-transparent" />
  </div>;
}

function ProjectPoster({ project }: { project: Project }) {
  if (project.cover === "studio") return <StudioPoster />;
  if (project.cover === "canvas") return <CanvasPoster />;
  if (project.cover === "voice") return <VoicePoster />;
  if (project.cover === "formula") return <FormulaPoster />;
  return <SlidesPoster />;
}

function Card({ project, index }: { project: Project; index: number }) {
  const featured = index === 0 || index === projects.length - 1;
  return <a data-tilt-card className="group block overflow-hidden border border-white/12 bg-[#0d1113] transition-colors duration-500 hover:border-white/32 will-change-transform" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`打开 ${project.title} 的 GitHub 仓库`}>
    <div data-project-poster className={`relative overflow-hidden border-b border-white/12 ${featured ? "aspect-[16/7] max-md:aspect-[4/3]" : "aspect-[4/3]"}`}><ProjectPoster project={project} /></div>
    <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:p-7"><div><p className="font-mono text-[10px] tracking-[0.14em] text-[#83e2ca]">0{index + 1} / {project.category}</p><h3 className="mt-3 text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-none tracking-[-0.045em]">{project.title}</h3></div><div className="flex items-start gap-2 font-mono text-[10px] tracking-[.12em] text-white/48 transition-colors group-hover:text-[#83e2ca]"><span>{project.access === "private" ? "PRIVATE GITHUB" : "VIEW GITHUB"}</span><ArrowUpRightIcon className="text-base transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div></div>
  </a>;
}

export default function Works() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from("[data-project-heading]", { scrollTrigger: { trigger: ref.current, start: "top 88%" }, y: 16, duration: .6, ease: "power3.out" });
        gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card) => {
          gsap.from(card, { scrollTrigger: { trigger: card, start: "top 88%" }, y: 48, opacity: 0, duration: .85, ease: "power3.out" });
          gsap.from(card.querySelector("[data-project-poster]"), { scrollTrigger: { trigger: card, start: "top 88%" }, clipPath: "inset(0 0 18% 0)", duration: 1.05, ease: "power3.out" });
        });
      }, ref);

      // 桌面精指针设备：项目卡片跟随鼠标的轻微 3D 倾斜，离开弹性回位。
      const removers: Array<() => void> = [];
      if (window.matchMedia("(pointer: fine)").matches) {
        gsap.utils.toArray<HTMLElement>("[data-tilt-card]").forEach((card) => {
          gsap.set(card, { transformPerspective: 1000 });
          const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.55, ease: "power3.out" });
          const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.55, ease: "power3.out" });

          const onMove = (event: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;
            rotateY(px * 4.5);
            rotateX(-py * 4.5);
          };
          const onLeave = () => {
            gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.9, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
          };

          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseleave", onLeave);
          removers.push(() => {
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onLeave);
            gsap.killTweensOf(card);
          });
        });
      }

      return () => {
        ctx.revert();
        removers.forEach((remove) => remove());
      };
    });
    return () => media.revert();
  }, []);
  return <section ref={ref} id="works" className="section-dark relative overflow-hidden bg-[#090e11] pb-24 pt-16 md:pb-36 md:pt-20"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(131,226,202,.07),transparent_25%),radial-gradient(circle_at_90%_72%,rgba(125,101,255,.07),transparent_24%)]" aria-hidden="true"/><div className="shell relative"><div data-project-heading className="mb-12 flex items-end justify-between gap-6 border-b border-white/15 pb-7"><div><p className="font-mono text-[11px] tracking-[.12em] text-[#83e2ca]">02 / PROJECTS</p><h2 className="mt-5 text-[clamp(3.5rem,8vw,8rem)] font-extrabold leading-[.88] tracking-[-.06em]">项目</h2></div><p className="hidden text-right font-mono text-[10px] leading-5 tracking-[.12em] text-white/35 md:block">CREATIVE SYSTEMS<br/>BUILT FOR REAL WORK</p></div><div className="grid gap-5 md:grid-cols-2">{projects.map((project, index) => <div key={project.id} data-project className={index === 0 || index === projects.length - 1 ? "md:col-span-2" : undefined}><Card project={project} index={index}/></div>)}</div></div></section>;
}
