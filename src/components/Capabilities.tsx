"use client";

import ViewportEffect from "@/components/ViewportEffect";
import DotGrid from "@/components/react-bits/DotGrid";

const capabilities = [
  {
    index: "01",
    title: "视频后期与动态视觉",
    body: "覆盖剪辑、Motion\u00a0Design、动画合成、声音处理、质量审阅与最终交付。",
  },
  {
    index: "02",
    title: "AIGC 创作与模型评测",
    body: "根据运动表现、可控性、一致性、声音质感与制作成本，比较模型并选择方案。",
  },
  {
    index: "03",
    title: "需求驱动的 AI 工具实现",
    body: "从需求定义和流程设计出发，通过 AI\u00a0协作推动实现、验收与持续迭代。",
  },
  {
    index: "04",
    title: "团队统筹与标准化",
    body: "负责需求拆解、排期分工、跨部门对接与成片验收，并沉淀可复用的制作规范。",
  },
];

const toolGroups = [
  ["后期制作", ["After Effects", "Premiere Pro", "剪映"]],
  ["生成式视频", ["Seedance", "MiniMax", "Wan", "LTX"]],
  ["图像 / 声音 / 音乐", ["即梦", "GPT Image", "Qwen3-TTS", "RVC", "Suno"]],
  ["AI 协作", ["Codex", "Claude", "Cursor"]],
] as const;

export default function Capabilities() {
  return (
    <section id="capabilities" className="section-dark relative overflow-hidden py-24 md:py-36">
      <ViewportEffect interactive className="mobile-dot-grid absolute inset-0 opacity-55 [mask-image:radial-gradient(circle_at_72%_38%,black,transparent_66%)]">
        <DotGrid
          style={{}}
          dotSize={3}
          gap={30}
          baseColor="#203c36"
          activeColor="#83e2ca"
          proximity={170}
          speedTrigger={90}
          shockRadius={280}
          shockStrength={4}
          resistance={780}
          returnDuration={1.35}
          autoDemo
        />
      </ViewportEffect>
      <div className="shell relative z-10">
        <div className="max-w-5xl">
          <p className="font-mono text-[11px] tracking-[0.08em] text-[#83e2ca]">04 / 能力</p>
          <h2 className="mt-5 font-sans text-[clamp(3.3rem,7.5vw,7.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em] max-[520px]:leading-[1.04]">
            <span className="block">能力与</span>
            <span className="mt-[0.08em] block text-white/45">工具</span>
          </h2>
        </div>

        <div className="mt-14 grid border-l border-t border-white/15 sm:grid-cols-2">
          {capabilities.map((item) => (
            <article key={item.index} className="min-h-52 border-b border-r border-white/15 bg-[#090b0d]/72 p-6 backdrop-blur-[2px] transition-colors duration-300 hover:bg-[#111815]/85 md:min-h-64 md:p-9">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.08em] text-white/50">{item.index}</span>
                <span className="h-2 w-2 rotate-45 bg-[#83e2ca]" />
              </div>
              <h3 className="mt-12 text-[clamp(1.4rem,2.5vw,2.2rem)] font-semibold leading-[1.2] tracking-[-0.02em] md:mt-14">{item.title}</h3>
              <p className="copy-pretty mt-4 max-w-md text-sm leading-7 text-white/60 md:text-[15px]">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 border-y border-white/20">
          {toolGroups.map(([label, tools]) => (
            <div key={label} className="grid gap-4 border-b border-white/12 py-5 last:border-b-0 md:grid-cols-[260px_1fr] md:items-center">
              <span className="text-[11px] font-semibold tracking-[0.08em] text-[#83e2ca]">{label}</span>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/72 md:text-base">
                {tools.map((tool) => <li key={tool} className="whitespace-nowrap">{tool}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
