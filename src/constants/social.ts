import { t } from "@/i18n"

export const FOOTER_SOCIALS = [
  {
    label: t("footer.socials.telegram"),
    href: "https://t.me/",
    aria: t("footer.socials.telegram"),
    icon: "telegram",
  },
  {
    label: t("footer.socials.whatsapp"),
    href: "https://wa.me/",
    aria: t("footer.socials.whatsapp"),
    icon: "whatsapp",
  },
  {
    label: t("footer.socials.instagram"),
    href: "https://instagram.com/",
    aria: t("footer.socials.instagram"),
    icon: "instagram",
  },
] as const
