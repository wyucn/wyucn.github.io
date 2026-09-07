"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const PARTICLE_COLORS = ["#83e2ca", "#a6efdd", "#57e6b5", "#f2f1ec"];
const MAX_PARTICLES = 32;
const INTERACTIVE = "a, button, [role='button'], video, [data-cursor]";

/**
 * 自定义光标：卡通圆润箭头（玉青填充 + 深色描边）替换原生光标，
 * 尾部持续生成像素粒子——移动时按速度加密、静止时怠速滴落、点击时爆发。
 * 仅在 fine-pointer 且非 reduced-motion 环境启用。
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;
    // 下一帧再启用，避免在 effect 体内同步 setState 造成级联渲染。
    const raf = requestAnimationFrame(() => setEnabled(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const layer = layerRef.current;
    if (!root || !layer) return;

    document.documentElement.classList.add("custom-cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lastX = mouseX;
    let lastY = mouseY;
    let shown = false;
    let live = 0;
    let raf = 0;

    const spawn = (x: number, y: number, boost = 1) => {
      if (live >= MAX_PARTICLES) return;
      live += 1;
      const particle = document.createElement("span");
      const size = 9 + Math.random() * 7;
      particle.className = "cursor-particle";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background =
        PARTICLE_COLORS[(Math.random() * PARTICLE_COLORS.length) | 0];
      layer.appendChild(particle);
      gsap.set(particle, { x, y, xPercent: -50, yPercent: -50 });
      const duration = 0.9 + Math.random() * 0.7;
      gsap.to(particle, {
        x: x + (Math.random() - 0.5) * 52 * boost,
        y: y + (Math.random() - 0.5) * 44 * boost - 16,
        scale: 0,
        duration,
        ease: "power1.out",
        onComplete: () => {
          gsap.killTweensOf(particle);
          particle.remove();
          live -= 1;
        },
      });
      // 前半程保持全亮，后半程再淡出，像素颗粒感更清楚。
      gsap.to(particle, {
        opacity: 0,
        duration: duration * 0.45,
        delay: duration * 0.55,
        ease: "none",
      });
    };

    const burst = (x: number, y: number) => {
      for (let i = 0; i < 6; i += 1) spawn(x, y, 1.6);
    };

    const render = () => {
      root.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      const speed = Math.hypot(mouseX - lastX, mouseY - lastY);
      lastX = mouseX;
      lastY = mouseY;
      if (shown && speed > 2) {
        const count = Math.min(2, 1 + Math.floor(speed / 48));
        for (let i = 0; i < count; i += 1) {
          spawn(
            mouseX + (Math.random() - 0.5) * 8,
            mouseY + 12 + (Math.random() - 0.5) * 8,
            1 + speed / 70,
          );
        }
      }
      raf = requestAnimationFrame(render);
    };

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!shown) {
        shown = true;
        root.style.opacity = "1";
      }
    };

    const onOver = (event: MouseEvent) => {
      const hovering = Boolean(
        (event.target as HTMLElement).closest?.(INTERACTIVE),
      );
      root.classList.toggle("is-hover", hovering);
    };

    const onDown = (event: MouseEvent) => {
      root.classList.add("is-down");
      burst(event.clientX + 4, event.clientY + 6);
    };

    const onUp = () => root.classList.remove("is-down");

    const onLeaveWindow = () => {
      shown = false;
      root.style.opacity = "0";
    };

    // 静止时的怠速粒子滴落：每次两颗、漂移更明显，保持「不断生成」的存在感。
    const idleDrip = window.setInterval(() => {
      if (shown && !document.hidden) {
        for (let i = 0; i < 2; i += 1) {
          spawn(mouseX + (Math.random() - 0.5) * 10, mouseY + 14, 1.1);
        }
      }
    }, 430);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(idleDrip);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.classList.remove("custom-cursor-active");
      gsap.killTweensOf(".cursor-particle");
      layer.replaceChildren();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={layerRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9998]"
      />
      <div ref={rootRef} aria-hidden="true" className="cursor-root">
        <div className="cursor-body">
          <svg
            viewBox="0 0 26 30"
            width="28"
            height="32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6.61 3.99 Q5 2.5 5 4.7 L5 22.3 Q5 24.5 6.74 23.15 L9.22 21.23 Q10.8 20 11.53 21.64 L13.47 25.96 Q14.2 27.6 15.71 27.06 L16.89 26.64 Q18.4 26.1 17.67 24.46 L15.83 20.34 Q15.1 18.7 17.3 18.7 L20.3 18.7 Q22.5 18.7 20.89 17.21 Z"
              fill="#f2f1ec"
              stroke="#07090a"
              strokeWidth="2.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
