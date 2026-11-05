import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"

import { CATALOG_ALL_CATEGORY } from "@/constants/catalog"
import { isSupabaseConfigured, supabase } from "@/lib/supabase"

export type CatalogCategory = string

export type Product = {
  id: number
  name: string
  category: CatalogCategory
  price: number | string
  image?: string
  images?: string[]
  description?: string
  size?: string
  composition?: string[]
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

const fetchSupabaseCatalog = async (): Promise<CatalogPayload | null> => {
  if (!isSupabaseConfigured || !supabase) return null

  const [categoriesResult, productsResult] = await Promise.all([
    supabase.from("categories").select("id,name").eq("is_active", true).order("sort_order"),
    supabase
      .from("products")
      .select(
        "id,name,description,price_value,price_label,image_url,images,size,composition,badge,categories(name)"
      )
      .eq("is_active", true)
      .order("sort_order"),
  ])

  if (categoriesResult.error || productsResult.error) {
    throw categoriesResult.error ?? productsResult.error
  }

  const categoryNames = (categoriesResult.data ?? []).map((category) => category.name)
  if (categoryNames.length === 0) return null

  const products: Product[] = (productsResult.data ?? []).map((product) => {
    const relation = Array.isArray(product.categories) ? product.categories[0] : product.categories
    return {
      id: product.id,
      name: product.name,
      category: relation?.name ?? categoryNames[0],
      price: product.price_label || product.price_value || 0,
      image: product.image_url || undefined,
      images: product.images ?? undefined,
      description: product.description ?? undefined,
      size: product.size ?? undefined,
      composition: product.composition ?? undefined,
      badge: product.badge,
    }
  })

  return {
    categories: [CATALOG_ALL_CATEGORY, ...categoryNames],
    products,
  }
}

const fetchJsonCatalog = async (): Promise<CatalogPayload> => {
  const indexResponse = await fetch("/data/catalog/index.json")
  if (!indexResponse.ok) throw new Error("Не удалось загрузить каталог")

  const payload = (await indexResponse.json()) as RawCatalogIndexPayload
  const categories = payload.categories ?? []
  const fallbackCategory = categories.find((category) => category !== CATALOG_ALL_CATEGORY)
  const safeFallbackCategory = fallbackCategory ?? categories[0] ?? CATALOG_ALL_CATEGORY
  const files = payload.files ?? {}

  const categoryFiles = categories
    .filter((category) => category !== CATALOG_ALL_CATEGORY)
    .map((category) => ({ category, file: files[category] }))
    .filter((entry): entry is { category: CatalogCategory; file: string } => Boolean(entry.file))

  const productsByCategory = await Promise.all(
    categoryFiles.map(async ({ category, file }) => {
      const response = await fetch(file)
      if (!response.ok) throw new Error(`Не удалось загрузить категорию: ${category}`)
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

    return {
      ...product,
      category:
        parsedIndex !== null
          ? categories[parsedIndex] ?? safeFallbackCategory
          : rawCategory || safeFallbackCategory,
    }
  })

  return { categories, products }
}

export const fetchCatalog = createAsyncThunk<CatalogPayload>(
  "catalog/fetchCatalog",
  async () => {
    try {
      const remoteCatalog = await fetchSupabaseCatalog()
      if (remoteCatalog) return remoteCatalog
    } catch (error) {
      console.warn("Supabase catalog unavailable, using JSON fallback", error)
    }

    return fetchJsonCatalog()
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
