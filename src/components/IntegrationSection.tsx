import { SectionHeading, SectionShell } from "./Section";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

/** Product names — identical in every language, so not in the dictionary. */
const STACK = [
  "REST API",
  "MySQL / MariaDB",
  "Laravel",
  "React / Next.js",
  "TypeScript",
  "Linux",
  "Windows Server",
  "Cloud Infrastructure",
  "Scheduled Sync",
  "Role-Based Access",
];

export default function IntegrationSection({
  d,
}: {
  d: Dictionary["integration"];
}) {
  return (
    <SectionShell id="integration">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-5">
          <SectionHeading
            index="08"
            kicker={d.kicker}
            title={d.title}
            lede={d.lede}
          />

          <Reveal delay={120}>
            <div className="glass-flat mt-8 p-5">
              <p className="mono-label">{d.principleLabel}</p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-fg-muted">
                {d.principleBody}
              </p>
            </div>
          </Reveal>
        </div>

        {/* min-w-0: the w-max marquee below would otherwise stretch the grid track */}
        <div className="min-w-0 lg:col-span-7">
          <Reveal>
            <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {d.categories.map((cat) => (
                <li
                  key={cat.name}
                  className="flex items-center justify-between gap-4 bg-ink-900 px-5 py-4 transition-colors hover:bg-ink-850"
                >
                  <span className="text-[13.5px] font-medium text-fg">
                    {cat.name}
                  </span>
                  <span className="text-right text-[11.5px] text-fg-dim">
                    {cat.note}
                  </span>
                </li>
              ))}
              <li className="flex items-center bg-ink-900 px-5 py-4">
                <span className="mono-label !text-signal">{d.scoped}</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-6 min-w-0">
              <p className="mono-label">{d.stackLabel}</p>
              <div className="mask-fade-r mt-4 overflow-hidden">
                <div className="marquee-track flex w-max gap-2.5">
                  {[...STACK, ...STACK].map((tech, i) => (
                    <span
                      key={`${tech}-${i}`}
                      className="rounded-lg border border-line bg-white/[0.025] px-3.5 py-2 font-mono text-[11.5px] whitespace-nowrap text-fg-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-[12px] text-fg-dim">{d.stackNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
