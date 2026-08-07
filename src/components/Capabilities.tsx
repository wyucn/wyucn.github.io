const capabilities = [
  {
    index: "01",
    title: "视频后期与动态视觉",
    body: "剪辑、Motion Design、合成、声音处理、质量审阅与最终交付。",
  },
  {
    index: "02",
    title: "AIGC 创作与模型评测",
    body: "围绕运动表现、可控性、一致性、声音质感与制作成本选择方案。",
  },
  {
    index: "03",
    title: "需求驱动的 AI 工具实现",
    body: "从需求定义、工作流设计到 AI 协作实现、使用验收与持续迭代。",
  },
  {
    index: "04",
    title: "流程规范与知识沉淀",
    body: "制作对接、交付标准、工具规则与团队知识资料。",
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
    <section id="capabilities" className="section-dark py-28 md:py-44">
      <div className="shell">
        <div className="max-w-5xl">
          <p className="text-[11px] tracking-[0.08em] text-[#83e2ca]">04 / 能力</p>
          <h2 className="mt-5 font-sans text-[clamp(3.3rem,7.5vw,7.5rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
            <span className="block">能力与</span>
            <span className="mt-[0.08em] block text-white/45">工具</span>
          </h2>
        </div>

        <div className="mt-16 grid border-l border-t border-white/15 sm:grid-cols-2">
          {capabilities.map((item) => (
            <article key={item.index} className="min-h-60 border-b border-r border-white/15 p-6 transition-colors duration-300 hover:bg-white/[0.025] md:min-h-72 md:p-9">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.08em] text-white/50">{item.index}</span>
                <span className="h-2 w-2 rotate-45 bg-[#83e2ca]" />
              </div>
              <h3 className="mt-16 text-[clamp(1.4rem,2.5vw,2.2rem)] font-semibold leading-[1.2] tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/60 md:text-[15px]">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 border-y border-white/20">
          {toolGroups.map(([label, tools]) => (
            <div key={label} className="grid gap-4 border-b border-white/12 py-5 last:border-b-0 md:grid-cols-[260px_1fr] md:items-center">
              <span className="text-[11px] font-semibold tracking-[0.08em] text-[#83e2ca]">{label}</span>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/72 md:text-base">
                {tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
