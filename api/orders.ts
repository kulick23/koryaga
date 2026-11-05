const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

export default async function handler(request: any, response: any) {
  if (request.method !== "POST") return response.status(405).json({ ok: false, error: "Method not allowed" })

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_ORDER_CHAT_ID
  if (!token || !chatId) return response.status(503).json({ ok: false, error: "Telegram is not configured" })

  const { customerName, customerPhone, comment, lines, total, website } = request.body ?? {}
  if (website) return response.status(200).json({ ok: true })
  if (!customerName || !customerPhone || !Array.isArray(lines) || lines.length === 0) {
    return response.status(400).json({ ok: false, error: "Invalid order" })
  }

  const items = lines
    .slice(0, 30)
    .map((line: any, index: number) => `${index + 1}. <b>${escapeHtml(line.name)}</b> × ${Number(line.qty) || 1} — ${escapeHtml(line.lineTotal)}`)
    .join("\n")
  const text = [
    "🛍 <b>Новый заказ с KORYAGA</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(customerName)}`,
    `<b>Телефон:</b> ${escapeHtml(customerPhone)}`,
    `<b>Комментарий:</b> ${escapeHtml(comment || "—")}`,
    "",
    items,
    "",
    `<b>Итого:</b> ${escapeHtml(total)}`,
  ].join("\n")

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  })
  const result = await telegramResponse.json()
  if (!telegramResponse.ok || !result.ok) {
    console.error("Telegram order error", result)
    return response.status(502).json({ ok: false, error: "Telegram delivery failed" })
  }

  return response.status(200).json({ ok: true })
}
