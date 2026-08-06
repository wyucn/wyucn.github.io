"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "视频剪辑",
  "Motion Design",
  "动画后期",
  "声音处理",
  "质量审阅",
  "模型评测",
  "提示词设计",
  "流程规范",
];

const tools = [
  "After Effects",
  "Premiere Pro",
  "剪映",
  "Codex",
  "Claude",
  "Cursor",
  "Seedance",
  "MiniMax",
  "Wan",
  "LTX",
  "即梦",
  "GPT Image",
  "Qwen3-TTS",
  "RVC",
  "Suno",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".about-reveal", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
          y: 42,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
        });
        gsap.from(".about-portrait-inner", {
          scrollTrigger: { trigger: ".about-portrait", start: "top bottom", end: "bottom top", scrub: true },
          yPercent: -8,
          ease: "none",
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="about-reveal mb-12 md:mb-20">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] md:text-sm" style={{ color: "var(--c-accent)" }}>About / Wang Yu</p>
          <h2 className="display-title text-[clamp(2.8rem,8vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-tighter" style={{ color: "var(--c-fg)" }}>
            Post to<br /><span className="gradient-text">Prompt</span>
          </h2>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div className="about-portrait about-reveal relative mx-auto w-full max-w-xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border" style={{ background: "var(--c-surface)", borderColor: "var(--c-border)" }}>
              <div className="about-portrait-inner absolute -inset-y-[8%] inset-x-0">
                <Image
                  src="/images/avatar.png"
                  alt="王玉"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--c-bg-alpha40), transparent 50%)" }} />
              </div>
              <div className="absolute bottom-5 left-5 right-5 rounded-xl border bg-black/45 p-4 backdrop-blur-md" style={{ borderColor: "rgba(255,255,255,.12)" }}>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
                  <span className="h-2 w-2 rounded-full" style={{ background: "var(--c-accent)" }} />
                  Open to the right opportunity
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="about-reveal space-y-5">
              <p className="text-xl font-light leading-9 md:text-2xl md:leading-10" style={{ color: "var(--c-fg-secondary)" }}>
                我是一名视频后期与动态视觉创作者。自 2020 年进入内容视频行业以来，工作覆盖剪辑、动效、声音处理、质量审阅与最终交付。
              </p>
              <p className="text-sm leading-8 md:text-base" style={{ color: "var(--c-muted)" }}>
                除具体制作外，我也承担任务分发、制作对接、交付标准梳理和知识沉淀，持续改善编导、美术与后期之间的协作方式。
              </p>
              <p className="text-sm leading-8 md:text-base" style={{ color: "var(--c-muted)" }}>
                近一年，我将主要精力投入 AI 探索：一方面持续测试视频、图像、语音和音乐模型；另一方面与 Codex、Claude 协作，把后期团队的真实需求转化为可以使用的平台和工具。
              </p>
            </div>

            <div className="about-reveal rounded-2xl border p-5 md:p-6" style={{ borderColor: "var(--c-accent-30)", background: "var(--c-accent-5)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--c-accent)" }}>How I work with AI</p>
              <p className="mt-3 text-sm leading-7" style={{ color: "var(--c-fg-secondary)" }}>
                我不把自己定位成传统开发者。具体编码主要由 AI 协助完成；我的优势是发现制作问题、定义需求、实际测试并持续反馈，判断工具是否真正适合内容生产。
              </p>
            </div>

            <div className="about-reveal skills-area">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--c-muted)" }}>Capabilities</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="skill-tag tag interactive rounded-full px-4 py-2 text-sm transition-colors duration-300">{skill}</span>
                ))}
              </div>
            </div>

            <div className="about-reveal">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--c-muted)" }}>Tools I actually use</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span key={tool} className="skill-tag tag-mono rounded-lg px-3 py-2 font-mono text-[11px] transition-colors duration-300">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
