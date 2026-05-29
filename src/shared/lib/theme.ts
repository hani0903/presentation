import { useLayoutEffect, useState } from "react";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    const timer = window.setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 250);
    return () => window.clearTimeout(timer);
  };

  return { theme, isDark: theme === "dark", toggle };
};
