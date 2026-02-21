import emailjs from "@emailjs/browser"

type OrderLine = {
  name: string
  qty: number
  price: string
  lineTotal: string
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

export const sendOrderEmail = async (payload: OrderEmailPayload) => {
  const { serviceId, templateId, publicKey } = getEmailConfig()

  await emailjs.send(
    serviceId,
    templateId,
    {
      customer_name: payload.customerName,
      customer_phone: payload.customerPhone,
      customer_comment: payload.comment || "-",
      order_total: payload.total,
      order_items: formatLines(payload.lines),
    },
    {
      publicKey,
    }
  )
}

