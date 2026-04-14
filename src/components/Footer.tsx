"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { name: "Bilibili", href: "https://space.bilibili.com/8286059" },
  { name: "YouTube", href: "#" },
  { name: "Behance", href: "#" },
  { name: "Twitter / X", href: "#" },
];

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-cta", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 60, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} id="contact" className="relative pb-8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-32 md:py-40" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="footer-cta text-center">
          <p className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] mb-4" style={{ color: "var(--c-accent)" }}>
            Get In Touch
          </p>
          <h2 className="text-5xl md:text-8xl font-extrabold uppercase tracking-tighter mb-6" style={{ color: "var(--c-fg)" }}>
            Let&apos;s Create<br /><span className="gradient-text">Together</span>
          </h2>
          <p className="text-lg md:text-xl max-w-lg mx-auto font-light mb-10" style={{ color: "var(--c-muted)" }}>
            有项目合作或交流想法？欢迎随时联系我。
          </p>
          <a
            href="mailto:wangyu.hd@qq.com"
            className="interactive inline-flex items-center gap-3 px-8 py-4 font-bold uppercase tracking-wider text-base rounded-full hover:scale-105 transition-all duration-300"
            style={{ background: "var(--c-accent)", color: "var(--c-bg)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--c-accent-dark)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--c-accent)")}
          >
            wangyu.hd@qq.com
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="py-8 flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="interactive text-xs font-mono uppercase tracking-wider transition-colors duration-300"
                style={{ color: "var(--c-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-muted)")}
              >
                {social.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono" style={{ color: "var(--c-muted)" }}>© {new Date().getFullYear()}</span>
            <span className="text-xs font-mono" style={{ color: "var(--c-muted)" }}>—</span>
            <span className="text-xs font-mono" style={{ color: "var(--c-accent)" }}>Built with passion</span>
          </div>
        </div>

        <div className="py-8 text-center">
          <span
            className="text-[clamp(4rem,15vw,12rem)] font-extrabold uppercase tracking-tighter leading-none text-transparent select-none"
            style={{ WebkitTextStroke: `var(--c-stroke-footer)` }}
          >
            WANGYU
          </span>
        </div>
      </div>
    </footer>
  );
}
