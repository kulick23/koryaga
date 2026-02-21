import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"

import { CATALOG_ALL_CATEGORY, CATALOG_CONTENT, CATALOG_ITEMS_PER_PAGE } from "@/constants/catalog"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { addToCart, setActiveCategory, type Product } from "@/store/slices/catalogSlice"

const getProductImages = (product: Product) => {
  const images = product.images?.filter(Boolean) ?? []
  if (images.length > 0) return images
  if (product.image) return [product.image]
  return ["/placeholder.svg"]
}

const getWrappedIndex = (index: number, length: number) => {
  if (length <= 0) return 0
  return (index + length) % length
}

export function Catalog() {
  const dispatch = useAppDispatch()
  const { categories, products, activeCategory } = useAppSelector((state) => state.catalog)
  const [page, setPage] = useState(1)
  const [activeSlides, setActiveSlides] = useState<Record<number, number>>({})

  const filteredProducts = useMemo(() => {
    return activeCategory === CATALOG_ALL_CATEGORY
      ? products
      : products.filter((p) => p.category === activeCategory)
  }, [activeCategory, products])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / CATALOG_ITEMS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pagedProducts = filteredProducts.slice(
    (currentPage - 1) * CATALOG_ITEMS_PER_PAGE,
    currentPage * CATALOG_ITEMS_PER_PAGE
  )

  useEffect(() => {
    setPage(1)
  }, [activeCategory])

  return (
    <section id="catalog" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              {CATALOG_CONTENT.label}
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">
              {CATALOG_CONTENT.title}
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
          {pagedProducts.map((product) => {
            const images = getProductImages(product)
            const currentSlide = getWrappedIndex(activeSlides[product.id] ?? 0, images.length)
            const hasMultipleImages = images.length > 1

            return (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-[0_0_40px_rgba(200,255,0,0.05)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={images[currentSlide]}
                    alt={`${product.name} - фото ${currentSlide + 1}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

                  {product.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                      {product.badge}
                    </span>
                  )}

                  {hasMultipleImages && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveSlides((prev) => ({
                            ...prev,
                            [product.id]: getWrappedIndex((prev[product.id] ?? 0) - 1, images.length),
                          }))
                        }
                        className="pointer-events-none absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/70 text-foreground opacity-0 backdrop-blur-sm transition-all group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 hover:bg-primary hover:text-primary-foreground"
                        aria-label="Предыдущее фото"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveSlides((prev) => ({
                            ...prev,
                            [product.id]: getWrappedIndex((prev[product.id] ?? 0) + 1, images.length),
                          }))
                        }
                        className="pointer-events-none absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/70 text-foreground opacity-0 backdrop-blur-sm transition-all group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 hover:bg-primary hover:text-primary-foreground"
                        aria-label="Следующее фото"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                        {images.map((_, index) => (
                          <button
                            key={`${product.id}-${index}`}
                            type="button"
                            onClick={() =>
                              setActiveSlides((prev) => ({
                                ...prev,
                                [product.id]: index,
                              }))
                            }
                            aria-label={`Открыть фото ${index + 1}`}
                            className={`h-2.5 w-2.5 rounded-full transition-colors ${
                              index === currentSlide ? "bg-primary" : "bg-card/80"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Like functionality is temporarily disabled; keep for future re-enable.
                  <button
                    type="button"
                    onClick={() => dispatch(toggleLike(product.id))}
                    className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all ${
                      likedIds.includes(product.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-card/60 text-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
                    aria-label={
                      likedIds.includes(product.id)
                        ? CATALOG_CONTENT.favoriteRemoveAria
                        : CATALOG_CONTENT.favoriteAddAria
                    }
                  >
                    <Heart
                      className="h-5 w-5"
                      fill={likedIds.includes(product.id) ? "currentColor" : "none"}
                    />
                  </button>
                  */}
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
                      onClick={() => dispatch(addToCart(product.id))}
                      className="flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(200,255,0,0.3)]"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      {CATALOG_CONTENT.addToCart}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              {CATALOG_CONTENT.pagination.previous}
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1
                const isActive = pageNumber === currentPage
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`h-10 min-w-[2.5rem] rounded-full px-3 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(200,255,0,0.2)]"
                        : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {CATALOG_CONTENT.pagination.next}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
