const responsibilities = [
  "负责教育视频与动画项目的剪辑、动效、声音处理、质量审阅与最终交付。",
  "统筹任务分发与排期，协调跨岗位对接，并梳理制作规范和交付标准。",
  "持续评测生成式视频、图像、语音与音乐模型，判断不同方案在实际制作中的适用性，并沉淀可复用资料。",
  "发起 Haitun Post Studio，并持续迭代多项后期工作流工具。",
];

export default function Experience() {
  return (
    <section id="experience" className="section-dark relative overflow-hidden py-28 md:py-44">
      <div className="pointer-events-none absolute left-[-18%] top-[-30%] h-[46rem] w-[46rem] rounded-full bg-[rgba(131,226,202,.04)] blur-[180px]" aria-hidden="true" />

      <div className="shell relative z-10">
        <div className="mb-14 grid gap-9 md:mb-20 md:grid-cols-[1.1fr_.9fr] md:items-end md:gap-16">
          <div>
            <p className="font-mono text-[11px] tracking-[0.08em] text-[#83e2ca]">03 / 工作经历</p>
            <h2 className="mt-5 font-sans text-[clamp(3.3rem,7.5vw,7.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em] max-[520px]:leading-[1.04]">
              <span className="block">工作经历</span>
              <span className="mt-[0.08em] block text-white/45">与流程</span>
            </h2>
          </div>
          <p className="copy-pretty max-w-xl text-[clamp(1rem,1.45vw,1.35rem)] leading-[1.72] text-white/65 md:justify-self-end">
            从一帧画面的完成，到一套流程的建立，我关注作品质量，也整理可复用的方法。
          </p>
        </div>

        <article className="grid overflow-hidden rounded-lg border border-white/15 bg-[#0e1113] lg:grid-cols-[.38fr_.62fr]">
          <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden border-b border-white/15 p-8 lg:min-h-[560px] lg:border-b-0 lg:border-r lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(131,226,202,.13),transparent_42%)]" aria-hidden="true" />
            <span className="relative font-sans text-[clamp(4.5rem,8vw,8rem)] font-semibold leading-[0.9] tracking-[-0.04em]">2020</span>
            <span className="relative h-px w-full bg-white/25" />
            <span className="relative self-end font-sans text-[clamp(4.5rem,8vw,8rem)] font-semibold leading-[0.9] tracking-[-0.04em]">至今</span>
          </div>

          <div className="p-7 md:p-10 lg:p-16">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-[11px] tracking-[0.08em] text-[#83e2ca]">教育科技集团 · 内容视频团队</p>
                <h3 className="mt-4 max-w-3xl text-[clamp(1.8rem,3.3vw,3.2rem)] font-semibold leading-[1.16] tracking-[-0.025em]">
                  <span className="keep-phrase">视频后期</span>
                  <span className="mx-[0.28em] text-white/28" aria-hidden="true">·</span>
                  <span className="keep-phrase">制作统筹</span>
                  <span className="mx-[0.28em] text-white/28" aria-hidden="true">·</span>
                  <span className="keep-phrase">流程建设</span>
                </h3>
              </div>
              <span className="inline-flex items-center gap-2 border-l border-[#83e2ca] py-1 pl-3 text-[11px] tracking-[0.08em] text-white/70">
                在职
              </span>
            </div>

            <ul className="mt-12 border-t border-white/15">
              {responsibilities.map((item) => (
                <li key={item} className="copy-pretty relative border-b border-white/15 py-5 pl-7 text-sm leading-7 text-white/68 md:text-[15px]">
                  <span className="absolute left-1 top-[1.8rem] h-1.5 w-1.5 rotate-45 bg-[#83e2ca]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
