import type { AdminCategory, AdminProduct } from "@/admin/types"

const getAuthHeaders = () => {
  const initData = window.Telegram?.WebApp.initData
  const devKey = import.meta.env.VITE_ADMIN_DEV_KEY
  return initData
    ? { "x-telegram-init-data": initData }
    : devKey
      ? { "x-admin-dev-key": devKey }
      : {}
}

const request = async <T>(body?: unknown): Promise<T> => {
  const response = await fetch("/api/admin", {
    method: body ? "POST" : "GET",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: body ? JSON.stringify(body) : undefined,
  })
  const result = await response.json().catch(() => null)
  if (!response.ok || !result?.ok) throw new Error(result?.error || "Ошибка соединения с сервером")
  return result as T
}

export const loadAdminCatalog = () =>
  request<{ ok: true; categories: AdminCategory[]; products: AdminProduct[] }>()

export const runAdminAction = <T = unknown>(action: string, payload: unknown) =>
  request<{ ok: true; item?: T; url?: string }>({ action, payload })

export const uploadProductImage = async (file: File) => {
  if (file.size > 3 * 1024 * 1024) throw new Error("Изображение должно быть меньше 3 МБ")
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "")
    reader.onerror = () => reject(new Error("Не удалось прочитать изображение"))
    reader.readAsDataURL(file)
  })
  const result = await runAdminAction("image.upload", {
    base64,
    contentType: file.type,
    fileName: file.name,
  })
  if (!result.url) throw new Error("Сервер не вернул адрес изображения")
  return result.url
}
