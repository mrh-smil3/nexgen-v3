"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";
import { track } from "@/lib/analytics";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  // Until the visitor picks a theme explicitly, keep following the OS.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      } catch {}
      applyTheme(e.matches ? "light" : "dark");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next: Theme =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
    track("theme_toggle", { theme: next });
  }

  // The icon is chosen by CSS (the `light:` variant), not React state, so the
  // server render matches whatever the pre-paint script already decided.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid h-10 w-10 place-items-center rounded-lg border border-line text-fg-muted transition-colors hover:text-fg ${className}`}
    >
      <Sun size={17} strokeWidth={1.9} className="light:hidden" />
      <Moon size={17} strokeWidth={1.9} className="hidden light:block" />
    </button>
  );
}
