"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";

/** Sticky mobile CTA (PRD §24) — appears once the hero has scrolled away. */
export default function MobileCta({ label }: { label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      const contactTop = contact?.getBoundingClientRect().top ?? Infinity;
      setShow(window.scrollY > 700 && contactTop > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink-950/85 px-4 py-3 backdrop-blur-xl transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="#contact"
        onClick={() => track("hero_cta_click", { cta: "sticky_mobile" })}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-signal px-5 py-3.5 text-[14px] font-semibold text-ink-950"
      >
        {label}
        <ArrowRight size={16} strokeWidth={2.4} />
      </a>
    </div>
  );
}
