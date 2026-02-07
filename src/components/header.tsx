import { useMemo, useState } from "react"
import { Menu, Minus, Plus, ShoppingBag, X } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { addToCart, clearCart, removeFromCart } from "@/store/slices/catalogSlice"


const navLinks = [
  { label: "Каталог", href: "#catalog" },
  { label: "О нас", href: "#about" },
  { label: "Доставка", href: "#delivery" },
  { label: "Контакты", href: "#contact" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const dispatch = useAppDispatch()
  const cartCount = useAppSelector((state) =>
    Object.values(state.catalog.cart).reduce((sum, qty) => sum + qty, 0)
  )
  const { cart, products } = useAppSelector((state) => state.catalog)
  const cartItems = useMemo(() => {
    const map = new Map(products.map((p) => [p.id, p]))
    return Object.entries(cart)
      .map(([id, qty]) => {
        const product = map.get(Number(id))
        if (!product) return null
        return { product, qty }
      })
      .filter(Boolean)
  }, [cart, products])
  const cartTotal = cartItems.reduce((sum, item) => {
    if (!item) return sum
    return sum + item.product.price * item.qty
  }, 0)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tight text-foreground">KORYAGA</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Корзина"
            onClick={() => setCartOpen((prev) => !prev)}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {cartCount}
              </span>
            )}
            </button>

            {cartOpen && (
              <div className="absolute right-0 mt-3 w-[22rem] rounded-2xl border border-border bg-card p-4 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Корзина</span>
                  <button
                    type="button"
                    className="rounded-full p-1 text-muted-foreground hover:text-foreground"
                    onClick={() => setCartOpen(false)}
                    aria-label="Закрыть корзину"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {cartItems.length === 0 ? (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Корзина пуста. Добавьте товары из каталога.
                  </p>
                ) : (
                  <>
                    <div className="mt-4 flex max-h-64 flex-col gap-3 overflow-auto pr-1">
                      {cartItems.map((item) => {
                        if (!item) return null
                        const { product, qty } = item
                        return (
                          <div
                            key={product.id}
                            className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3"
                          >
                            <div className="h-12 w-12 overflow-hidden rounded-lg bg-secondary">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-foreground">
                                {product.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {product.price.toLocaleString("ru-RU")} ₽
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <button
                                  type="button"
                                  className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
                                  onClick={() => dispatch(removeFromCart(product.id))}
                                  aria-label="Уменьшить количество"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="min-w-[1.5rem] text-center text-sm font-semibold text-foreground">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
                                  onClick={() => dispatch(addToCart(product.id))}
                                  aria-label="Увеличить количество"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                            <div className="text-sm font-semibold text-primary">
                              {(product.price * qty).toLocaleString("ru-RU")} ₽
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                      <span className="text-sm text-muted-foreground">Итого</span>
                      <span className="text-lg font-bold text-foreground">
                        {cartTotal.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        className="flex-1 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
                        onClick={() => dispatch(clearCart())}
                      >
                        Очистить
                      </button>
                      <button
                        type="button"
                        className="flex-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:shadow-[0_0_20px_rgba(200,255,0,0.3)]"
                      >
                        Оформить
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
