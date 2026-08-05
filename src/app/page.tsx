"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Works from "@/components/Works";
import Showreel from "@/components/Showreel";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Footer from "@/components/Footer";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll />
      <div className="noise-overlay" />

      <Navbar />
      <Hero />
      <Showreel />
      <Marquee text="Post · Motion · AIGC · AI Workflow" className="py-5 md:py-7" border />
      <Works />
      <Experience />
      <About />
      <Footer />
    </>
  );
}
