"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Showreel", href: "#showreel" },
  { label: "Work", href: "#works" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className="fixed left-0 top-0 z-50 w-full transition-all duration-500"
        style={{
          background: scrolled || menuOpen ? "var(--c-bg-alpha80)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(24px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid var(--c-border)" : "1px solid transparent",
        }}
        aria-label="主导航"
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10">
        <a href="#" onClick={closeMenu} className="interactive text-xl font-extrabold tracking-tight md:text-2xl" aria-label="返回首页">
          <span className="gradient-text">WANGYU</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="link-accent interactive text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-300">
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <a href="#contact" className="btn-outline interactive ml-1 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300">
            Let&apos;s Talk
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="interactive flex h-9 w-9 flex-col items-center justify-center gap-1.5"
            aria-label={menuOpen ? "关闭导航" : "打开导航"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="block h-0.5 w-6 transition-all duration-300" style={{ background: "var(--c-hamburger)", transform: menuOpen ? "rotate(45deg) translateY(5.5px)" : "none" }} />
            <span className="block h-0.5 w-6 transition-all duration-300" style={{ background: "var(--c-hamburger)", opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-0.5 w-6 transition-all duration-300" style={{ background: "var(--c-hamburger)", transform: menuOpen ? "rotate(-45deg) translateY(-5.5px)" : "none" }} />
          </button>
        </div>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        data-lenis-prevent
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 pt-16 transition-all duration-300 md:hidden ${menuOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"}`}
        style={{ background: "var(--c-bg-alpha95)", backdropFilter: "blur(24px)" }}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
            className="link-strong text-3xl font-bold uppercase tracking-wider transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a href="#contact" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu} className="btn-accent mt-3 rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wider">
          Contact
        </a>
      </div>
    </>
  );
}
