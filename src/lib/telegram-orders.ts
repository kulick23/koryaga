import type { OrderEmailPayload } from "@/lib/emailjs"

export const sendOrderTelegram = async (payload: OrderEmailPayload) => {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, website: "" }),
  })

  if (!response.ok) {
    const result = await response.json().catch(() => null)
    throw new Error(result?.error || "Не удалось отправить заказ в Telegram")
  }
}
