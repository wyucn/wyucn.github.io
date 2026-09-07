import ArrowUpRightIcon from "@/components/ArrowUpRightIcon";
import { BILIBILI_URL, GITHUB_URL } from "@/lib/site";

const EMAIL = "wangyu.hd@qq.com";

export default function Footer() {
  return (
    <footer id="contact" className="section-dark border-t border-white/10 py-20 md:py-28">
      <div className="shell">
        <div className="flex items-center justify-between border-b border-white/15 pb-5"><p className="font-mono text-[11px] tracking-[.1em] text-[#83e2ca]">04 / CONTACT</p><span className="font-mono text-[10px] tracking-[.12em] text-white/35">WANGYU / 2026</span></div>
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <a href={`mailto:${EMAIL}`} className="break-all text-[clamp(2rem,5vw,5rem)] font-semibold leading-none tracking-[-.05em] text-white transition-colors hover:text-[#83e2ca]">{EMAIL}</a>
          <div className="flex gap-5 font-mono text-[11px] tracking-[.1em] text-white/55"><a href={BILIBILI_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#83e2ca]">BILIBILI <ArrowUpRightIcon /></a><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#83e2ca]">GITHUB <ArrowUpRightIcon /></a></div>
        </div>
        <div className="mt-16 flex justify-between border-t border-white/15 pt-5 font-mono text-[10px] tracking-[.1em] text-white/35"><span>© {new Date().getFullYear()} WANGYU</span><span>END /</span></div>
      </div>
    </footer>
  );
}
