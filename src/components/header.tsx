import { type FormEvent, useMemo, useState } from "react"
import { Menu, Minus, Plus, ShoppingBag, X } from "lucide-react"

import { BRAND_NAME } from "@/constants/brand"
import { CART_LABELS } from "@/constants/cart"
import { NAV_LINKS, NAV_MENU_LABELS } from "@/constants/navigation"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { addToCart, clearCart, removeFromCart } from "@/store/slices/catalogSlice"


export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderName, setOrderName] = useState("")
  const [orderPhone, setOrderPhone] = useState("")
  const [orderComment, setOrderComment] = useState("")
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
          <span className="text-2xl font-bold tracking-tight text-foreground">{BRAND_NAME}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
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
            aria-label={CART_LABELS.buttonAria}
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
                  <span className="text-sm font-semibold text-foreground">
                    {checkoutOpen ? CART_LABELS.checkoutTitle : CART_LABELS.title}
                  </span>
                  <button
                    type="button"
                    className="rounded-full p-1 text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      setCartOpen(false)
                      setCheckoutOpen(false)
                    }}
                    aria-label={CART_LABELS.closeAria}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {checkoutOpen ? (
                  <form
                    onSubmit={(event: FormEvent) => {
                      event.preventDefault()
                    }}
                    className="mt-4 flex flex-col gap-4"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        {CART_LABELS.fields.name.label}
                      </label>
                      <input
                        type="text"
                        value={orderName}
                        onChange={(event) => setOrderName(event.target.value)}
                        placeholder={CART_LABELS.fields.name.placeholder}
                        className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        {CART_LABELS.fields.phone.label}
                      </label>
                      <input
                        type="tel"
                        value={orderPhone}
                        onChange={(event) => setOrderPhone(event.target.value)}
                        placeholder={CART_LABELS.fields.phone.placeholder}
                        className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        {CART_LABELS.fields.comment.label}
                      </label>
                      <textarea
                        rows={3}
                        value={orderComment}
                        onChange={(event) => setOrderComment(event.target.value)}
                        placeholder={CART_LABELS.fields.comment.placeholder}
                        className="w-full resize-none rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="flex-1 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
                        onClick={() => setCheckoutOpen(false)}
                      >
                        {CART_LABELS.backToCart}
                      </button>
                      <button
                        type="submit"
                        className="flex-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:shadow-[0_0_20px_rgba(200,255,0,0.3)]"
                      >
                        {CART_LABELS.submit}
                      </button>
                    </div>
                  </form>
                ) : cartItems.length === 0 ? (
                  <p className="mt-4 text-sm text-muted-foreground">
                    {CART_LABELS.empty}
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
                                  aria-label={CART_LABELS.decreaseAria}
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
                                  aria-label={CART_LABELS.increaseAria}
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
                      <span className="text-sm text-muted-foreground">{CART_LABELS.total}</span>
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
                        {CART_LABELS.clear}
                      </button>
                      <button
                        type="button"
                        className="flex-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:shadow-[0_0_20px_rgba(200,255,0,0.3)]"
                        onClick={() => setCheckoutOpen(true)}
                      >
                        {CART_LABELS.checkout}
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
            aria-label={menuOpen ? NAV_MENU_LABELS.close : NAV_MENU_LABELS.open}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
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
