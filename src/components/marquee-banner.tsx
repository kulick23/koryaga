import { MARQUEE_ITEMS } from "@/constants/marquee"

export function MarqueeBanner() {
  return (
    <div className="overflow-hidden border-y border-border bg-primary py-3">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 text-sm font-semibold uppercase tracking-widest text-primary-foreground"
          >
            {item} <span className="mx-4 opacity-40">{"////"}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
