import { DELIVERY_HIGHLIGHT, DELIVERY_STEPS } from "@/constants/delivery"

export function Delivery() {
  return (
    <section id="delivery" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            {DELIVERY_HIGHLIGHT.label}
          </span>
          <h2 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">
            {DELIVERY_HIGHLIGHT.header}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {DELIVERY_HIGHLIGHT.subheader}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DELIVERY_STEPS.map((item) => (
            <div
              key={item.step}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-[0_0_40px_rgba(200,255,0,0.05)]"
            >
              <span className="absolute -right-2 -top-4 font-serif text-8xl font-bold text-border/50 transition-colors group-hover:text-primary/10">
                {item.step}
              </span>
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-primary/20 bg-primary/5 p-8 md:p-12">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                {DELIVERY_HIGHLIGHT.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {DELIVERY_HIGHLIGHT.description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {DELIVERY_HIGHLIGHT.stats.map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                  {index < DELIVERY_HIGHLIGHT.stats.length - 1 && (
                    <div className="h-12 w-px bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
