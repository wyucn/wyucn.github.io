"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ViewportEffect from "@/components/ViewportEffect";
import Waves from "@/components/react-bits/Waves";

gsap.registerPlugin(ScrollTrigger);

const acts = [
  {
    number: "01",
    title: "影像制作",
    label: "画面 / 声音 / 交付",
    details: [
      "负责教育视频与动画项目的剪辑、动效、声音处理、质量审阅与最终交付。",
    ],
    keywords: ["剪辑", "动效", "声音处理", "质量审阅", "最终交付"],
  },
  {
    number: "02",
    title: "制作统筹",
    label: "排期 / 协作 / 标准",
    details: [
      "统筹任务分发与排期，协调跨岗位对接，并梳理制作规范和交付标准。",
    ],
    keywords: ["任务分发", "制作排期", "跨岗位对接", "制作规范", "交付标准"],
  },
  {
    number: "03",
    title: "流程与 AI\u00a0工具",
    label: "评测 / 沉淀 / 迭代",
    details: [
      "持续评测生成式视频、图像、语音与音乐模型，判断不同方案在实际制作中的适用性，并沉淀可复用资料。",
      "发起 Haitun Post Studio，并持续迭代多项后期工作流工具。",
    ],
    keywords: [
      "生成式视频",
      "图像与声音",
      "模型评测",
      "可复用资料",
      "Haitun Post Studio",
      "后期工作流工具",
    ],
  },
];

const desktopMotionQuery =
  "(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)";
const mobileMotionQuery =
  "(max-width: 1023px) and (min-height: 681px) and (prefers-reduced-motion: no-preference)";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);
  const mobileChapterNumberRef = useRef<HTMLSpanElement>(null);
  const mobileChapterTitleRef = useRef<HTMLSpanElement>(null);
  const mobileProgressRef = useRef<HTMLDivElement>(null);
  const mobileProgressFillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const mobileRail = mobileRailRef.current;
    const mobileChapterNumber = mobileChapterNumberRef.current;
    const mobileChapterTitle = mobileChapterTitleRef.current;
    const mobileProgress = mobileProgressRef.current;
    const mobileProgressFill = mobileProgressFillRef.current;

    if (
      !section ||
      !pin ||
      !viewport ||
      !track ||
      !mobileRail ||
      !mobileChapterNumber ||
      !mobileChapterTitle ||
      !mobileProgress ||
      !mobileProgressFill
    ) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add(mobileMotionQuery, () => {
      const panels = gsap.utils.toArray<HTMLElement>(
        "[data-experience-panel]",
        track,
      );

      if (panels.length !== acts.length) return;

      mobileRail.hidden = false;
      mobileRail.style.position = "sticky";
      mobileRail.style.top =
        "calc(env(safe-area-inset-top, 0px) + 4.75rem)";

      let activeIndex = -1;

      const setActiveChapter = (nextIndex: number, immediate = false) => {
        if (nextIndex === activeIndex) return;

        activeIndex = nextIndex;
        const act = acts[nextIndex];
        const progressValue = ((nextIndex + 1) / acts.length) * 100;

        mobileChapterNumber.textContent = act.number;
        mobileChapterTitle.textContent = act.title;
        mobileProgressFill.style.transform = `scaleX(${progressValue / 100})`;
        mobileProgress.setAttribute("aria-valuenow", String(nextIndex + 1));
        mobileProgress.setAttribute(
          "aria-valuetext",
          `第 ${nextIndex + 1} / ${acts.length} 幕：${act.title}`,
        );

        panels.forEach((panel, panelIndex) => {
          const isActive = panelIndex === nextIndex;

          panel.dataset.experienceActive = String(isActive);
          if (isActive) {
            panel.setAttribute("aria-current", "step");
          } else {
            panel.removeAttribute("aria-current");
          }

          gsap.to(panel, {
            opacity: isActive ? 1 : 0.72,
            scale: isActive ? 1 : 0.985,
            backgroundColor: isActive
              ? "rgba(131, 226, 202, 0.045)"
              : "rgba(14, 17, 19, 0)",
            boxShadow: isActive
              ? "inset 3px 0 0 rgba(131, 226, 202, 0.72)"
              : "inset 0 0 0 rgba(131, 226, 202, 0)",
            duration: immediate ? 0 : 0.38,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      const getClosestPanelIndex = () => {
        const focusLine = window.innerHeight * 0.44;

        return panels.reduce(
          (closest, panel, index) => {
            const rect = panel.getBoundingClientRect();
            const panelFocus = rect.top + Math.min(rect.height * 0.34, 150);
            const distance = Math.abs(panelFocus - focusLine);

            return distance < closest.distance
              ? { index, distance }
              : closest;
          },
          { index: 0, distance: Number.POSITIVE_INFINITY },
        ).index;
      };

      setActiveChapter(getClosestPanelIndex(), true);

      const chapterTriggers = panels.map((panel, index) =>
        ScrollTrigger.create({
          trigger: panel,
          start: "top 44%",
          end: "bottom 44%",
          onEnter: () => setActiveChapter(index),
          onEnterBack: () => setActiveChapter(index),
          onRefresh: (self) => {
            if (self.isActive) setActiveChapter(index, true);
          },
        }),
      );
      const refreshFrame = window.requestAnimationFrame(() =>
        ScrollTrigger.refresh(),
      );

      return () => {
        window.cancelAnimationFrame(refreshFrame);
        chapterTriggers.forEach((trigger) => trigger.kill());
        gsap.killTweensOf(panels);
        gsap.set(panels, {
          clearProps: "opacity,scale,backgroundColor,boxShadow,transform",
        });
        panels.forEach((panel) => {
          delete panel.dataset.experienceActive;
          panel.removeAttribute("aria-current");
        });
        mobileRail.hidden = true;
        mobileRail.style.position = "";
        mobileRail.style.top = "";
      };
    });

    mm.add(desktopMotionQuery, () => {
      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>(
          "[data-experience-panel]",
          track,
        );
        const bodies = gsap.utils.toArray<HTMLElement>(
          "[data-experience-body]",
          track,
        );
        const labels = gsap.utils.toArray<HTMLElement>(
          "[data-experience-label]",
          pin,
        );
        const progress = pin.querySelector<HTMLElement>(
          "[data-experience-progress]",
        );

        if (
          panels.length !== acts.length ||
          bodies.length !== acts.length ||
          labels.length !== acts.length ||
          !progress
        ) {
          return;
        }

        const panelHeight = "clamp(500px, 68vh, 620px)";

        gsap.set(viewport, {
          height: panelHeight,
          overflow: "hidden",
        });
        gsap.set(panels, {
          height: panelHeight,
          minHeight: 0,
          flexShrink: 0,
        });
        gsap.set(track, {
          y: 0,
          willChange: "transform",
        });
        gsap.set(bodies, {
          opacity: (index) => (index === 0 ? 1 : 0),
          x: (index) => (index === 0 ? 0 : 44),
          willChange: "transform, opacity",
        });
        gsap.set(labels, {
          opacity: (index) => (index === 0 ? 1 : 0.3),
          x: (index) => (index === 0 ? 0 : -8),
        });
        gsap.set(progress, {
          scaleY: 1 / acts.length,
          transformOrigin: "top center",
        });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: pin,
            start: "top 12%",
            end: () => `+=${window.innerHeight * 2}`,
            pin: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const timelineLength = { value: 0 };

        timeline
          .to(timelineLength, { value: 1, duration: 3 }, 0)
          .to(progress, { scaleY: 1, duration: 3 }, 0)
          .to(
            bodies[0],
            { opacity: 0, x: -36, duration: 0.2, ease: "power2.in" },
            0.7,
          )
          .to(
            track,
            {
              y: () => -viewport.clientHeight,
              duration: 0.36,
              ease: "power2.inOut",
              force3D: true,
            },
            0.7,
          )
          .to(labels[0], { opacity: 0.3, x: -8, duration: 0.2 }, 0.7)
          .to(labels[1], { opacity: 1, x: 0, duration: 0.22 }, 0.82)
          .to(
            bodies[1],
            { opacity: 1, x: 0, duration: 0.24, ease: "power2.out" },
            0.84,
          )
          .to(
            bodies[1],
            { opacity: 0, x: -36, duration: 0.2, ease: "power2.in" },
            1.7,
          )
          .to(
            track,
            {
              y: () => -viewport.clientHeight * 2,
              duration: 0.36,
              ease: "power2.inOut",
              force3D: true,
            },
            1.7,
          )
          .to(labels[1], { opacity: 0.3, x: -8, duration: 0.2 }, 1.7)
          .to(labels[2], { opacity: 1, x: 0, duration: 0.22 }, 1.82)
          .to(
            bodies[2],
            { opacity: 1, x: 0, duration: 0.24, ease: "power2.out" },
            1.84,
          );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="section-dark relative py-28 md:py-44"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-[-18%] top-[-18rem] h-[46rem] w-[46rem] rounded-full bg-[rgba(131,226,202,.04)] blur-[180px]" />
        <div className="absolute bottom-[8%] right-[-20rem] h-[38rem] w-[38rem] rounded-full border border-white/[.035]" />
      </div>

      <div className="shell relative z-10">
        <header className="mb-14 grid gap-9 md:mb-20 md:grid-cols-[1.1fr_.9fr] md:items-end md:gap-16">
          <div>
            <p className="font-mono text-[11px] tracking-[0.08em] text-[#83e2ca]">
              03 / 工作经历
            </p>
            <h2
              id="experience-heading"
              className="mt-5 font-sans text-[clamp(3.3rem,7.5vw,7.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em] max-[520px]:leading-[1.04]"
            >
              <span className="block">工作经历</span>
              <span className="mt-[0.08em] block text-white/45">三幕推进</span>
            </h2>
          </div>
          <p className="copy-pretty max-w-xl text-[clamp(1rem,1.45vw,1.35rem)] leading-[1.72] text-white/65 md:justify-self-end">
            从一帧画面的完成，到一套流程的建立，我关注作品质量，也整理可复用的方法。
          </p>
        </header>

        <div
          ref={pinRef}
          className="grid overflow-visible rounded-lg border border-white/15 bg-[#0e1113] lg:grid-cols-[minmax(280px,.38fr)_minmax(0,.62fr)] lg:overflow-hidden"
        >
          <div className="relative flex flex-col justify-between overflow-hidden border-b border-white/15 p-7 md:p-10 lg:min-h-[500px] lg:border-b-0 lg:border-r">
            <ViewportEffect interactive className="absolute inset-0 opacity-45 [mask-image:linear-gradient(to_bottom,black,transparent_82%)]">
              <Waves
                lineColor="rgba(131,226,202,.42)"
                backgroundColor="transparent"
                waveSpeedX={0.014}
                waveSpeedY={0.006}
                waveAmpX={26}
                waveAmpY={14}
                xGap={14}
                yGap={32}
                maxCursorMove={58}
              />
            </ViewportEffect>
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(131,226,202,.14),transparent_43%)]"
              aria-hidden="true"
            />

            <div className="relative flex flex-wrap items-start justify-between gap-5 lg:block">
              <div>
                <p className="text-[11px] tracking-[0.08em] text-[#83e2ca]">
                  教育科技集团 · 内容视频团队
                </p>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  视频后期 · 制作统筹 · 流程建设
                </p>
              </div>
              <span className="inline-flex border-l border-[#83e2ca] py-1 pl-3 text-[11px] tracking-[0.08em] text-white/78 lg:mt-6">
                在职
              </span>
            </div>

            <p
              className="relative my-12 flex items-end justify-between gap-5 font-sans font-semibold tracking-[-0.045em] max-[360px]:gap-3 lg:my-6 lg:block"
              aria-label="2020 年至今"
            >
              <span
                className="block text-[clamp(3.8rem,6vw,6.2rem)] leading-[0.86] max-[360px]:text-[3.2rem]"
                aria-hidden="true"
              >
                2020
              </span>
              <span
                className="block whitespace-nowrap text-[clamp(3.1rem,5.2vw,5.2rem)] leading-[0.86] text-white/42 max-[360px]:text-[2.45rem] lg:mt-4 lg:text-right"
                aria-hidden="true"
              >
                至今
              </span>
            </p>

            <div className="relative hidden grid-cols-[1px_1fr] gap-5 lg:grid">
              <span className="relative block h-full min-h-28 bg-white/15" aria-hidden="true">
                <span
                  data-experience-progress
                  className="absolute inset-x-0 top-0 h-full bg-[#83e2ca]"
                />
              </span>
              <ol className="space-y-4" aria-hidden="true">
                {acts.map((act) => (
                  <li
                    key={act.number}
                    data-experience-label
                    className="flex items-baseline gap-3"
                  >
                    <span className="font-mono text-[11px] tracking-[0.08em] text-[#83e2ca]">
                      {act.number}
                    </span>
                    <span className="text-sm font-semibold tracking-[-0.01em]">
                      {act.title}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div ref={viewportRef} className="relative">
            <div
              ref={mobileRailRef}
              hidden
              className="z-20 border-b border-white/15 bg-[rgba(14,17,19,.94)] px-7 py-3.5 shadow-[0_14px_30px_rgba(9,11,13,.28)] backdrop-blur-xl md:px-10 lg:hidden"
            >
              <div className="flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.1em]">
                <p className="text-[#83e2ca]">
                  CHAPTER <span ref={mobileChapterNumberRef}>01</span> / 03
                </p>
                <span className="text-white/65">SCROLL_Y</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-4">
                <span
                  ref={mobileChapterTitleRef}
                  aria-live="polite"
                  className="truncate text-sm font-semibold tracking-[-0.01em]"
                >
                  影像制作
                </span>
                <svg
                  viewBox="0 0 12 18"
                  className="h-[18px] w-3 shrink-0 text-[#83e2ca]"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M6 0v16m0 0 5-5m-5 5-5-5" stroke="currentColor" />
                </svg>
              </div>
              <div
                ref={mobileProgressRef}
                role="progressbar"
                aria-label="工作经历章节进度"
                aria-valuemin={1}
                aria-valuemax={acts.length}
                aria-valuenow={1}
                className="relative mt-3 h-px overflow-hidden bg-white/15"
              >
                <span
                  ref={mobileProgressFillRef}
                  className="absolute inset-0 origin-left scale-x-[0.3333] bg-[#83e2ca] shadow-[0_0_12px_rgba(131,226,202,.5)] transition-transform duration-300"
                />
              </div>
            </div>

            <ol
              ref={trackRef}
              className="flex flex-col"
              aria-label="工作职责的三个阶段"
            >
              {acts.map((act) => (
                <li
                  key={act.number}
                  data-experience-panel
                  className="relative flex min-h-[360px] scroll-mt-36 flex-col justify-between overflow-hidden border-b border-white/15 p-7 last:border-b-0 md:min-h-[400px] md:p-10 lg:p-12"
                >
                  <span
                    className="pointer-events-none absolute -right-[0.04em] -top-[0.14em] font-mono text-[clamp(8rem,18vw,15rem)] leading-none tracking-[-0.08em] text-white/[.025]"
                    aria-hidden="true"
                  >
                    {act.number}
                  </span>

                  <div data-experience-body className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between gap-5 border-b border-white/15 pb-5">
                      <p className="font-mono text-[11px] tracking-[0.08em] text-[#83e2ca]">
                        ACT {act.number}
                      </p>
                      <p className="text-right text-[11px] tracking-[0.08em] text-white/62">
                        {act.label}
                      </p>
                    </div>

                    <div className="my-auto py-9 md:py-10">
                      <h3 className="max-w-3xl font-sans text-[clamp(2.8rem,5.5vw,5.8rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">
                        {act.title}
                      </h3>
                      <div className="mt-7 max-w-3xl space-y-4">
                        {act.details.map((detail) => (
                          <p
                            key={detail}
                            className="copy-pretty text-sm leading-7 text-white/68 md:text-[15px]"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>

                    <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-5">
                      {act.keywords.map((keyword) => (
                        <li
                          key={keyword}
                          className="flex items-center gap-2 text-[11px] tracking-[0.06em] text-white/62"
                        >
                          <span
                            className="h-1 w-1 rotate-45 bg-[#83e2ca]"
                            aria-hidden="true"
                          />
                          {keyword}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
