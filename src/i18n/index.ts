import { ru } from "@/i18n/ru"

type Locale = "ru"
const dictionaries = { ru }

let currentLocale: Locale = "ru"

export const setLocale = (locale: Locale) => {
  currentLocale = locale
}

export const t = (path: string) => {
  const dict = dictionaries[currentLocale]
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, dict) as string
}

export const tArray = <T = string>(path: string) => {
  return t(path) as unknown as T[]
}
