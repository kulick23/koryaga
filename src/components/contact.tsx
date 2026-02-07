import { Phone, Instagram, Clock } from "lucide-react"

import { CONTACT_INFO, CONTACT_SECTION } from "@/constants/contact"

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              {CONTACT_SECTION.label}
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">
              {CONTACT_SECTION.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {CONTACT_SECTION.description}
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <div className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card/80 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all hover:border-primary/40 hover:bg-card">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{CONTACT_INFO.phone.label}</p>
                  <p className="text-lg font-semibold text-foreground">{CONTACT_INFO.phone.value}</p>
                </div>
              </div>

              <div className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card/80 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all hover:border-primary/40 hover:bg-card">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Instagram className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{CONTACT_INFO.instagram.label}</p>
                  <p className="text-lg font-semibold text-foreground">{CONTACT_INFO.instagram.value}</p>
                </div>
              </div>

              <div className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card/80 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all hover:border-primary/40 hover:bg-card">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{CONTACT_INFO.hours.label}</p>
                  <p className="text-lg font-semibold text-foreground">{CONTACT_INFO.hours.value}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
