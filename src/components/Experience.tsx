const responsibilities = [
  "负责教育视频与动画内容的后期制作、质量审阅、动效调整、声音处理和最终交付。",
  "承担制作任务分发、排期与跨岗位对接，梳理制作规范和交付标准。",
  "持续测试视频、图像、语音与音乐模型，判断不同方案在真实内容生产中的适用性。",
  "将测试经验沉淀为提示词、工作流工具、制作规范和团队可复用的知识资料。",
  "发起并持续迭代 Haitun Post Studio，以及多项面向后期工作流的轻量工具。",
];

const capabilities = [
  {
    index: "01",
    title: "视频后期与动态视觉",
    body: "剪辑、Motion Design、合成动效、声音处理、质量审阅与最终交付。",
  },
  {
    index: "02",
    title: "AIGC 创作与模型评测",
    body: "围绕运动表现、一致性、可控性、声音质感与实际成本进行测试和方案选择。",
  },
  {
    index: "03",
    title: "需求驱动的 AI 工具实现",
    body: "负责发现问题、定义流程、试用验收和迭代反馈，与 AI 协作把需求推进为可用工具。",
  },
  {
    index: "04",
    title: "流程规范与知识沉淀",
    body: "承担制作对接、任务分发与标准梳理，把个人经验转化为团队可复用的方法。",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 md:mb-20">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] md:text-sm" style={{ color: "var(--c-accent)" }}>Experience / Capabilities</p>
          <h2 className="display-title text-[clamp(2.8rem,8vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-tighter" style={{ color: "var(--c-fg)" }}>
            Work with<br /><span className="gradient-text">Clarity</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-8">
          <article className="rounded-2xl border p-6 md:p-8" style={{ borderColor: "var(--c-border)", background: "var(--c-surface)" }}>
            <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-7" style={{ borderColor: "var(--c-border)" }}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--c-accent)" }}>2020—NOW</p>
                <h3 className="mt-3 text-2xl font-extrabold md:text-3xl" style={{ color: "var(--c-fg)" }}>头部教育科技集团</h3>
                <p className="mt-2 text-sm" style={{ color: "var(--c-muted)" }}>内容视频团队</p>
              </div>
              <span className="rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-wider" style={{ borderColor: "var(--c-action-readable)", color: "var(--c-action-readable)" }}>Currently Working</span>
            </div>

            <div className="py-7">
              <p className="text-lg font-semibold" style={{ color: "var(--c-fg-secondary)" }}>视频后期 / 制作统筹与流程建设</p>
              <p className="mt-3 text-sm leading-7" style={{ color: "var(--c-muted)" }}>
                保留创作者身份，同时承担制作对接、任务分发、标准梳理与知识沉淀，不以管理头衔作为职业定位。
              </p>
            </div>

            <ul className="space-y-4">
              {responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7" style={{ color: "var(--c-muted)" }}>
                  <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--c-accent)" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
            {capabilities.map((item) => (
              <article key={item.index} className="group rounded-2xl border p-6 transition-colors duration-300 md:p-7" style={{ borderColor: "var(--c-border)", background: "var(--c-surface)" }}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs" style={{ color: "var(--c-accent)" }}>{item.index}</span>
                  <span className="h-px w-12 transition-all duration-300 group-hover:w-20" style={{ background: "var(--c-accent-30)" }} />
                </div>
                <h3 className="mt-9 text-xl font-bold leading-snug md:text-2xl" style={{ color: "var(--c-fg)" }}>{item.title}</h3>
                <p className="mt-4 text-sm leading-7" style={{ color: "var(--c-muted)" }}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
