import Logo from "./Logo";
import TrackedLink from "./TrackedLink";
import type { Dictionary } from "@/lib/i18n";

export default function Footer({ d }: { d: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-line bg-ink-900/40 px-5 pt-16 pb-28 sm:px-8 md:pb-16">
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-fg-muted">
              {d.tagline}
            </p>

            <div className="mt-7 space-y-2.5">
              {/* TODO: replace with the published Nexgen contact details. */}
              <TrackedLink
                href="mailto:hello@nexgen.example"
                event="email_click"
                className="block text-[13.5px] text-fg transition-colors hover:text-signal"
              >
                hello@nexgen.example
              </TrackedLink>
              <TrackedLink
                href="https://wa.me/0000000000"
                event="whatsapp_click"
                external
                className="block text-[13.5px] text-fg-muted transition-colors hover:text-signal"
              >
                WhatsApp
              </TrackedLink>
            </div>
          </div>

          {d.columns.map((column) => (
            <nav
              key={column.title}
              className="lg:col-span-2"
              aria-label={column.title}
            >
              <p className="mono-label">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-2">
            <p className="mono-label">{d.getInTouch}</p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-signal/35 bg-signal/10 px-4 py-2.5 text-[12.5px] font-medium text-signal transition-colors hover:bg-signal/18"
            >
              {d.cta}
            </a>
          </div>
        </div>

        <div className="rule-x mt-14" />

        <div className="flex flex-col gap-4 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-fg-dim">
            © {new Date().getFullYear()} Nexgen. {d.rights}
          </p>
          <p className="mono-label">{d.strapline}</p>
        </div>
      </div>
    </footer>
  );
}
