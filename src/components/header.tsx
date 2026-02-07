"use client"

import { useState } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"

const navLinks = [
  { label: "Каталог", href: "#catalog" },
  { label: "О нас", href: "#about" },
  { label: "Доставка", href: "#delivery" },
  { label: "Контакты", href: "#contact" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <span className="text-lg font-bold text-primary-foreground">B</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">BLOOM</span>
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
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Корзина"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>

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
