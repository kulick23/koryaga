export type AdminCategory = {
  id: number
  name: string
  sort_order: number
  is_active: boolean
}

export type AdminProduct = {
  id: number
  category_id: number
  name: string
  description: string | null
  price_value: number | null
  price_label: string | null
  image_url: string | null
  images: string[]
  size: string | null
  composition: string[]
  badge: string | null
  is_active: boolean
  sort_order: number
}

export type ProductDraft = Omit<AdminProduct, "id"> & { id?: number }
