import { ArrowRight } from "lucide-react";
import { SectionShell } from "./Section";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

export default function SecondaryServices({
  d,
}: {
  d: Dictionary["digital"];
}) {
  return (
    <SectionShell id="digital">
      <Reveal>
        <div className="glass-flat grid items-center gap-8 p-7 sm:p-9 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <span className="mono-label">{d.eyebrow}</span>
            <h2 className="mt-4 text-[1.4rem] leading-snug font-semibold sm:text-[1.7rem]">
              {d.title}
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-fg-muted">
              {d.body}
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-medium text-signal transition-opacity hover:opacity-80"
            >
              {d.link}
              <ArrowRight size={15} strokeWidth={2.2} />
            </a>
          </div>

          <ul className="grid min-w-0 gap-2 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            {d.services.map((service) => (
              <li
                key={service}
                className="rounded-lg border border-line bg-white/[0.02] px-4 py-3.5 text-[13px] text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </SectionShell>
  );
}
