"use client";

import { useEffect, useRef } from "react";
import { track, type NexgenEvent } from "@/lib/analytics";

/** Fires a single analytics event the first time its anchor scrolls into view. */
export default function ViewTracker({
  event,
  payload,
}: {
  event: NexgenEvent;
  payload?: Record<string, string | number | boolean>;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track(event, payload);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return <span ref={ref} aria-hidden className="block h-px w-px" />;
}
