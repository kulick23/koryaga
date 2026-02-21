import emailjs from "@emailjs/browser"

type OrderLine = {
  name: string
  qty: number
  price: string
  lineTotal: string
  imageUrl?: string
}

export type OrderEmailPayload = {
  customerName: string
  customerPhone: string
  comment: string
  lines: OrderLine[]
  total: string
}

const getEmailConfig = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS не настроен: проверь VITE_EMAILJS_* переменные")
  }

  return { serviceId, templateId, publicKey }
}

const formatLines = (lines: OrderLine[]) =>
  lines
    .map((line, index) => `${index + 1}. ${line.name} x${line.qty} — ${line.lineTotal} (${line.price}/шт)`)
    .join("\n")

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")

const getBaseSiteUrl = () => {
  const fromEnv = import.meta.env.VITE_PUBLIC_SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/+$/, "")
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin.replace(/\/+$/, "")
  }
  return ""
}

const toAbsoluteUrl = (url?: string) => {
  if (!url) return ""
  if (/^https?:\/\//i.test(url)) return url
  if (!url.startsWith("/")) return url
  const baseUrl = getBaseSiteUrl()
  return baseUrl ? `${baseUrl}${url}` : url
}

const formatLinesHtml = (lines: OrderLine[]) =>
  lines
    .map((line) => {
      const imageCell = line.imageUrl
        ? `<td style="padding:8px 12px 8px 0;width:72px;"><img src="${escapeHtml(line.imageUrl)}" alt="" style="width:64px;height:64px;object-fit:cover;border-radius:8px;display:block;" /></td>`
        : ""

      return `<tr>
        ${imageCell}
        <td style="padding:8px 0;">
          <div style="font-size:14px;color:#111827;"><strong>${escapeHtml(line.name)}</strong></div>
          <div style="font-size:12px;color:#6b7280;">${escapeHtml(line.price)} x ${line.qty}</div>
        </td>
        <td style="padding:8px 0 8px 12px;white-space:nowrap;text-align:right;font-size:14px;color:#111827;"><strong>${escapeHtml(line.lineTotal)}</strong></td>
      </tr>`
    })
    .join("")

export const sendOrderEmail = async (payload: OrderEmailPayload) => {
  const { serviceId, templateId, publicKey } = getEmailConfig()
  const linesWithAbsoluteImages = payload.lines.map((line) => ({
    ...line,
    imageUrl: toAbsoluteUrl(line.imageUrl),
  }))
  const previewImage = linesWithAbsoluteImages.find((line) => line.imageUrl)?.imageUrl ?? ""

  await emailjs.send(
    serviceId,
    templateId,
    {
      customer_name: payload.customerName,
      customer_phone: payload.customerPhone,
      customer_comment: payload.comment || "-",
      order_total: payload.total,
      order_items: formatLines(linesWithAbsoluteImages),
      order_items_html: formatLinesHtml(linesWithAbsoluteImages),
      order_preview_image: previewImage,
    },
    {
      publicKey,
    }
  )
}
