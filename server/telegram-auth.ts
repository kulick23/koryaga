import { createHmac, timingSafeEqual } from "node:crypto"

type TelegramUser = {
  id: number
  first_name?: string
  last_name?: string
  username?: string
}

const safeEqual = (left: string, right: string) => {
  const a = Buffer.from(left, "hex")
  const b = Buffer.from(right, "hex")
  return a.length === b.length && timingSafeEqual(a, b)
}

export const verifyTelegramAdmin = (initData: string): TelegramUser => {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token || !initData) throw new Error("Telegram authorization is required")

  const params = new URLSearchParams(initData)
  const receivedHash = params.get("hash") ?? ""
  params.delete("hash")

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n")

  const secretKey = createHmac("sha256", "WebAppData").update(token).digest()
  const expectedHash = createHmac("sha256", secretKey).update(dataCheckString).digest("hex")
  if (!receivedHash || !safeEqual(receivedHash, expectedHash)) {
    throw new Error("Invalid Telegram signature")
  }

  const authDate = Number(params.get("auth_date"))
  if (!authDate || Date.now() / 1000 - authDate > 24 * 60 * 60) {
    throw new Error("Telegram authorization has expired")
  }

  const user = JSON.parse(params.get("user") ?? "null") as TelegramUser | null
  const allowedIds = (process.env.TELEGRAM_ADMIN_IDS ?? "")
    .split(",")
    .map((id) => Number(id.trim()))
    .filter(Number.isFinite)

  if (!user || !allowedIds.includes(user.id)) throw new Error("Administrator access denied")
  return user
}

export const authorizeAdminRequest = (request: any) => {
  const initData = String(request.headers["x-telegram-init-data"] ?? "")
  if (initData) return verifyTelegramAdmin(initData)

  const devKey = String(request.headers["x-admin-dev-key"] ?? "")
  if (process.env.NODE_ENV !== "production" && process.env.ADMIN_DEV_KEY && devKey === process.env.ADMIN_DEV_KEY) {
    return { id: 0, first_name: "Local admin" }
  }

  throw new Error("Open the admin panel from the Telegram bot")
}
