import { ShoppingBag, Heart } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { setActiveCategory, toggleLike } from "@/store/slices/catalogSlice"
export function Catalog() {
  const dispatch = useAppDispatch()
  const { categories, products, activeCategory, likedIds } = useAppSelector((state) => state.catalog)

  const filteredProducts =
    activeCategory === "Все"
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <section id="catalog" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Каталог
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">
              Наши букеты
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => dispatch(setActiveCategory(cat))}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(200,255,0,0.2)]"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-[0_0_40px_rgba(200,255,0,0.05)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    {product.badge}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => dispatch(toggleLike(product.id))}
                  className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all ${
                    likedIds.includes(product.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-card/60 text-foreground hover:bg-primary hover:text-primary-foreground"
                  }`}
                  aria-label={likedIds.includes(product.id) ? "Убрать из избранного" : "Добавить в избранное"}
                >
                  <Heart
                    className="h-5 w-5"
                    fill={likedIds.includes(product.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className="relative p-5">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {product.category}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-foreground">
                  {product.name}
                </h3>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {product.price.toLocaleString("ru-RU")} ₽
                  </span>
                  <button
                    type="button"
                    className="flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(200,255,0,0.3)]"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
