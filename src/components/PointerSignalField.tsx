"use client";

import { useEffect, useRef } from "react";
import styles from "./PointerSignalField.module.css";

type NetworkInformationLike = EventTarget & {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformationLike;
};

type Dot = {
  cx: number;
  cy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  locked: boolean;
};

type PointerSignalFieldProps = {
  className?: string;
};

const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const hexToRgb = (hex: string) => {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
};

const dotColor = (
  base: { r: number; g: number; b: number },
  active: { r: number; g: number; b: number },
  amount: number,
  alpha: number,
) => {
  const strength = clamp(amount, 0, 1);
  const r = Math.round(lerp(base.r, active.r, strength));
  const g = Math.round(lerp(base.g, active.g, strength));
  const b = Math.round(lerp(base.b, active.b, strength));
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
};

export default function PointerSignalField({
  className = "",
}: PointerSignalFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !stage || !context) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as NavigatorWithConnection).connection;
    const baseColor = hexToRgb("#f2f1ec");
    const activeColor = hexToRgb("#d9dbd8");
    const dots: Dot[] = [];
    const pointer = {
      x: -1000,
      y: -1000,
      vx: 0,
      vy: 0,
      lastX: -1000,
      lastY: -1000,
      lastTime: 0,
      inside: false,
    };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let spacing = 20;
    const dotSize = 1.35;
    let animationFrame: number | null = null;
    let drawFrame: number | null = null;
    let visible = true;
    let enabled = false;
    let hasDotMotion = false;

    const hasConstrainedConnection = () =>
      Boolean(
        connection?.saveData ||
          (connection?.effectiveType &&
            ["slow-2g", "2g"].includes(connection.effectiveType)),
      );

    const shouldEnable = () =>
      finePointer.matches &&
      !reducedMotion.matches &&
      !hasConstrainedConnection();

    const makeGrid = () => {
      const rect = stage.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      spacing = width < 900 ? 22 : 20;

      const estimatedCount =
        Math.ceil(width / spacing) * Math.ceil(height / spacing);
      if (estimatedCount > 9000) {
        spacing = Math.ceil(Math.sqrt((width * height) / 9000));
      }

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots.length = 0;

      const columns = Math.max(1, Math.floor((width - spacing) / spacing) + 1);
      const rows = Math.max(1, Math.floor((height - spacing) / spacing) + 1);
      const offsetX = (width - (columns - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const cx = offsetX + column * spacing;
          const cy = offsetY + row * spacing;
          dots.push({ cx, cy, x: 0, y: 0, vx: 0, vy: 0, locked: false });
        }
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const proximity = 150;

      for (const dot of dots) {
        const x = dot.cx + dot.x;
        const y = dot.cy + dot.y;
        const distance = Math.hypot(x - pointer.x, y - pointer.y);
        const proximityAmount =
          pointer.inside && distance < proximity
            ? 1 - distance / proximity
            : 0;
        const alpha = 0.075 + proximityAmount * 0.24;

        context.fillStyle = dotColor(
          baseColor,
          activeColor,
          proximityAmount,
          alpha,
        );
        context.fillRect(
          x - dotSize / 2,
          y - dotSize / 2,
          dotSize,
          dotSize,
        );
      }
    };

    const scheduleDraw = () => {
      if (drawFrame !== null || !visible) return;
      drawFrame = window.requestAnimationFrame(() => {
        drawFrame = null;
        draw();
      });
    };

    const animate = () => {
      animationFrame = null;
      if (!visible) return;

      hasDotMotion = false;
      for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.vx *= 0.84;
        dot.vy *= 0.84;
        dot.vx += -dot.x * 0.075;
        dot.vy += -dot.y * 0.075;

        if (
          Math.abs(dot.x) > 0.08 ||
          Math.abs(dot.y) > 0.08 ||
          Math.abs(dot.vx) > 0.08 ||
          Math.abs(dot.vy) > 0.08
        ) {
          hasDotMotion = true;
        } else {
          dot.x = 0;
          dot.y = 0;
          dot.vx = 0;
          dot.vy = 0;
          dot.locked = false;
        }
      }

      draw();
      if (hasDotMotion) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const scheduleAnimation = () => {
      if (animationFrame === null && visible && enabled) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const disturb = (
      x: number,
      y: number,
      pointerVelocityX: number,
      pointerVelocityY: number,
      strength: number,
    ) => {
      const radius = 150;
      for (const dot of dots) {
        if (dot.locked) continue;
        const dx = dot.cx + dot.x - x;
        const dy = dot.cy + dot.y - y;
        const distance = Math.hypot(dx, dy);
        if (distance === 0 || distance > radius) continue;

        const influence = 1 - distance / radius;
        const directionX = dx / distance;
        const directionY = dy / distance;
        const speedBiasX = clamp(pointerVelocityX * 0.00045, -1.8, 1.8);
        const speedBiasY = clamp(pointerVelocityY * 0.00045, -1.8, 1.8);
        dot.vx += (directionX * strength + speedBiasX) * influence;
        dot.vy += (directionY * strength + speedBiasY) * influence;
        dot.locked = true;
      }
      scheduleAnimation();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!enabled || !visible || event.pointerType === "touch") return;
      const rect = stage.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      if (!inside) {
        pointer.inside = false;
        scheduleDraw();
        return;
      }

      const now = performance.now();
      const elapsed = pointer.lastTime ? Math.max(now - pointer.lastTime, 8) : 16;
      const deltaX = pointer.lastX > -999 ? x - pointer.lastX : 0;
      const deltaY = pointer.lastY > -999 ? y - pointer.lastY : 0;
      pointer.vx = (deltaX / elapsed) * 1000;
      pointer.vy = (deltaY / elapsed) * 1000;
      pointer.lastX = x;
      pointer.lastY = y;
      pointer.lastTime = now;
      pointer.x = x;
      pointer.y = y;
      pointer.inside = true;

      if (Math.hypot(pointer.vx, pointer.vy) > 100) {
        const speed = Math.min(Math.hypot(pointer.vx, pointer.vy), 5000);
        disturb(
          x,
          y,
          pointer.vx,
          pointer.vy,
          Math.min(speed / 1600, 2.8),
        );
      }
      scheduleDraw();
    };

    const onPointerLeave = () => {
      pointer.inside = false;
      pointer.lastX = -1000;
      pointer.lastY = -1000;
      pointer.lastTime = 0;
      scheduleDraw();
    };

    const onWindowBlur = () => {
      pointer.inside = false;
      pointer.lastX = -1000;
      pointer.lastY = -1000;
      scheduleDraw();
    };

    const syncMode = () => {
      enabled = shouldEnable();
      if (!enabled) {
        pointer.inside = false;
        if (animationFrame !== null) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
        scheduleDraw();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          scheduleDraw();
          if (hasDotMotion) scheduleAnimation();
        }
        else {
          if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
          if (drawFrame !== null) window.cancelAnimationFrame(drawFrame);
          animationFrame = null;
          drawFrame = null;
        }
      },
      { threshold: 0.02 },
    );

    const resizeObserver = new ResizeObserver(() => {
      makeGrid();
      scheduleDraw();
    });

    makeGrid();
    draw();
    observer.observe(stage);
    resizeObserver.observe(stage);
    syncMode();

    stage.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onWindowBlur);
    finePointer.addEventListener("change", syncMode);
    reducedMotion.addEventListener("change", syncMode);
    connection?.addEventListener("change", syncMode);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onWindowBlur);
      finePointer.removeEventListener("change", syncMode);
      reducedMotion.removeEventListener("change", syncMode);
      connection?.removeEventListener("change", syncMode);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      if (drawFrame !== null) window.cancelAnimationFrame(drawFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.field} ${className}`}
      aria-hidden="true"
    />
  );
}
