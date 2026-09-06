"use client";

import type { ReactNode } from "react";
import { track, type NexgenEvent } from "@/lib/analytics";

export default function TrackedLink({
  href,
  event,
  payload,
  className,
  children,
  external,
}: {
  href: string;
  event: NexgenEvent;
  payload?: Record<string, string | number | boolean>;
  className?: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track(event, payload)}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {children}
    </a>
  );
}
