import type { ReactNode } from "react";
import Reveal from "./Reveal";

export function SectionShell({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 border-t border-line px-5 py-24 sm:px-8 md:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1240px]">{children}</div>
    </section>
  );
}

export function SectionHeading({
  index,
  kicker,
  title,
  lede,
  align = "left",
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div
        className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        <span className="mono-label text-signal/80">{index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden />
        <span className="mono-label">{kicker}</span>
      </div>

      <h2 className="mt-5 text-[1.85rem] leading-[1.12] font-semibold sm:text-[2.35rem] md:text-[2.75rem]">
        {title}
      </h2>

      {lede ? (
        <p className="mt-5 text-[15px] leading-relaxed text-fg-muted md:text-base">
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
