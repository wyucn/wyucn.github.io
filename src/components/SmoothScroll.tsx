"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const ANCHOR_OFFSET = -88;

/**
 * Lenis 平滑滚动：
 * - 与 GSAP ticker / ScrollTrigger 同步，避免双 raf 抖动。
 * - 捕获阶段拦截站内锚点点击，用 lenis.scrollTo 播放品牌缓动。
 * - 监听导航移动菜单的 portfolio-menu-state 事件，菜单打开时锁定滚动。
 * - prefers-reduced-motion 下完全不启用，保持原生滚动。
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onMenuState = (event: Event) => {
      const open = (event as CustomEvent<boolean>).detail;
      if (open) lenis.stop();
      else lenis.start();
    };
    window.addEventListener("portfolio-menu-state", onMenuState);

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement).closest?.("a[href^='#']");
      if (!anchor) return;
      if (anchor.classList.contains("skip-link")) return;
      // 移动菜单自行处理导航（先关菜单再滚动），不拦截。
      if (anchor.closest("#mobile-navigation")) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();
      window.history.pushState(null, "", href);
      lenis.scrollTo(target, {
        offset: href === "#top" ? 0 : ANCHOR_OFFSET,
        duration: 1.35,
      });
    };
    document.addEventListener("click", onAnchorClick, true);

    // 锚点跳转后 ScrollTrigger 需要按新位置刷新测量。
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      document.removeEventListener("click", onAnchorClick, true);
      window.removeEventListener("portfolio-menu-state", onMenuState);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
