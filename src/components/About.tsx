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
    <section ref={sectionRef} id="about" className="section-dark py-20 md:py-28">
      <div className="shell">
        <div className="relative grid min-h-[720px] overflow-hidden rounded-lg border border-white/15 bg-[#0e1113] lg:grid-cols-[.72fr_1.28fr]">
          <div className="about-reveal relative min-h-[500px] overflow-hidden border-b border-white/15 bg-[radial-gradient(circle_at_50%_28%,rgba(131,226,202,.13),transparent_38%)] lg:min-h-[720px] lg:border-b-0 lg:border-r">
            <div className="absolute left-1/2 top-[14%] aspect-square w-[76%] -translate-x-1/2 rounded-full border border-[rgba(131,226,202,.3)]" aria-hidden="true">
              <span className="absolute inset-[12%] rounded-full border border-white/10" />
              <span className="absolute inset-[28%] rounded-full border border-white/10" />
            </div>
            <div className="absolute inset-x-0 bottom-0 top-[7%]">
              <Image
                src="/images/avatar.png"
                alt="王玉的卡通头像"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain object-bottom contrast-[1.05] saturate-[1.02]"
              />
            </div>
            <span className="absolute bottom-5 right-5 z-10 text-[10px] tracking-[0.08em] text-[#83e2ca]">视频 / 声音 / 工作流</span>
          </div>

          <div className="about-reveal flex flex-col justify-center p-7 md:p-14 lg:p-[clamp(3.5rem,6vw,6.5rem)]">
            <p className="font-mono text-[11px] tracking-[0.08em] text-[#83e2ca]">05 / 关于</p>
            <h2 className="mt-5 font-sans text-[clamp(3.3rem,6.5vw,6.8rem)] font-extrabold leading-[1.02] tracking-[-0.025em] max-[520px]:leading-[1.04]">
              <span className="block">关于我</span>
              <span className="mt-[0.08em] block text-white/45">工作方式</span>
            </h2>

            <div className="mt-12 grid gap-7 text-sm leading-8 text-white/68 md:grid-cols-2 md:text-[15px]">
              <p className="copy-pretty">
                自 2020 年起，我长期参与教育视频与动画项目，工作从剪辑、动效和<span className="keep-phrase">声音处理</span>，延伸到协作对接与<span className="keep-phrase">最终交付</span>。近一年，我把更多精力投入生成式影像、AI 声音和轻量工具实践。
              </p>
              <p className="copy-pretty">
                在工具项目中，我负责发现问题、定义需求、设计流程、测试验收与持续迭代；具体实现则通过<span className="keep-phrase">AI 协作</span>完成。
              </p>
            </div>

            <div className="mt-12 grid gap-5 border-t border-white/15 pt-7 md:grid-cols-[180px_1fr]">
              <span className="text-[11px] font-semibold tracking-[0.08em] text-[#83e2ca]">与 AI 协作</span>
              <p className="copy-pretty text-sm leading-7 text-white/68 md:text-[15px]">
                我更关注工具能否真正进入制作：从内容生产现场发现问题、梳理流程，再回到实际项目中验证。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
