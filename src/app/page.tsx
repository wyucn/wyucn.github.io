import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Showreel from "@/components/Showreel";
import About from "@/components/About";
import Footer from "@/components/Footer";
import AsciiStrip from "@/components/AsciiStrip";
import SelectedFrames from "@/components/SelectedFrames";
import {
  BILIBILI_URL,
  GITHUB_URL,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

const shareImageAlt =
  "王玉 — Video Post-Production / Motion Design / AI Workflow";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "王玉",
    "视频后期",
    "Motion Design",
    "视频剪辑",
    "动态视觉",
    "AIGC",
    "AI Creative Workflow",
    "Creative Technology",
    "作品集",
  ],
  authors: [{ name: "王玉" }],
  creator: "王玉",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: shareImageAlt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        alt: shareImageAlt,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// 首页专属的结构化数据，避免错误页继承作品集身份信息。
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "王玉",
  jobTitle: "Motion Designer / Creative Technologist",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  sameAs: [BILIBILI_URL, GITHUB_URL],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <a className="skip-link" href="#main-content">跳到主要内容</a>

      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <AsciiStrip />
        <Showreel />
        <SelectedFrames />
        <Works />
        <About />
      </main>
      <Footer />
    </>
  );
}
