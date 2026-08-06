"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BILIBILI_URL } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { name: "Bilibili", href: BILIBILI_URL },
].filter((social) => social.href);

const EMAIL = "wangyu.hd@qq.com";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyTimerRef = useRef<number | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".footer-cta", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
          y: 42,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  useEffect(() => () => {
    if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
  }, []);

  const copyEmail = async () => {
    let copied = false;

    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(EMAIL);
      copied = true;
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = EMAIL;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      copied = document.execCommand("copy");
      fallback.remove();
    }

    setCopyStatus(copied ? "邮箱已复制" : EMAIL);
    if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => setCopyStatus(null), 2200);
  };

  return (
    <footer ref={sectionRef} id="contact" className="relative overflow-hidden pb-8">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: "radial-gradient(circle at 50% 28%, var(--c-accent-10), transparent 34%), radial-gradient(circle at 85% 65%, var(--c-action-soft), transparent 28%)" }} />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="footer-cta flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--c-border)" }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] md:text-xs" style={{ color: "var(--c-accent)" }}>
            Currently working · Open to conversation
          </p>
          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] md:text-[10px]" style={{ color: "var(--c-muted)" }}>
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full border" style={{ borderColor: "var(--c-accent-30)" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--c-action)" }} />
            </span>
            <span>Post · Motion · AI Workflow</span>
          </div>
        </div>

        <div className="footer-cta py-10 text-center md:py-14">
          <h2 className="display-title text-[clamp(2.1rem,7.4vw,7.5rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.06em]" style={{ color: "var(--c-fg)" }}>
            <span className="block">Let&apos;s Make</span>
            <span className="gradient-text block">Something</span>
            <span className="mt-[0.08em] inline-flex items-start justify-center">
              <span className="gradient-text">Real</span>
              <span className="ml-[0.12em] mt-[0.03em] inline-flex h-[0.34em] w-[0.34em] items-center justify-center rounded-full border" style={{ borderColor: "var(--c-accent-40)" }} aria-hidden="true">
                <span className="h-[0.09em] w-[0.09em] rounded-full" style={{ background: "var(--c-action)" }} />
              </span>
            </span>
          </h2>
        </div>

        <div className="footer-cta grid gap-8 border-t pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end" style={{ borderColor: "var(--c-border)" }}>
          <div>
            <p className="max-w-2xl text-base font-light leading-8 md:text-lg" style={{ color: "var(--c-muted)" }}>
              目前在职，保持对优秀团队、合适机会和创意技术方向交流的开放。欢迎联系我聊聊视频后期、Motion Design 与 AI 工作流。
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {socials.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="link-accent interactive font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300">
                  {social.name} ↗
                </a>
              ))}
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--c-muted)" }}>China / GMT+8</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:min-w-80">
            <a
              href={`mailto:${EMAIL}`}
              className="btn-accent interactive inline-flex min-h-14 items-center justify-center gap-4 rounded-full px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-1 md:text-base"
            >
              发送邮件
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="btn-outline interactive inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300"
            >
              复制邮箱
              <span aria-hidden="true">＋</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="flex flex-col items-center justify-between gap-3 py-6 font-mono text-[10px] uppercase tracking-[0.18em] sm:flex-row" style={{ color: "var(--c-muted)" }}>
          <span>© {new Date().getFullYear()} Wang Yu</span>
          <span style={{ color: "var(--c-accent)" }}>Video Post-Production · Motion · AIGC</span>
        </div>

        <div className="overflow-hidden py-5 text-center md:py-7">
          <span aria-hidden="true" className="display-title select-none text-[clamp(3.5rem,12vw,10rem)] font-extrabold uppercase leading-none tracking-tighter text-transparent" style={{ WebkitTextStroke: "var(--c-stroke-footer)" }}>
            WANGYU
          </span>
        </div>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full border px-4 py-2 text-sm font-semibold shadow-2xl backdrop-blur-md transition-all duration-300 ${copyStatus ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        style={{ background: "var(--c-bg-alpha95)", borderColor: "var(--c-border-control)", color: "var(--c-link)" }}
      >
        {copyStatus ?? ""}
      </div>
    </footer>
  );
}
