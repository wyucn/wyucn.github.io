"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRightIcon from "@/components/ArrowUpRightIcon";
import { projects, type Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

function Placeholder({ project }: { project: Project }) {
  const base = "absolute inset-0 overflow-hidden bg-[#0a0d0f]";
  if (project.cover === "studio") return <div className={base} aria-hidden="true"><div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(131,226,202,.18),transparent_38%)]"/><div className="absolute inset-[10%] grid grid-cols-[.34fr_.66fr] gap-3 rotate-[-2deg]"><div className="border border-white/12 bg-white/[.025] p-3"><i className="block h-1.5 w-12 bg-[#83e2ca]/70"/><i className="mt-5 block h-10 border border-white/10"/><i className="mt-2 block h-10 border border-white/10"/><i className="mt-2 block h-10 border border-white/10"/></div><div className="relative border border-white/12 bg-black/30"><i className="absolute inset-x-[8%] top-[12%] h-[54%] bg-[linear-gradient(135deg,rgba(131,226,202,.24),rgba(113,92,255,.16))]"/><i className="absolute bottom-[10%] left-[8%] right-[8%] h-px bg-white/25 shadow-[0_-12px_rgba(255,255,255,.1),0_12px_rgba(255,255,255,.1)]"/></div></div></div>;
  if (project.cover === "canvas") return <div className={base} aria-hidden="true"><div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:24px_24px]"/><svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 450" fill="none"><path d="M140 120C250 120 205 230 330 220S430 315 500 315" stroke="#83e2ca" strokeOpacity=".65"/><path d="M110 330C210 330 230 245 330 255" stroke="white" strokeOpacity=".18"/><rect x="70" y="82" width="142" height="92" rx="4" fill="#111619" stroke="white" strokeOpacity=".18"/><rect x="270" y="174" width="130" height="96" rx="4" fill="#12141b" stroke="#83e2ca" strokeOpacity=".5"/><rect x="440" y="278" width="110" height="75" rx="4" fill="#111619" stroke="white" strokeOpacity=".18"/><circle cx="140" cy="128" r="24" fill="#7c6cff" fillOpacity=".55"/></svg></div>;
  if (project.cover === "voice") return <div className={base} aria-hidden="true"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(113,92,255,.22),transparent_55%)]"/><div className="absolute inset-x-[8%] top-1/2 flex -translate-y-1/2 items-center justify-center gap-[5px]">{[18,38,62,90,52,110,76,42,96,64,32,74,104,58,28,48,82,38].map((height,index)=><i key={index} className="w-[3px] rounded-full bg-[#83e2ca]" style={{height:`${height}px`,opacity:.35+(index%5)*.12}}/>)}</div><div className="absolute bottom-[14%] left-[8%] font-mono text-[10px] tracking-[.18em] text-white/38">VOICE / LATENT / 24 KHZ</div></div>;
  if (project.cover === "formula") return <div className={base} aria-hidden="true"><div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(131,226,202,.11),transparent_45%)]"/><div className="absolute left-[10%] top-[13%] font-serif text-[clamp(3rem,8vw,7rem)] italic text-white/85">E = mc²</div><div className="absolute bottom-[18%] right-[9%] font-serif text-[clamp(1.6rem,4vw,3.5rem)] text-[#83e2ca]/70">∫ f(x) dx</div><div className="absolute bottom-[13%] left-[9%] h-[36%] w-px bg-white/15 after:absolute after:bottom-0 after:left-0 after:h-px after:w-[300px] after:bg-white/15"/></div>;
  return <div className={base} aria-hidden="true"><div className="absolute left-[9%] top-[14%] h-[62%] w-[46%] rotate-[-6deg] border border-white/20 bg-[linear-gradient(145deg,rgba(124,108,255,.32),rgba(131,226,202,.08))] shadow-[18px_18px_0_rgba(255,255,255,.035)]"><i className="absolute left-[10%] top-[12%] h-2 w-1/3 bg-white/50"/><i className="absolute inset-x-[10%] bottom-[12%] h-[42%] border border-white/12"/></div><div className="absolute right-[9%] top-[24%] font-mono text-[clamp(2rem,5vw,4rem)] text-[#83e2ca]">PPT</div><div className="absolute right-[18%] top-[45%] h-16 w-px bg-gradient-to-b from-[#83e2ca] to-transparent"/><div className="absolute bottom-[16%] right-[9%] font-mono text-[clamp(2rem,5vw,4rem)] text-white/65">AE</div></div>;
}

function Card({ project }: { project: Project }) {
  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/12"><Placeholder project={project} /></div>
      <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:p-7">
        <div>
          <p className="font-mono text-[10px] tracking-[0.12em] text-[#83e2ca]">{project.category} / {project.year}</p>
          <h3 className="mt-3 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold leading-none tracking-[-0.035em]">{project.title}</h3>
        </div>
        <div className="flex items-start gap-2 font-mono text-[10px] tracking-[.1em] text-[#83e2ca]"><span>{project.access === "private" ? "PRIVATE GITHUB" : "GITHUB"}</span><ArrowUpRightIcon className="text-base" /></div>
      </div>
    </>
  );
  const className = "group block overflow-hidden border border-white/12 bg-[#0e1113] transition duration-300 hover:-translate-y-1 hover:border-[#83e2ca]/45";
  return <a className={className} href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`打开 ${project.title} 的 GitHub 仓库`}>{content}</a>;
}

export default function Works() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-project]", { scrollTrigger: { trigger: ref.current, start: "top 75%" }, y: 36, opacity: 0, stagger: 0.08, duration: 0.75, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} id="works" className="section-dark py-24 md:py-36">
      <div className="shell">
        <div className="mb-14 flex flex-col gap-8 border-b border-white/15 pb-10 md:flex-row md:items-end md:justify-between">
          <div><p className="font-mono text-[11px] tracking-[.1em] text-[#83e2ca]">02 / PROJECTS</p><h2 className="mt-5 text-[clamp(3.5rem,8vw,8rem)] font-extrabold leading-[.92] tracking-[-.05em]">项目</h2></div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">{projects.map((project, index) => <div key={project.id} data-project className={index === projects.length - 1 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.625rem)]" : undefined}><Card project={project} /></div>)}</div>
      </div>
    </section>
  );
}
