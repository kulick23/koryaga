import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type CatalogCategory = "Все" | "Букеты" | "Композиции" | "Свадебные" | "Экзотика"

export type Product = {
  id: number
  name: string
  category: Exclude<CatalogCategory, "Все">
  price: number
  image: string
  badge?: string | null
}

type CatalogState = {
  categories: CatalogCategory[]
  products: Product[]
  activeCategory: CatalogCategory
  likedIds: number[]
}

const initialState: CatalogState = {
  categories: ["Все", "Букеты", "Композиции", "Свадебные", "Экзотика"],
  products: [
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
  ],
  activeCategory: "Все",
  likedIds: [],
}

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<CatalogCategory>) {
      state.activeCategory = action.payload
    },
    toggleLike(state, action: PayloadAction<number>) {
      const id = action.payload
      if (state.likedIds.includes(id)) {
        state.likedIds = state.likedIds.filter((item) => item !== id)
        return
      }
      state.likedIds.push(id)
    },
  },
})

export const { setActiveCategory, toggleLike } = catalogSlice.actions
export default catalogSlice.reducer
