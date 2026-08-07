"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

const navLinks = [
  { label: "作品", href: "#showreel", index: "01" },
  { label: "项目", href: "#works", index: "02" },
  { label: "经历", href: "#experience", index: "03" },
  { label: "能力", href: "#capabilities", index: "04" },
  { label: "关于", href: "#about", index: "05" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#top");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const pendingNavigationRef = useRef<string | null>(null);

  useEffect(() => {
    const sectionHrefs = [
      "#top",
      ...navLinks.map((link) => link.href),
      "#contact",
    ];

    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const marker = window.scrollY + window.innerHeight * 0.36;
      let nextHref = "#top";
      for (const href of sectionHrefs) {
        const section = document.querySelector<HTMLElement>(href);
        if (section && section.offsetTop <= marker) nextHref = href;
      }

      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 8
      ) {
        nextHref = "#contact";
      }

      setActiveHref((current) =>
        current === nextHref ? current : nextHref,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const backgroundRegions = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer"),
    );
    const menuButton = menuButtonRef.current;
    const scrollPosition = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";
    backgroundRegions.forEach((region) => {
      region.inert = true;
    });
    window.dispatchEvent(
      new CustomEvent("portfolio-menu-state", { detail: true }),
    );

    window.requestAnimationFrame(() => {
      menuPanelRef.current
        ?.querySelector<HTMLAnchorElement>("a[href]")
        ?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const links = Array.from(
        menuPanelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [],
      );
      const focusable = [menuButton, ...links].filter(
        (item): item is HTMLElement => Boolean(item),
      );
      const currentIndex = focusable.indexOf(
        document.activeElement as HTMLElement,
      );

      if (event.shiftKey && currentIndex <= 0) {
        event.preventDefault();
        focusable.at(-1)?.focus();
      } else if (
        !event.shiftKey &&
        currentIndex === focusable.length - 1
      ) {
        event.preventDefault();
        focusable[0]?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      const pendingNavigation = pendingNavigationRef.current;
      pendingNavigationRef.current = null;

      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      document.documentElement.style.overflow = previousHtmlOverflow;
      backgroundRegions.forEach((region) => {
        region.inert = false;
      });
      window.scrollTo({ top: scrollPosition, behavior: "auto" });
      window.dispatchEvent(
        new CustomEvent("portfolio-menu-state", { detail: false }),
      );
      window.removeEventListener("keydown", onKeyDown);

      if (pendingNavigation) {
        window.requestAnimationFrame(() => {
          const target = document.querySelector<HTMLElement>(pendingNavigation);
          if (!target) return;

          window.history.pushState(null, "", pendingNavigation);
          target.scrollIntoView({
            block: "start",
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          });

          const previousTabIndex = target.getAttribute("tabindex");
          window.setTimeout(() => {
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
            target.addEventListener(
              "blur",
              () => {
                if (previousTabIndex === null) target.removeAttribute("tabindex");
                else target.setAttribute("tabindex", previousTabIndex);
              },
              { once: true },
            );
          }, 850);
        });
      } else {
        menuButton?.focus();
      }
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) setMenuOpen(false);
    };

    closeOnDesktop();
    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const navigateFromMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) {
      closeMenu();
      return;
    }

    event.preventDefault();
    pendingNavigationRef.current = href;
    closeMenu();
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 h-[76px] text-[#f2f1ec] transition-all duration-500 md:h-[88px]"
        style={{
          background:
            scrolled || menuOpen ? "rgba(7, 9, 10, 0.88)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(18px)" : "none",
          borderBottom:
            scrolled || menuOpen
              ? "1px solid rgba(255,255,255,.1)"
              : "1px solid transparent",
        }}
      >
        <nav
          className="shell grid h-full grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]"
          aria-label="主导航"
        >
          <a
            href="#top"
            tabIndex={menuOpen ? -1 : 0}
            onClick={menuOpen ? navigateFromMenu : closeMenu}
            className="inline-flex min-h-11 w-fit items-center text-[#f2f1ec] transition hover:text-[#83e2ca]"
            aria-label="王玉个人网站首页"
          >
            <span className="site-wordmark text-[27px] leading-none md:text-[31px]">
              WANGYU
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex lg:gap-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={activeHref === link.href ? "location" : undefined}
                className={`group relative inline-flex min-h-11 items-center py-3 text-[13px] font-extrabold tracking-[0.06em] transition-colors duration-300 lg:text-[14px] ${
                  activeHref === link.href
                    ? "text-[#83e2ca]"
                    : "text-white/88 hover:text-[#83e2ca]"
                }`}
              >
                <span
                  className={`absolute -left-3 h-1.5 w-1.5 rotate-45 bg-[#83e2ca] transition-all duration-300 ${
                    activeHref === link.href
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }`}
                  aria-hidden="true"
                />
                {link.label}
                <span
                  className={`absolute inset-x-0 bottom-1 h-px bg-[#83e2ca] transition-transform duration-300 ${
                    activeHref === link.href
                      ? "origin-left scale-x-100"
                      : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            aria-current={activeHref === "#contact" ? "location" : undefined}
            className={`!hidden min-h-11 justify-self-end border-b py-2 text-[13px] font-extrabold tracking-[0.06em] transition-colors duration-300 md:!inline-flex md:items-center md:gap-3 lg:text-[14px] ${
              activeHref === "#contact"
                ? "border-[#83e2ca] text-[#83e2ca]"
                : "border-white/35 hover:border-[#83e2ca] hover:text-[#83e2ca]"
            }`}
          >
            联系 <span aria-hidden="true">↗</span>
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 justify-self-end rounded-sm border border-white/55 md:hidden"
            aria-label={menuOpen ? "关闭导航" : "打开导航"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span
              className="block h-px w-5 bg-current transition-transform duration-300"
              style={{
                transform: menuOpen
                  ? "rotate(45deg) translateY(5.5px)"
                  : "none",
              }}
            />
            <span
              className="block h-px w-5 bg-current transition-opacity duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-px w-5 bg-current transition-transform duration-300"
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translateY(-5.5px)"
                  : "none",
              }}
            />
          </button>
        </nav>
      </header>

      <div
        ref={menuPanelRef}
        id="mobile-navigation"
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-label="移动导航"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col justify-start overflow-y-auto bg-[#07090a] px-7 pb-8 pt-28 text-[#f2f1ec] transition-all duration-500 md:hidden ${
          menuOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="border-t border-white/15">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={navigateFromMenu}
              className="grid grid-cols-[42px_minmax(0,1fr)_auto] items-center border-b border-white/15 py-5"
            >
              <span className="font-mono text-[9px] text-[#83e2ca]">
                {link.index}
              </span>
              <span className="min-w-0 text-[clamp(2.6rem,15vw,4.5rem)] font-extrabold leading-[1.06] tracking-[-0.04em]">
                {link.label}
              </span>
              <span aria-hidden="true" className="text-xl">
                ↗
              </span>
            </a>
          ))}
        </div>
        <a
          href="#contact"
          tabIndex={menuOpen ? 0 : -1}
          onClick={navigateFromMenu}
          className="mt-7 inline-flex min-h-12 items-center gap-4 self-start border-b border-[#83e2ca] text-sm font-bold text-[#83e2ca]"
        >
          联系 <span aria-hidden="true">↗</span>
        </a>
      </div>
    </>
  );
}
