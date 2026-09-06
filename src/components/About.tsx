"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".about-reveal", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
          y: 46,
          opacity: 0,
          duration: 0.85,
          stagger: 0.09,
          ease: "power3.out",
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-dark relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,rgba(131,226,202,.07),transparent_34%),linear-gradient(180deg,#090b0d_0%,#0b0f0f_100%)]" aria-hidden="true" />
      <div className="shell">
        <div className="relative mb-10 flex items-end justify-between gap-6 border-b border-white/15 pb-5 font-mono text-[11px] tracking-[0.1em]">
          <p className="text-[#83e2ca]">05 / ABOUT &amp; METHOD</p>
          <p className="hidden text-white/38 sm:block">VIDEO · MOTION · CREATIVE TECHNOLOGY</p>
        </div>
        <div className="relative grid overflow-hidden border border-white/15 bg-[#0e1113] shadow-[0_28px_90px_rgba(0,0,0,.24)] lg:grid-cols-[.78fr_1.22fr]">
          <div className="about-reveal relative min-h-[420px] overflow-hidden border-b border-white/15 bg-[#0a0e0f] sm:min-h-[500px] lg:min-h-[660px] lg:border-b-0 lg:border-r">
            <div
              className="pointer-events-none absolute inset-0 opacity-90 [background-image:radial-gradient(circle_at_50%_38%,rgba(131,226,202,.19),transparent_40%),linear-gradient(180deg,rgba(20,29,29,.52)_0%,rgba(10,14,15,.08)_72%)]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_94%)]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-[7%] bottom-[7%] top-[8%] border border-white/[.08]"
              aria-hidden="true"
            >
              <span className="absolute -left-px -top-px h-8 w-8 border-l border-t border-[#83e2ca]/55" />
              <span className="absolute -bottom-px -right-px h-8 w-8 border-b border-r border-[#83e2ca]/55" />
            </div>
            <div
              className="pointer-events-none absolute left-1/2 top-[12%] aspect-square w-[78%] -translate-x-1/2 rounded-full border border-[rgba(131,226,202,.28)]"
              aria-hidden="true"
            >
              <span className="absolute inset-[13%] rounded-full border border-white/[.08]" />
              <span className="absolute inset-[30%] rounded-full border border-white/[.07]" />
            </div>
            <div className="absolute inset-x-[3%] bottom-0 top-[5%] sm:inset-x-[8%] lg:inset-x-0 lg:top-[8%]">
              <Image
                src="/images/avatar-cutout.webp"
                alt="王玉的卡通头像"
                fill
                sizes="(max-width: 1023px) 100vw, 36vw"
                className="object-contain object-bottom contrast-[1.06] saturate-[1.03] drop-shadow-[0_22px_36px_rgba(0,0,0,.3)]"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 [background-image:linear-gradient(to_top,rgba(10,14,15,.75),transparent)]"
              aria-hidden="true"
            />
            <span className="absolute bottom-4 right-4 z-10 border border-[rgba(131,226,202,.24)] bg-[rgba(9,13,14,.72)] px-3 py-2 font-mono text-[11px] font-semibold tracking-[0.1em] text-[#9af3dd] backdrop-blur-sm sm:bottom-5 sm:right-5">
              视频 / 声音 / 工作流
            </span>
          </div>

          <div className="about-reveal flex flex-col justify-center p-7 md:p-14 lg:p-[clamp(3rem,5.2vw,5.8rem)]">
            <p className="font-mono text-[11px] tracking-[0.1em] text-[#83e2ca]">王玉 / WANGYU</p>
            <h2 className="mt-5 font-sans text-[clamp(3.3rem,6.5vw,6.8rem)] font-extrabold leading-[1.02] tracking-[-0.035em] max-[520px]:leading-[1.04]">
              <span className="block">关于我</span>
              <span className="mt-[0.08em] block text-white/38">工作方式</span>
            </h2>

            <p className="editorial-serif mt-9 max-w-2xl text-[clamp(1.35rem,2.3vw,2rem)] leading-[1.45] text-white/82">
              做好一条片，也建立一套能复用的方法。
            </p>
            <div className="mt-9 grid gap-7 text-sm leading-8 text-white/68 md:grid-cols-2 md:text-[15px]">
              <p className="copy-pretty">
                我有 7 年教育视频、动画与创意内容后期经验。自 2024 年起担任后期组长，工作从剪辑、动效和<span className="keep-phrase">声音处理，</span>延伸到团队统筹、跨部门协作、质量验收与<span className="keep-phrase">最终交付。</span>
              </p>
              <p className="copy-pretty">
                我不是为了展示技术而做工具。海豚后期工作台、AI 创意画布与 Qwen3-TTS Studio，都从真实制作问题出发，由我负责需求定义、流程设计、测试验收与持续迭代。
              </p>
            </div>

            <div className="mt-10 grid gap-5 border-t border-white/15 pt-7 md:grid-cols-[180px_1fr]">
              <span className="text-[11px] font-bold tracking-[0.1em] text-[#83e2ca]">与 AI 协作</span>
              <p className="copy-pretty text-sm leading-7 text-white/68 md:text-[15px]">
                我更关注工具能否真正进入制作：从内容生产现场发现问题、梳理流程，再用任务成功率、团队反馈和交付结果持续验证。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
