"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 用惰性初始化直接读取 localStorage，避免在 effect 里同步 setState（会触发级联渲染）。
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : "dark";
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 标记已挂载，避免 SSR 与客户端首次渲染因主题不同导致 hydration 不一致。
    // 这是有意为之的挂载标记，故针对该规则单行豁免。
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    // 切换前给 <html> 加 .theme-animate，让颜色过渡只在这一瞬触发，
    // 过渡结束后移除，避免常态下对所有元素强制过渡（性能）。
    const root = document.documentElement;
    root.classList.add("theme-animate");
    window.setTimeout(() => root.classList.remove("theme-animate"), 450);
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  if (!mounted) {
    return <div data-theme="dark">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
