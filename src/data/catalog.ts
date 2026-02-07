export type CatalogCategory = "Все" | "Букеты" | "Композиции" | "Свадебные" | "Экзотика"

export type Product = {
  id: number
  name: string
  category: Exclude<CatalogCategory, "Все">
  price: number
  image: string
  badge?: string | null
}

export const categories: CatalogCategory[] = [
  "Все",
  "Букеты",
  "Композиции",
  "Свадебные",
  "Экзотика",
]

export const products: Product[] = [
  {
    id: 1,
    name: "Розовая нежность",
    category: "Букеты",
    price: 4500,
    image: "/images/bouquet-1.jpg",
    badge: "Хит",
  },
  {
    id: 2,
    name: "Красная страсть",
    category: "Букеты",
    price: 5200,
    image: "/images/bouquet-2.jpg",
    badge: null,
  },
  {
    id: 3,
    name: "Белая элегантность",
    category: "Композиции",
    price: 7800,
    image: "/images/bouquet-3.jpg",
    badge: "Новинка",
  },
  {
    id: 4,
    name: "Свадебная мечта",
    category: "Свадебные",
    price: 8500,
    image: "/images/bouquet-4.jpg",
    badge: null,
  },
  {
    id: 5,
    name: "Солнечный день",
    category: "Букеты",
    price: 3900,
    image: "/images/bouquet-5.jpg",
    badge: "Скидка",
  },
  {
    id: 6,
    name: "Тропический рай",
    category: "Экзотика",
    price: 9200,
    image: "/images/bouquet-6.jpg",
    badge: "Премиум",
  },
]
