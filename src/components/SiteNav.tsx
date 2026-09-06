"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { track } from "@/lib/analytics";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

export default function SiteNav({
  d,
  locale,
}: {
  d: Dictionary["nav"];
  locale: Locale;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-line bg-ink-950/72 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav
          aria-label={d.ariaPrimary}
          className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-5 sm:px-8"
        >
          <a href="#top" className="shrink-0" aria-label={d.ariaHome}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {d.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[13.5px] text-fg-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitcher
              locale={locale}
              label={d.languageLabel}
              className="hidden sm:flex"
            />

            <a
              href="#contact"
              onClick={() => track("nav_cta_click")}
              className="hidden items-center gap-2 rounded-full border border-signal/35 bg-signal/10 px-4 py-2 text-[13px] font-medium text-signal transition-colors hover:bg-signal/18 lg:inline-flex"
            >
              {d.cta}
              <ArrowRight size={14} strokeWidth={2} />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? d.closeMenu : d.openMenu}
              className="grid h-10 w-10 place-items-center rounded-lg border border-line text-fg-muted lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile panel */}
      <div
        className={`fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-xl transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="mt-20 flex flex-col px-6">
          {d.links.map((link) => (
            <li key={link.href} className="border-b border-line">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-5 text-lg font-medium text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5 px-6 pt-8">
          <a
            href="#contact"
            onClick={() => {
              setOpen(false);
              track("nav_cta_click", { source: "mobile_menu" });
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-signal px-5 py-3.5 text-sm font-semibold text-ink-950"
          >
            {d.cta}
            <ArrowRight size={15} strokeWidth={2.4} />
          </a>

          <div className="flex items-center justify-between">
            <span className="mono-label">{d.languageLabel}</span>
            <LanguageSwitcher locale={locale} label={d.languageLabel} />
          </div>
        </div>
      </div>
    </>
  );
}
