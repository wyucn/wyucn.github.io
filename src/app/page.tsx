import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Showreel from "@/components/Showreel";
import Experience from "@/components/Experience";
import Capabilities from "@/components/Capabilities";
import About from "@/components/About";
import Footer from "@/components/Footer";
import AsciiStrip from "@/components/AsciiStrip";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>

      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <AsciiStrip />
        <Showreel />
        <Works />
        <Experience />
        <Capabilities />
        <About />
      </main>
      <Footer />
    </>
  );
}
