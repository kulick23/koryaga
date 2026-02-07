export function MarqueeBanner() {
  const items = [
    "Розы",
    "Пионы",
    "Тюльпаны",
    "Орхидеи",
    "Композиции",
    "Свадебные букеты",
    "Корпоративные заказы",
    "Подарочные наборы",
  ]

  return (
    <div className="overflow-hidden border-y border-border bg-primary py-3">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
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
