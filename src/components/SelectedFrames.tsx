"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const frames = [
  { src: "/images/selected-frames-v2/01-stage.webp", index: "01", label: "STAGE", alt: "聚光灯下的动画舞台", layout: "wide" },
  { src: "/images/selected-frames-v2/02-workshop.webp", index: "02", label: "WORKSHOP", alt: "浅色调的动画工坊场景", layout: "tall" },
  { src: "/images/selected-frames-v2/03-energy.webp", index: "03", label: "ENERGY", alt: "蓝色能量装置实验室", layout: "tall" },
  { src: "/images/selected-frames-v2/04-city.webp", index: "04", label: "CITY", alt: "暖色调的动画城市与钟楼", layout: "tall" },
  { src: "/images/selected-frames-v2/05-character.webp", index: "05", label: "CHARACTER", alt: "霓虹轮廓的动画角色特写", layout: "tall" },
  { src: "/images/selected-frames-v2/06-neon.webp", index: "06", label: "NEON", alt: "蓝紫霓虹中的角色群像", layout: "wide" },
] as const;

const DESKTOP_FRAME_LAYOUT = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
] as const;

export default function SelectedFrames() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const mediaQuery = gsap.matchMedia();
    mediaQuery.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from("[data-frame-heading]", {
          scrollTrigger: { trigger: ref.current, start: "top 82%" },
          y: 18,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.utils.toArray<HTMLElement>("[data-frame]").forEach((frame) => {
          gsap.from(frame, {
            scrollTrigger: { trigger: frame, start: "top 90%" },
            y: 30,
            opacity: 0,
            duration: 0.72,
            ease: "power3.out",
          });
        });
      }, ref);

      return () => ctx.revert();
    });

    return () => mediaQuery.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="selected-frames"
      aria-labelledby="selected-frames-title"
      className="section-dark border-y border-white/10 bg-[#11100f] py-24 md:py-36"
    >
      <div className="shell">
        <div data-frame-heading className="mb-10 flex items-end justify-between border-b border-white/15 pb-5">
          <div className="flex items-baseline gap-4">
            <p className="font-mono text-[11px] tracking-[.1em] text-[#83e2ca]">01.B</p>
            <h2 id="selected-frames-title" className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.04em]">Frames</h2>
          </div>
          <span className="font-mono text-[10px] tracking-[.12em] text-white/35">06 / SELECTED</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:auto-rows-[minmax(210px,24vw)] md:grid-cols-12 md:gap-5">
          {frames.map(({ src, index, label, alt, layout }, frameIndex) => (
            <figure
              key={src}
              data-frame
              className={`group ${layout === "wide" ? "col-span-2" : "col-span-1"} ${DESKTOP_FRAME_LAYOUT[frameIndex]}`}
            >
              <div className={`relative h-full min-h-[10rem] overflow-hidden bg-[#101415] ${layout === "wide" ? "aspect-[16/9] md:aspect-auto" : "aspect-[4/5] md:aspect-auto"}`}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.025] group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,13,.42),transparent_32%,transparent_65%,rgba(9,11,13,.48))]" aria-hidden="true" />
                <span className="absolute left-3 top-3 font-mono text-[10px] tracking-[.12em] text-white/80">{index}</span>
                <span className="absolute bottom-3 right-3 font-mono text-[10px] tracking-[.12em] text-white/65">{label}</span>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
