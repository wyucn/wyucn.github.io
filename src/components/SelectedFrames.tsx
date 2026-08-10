"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_MOTION_QUERY =
  "(min-width: 1024px) and (min-height: 681px) and (prefers-reduced-motion: no-preference)";

const frames = [
  {
    src: "/images/selected-frames/01-stage.webp",
    title: "舞台引子",
    discipline: "场景调度 / 角色动画",
    timecode: "00:06",
    alt: "聚光灯下的动画舞台与中央角色",
    description: "用聚光、景深与角色入场建立开篇节拍。",
    itemClassName:
      "w-[88vw] sm:w-[76vw] lg:w-[min(68vw,1040px)] lg:self-start",
    objectPosition: "center center",
  },
  {
    src: "/images/selected-frames/02-knowledge.webp",
    title: "知识可视化",
    discipline: "动态排版 / 合成",
    timecode: "00:11",
    alt: "绿色数字空间中的数学题与白色动画角色",
    description: "把抽象知识转译为可跟随的空间与动作线索。",
    itemClassName:
      "w-[78vw] sm:w-[60vw] lg:w-[min(43vw,660px)] lg:self-end",
    objectPosition: "center center",
  },
  {
    src: "/images/selected-frames/03-production.webp",
    title: "材质切换",
    discipline: "二维动画 / 转场设计",
    timecode: "00:15",
    alt: "画笔掠过蓝绿色颜料与水面材质",
    description: "利用真实材质的方向性，为镜头切换制造触感。",
    itemClassName:
      "w-[82vw] sm:w-[68vw] lg:w-[min(54vw,820px)] lg:self-start",
    objectPosition: "center center",
  },
  {
    src: "/images/selected-frames/04-material.webp",
    title: "任务界面",
    discipline: "界面动画 / 信息节奏",
    timecode: "00:20",
    alt: "甜点制作游戏中的任务卡片界面",
    description: "在叙事画面里组织任务、反馈与操作焦点。",
    itemClassName:
      "w-[76vw] sm:w-[58vw] lg:w-[min(42vw,640px)] lg:self-end",
    objectPosition: "center center",
  },
  {
    src: "/images/selected-frames/05-lab.webp",
    title: "实验室警报",
    discipline: "场景合成 / 色彩设计",
    timecode: "00:25",
    alt: "被红色警报光笼罩的动画实验室场景",
    description: "通过单色警报与层次雾化快速改变叙事温度。",
    itemClassName:
      "w-[86vw] sm:w-[72vw] lg:w-[min(62vw,940px)] lg:self-start",
    objectPosition: "center center",
  },
  {
    src: "/images/selected-frames/06-ice.webp",
    title: "空间坠落",
    discipline: "镜头运动 / 光效合成",
    timecode: "00:40",
    alt: "从拱门望向碎裂空间与中央亮光的动画镜头",
    description: "用纵深、碎片和高亮中心强化失重感。",
    itemClassName:
      "w-[78vw] sm:w-[61vw] lg:w-[min(45vw,690px)] lg:self-end",
    objectPosition: "center center",
  },
  {
    src: "/images/selected-frames/07-ensemble.webp",
    title: "角色特写",
    discipline: "角色动画 / 光影塑形",
    timecode: "00:45",
    alt: "紫黑色兜帽角色的发光面部特写",
    description: "压缩景别，让轮廓光和表情承担情绪转折。",
    itemClassName:
      "w-[80vw] sm:w-[64vw] lg:w-[min(49vw,750px)] lg:self-start",
    objectPosition: "center center",
  },
  {
    src: "/images/selected-frames/08-tunnel.webp",
    title: "群像登场",
    discipline: "剪辑 / 音画节奏",
    timecode: "00:50",
    alt: "三名动画角色在高速运动的场景中集结",
    description: "以速度线、角色站位与音乐重拍收束段落。",
    itemClassName:
      "w-[88vw] sm:w-[76vw] lg:w-[min(68vw,1040px)] lg:self-end",
    objectPosition: "center center",
  },
] as const;

function clampProgress(value: number) {
  return Math.min(1, Math.max(0, value));
}

export default function SelectedFrames() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    const progressFill = progressFillRef.current;
    const progressText = progressTextRef.current;

    if (
      !section ||
      !stage ||
      !viewport ||
      !track ||
      !progress ||
      !progressFill ||
      !progressText
    ) {
      return;
    }

    const setProgress = (rawValue: number) => {
      const value = clampProgress(rawValue);
      const percentage = Math.round(value * 100);

      progressFill.style.transform = `scaleX(${value})`;
      progressText.textContent = percentage.toString().padStart(3, "0");
      progress.setAttribute("aria-valuenow", percentage.toString());
      progress.setAttribute("aria-valuetext", `${percentage}%`);
    };

    const getNativeTravel = () =>
      Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const syncNativeProgress = () => {
      const travel = getNativeTravel();
      setProgress(travel > 0 ? viewport.scrollLeft / travel : 0);
    };

    viewport.addEventListener("scroll", syncNativeProgress, { passive: true });
    window.addEventListener("resize", syncNativeProgress);
    const initialSync = window.requestAnimationFrame(syncNativeProgress);

    const preloadedImages: HTMLImageElement[] = [];
    const preloadFrames = () => {
      frames.forEach(({ src }) => {
        const image = new window.Image();
        image.decoding = "async";
        image.src = src;
        preloadedImages.push(image);
      });
    };
    const preloadObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        preloadFrames();
        preloadObserver.disconnect();
      },
      { rootMargin: "1200px 0px" },
    );
    preloadObserver.observe(section);

    const mm = gsap.matchMedia();

    mm.add(DESKTOP_MOTION_QUERY, () => {
      viewport.scrollLeft = 0;
      viewport.style.overflowX = "hidden";
      viewport.style.scrollSnapType = "none";

      const getHorizontalTravel = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth);

      const ctx = gsap.context(() => {
        gsap.set(track, { x: 0, willChange: "transform" });

        const horizontalTween = gsap.to(track, {
          x: () => -getHorizontalTravel(),
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () =>
              `+=${Math.max(
                getHorizontalTravel() / 1.45,
                window.innerHeight * 1.5,
              )}`,
            pin: stage,
            pinSpacing: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: (self) => setProgress(self.progress),
            onUpdate: (self) => setProgress(self.progress),
          },
        });

        gsap.utils
          .toArray<HTMLElement>("[data-selected-frame-media]", section)
          .forEach((media) => {
            const image = media.querySelector("img");

            if (!image) return;

            gsap.fromTo(
              image,
              { scale: 1.1, xPercent: -2.5 },
              {
                scale: 1.06,
                xPercent: 2.5,
                ease: "none",
                scrollTrigger: {
                  trigger: media,
                  containerAnimation: horizontalTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          });
      }, section);

      ScrollTrigger.refresh();

      return () => {
        const currentProgress = clampProgress(
          Number(progress.getAttribute("aria-valuenow") ?? 0) / 100,
        );

        ctx.revert();
        viewport.style.overflowX = "";
        viewport.style.scrollSnapType = "";
        viewport.scrollLeft = currentProgress * getNativeTravel();
        setProgress(currentProgress);
      };
    });

    return () => {
      window.cancelAnimationFrame(initialSync);
      preloadObserver.disconnect();
      mm.revert();
      viewport.removeEventListener("scroll", syncNativeProgress);
      window.removeEventListener("resize", syncNativeProgress);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="selected-frames"
      aria-labelledby="selected-frames-title"
      className="section-dark relative isolate overflow-hidden border-y border-white/10 bg-[#090b0d]"
    >
      <div
        ref={stageRef}
        className="selected-frames-stage relative flex flex-col justify-center py-20 lg:py-[clamp(2.5rem,7vh,6rem)]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_18%_16%,rgba(131,226,202,.11),transparent_30%),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:auto,72px_72px,72px_72px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-50 [background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_3px,rgba(131,226,202,.035)_3px,rgba(131,226,202,.035)_4px)]"
          aria-hidden="true"
        />

        <header className="shell relative z-10 flex items-end justify-between gap-8">
          <div>
            <p className="font-mono text-[9px] font-bold tracking-[0.16em] text-[#83e2ca]">
              01.B / SELECTED_FRAMES
            </p>
            <h2
              id="selected-frames-title"
              className="mt-3 text-[clamp(2.2rem,4.4vw,4.8rem)] font-extrabold leading-none tracking-[-0.04em]"
            >
              画面档案
            </h2>
          </div>

          <div className="hidden text-right font-mono text-[9px] leading-5 tracking-[0.12em] text-white/42 sm:block">
            <span className="block text-[#83e2ca]">BUFFER::08</span>
            <span className="block">SCROLL_Y → TRACK_X</span>
          </div>
        </header>

        <p id="selected-frames-instructions" className="sr-only">
          画廊包含八张作品画面。支持水平滚动的设备可左右滑动浏览；桌面大屏可继续向下滚动浏览。
        </p>

        <div
          ref={viewportRef}
          tabIndex={0}
          role="region"
          aria-label="作品代表画面横向画廊"
          aria-describedby="selected-frames-instructions"
          className="relative z-10 mt-9 w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#83e2ca] md:mt-11"
        >
          <ol
            ref={trackRef}
            className="flex w-max items-center gap-[clamp(1rem,2.6vw,2.75rem)] px-[clamp(1.5rem,4vw,4.5rem)] pb-6"
          >
            <li
              role="presentation"
              className="flex w-[84vw] max-w-[980px] shrink-0 snap-center self-stretch lg:w-[48vw]"
            >
              <div className="relative flex min-h-[calc(48svh+6.5rem)] w-full flex-col justify-between overflow-hidden rounded-[6px] border border-[rgba(131,226,202,.26)] bg-[rgba(13,17,18,.86)] p-6 sm:p-9 lg:p-[clamp(2rem,4vw,4.5rem)]">
                <span
                  className="absolute left-4 top-4 h-6 w-6 border-l border-t border-[#83e2ca]"
                  aria-hidden="true"
                />
                <span
                  className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-[#83e2ca]"
                  aria-hidden="true"
                />

                <div className="font-mono text-[9px] leading-5 tracking-[0.14em] text-white/42">
                  <span className="block text-[#83e2ca]">ARCHIVE_NODE::WY_22—25</span>
                  <span className="block">SOURCE::SHOWREEL_60S</span>
                  <span className="block">STATUS::FRAME_LOCKED</span>
                </div>

                <div className="max-w-3xl py-10">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-[#83e2ca]">
                    [ 08 SIGNALS SELECTED ]
                  </p>
                  <h3 className="mt-5 text-[clamp(3.3rem,7vw,7.8rem)] font-black leading-[0.86] tracking-[-0.055em] max-[360px]:text-[2.85rem]">
                    SELECTED
                    <span className="block text-white/36">FRAMES</span>
                  </h3>
                  <p className="copy-pretty mt-7 max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                    从 60 秒作品选集中截取八个节点，观察场景、动效、合成与剪辑如何共同建立节奏。
                  </p>
                </div>

                <div className="flex items-end justify-between gap-6 border-t border-white/12 pt-5 font-mono text-[9px] tracking-[0.12em] text-white/38">
                  <span>DRAG_X / SCROLL_Y</span>
                  <span aria-hidden="true" className="text-[#83e2ca]">
                    ├──────────→
                  </span>
                </div>
              </div>
            </li>

            {frames.map((frame, index) => (
              <li
                key={frame.src}
                className={`shrink-0 snap-center ${frame.itemClassName}`}
              >
                <figure className="group">
                  <div
                    data-selected-frame-media
                    className="relative h-[48svh] min-h-[320px] max-h-[540px] overflow-hidden rounded-[5px] border border-white/14 bg-[#101415]"
                  >
                    <Image
                      src={frame.src}
                      alt={frame.alt}
                      fill
                      sizes="(min-width: 1024px) 68vw, (min-width: 640px) 76vw, 88vw"
                      draggable={false}
                      className="select-none object-cover transition-[filter] duration-500 group-hover:brightness-110"
                      style={{ objectPosition: frame.objectPosition }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,13,.04)_45%,rgba(9,11,13,.74)_100%)]"
                      aria-hidden="true"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-45 [background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_4px,rgba(131,226,202,.045)_4px,rgba(131,226,202,.045)_5px)]"
                      aria-hidden="true"
                    />

                    <span className="absolute left-4 top-4 border border-[rgba(131,226,202,.36)] bg-[rgba(9,11,13,.72)] px-2.5 py-1.5 font-mono text-[9px] tracking-[0.13em] text-[#83e2ca] backdrop-blur-sm">
                      FRM_{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute right-4 top-4 bg-[rgba(9,11,13,.72)] px-2.5 py-1.5 font-mono text-[9px] tracking-[0.12em] text-white/68 backdrop-blur-sm">
                      {frame.timecode}
                    </span>
                    <span
                      className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-[#83e2ca]"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-white/42"
                      aria-hidden="true"
                    />
                  </div>

                  <figcaption className="grid gap-3 border-t border-white/14 pt-4 sm:grid-cols-[minmax(0,1fr)_minmax(12rem,.7fr)] sm:gap-8">
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.13em] text-[#83e2ca]">
                        {frame.discipline}
                      </p>
                      <h3 className="mt-1.5 text-xl font-bold tracking-[-0.025em] sm:text-2xl">
                        {frame.title}
                      </h3>
                    </div>
                    <p className="copy-pretty text-xs leading-6 text-white/50 sm:text-sm sm:leading-6">
                      {frame.description}
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}

            <li
              aria-hidden="true"
              className="w-[8vw] shrink-0 snap-end lg:w-[14vw]"
            />
          </ol>
        </div>

        <div className="shell relative z-10 mt-2 flex items-center gap-4 font-mono text-[9px] tracking-[0.12em] text-white/40">
          <span className="shrink-0 text-[#83e2ca]">X.POS</span>
          <div
            ref={progressRef}
            role="progressbar"
            aria-label="画廊浏览进度"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
            className="relative h-px flex-1 overflow-hidden bg-white/15"
          >
            <div
              ref={progressFillRef}
              className="absolute inset-0 origin-left scale-x-0 bg-[#83e2ca] shadow-[0_0_14px_rgba(131,226,202,.55)]"
            />
          </div>
          <span className="shrink-0 text-white/70">
            <span ref={progressTextRef}>000</span>%
          </span>
        </div>
      </div>
    </section>
  );
}
