import { ArrowDown } from "lucide-react"

import heroImage from "@/assets/img/hero-bouquet.jpg"
import { HERO_CONTENT } from "@/constants/hero"
import { IMAGE_ALTS } from "@/constants/media"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={IMAGE_ALTS.hero}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start px-6 py-20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-sm font-medium text-primary">{HERO_CONTENT.badge}</span>
        </div>

        <h1 className="max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <span className="block">{HERO_CONTENT.titleLines[0]}</span>
          <span className="block text-primary">{HERO_CONTENT.titleLines[1]}</span>
          <span className="block">{HERO_CONTENT.titleLines[2]}</span>
        </h1>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
          {HERO_CONTENT.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={HERO_CONTENT.actions.primary.href}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(200,255,0,0.3)]"
          >
            {HERO_CONTENT.actions.primary.label}
          </a>
          <a
            href={HERO_CONTENT.actions.secondary.href}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-8 py-4 text-base font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-secondary"
          >
            {HERO_CONTENT.actions.secondary.label}
          </a>
        </div>

        <div className="mt-16 flex items-center gap-8 text-sm text-muted-foreground">
          {HERO_CONTENT.stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                <span>{stat.label}</span>
              </div>
              {index < HERO_CONTENT.stats.length - 1 && <div className="h-10 w-px bg-border" />}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <a
          href={HERO_CONTENT.actions.primary.href}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-secondary/50 text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
          aria-label={HERO_CONTENT.scrollLabel}
        >
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
