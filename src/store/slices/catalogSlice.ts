import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"

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
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: CatalogState = {
  categories: [],
  products: [],
  activeCategory: "Все",
  likedIds: [],
  status: "idle",
  error: null,
}

type CatalogPayload = {
  categories: CatalogCategory[]
  products: Product[]
}

export const fetchCatalog = createAsyncThunk<CatalogPayload>(
  "catalog/fetchCatalog",
  async () => {
    const response = await fetch("/data/catalog.json")
    if (!response.ok) {
      throw new Error("Не удалось загрузить каталог")
    }
    return (await response.json()) as CatalogPayload
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
          state.activeCategory = "Все"
        }
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? "Ошибка загрузки каталога"
      })
  },
})

export const { setActiveCategory, toggleLike } = catalogSlice.actions
export default catalogSlice.reducer
