"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ReactDOM from "react-dom";

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
    const video = videoRef.current;
    if (!section || !video) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileVideoQuery = window.matchMedia("(max-width: 700px)");
    const connection = getConnection();
    const idleWindow = window as WindowWithIdleCallback;
    let sourceMounted = false;
    let heroIsVisible = true;
    let idleHandle: number | null = null;
    let timeoutHandle: number | null = null;
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
      !mobileVideoQuery.matches &&
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
      if (!disposed) setVideoReady(true);
      syncPausedState();
    };
    const onPause = () => syncPausedState();
    const onVisibilityChange = () => {
      if (document.hidden) video.pause();
      else void playVideo();
    };
    const onWindowLoad = () => scheduleVideo();

    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotionQuery.addEventListener("change", syncVideoMode);
    mobileVideoQuery.addEventListener("change", syncVideoMode);
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
      observer.disconnect();
      window.removeEventListener("load", onWindowLoad);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotionQuery.removeEventListener("change", syncVideoMode);
      mobileVideoQuery.removeEventListener("change", syncVideoMode);
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
      className="relative min-h-[100svh] overflow-hidden bg-[#07090a] text-[#f2f1ec]"
    >
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

      <div className="shell relative z-10 flex min-h-[100svh] flex-col pb-6 pt-24 md:pb-8 md:pt-28">
        <div className="hero-reveal flex max-w-[34rem] items-start gap-2.5 font-mono text-[9px] font-bold leading-[1.55] tracking-[0.13em] text-white/65 uppercase">
          <span className="mt-[.38em] h-[7px] w-[7px] shrink-0 rounded-full bg-[#83e2ca] shadow-[0_0_0_5px_rgba(131,226,202,.1)]" aria-hidden="true" />
          <span>王玉 / 视频后期 · Motion Design · AI 工作流</span>
        </div>

        <div className="mt-auto">
          <div className="hero-reveal">
            <p className="mb-4 font-mono text-[9px] font-bold tracking-[0.14em] text-[#83e2ca] uppercase">
              王玉 · 中国 / GMT+8
            </p>
            <h1 className="max-w-[900px] font-sans text-[clamp(3.25rem,6.8vw,7.25rem)] font-extrabold leading-[1.02] tracking-[-0.045em] max-[520px]:text-[clamp(2.65rem,13.5vw,3.6rem)] max-[520px]:leading-[1.06] max-[520px]:tracking-[-0.035em]">
              <span className="block">做影像，</span>
              <span className="mt-[.06em] block text-white/70">也整理方法。</span>
            </h1>
          </div>

          <div className="hero-reveal mt-7 grid items-end gap-7 lg:grid-cols-[minmax(320px,560px)_auto] lg:justify-between lg:gap-12">
            <p className="max-w-[560px] text-[clamp(1.05rem,1.45vw,1.38rem)] font-medium leading-[1.62] tracking-[-0.02em] text-white/75">
              视频后期与 Motion Design 是我的专业基础；AI 是我持续测试、筛选并带进具体制作流程的工具。
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

        <div className="hero-reveal mt-8 flex min-h-11 items-center justify-between border-t border-white/15 pt-4 font-mono text-[9px] font-bold tracking-[0.13em] text-white/50 uppercase">
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
    </section>
  );
}
