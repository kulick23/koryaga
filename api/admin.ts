import { randomUUID } from "node:crypto"

import { getSupabaseAdmin } from "../server/supabase-admin.js"
import { authorizeAdminRequest } from "../server/telegram-auth.js"

const cleanProduct = (payload: Record<string, unknown>) => ({
  category_id: Number(payload.category_id),
  name: String(payload.name ?? "").trim().slice(0, 160),
  description: String(payload.description ?? "").trim().slice(0, 4000) || null,
  price_value: payload.price_value === null || payload.price_value === "" ? null : Number(payload.price_value),
  price_label: String(payload.price_label ?? "").trim().slice(0, 120) || null,
  image_url: String(payload.image_url ?? "").trim().slice(0, 1000) || null,
  images: Array.isArray(payload.images) ? payload.images.map(String).slice(0, 12) : [],
  size: String(payload.size ?? "").trim().slice(0, 200) || null,
  size_variants: Array.isArray(payload.size_variants) ? payload.size_variants.map((variant: any) => ({ id: String(variant.id ?? ""), name: String(variant.name ?? "").trim().slice(0, 80), price: Number(variant.price) })) : [],
  composition: Array.isArray(payload.composition) ? payload.composition.map(String).filter(Boolean).slice(0, 30) : [],
  badge: String(payload.badge ?? "").trim().slice(0, 80) || null,
  is_active: payload.is_active !== false,
  sort_order: Number(payload.sort_order) || 0,
})

const sendError = (response: any, status: number, message: string) =>
  response.status(status).json({ ok: false, error: message })

export default async function handler(request: any, response: any) {
  if (request.method === "OPTIONS") return response.status(204).end()

  try {
    authorizeAdminRequest(request)
  } catch (error) {
    return sendError(response, 401, error instanceof Error ? error.message : "Unauthorized")
  }

  try {
    const supabase = getSupabaseAdmin()

    if (request.method === "GET") {
      const [categories, products] = await Promise.all([
        supabase.from("categories").select("*").order("sort_order"),
        supabase.from("products").select("*").order("sort_order"),
      ])
      if (categories.error || products.error) throw categories.error ?? products.error
      return response.status(200).json({ ok: true, categories: categories.data, products: products.data })
    }

    if (request.method !== "POST") return sendError(response, 405, "Method not allowed")
    const { action, payload = {} } = request.body ?? {}

    if (action === "category.create") {
      const name = String(payload.name ?? "").trim().slice(0, 120)
      if (!name) return sendError(response, 400, "Укажите название категории")
      const result = await supabase.from("categories").insert({ name, sort_order: Number(payload.sort_order) || 0 }).select().single()
      if (result.error) throw result.error
      return response.status(200).json({ ok: true, item: result.data })
    }

    if (action === "category.update") {
      const name = String(payload.name ?? "").trim().slice(0, 120)
      if (!name) return sendError(response, 400, "Укажите название категории")
      const result = await supabase
        .from("categories")
        .update({ name, is_active: payload.is_active !== false })
        .eq("id", Number(payload.id))
        .select()
        .single()
      if (result.error) throw result.error
      return response.status(200).json({ ok: true, item: result.data })
    }

    if (action === "category.delete") {
      const result = await supabase.from("categories").delete().eq("id", Number(payload.id))
      if (result.error) throw result.error
      return response.status(200).json({ ok: true })
    }

    if (action === "product.create" || action === "product.update") {
      const product = cleanProduct(payload)
      if (product.size_variants.length > 30 || product.size_variants.some((variant) => !variant.id || !variant.name || !Number.isFinite(variant.price) || variant.price < 0 || variant.price > 9999999999) || new Set(product.size_variants.map((variant) => variant.id)).size !== product.size_variants.length) return sendError(response, 400, "Укажите уникальные размеры и корректные цены")
      if (!product.name || !product.category_id) return sendError(response, 400, "Заполните название и категорию")
      const query = action === "product.create"
        ? supabase.from("products").insert(product)
        : supabase.from("products").update(product).eq("id", Number(payload.id))
      const result = await query.select().single()
      if (result.error) throw result.error
      return response.status(200).json({ ok: true, item: result.data })
    }

    if (action === "product.delete") {
      const result = await supabase.from("products").delete().eq("id", Number(payload.id))
      if (result.error) throw result.error
      return response.status(200).json({ ok: true })
    }

    if (action === "image.upload") {
      const contentType = String(payload.contentType ?? "")
      const encoded = String(payload.base64 ?? "")
      if (!contentType.startsWith("image/") || !encoded) return sendError(response, 400, "Выберите изображение")
      const buffer = Buffer.from(encoded, "base64")
      if (buffer.byteLength > 3 * 1024 * 1024) return sendError(response, 400, "Изображение должно быть меньше 3 МБ")
      const extension = contentType.split("/")[1]?.replace("jpeg", "jpg") || "jpg"
      const path = `products/${Date.now()}-${randomUUID()}.${extension}`
      const upload = await supabase.storage.from("product-images").upload(path, buffer, { contentType, upsert: false })
      if (upload.error) throw upload.error
      const publicUrl = supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl
      return response.status(200).json({ ok: true, url: publicUrl })
    }

    return sendError(response, 400, "Unknown action")
  } catch (error) {
    console.error("Admin API error", error)
    return sendError(response, 500, error instanceof Error ? error.message : "Server error")
  }
}
