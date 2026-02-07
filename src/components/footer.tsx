import { BRAND_NAME } from "@/constants/brand"
import { FOOTER_COPYRIGHT } from "@/constants/footer"
import { NAV_LINKS } from "@/constants/navigation"

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-foreground">{BRAND_NAME}</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div />
        </div>

        <div className="mt-10 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {FOOTER_COPYRIGHT}
          </p>
        </div>
      </div>
    </footer>
  )
}
