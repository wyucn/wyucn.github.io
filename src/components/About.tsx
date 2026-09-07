"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from("[data-about-copy]", {
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
          y: 34,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        });
        gsap.from("[data-about-portrait]", {
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
          clipPath: "inset(16% 0 0 0)",
          y: 42,
          duration: 1.05,
          ease: "power3.out",
        });
        gsap.from("[data-about-line]", {
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.15,
          ease: "power3.inOut",
        });
      }, ref);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={ref} id="about" className="section-dark relative isolate overflow-hidden border-t border-white/10 bg-[#0b0c0d] py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_45%,rgba(131,226,202,.13),transparent_30%),linear-gradient(120deg,transparent_0%,transparent_55%,rgba(255,255,255,.025)_55%,rgba(255,255,255,.025)_55.2%,transparent_55.2%)]" aria-hidden="true" />
      <div className="shell relative">
        <div data-about-copy className="flex items-center justify-between border-b border-white/15 pb-5">
          <p className="font-mono text-[11px] tracking-[.12em] text-[#83e2ca]">03 / ABOUT</p>
          <span className="font-mono text-[10px] tracking-[.14em] text-white/30">WANGYU / 2026</span>
        </div>

        <div className="relative mt-10 min-h-[34rem] overflow-hidden border border-white/12 bg-[#0c1011] md:min-h-[42rem]">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:56px_56px]" aria-hidden="true" />
          <div className="absolute left-0 top-0 h-full w-[70%] bg-[linear-gradient(90deg,rgba(11,14,15,.96)_0%,rgba(11,14,15,.78)_58%,transparent_100%)] max-md:w-full" aria-hidden="true" />

          <div data-about-portrait className="absolute bottom-0 right-[-7%] top-[8%] w-[53%] max-md:right-[-24%] max-md:top-[28%] max-md:w-[92%]">
            <div className="absolute left-[8%] top-[5%] aspect-square w-[76%] rounded-full border border-[#83e2ca]/20" aria-hidden="true">
              <span className="absolute inset-[15%] rounded-full border border-white/[.06]" />
              <span className="absolute inset-[34%] rounded-full border border-white/[.05]" />
            </div>
            <Image src="/images/avatar-cutout.webp" alt="王玉的视觉化头像" fill sizes="(min-width: 768px) 53vw, 92vw" className="object-contain object-bottom drop-shadow-[0_30px_45px_rgba(0,0,0,.45)] grayscale-[.24] saturate-[.72]" />
            <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-[#0c1011] to-transparent" aria-hidden="true" />
          </div>

          <div className="relative z-10 flex min-h-[34rem] max-w-[72%] flex-col justify-between p-6 md:min-h-[42rem] md:p-12 lg:p-16 max-md:max-w-full">
            <div data-about-copy>
              <p className="font-mono text-[10px] tracking-[.18em] text-[#83e2ca]">MOTION / SYSTEM / CRAFT</p>
              <h2 className="mt-7 text-[clamp(4rem,10vw,10rem)] font-extrabold leading-[.76] tracking-[-.075em]">WANGYU</h2>
              <div data-about-line className="mt-9 h-px w-[min(30rem,72%)] bg-gradient-to-r from-[#83e2ca] via-white/35 to-transparent" />
            </div>

            <div data-about-copy className="max-w-[35rem] pb-2 max-md:mt-48">
              <p className="copy-pretty text-[clamp(1.35rem,2.5vw,2.45rem)] font-medium leading-[1.3] tracking-[-.035em] text-white/88">动态影像、创作工具，<br className="hidden sm:block" />以及两者之间的工作流。</p>
              <p className="mt-7 font-mono text-[10px] leading-6 tracking-[.14em] text-white/40">VIDEO / MOTION DESIGN / CREATIVE TOOLS</p>
            </div>
          </div>

          <span className="absolute bottom-4 right-4 z-20 h-8 w-8 border-b border-r border-[#83e2ca]/55" aria-hidden="true" />
          <span className="absolute left-4 top-4 z-20 h-8 w-8 border-l border-t border-[#83e2ca]/55" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
