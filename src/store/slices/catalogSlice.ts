import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { CatalogCategory } from "@/data/catalog"

type CatalogState = {
  activeCategory: CatalogCategory
  likedIds: number[]
}

const initialState: CatalogState = {
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
