import { MapPin, Clock, CreditCard, Gift } from "lucide-react"

const steps = [
  {
    icon: Gift,
    step: "01",
    title: "Выберите букет",
    description: "Выберите понравившийся букет из нашего каталога или закажите индивидуальную композицию",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Оформите заказ",
    description: "Оплатите онлайн или наличными при получении. Принимаем все способы оплаты",
  },
  {
    icon: Clock,
    step: "03",
    title: "Ожидайте доставку",
    description: "Наш курьер доставит ваш букет в течение 2 часов в идеальном состоянии",
  },
  {
    icon: MapPin,
    step: "04",
    title: "Наслаждайтесь",
    description: "Получите свой букет или удивите близкого человека красивыми цветами",
  },
]

export function Delivery() {
  return (
    <section id="delivery" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Доставка
          </span>
          <h2 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">
            Как это работает
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Четыре простых шага до идеального букета
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
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
                Бесплатная доставка
              </h3>
              <p className="mt-2 text-muted-foreground">
                При заказе от 5 000 ₽ доставка по городу бесплатно
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">2ч</p>
                <p className="text-xs text-muted-foreground">Среднее время</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">0 ₽</p>
                <p className="text-xs text-muted-foreground">{"от 5 000 ₽"}</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="text-xs text-muted-foreground">Приём заказов</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
