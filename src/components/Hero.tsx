"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactDOM from "react-dom";

gsap.registerPlugin(ScrollTrigger);

type NetworkInformationLike = EventTarget & {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformationLike;
  mozConnection?: NetworkInformationLike;
  webkitConnection?: NetworkInformationLike;
};

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const HERO_VIDEO_SRC = "/videos/hero-background.mp4";

function getConnection() {
  const browserNavigator = navigator as NavigatorWithConnection;
  return (
    browserNavigator.connection ??
    browserNavigator.mozConnection ??
    browserNavigator.webkitConnection
  );
}

export default function Hero() {
  ReactDOM.preload("/images/hero-background-poster.jpg", { as: "image" });

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleSlotRef = useRef<HTMLDivElement>(null);
  const titleMotionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPausedRef = useRef(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoPaused, setVideoPaused] = useState(true);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".hero-reveal", {
          y: 34,
          opacity: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const titleSlot = titleSlotRef.current;
    const titleMotion = titleMotionRef.current;
    const titleHeading = section?.querySelector<HTMLElement>(
      ".hero-title-heading",
    );
    const titleSecondary = section?.querySelector<HTMLElement>(
      ".hero-title-secondary",
    );
    const signaturePath = section?.querySelector<SVGPathElement>(
      ".hero-signature-path",
    );
    if (
      !section ||
      !stage ||
      !titleSlot ||
      !titleMotion ||
      !titleHeading ||
      !titleSecondary ||
      !signaturePath
    ) {
      return;
    }

    const mm = gsap.matchMedia();

    const setupScrollTimeline = (isMobile: boolean) => {
      const ctx = gsap.context(() => {
        const getStartMetrics = () => {
          const slotRect = titleSlot.getBoundingClientRect();
          const stageRect = stage.getBoundingClientRect();
          const preferredScale = isMobile ? 1.14 : 1.28;
          const availableWidth = stageRect.width - (isMobile ? 28 : 72);
          const safeScale = Math.min(
            preferredScale,
            availableWidth / Math.max(slotRect.width, 1),
          );

          return {
            x:
              stageRect.left +
              stageRect.width * 0.5 -
              (slotRect.left + slotRect.width * 0.5),
            y:
              stageRect.top +
              stageRect.height * (isMobile ? 0.46 : 0.49) -
              (slotRect.top + slotRect.height * 0.5),
            scale: Math.max(1, safeScale),
          };
        };

        gsap.set(signaturePath, {
          strokeDasharray: 1,
          strokeDashoffset: 1,
          opacity: 0,
        });
        gsap.set(".hero-supporting", { autoAlpha: 0, y: 18 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: isMobile ? 0.3 : 0.45,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(
            titleMotion,
            {
              x: () => getStartMetrics().x,
              y: () => getStartMetrics().y,
              scale: () => getStartMetrics().scale,
              opacity: 1,
              transformOrigin: "50% 50%",
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.64,
              ease: "none",
              force3D: true,
            },
            0,
          )
          .fromTo(
            titleHeading,
            {
              fontWeight: 900,
              letterSpacing: isMobile ? "-0.005em" : "0.012em",
              lineHeight: isMobile ? 1.14 : 1.12,
            },
            {
              fontWeight: 800,
              letterSpacing: isMobile ? "-0.035em" : "-0.045em",
              lineHeight: isMobile ? 1.06 : 1.02,
              duration: 0.64,
              ease: "none",
            },
            0,
          )
          .fromTo(
            titleSecondary,
            { marginTop: isMobile ? "0.13em" : "0.18em" },
            {
              marginTop: "0.06em",
              duration: 0.64,
              ease: "none",
            },
            0,
          )
          .set(signaturePath, { opacity: 0.68 }, 0.16)
          .to(
            signaturePath,
            {
              strokeDashoffset: 0,
              duration: 0.64,
              ease: "none",
            },
            0.16,
          )
          .to(
            ".hero-supporting",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.32,
              stagger: 0.05,
              ease: "power2.out",
            },
            0.52,
          );
      }, section);

      return () => ctx.revert();
    };

    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-height: 681px) and (max-width: 767px)",
      () => setupScrollTimeline(true),
    );
    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-height: 681px) and (min-width: 768px)",
      () => setupScrollTimeline(false),
    );

    mm.add(
      "(prefers-reduced-motion: reduce), (max-height: 680px)",
      () => {
        const ctx = gsap.context(() => {
          gsap.set(titleMotion, { clearProps: "transform" });
          gsap.set(signaturePath, {
            strokeDasharray: 1,
            strokeDashoffset: 0,
            opacity: 0.68,
          });
          gsap.set(".hero-supporting", {
            clearProps: "opacity,visibility,transform",
          });
        }, section);

        return () => ctx.revert();
      },
    );

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = getConnection();
    const idleWindow = window as WindowWithIdleCallback;
    let sourceMounted = false;
    let heroIsVisible = true;
    let idleHandle: number | null = null;
    let timeoutHandle: number | null = null;
    let retryHandle: number | null = null;
    let retryCount = 0;
    let disposed = false;

    const hasConstrainedConnection = () => {
      const effectiveType = connection?.effectiveType;
      return Boolean(
        connection?.saveData ||
          (effectiveType && ["slow-2g", "2g", "3g"].includes(effectiveType)),
      );
    };

    const canUseVideo = () =>
      !reducedMotionQuery.matches &&
      !hasConstrainedConnection();

    const syncPausedState = () => {
      if (!disposed) setVideoPaused(video.paused);
    };

    const playVideo = async () => {
      if (
        disposed ||
        !sourceMounted ||
        manuallyPausedRef.current ||
        !heroIsVisible ||
        document.hidden ||
        !canUseVideo()
      ) {
        return;
      }

      try {
        video.muted = true;
        await video.play();
      } catch {
        if (!disposed) setVideoReady(false);
      }
      syncPausedState();
    };

    const unmountVideo = () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
      sourceMounted = false;
      manuallyPausedRef.current = false;
      if (!disposed) {
        setVideoEnabled(false);
        setVideoReady(false);
        setVideoPaused(true);
      }
    };

    const mountVideo = () => {
      if (sourceMounted || !canUseVideo()) return;
      sourceMounted = true;
      video.src = HERO_VIDEO_SRC;
      video.load();
      if (!disposed) setVideoEnabled(true);
      void playVideo();
    };

    const cancelScheduledMount = () => {
      if (idleHandle !== null) {
        idleWindow.cancelIdleCallback?.(idleHandle);
        idleHandle = null;
      }
      if (timeoutHandle !== null) {
        window.clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }
    };

    const cancelRetry = () => {
      if (retryHandle !== null) {
        window.clearTimeout(retryHandle);
        retryHandle = null;
      }
    };

    const scheduleVideo = () => {
      cancelScheduledMount();
      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(mountVideo, { timeout: 1600 });
      } else {
        timeoutHandle = window.setTimeout(mountVideo, 700);
      }
    };

    const syncVideoMode = () => {
      cancelScheduledMount();
      if (canUseVideo()) mountVideo();
      else unmountVideo();
    };

    const onPlaying = () => {
      retryCount = 0;
      if (!disposed) setVideoReady(true);
      syncPausedState();
    };
    const onError = () => {
      if (disposed) return;
      video.pause();
      video.removeAttribute("src");
      video.load();
      sourceMounted = false;
      setVideoReady(false);
      setVideoEnabled(false);
      setVideoPaused(true);

      if (retryCount < 1 && canUseVideo()) {
        retryCount += 1;
        retryHandle = window.setTimeout(() => {
          retryHandle = null;
          if (!disposed && heroIsVisible && !document.hidden) mountVideo();
        }, 1500);
      }
    };
    const onPause = () => syncPausedState();
    const onVisibilityChange = () => {
      if (document.hidden) video.pause();
      else void playVideo();
    };
    const onWindowLoad = () => scheduleVideo();

    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);
    video.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotionQuery.addEventListener("change", syncVideoMode);
    connection?.addEventListener("change", syncVideoMode);

    const observer = new IntersectionObserver(
      ([entry]) => {
        heroIsVisible = entry.isIntersecting;
        if (heroIsVisible) void playVideo();
        else video.pause();
      },
      { threshold: 0.12 },
    );
    observer.observe(section);

    if (document.readyState === "complete") scheduleVideo();
    else window.addEventListener("load", onWindowLoad, { once: true });

    return () => {
      disposed = true;
      cancelScheduledMount();
      cancelRetry();
      observer.disconnect();
      window.removeEventListener("load", onWindowLoad);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
      video.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotionQuery.removeEventListener("change", syncVideoMode);
      connection?.removeEventListener("change", syncVideoMode);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video || !videoEnabled) return;

    if (video.paused) {
      manuallyPausedRef.current = false;
      try {
        await video.play();
      } catch {
        setVideoReady(false);
      }
    } else {
      manuallyPausedRef.current = true;
      video.pause();
    }
    setVideoPaused(video.paused);
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-track relative bg-[#07090a] text-[#f2f1ec]"
    >
      <div ref={stageRef} className="hero-stage">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-background-poster.jpg')" }}
          aria-hidden="true"
        >
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full max-w-none scale-[1.015] object-cover object-center transition-opacity duration-[900ms] ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            style={{ filter: "saturate(.78) contrast(1.08) brightness(.76)" }}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/images/hero-background-poster.jpg"
            tabIndex={-1}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(4,6,7,.84) 0%, rgba(4,6,7,.5) 46%, rgba(4,6,7,.16) 100%), linear-gradient(0deg, rgba(4,6,7,.92) 0%, rgba(4,6,7,.14) 54%, rgba(4,6,7,.44) 100%)",
            }}
          />
          <div className="absolute inset-0 hidden bg-[linear-gradient(0deg,rgba(4,6,7,.42),rgba(4,6,7,.04))] max-[700px]:block" />
        </div>
        <div className="ascii-scanlines pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

        <pre className="ascii-telemetry pointer-events-none absolute right-[3.2vw] top-[18%] z-[6] hidden text-[9px] font-bold leading-[1.55] tracking-[0.12em] text-[#83e2ca]/42 xl:block" aria-hidden="true">
{`+------------------------+
| WY_SYS :: CHANNEL_01  |
| FRAME    024.00       |
| SIGNAL   [||||||||..] |
| MOTION   TIMELINE     |
| AI_FLOW  LINKED       |
+------------------------+`}
        </pre>

        <div className="shell relative z-10 flex min-h-[100svh] flex-col pb-6 pt-24 md:pb-8 md:pt-28">
          <div className="hero-reveal flex max-w-[34rem] items-start gap-2.5 font-mono text-[9px] font-bold leading-[1.55] tracking-[0.13em] text-white/65 uppercase">
            <span className="mt-[.38em] h-[7px] w-[7px] shrink-0 rounded-full bg-[#83e2ca] shadow-[0_0_0_5px_rgba(131,226,202,.1)]" aria-hidden="true" />
            <span className="copy-pretty">
              王玉 / 视频后期 · <span className="keep-phrase">Motion Design</span> · <span className="keep-phrase">AI 工作流</span>
            </span>
          </div>

          <div className="mt-auto">
            <p className="hero-supporting mb-4 font-mono text-[9px] font-bold tracking-[0.14em] text-[#83e2ca] uppercase">
              王玉 · 中国 / GMT+8
            </p>
            <div ref={titleSlotRef} className="relative w-fit max-w-[900px]">
              <div ref={titleMotionRef} className="hero-title-motion relative will-change-transform">
                <h1 className="hero-title-heading relative z-10 max-w-[900px] font-sans text-[clamp(3.25rem,6.8vw,7.25rem)] font-extrabold leading-[1.02] tracking-[-0.045em] max-[520px]:text-[clamp(2.65rem,13.5vw,3.6rem)] max-[520px]:leading-[1.06] max-[520px]:tracking-[-0.035em]">
                  <span className="block">做影像，</span>
                  <span className="hero-title-secondary mt-[.06em] block text-white/70">也整理方法。</span>
                </h1>
                <svg
                  viewBox="-8 -8 1267.34 349.22"
                  className="pointer-events-none absolute left-[30%] top-[68%] z-0 w-[88%] max-w-none -rotate-[2deg] overflow-visible md:left-[58%] md:top-[61%] md:w-[88%]"
                  aria-hidden="true"
                >
                  <path
                    className="hero-signature-path"
                    d="M.37,160.42S269.48,127.42,470.88,9.04c-35.4,54.37-46.4,219.37-44.9,260.3-29.5-10.93-66.78-82.65-44.64-95.29,22.14-12.64,65.27-27,82.21-11.32,16.93,15.68-129.07,160.68-145.3,166.61,24.73-10.93,411.23-196.93,508.16-251.98-13.93,49.05-27.91,206.34-10.42,222.19,17.49,15.85-64.1-31.05-48.31-70.1,15.8-39.05,85.72-36.9,79.75-19.58-16.38,47.47-123.86,139.36-100.83,116.85,35.87-15.31,155.37-29.31,202.05-27.76-10.18-93.55-35.22-106.67-57.2-74.11-21.98,32.56,359.14-64.44,359.14-64.44"
                    pathLength="1"
                    fill="none"
                    stroke="#83e2ca"
                    strokeWidth="3.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: 1,
                      opacity: 0,
                    }}
                  />
                </svg>
              </div>
            </div>

            <div className="hero-supporting mt-7 grid items-end gap-7 lg:grid-cols-[minmax(320px,580px)_auto] lg:justify-between lg:gap-12">
              <p className="copy-pretty max-w-[580px] text-[clamp(1.05rem,1.45vw,1.38rem)] font-medium leading-[1.62] tracking-[-0.02em] text-white/78">
                以视频后期与 <span className="keep-phrase">Motion Design</span> 为专业基础，我持续测试、筛选<span className="keep-phrase">AI 工具，</span>并把真正可用的能力带进制作流程。
              </p>
              <div className="flex flex-wrap items-center gap-5 max-[520px]:flex-col max-[520px]:items-start">
                <a
                  href="#showreel"
                  className="inline-flex min-h-[52px] items-center gap-5 rounded-[2px] bg-[#f2f1ec] px-5 text-[11px] font-extrabold tracking-[0.06em] text-[#07090a] transition hover:bg-white hover:-translate-y-0.5"
                >
                  观看 Showreel <span aria-hidden="true">↘</span>
                </a>
                <a
                  href="#works"
                  className="inline-flex min-h-[52px] items-center gap-5 border-b border-white/40 px-1 text-[11px] font-extrabold tracking-[0.06em] transition hover:border-[#83e2ca] hover:text-[#83e2ca]"
                >
                  项目与实践 <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>

          <div className="hero-supporting mt-8 flex min-h-11 items-center justify-between border-t border-white/15 pt-4 font-mono text-[9px] font-bold tracking-[0.13em] text-white/50 uppercase">
            <span className="max-[520px]:hidden">Showreel / 2022—2025 / 60 秒</span>
            {videoEnabled ? (
              <button
                type="button"
                onClick={() => void toggleVideo()}
                className="ml-auto inline-flex min-h-11 items-center gap-2.5 transition hover:text-[#83e2ca]"
                aria-label={videoPaused ? "播放背景视频" : "暂停背景视频"}
              >
                <span className="w-3 text-center text-[10px]" aria-hidden="true">
                  {videoPaused ? "▶" : "Ⅱ"}
                </span>
                <span>{videoPaused ? "播放动态" : "暂停动态"}</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
