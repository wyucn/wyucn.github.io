"use client";

import ViewportEffect from "@/components/ViewportEffect";
import LetterGlitch from "@/components/react-bits/LetterGlitch";

export default function AsciiStrip() {
  return (
    <div
      className="ascii-strip relative z-20 overflow-hidden border-y border-[rgba(131,226,202,.28)] bg-[#0b0e0f] text-[#83e2ca]"
      aria-hidden="true"
    >
      <ViewportEffect className="absolute inset-0 opacity-30 [mask-image:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]">
        <LetterGlitch
          className="h-full w-full"
          glitchColors={["#24453e", "#83e2ca", "#a7d8ff"]}
          glitchSpeed={90}
          centerVignette={false}
          outerVignette={false}
          smooth
          characters="WANGYU/VIDEO.MOTION_AI+01"
        />
      </ViewportEffect>
      <span className="absolute inset-y-0 left-0 w-1 bg-[#83e2ca]" />
      <div className="shell relative z-10 flex min-h-11 items-center justify-between gap-5 font-mono text-[9px] font-bold tracking-[0.12em] uppercase md:text-[10px] md:tracking-[0.14em]">
        <span className="whitespace-nowrap md:hidden">+--[ WY::01 ]--+</span>
        <span className="hidden whitespace-nowrap md:inline">
          +--[ WANGYU::VISUAL_SYSTEM / CHANNEL_01 ]--+
        </span>
        <span className="hidden truncate text-center text-[#a6efdd]/70 lg:inline">
          010101 // VIDEO.POST // MOTION.DESIGN // AI.WORKFLOW
        </span>
        <span className="whitespace-nowrap">SIGNAL::STABLE_</span>
      </div>
    </div>
  );
}
