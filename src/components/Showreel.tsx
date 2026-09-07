"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Showreel() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from("[data-showreel-item]", {
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        });
        gsap.from(".showreel-media", {
          scrollTrigger: { trigger: ".showreel-media", start: "top 84%" },
          clipPath: "inset(5% 6% 5% 6%)",
          duration: 1.1,
          ease: "power3.out",
        });
        gsap.from(".showreel-media video", {
          scrollTrigger: { trigger: ".showreel-media", start: "top 84%" },
          scale: 1.055,
          duration: 1.2,
          ease: "power3.out",
        });
      }, ref);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={ref} id="showreel" className="section-dark py-24 md:py-36">
      <div className="shell">
        <div data-showreel-item className="mb-9 flex items-end justify-between gap-5 border-b border-white/15 pb-5">
          <p className="font-mono text-[11px] tracking-[.1em] text-[#83e2ca]">01 / SHOWREEL</p>
          <span className="font-mono text-[10px] tracking-[.12em] text-white/35">2022—2025</span>
        </div>
        <figure data-showreel-item>
          <div className="showreel-media relative aspect-video overflow-hidden bg-black ring-1 ring-white/15">
            <video
              src="/videos/2022-2025.mp4"
              poster="/images/showreel-poster.jpg"
              className="absolute inset-0 h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              aria-label="王玉视频作品集"
            />
          </div>
          <figcaption className="mt-4 flex flex-wrap justify-between gap-3 font-mono text-[10px] tracking-[.1em] text-white/42">
            <span>EDIT / MOTION / COMPOSITE</span><span>01:00</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
