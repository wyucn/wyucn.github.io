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
      const ctx = gsap.context(() => gsap.from("[data-about]", { scrollTrigger: { trigger: ref.current, start: "top 82%" }, y: 20, opacity: 0, duration: 0.65, stagger: 0.08, ease: "power2.out" }), ref);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <section ref={ref} id="about" className="section-dark py-24 md:py-32">
      <div className="shell">
        <div data-about className="flex items-center justify-between border-b border-white/15 pb-5"><p className="font-mono text-[11px] tracking-[.1em] text-[#83e2ca]">03 / ABOUT</p></div>
        <div className="mt-10 grid gap-10 md:grid-cols-[112px_1fr] md:items-end">
          <div data-about className="relative h-28 w-28 overflow-hidden rounded-full border border-white/15 bg-[#0e1113]"><Image src="/images/avatar-cutout.webp" alt="王玉头像" fill sizes="112px" className="object-contain object-bottom" /></div>
          <div data-about>
            <h2 className="text-[clamp(3.5rem,9vw,9rem)] font-extrabold leading-[.82] tracking-[-.06em]">WANGYU</h2>
            <p className="mt-7 font-mono text-[11px] tracking-[.13em] text-white/48">VIDEO / MOTION DESIGN / CREATIVE TOOLS</p>
          </div>
        </div>
      </div>
    </section>
  );
}
