"use client";

import { useEffect, useRef, useState } from "react";
import { BILIBILI_URL } from "@/lib/site";

const EMAIL = "wangyu.hd@qq.com";

export default function Footer() {
  const copyTimerRef = useRef<number | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

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
    <footer id="contact" className="section-dark relative overflow-hidden pt-28 md:pt-44">
      <div className="pointer-events-none absolute right-[-18%] top-[5%] h-[42rem] w-[42rem] rounded-full bg-[rgba(131,226,202,.05)] blur-[170px]" aria-hidden="true" />

      <div className="shell relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6 text-[11px] tracking-[0.08em]">
          <p className="font-mono text-[#83e2ca]">06 / 联系</p>
          <span className="text-white/52">目前在职 · 欢迎来信</span>
        </div>

        <h2 className="mt-14 max-w-5xl font-sans text-[clamp(3.3rem,8vw,8rem)] font-extrabold leading-[1.02] tracking-[-0.025em] max-[520px]:leading-[1.04]">
          <span className="block">联系与</span>
          <span className="mt-[0.08em] block text-white/45">交流</span>
        </h2>

        <div className="mt-14 grid gap-10 border-t border-white/15 pt-9 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="copy-pretty max-w-2xl text-[clamp(1rem,1.45vw,1.3rem)] leading-[1.75] text-white/66">
              目前在职，也对合适的机会与行业交流保持开放。如果你关注视频后期、<span className="keep-phrase">Motion Design</span> 或 <span className="keep-phrase">AI 工作流，</span>欢迎来信。
            </p>
            <p className="mt-6 text-[11px] tracking-[0.08em] text-white/45">中国 / GMT+8</p>
          </div>

          <div className="grid gap-3 sm:flex sm:flex-wrap md:justify-end">
            <a
              href={`mailto:${EMAIL}`}
              className="btn-lime w-full sm:w-auto"
              style={{ borderRadius: 6, backgroundColor: "#83e2ca", borderColor: "#83e2ca", color: "#07090a" }}
            >
              发送邮件 <span aria-hidden="true">↗</span>
            </a>
            <button type="button" onClick={copyEmail} className="btn-light-outline w-full sm:w-auto" style={{ borderRadius: 6 }}>复制邮箱 <span aria-hidden="true">＋</span></button>
            <a href={BILIBILI_URL} target="_blank" rel="noopener noreferrer" className="btn-light-outline w-full sm:w-auto" style={{ borderRadius: 6 }}>哔哩哔哩 <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="mt-20 flex justify-start md:justify-end">
          <div className="max-w-full md:text-right">
            <span className="mb-3 block text-[11px] font-semibold tracking-[0.12em] text-[#83e2ca]">
              邮箱
            </span>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-block w-full max-w-full border-b border-[rgba(131,226,202,.68)] pb-2 text-[clamp(1.3125rem,2.15vw,2.25rem)] font-semibold leading-[1.35] tracking-normal text-white transition-colors [overflow-wrap:anywhere] hover:border-[#83e2ca] hover:text-[#83e2ca] focus-visible:border-[#83e2ca] focus-visible:text-[#83e2ca] sm:w-auto"
              style={{
                fontFamily: "var(--font-ui)",
                fontVariantLigatures: "none",
                fontFeatureSettings: '"liga" 0, "calt" 0',
              }}
            >
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/15 py-7 text-[10px] tracking-[0.05em] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} 王玉</span>
          <span>视频后期 · <span className="keep-phrase">Motion Design</span> · <span className="keep-phrase">AI 创意工作流</span></span>
        </div>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[100] max-w-[calc(100vw-32px)] -translate-x-1/2 rounded-md border border-white/20 bg-[rgba(9,11,13,.94)] px-4 py-2 text-sm font-semibold text-[#83e2ca] shadow-2xl backdrop-blur-md transition-all duration-300 [overflow-wrap:anywhere] ${copyStatus ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
      >
        {copyStatus ?? ""}
      </div>
    </footer>
  );
}
