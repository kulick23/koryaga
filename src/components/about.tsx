import { Leaf, Clock, Award, Truck } from "lucide-react"

import workshopImage from "@/assets/img/florist-workshop.jpg"

const features = [
  {
    icon: Leaf,
    title: "Свежие цветы",
    description: "Только свежие цветы напрямую от лучших поставщиков",
  },
  {
    icon: Clock,
    title: "Быстрая доставка",
    description: "Доставка по городу в течение 2 часов с момента заказа",
  },
  {
    icon: Award,
    title: "Авторские композиции",
    description: "Каждый букет создаётся профессиональным флористом",
  },
  {
    icon: Truck,
    title: "Бережная упаковка",
    description: "Специальная упаковка сохраняет свежесть при доставке",
  },
]

export function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <img
                src={workshopImage}
                alt="Мастерская флориста"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-2xl border border-border bg-card p-6 shadow-2xl md:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                  <span className="text-2xl font-bold text-primary-foreground">7</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Лет</p>
                  <p className="text-lg font-bold text-foreground">Опыта работы</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              О нас
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">
              Цветы с любовью и заботой
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              BLOOM — это не просто цветочный магазин. Мы создаём уникальные авторские
              композиции, которые передают эмоции и делают каждый момент незабываемым.
              Наши флористы вкладывают душу в каждый букет.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group flex gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-[0_0_30px_rgba(200,255,0,0.05)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
