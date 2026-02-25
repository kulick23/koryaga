import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"

import { CATALOG_ALL_CATEGORY } from "@/constants/catalog"

export type CatalogCategory = string

export type Product = {
  id: number
  name: string
  category: CatalogCategory
  price: number | string
  image?: string
  images?: string[]
  badge?: string | null
}

type CatalogState = {
  categories: CatalogCategory[]
  products: Product[]
  activeCategory: CatalogCategory
  likedIds: number[]
  cart: Record<number, number>
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: CatalogState = {
  categories: [],
  products: [],
  activeCategory: CATALOG_ALL_CATEGORY,
  likedIds: [],
  cart: {},
  status: "idle",
  error: null,
}

type CatalogPayload = {
  categories: CatalogCategory[]
  products: Product[]
}

type RawProduct = Omit<Product, "category"> & {
  category?: string | number
}

type RawCatalogIndexPayload = {
  categories: CatalogCategory[]
  files?: Record<CatalogCategory, string>
}

export const fetchCatalog = createAsyncThunk<CatalogPayload>(
  "catalog/fetchCatalog",
  async () => {
    const indexResponse = await fetch("/data/catalog/index.json")
    if (!indexResponse.ok) {
      throw new Error("Не удалось загрузить каталог")
    }

    const payload = (await indexResponse.json()) as RawCatalogIndexPayload
    const categories = payload.categories ?? []
    const fallbackCategory = categories.find((category) => category !== CATALOG_ALL_CATEGORY)
    const safeFallbackCategory = fallbackCategory ?? categories[0] ?? CATALOG_ALL_CATEGORY
    const files = payload.files ?? {}

    const categoryFiles = categories
      .filter((category) => category !== CATALOG_ALL_CATEGORY)
      .map((category) => ({
        category,
        file: files[category],
      }))
      .filter((entry): entry is { category: CatalogCategory; file: string } => Boolean(entry.file))

    const productsByCategory = await Promise.all(
      categoryFiles.map(async ({ category, file }) => {
        const response = await fetch(file)
        if (!response.ok) {
          throw new Error(`Не удалось загрузить категорию: ${category}`)
        }

        const chunk = (await response.json()) as { products?: RawProduct[] }
        return (chunk.products ?? []).map((product) => ({
          ...product,
          category: product.category ?? category,
        }))
      })
    )

    const products = productsByCategory.flat().map((product) => {
      const rawCategory = product.category
      const parsedIndex =
        typeof rawCategory === "number"
          ? rawCategory
          : typeof rawCategory === "string" && /^\d+$/.test(rawCategory)
            ? Number(rawCategory)
            : null

      const normalizedCategory =
        parsedIndex !== null
          ? categories[parsedIndex] ?? safeFallbackCategory
          : rawCategory || safeFallbackCategory

      return {
        ...product,
        category: normalizedCategory,
      }
    })

    return {
      categories,
      products,
    }
  }
)

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
    addToCart(state, action: PayloadAction<number>) {
      const id = action.payload
      state.cart[id] = (state.cart[id] ?? 0) + 1
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const id = action.payload
      if (!state.cart[id]) return
      state.cart[id] -= 1
      if (state.cart[id] <= 0) {
        delete state.cart[id]
      }
    },
    clearFromCart(state, action: PayloadAction<number>) {
      delete state.cart[action.payload]
    },
    clearCart(state) {
      state.cart = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.categories = action.payload.categories
        state.products = action.payload.products
        if (!state.categories.includes(state.activeCategory)) {
          state.activeCategory = CATALOG_ALL_CATEGORY
        }
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? "Ошибка загрузки каталога"
      })
  },
})

export const {
  setActiveCategory,
  toggleLike,
  addToCart,
  removeFromCart,
  clearFromCart,
  clearCart,
} = catalogSlice.actions
export default catalogSlice.reducer
