"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Showreel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".showreel-content", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          y: 60, opacity: 0, duration: 1, ease: "power3.out",
        });
        gsap.from(".showreel-frame", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
          scale: 0.85, opacity: 0, duration: 1.2, ease: "power3.out",
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play(); setIsPlaying(true); }
    else { video.pause(); setIsPlaying(false); }
  }, []);

  const handleVideoEnd = useCallback(() => setIsPlaying(false), []);

  return (
    <section ref={sectionRef} id="showreel" className="relative py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="showreel-content text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] mb-3" style={{ color: "var(--c-accent)" }}>
            Motion Reel
          </p>
          <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter" style={{ color: "var(--c-fg)" }}>
            Show<span className="gradient-text">reel</span>
          </h2>
        </div>

        <div
          className="showreel-frame relative rounded-2xl overflow-hidden aspect-video max-w-5xl mx-auto group interactive"
          style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)" }}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src="/videos/2022-2025.mp4"
            poster="/images/showreel-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            preload="none"
            onEnded={handleVideoEnd}
          />

          <div
            className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-500 ${
              isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
            style={{ background: "var(--c-bg-alpha30)" }}
          >
            <button className="play-btn" aria-label={isPlaying ? "Pause showreel" : "Play showreel"}>
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" style={{ fill: "var(--c-accent)" }}>
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" style={{ fill: "var(--c-accent)" }}>
                  <polygon points="8,4 20,12 8,20" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 md:mt-20 max-w-5xl mx-auto">
          {[
            { value: "5+", label: "Years Exp." },
            { value: "AE/PR", label: "Core Tools" },
            { value: "AIGC", label: "Frontier" },
            { value: "Blender", label: "3D Engine" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold gradient-text whitespace-nowrap">{stat.value}</div>
              <div className="text-xs font-mono uppercase tracking-widest mt-2" style={{ color: "var(--c-muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
