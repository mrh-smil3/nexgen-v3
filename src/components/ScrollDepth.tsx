"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

const MARKS = [25, 50, 75, 100];

/** Emits scroll_depth once per threshold, throttled to animation frames. */
export default function ScrollDepth() {
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    let queued = false;

    const measure = () => {
      queued = false;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const percent = (window.scrollY / scrollable) * 100;
      for (const mark of MARKS) {
        if (percent >= mark && !fired.current.has(mark)) {
          fired.current.add(mark);
          track("scroll_depth", { percent: mark });
        }
      }
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
