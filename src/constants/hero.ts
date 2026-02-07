import { t, tArray } from "@/i18n"

export const HERO_CONTENT = {
  badge: t("hero.badge"),
  titleLines: tArray("hero.titleLines"),
  description: t("hero.description"),
  actions: {
    primary: { label: t("hero.actions.primary"), href: "#catalog" },
    secondary: { label: t("hero.actions.secondary"), href: "#about" },
  },
  stats: [
    { value: t("hero.statValues.bouquets"), label: t("hero.stats.bouquets") },
    { value: t("hero.statValues.rating"), label: t("hero.stats.rating") },
    { value: t("hero.statValues.deliveryTime"), label: t("hero.stats.deliveryTime") },
  ],
  scrollLabel: t("hero.scrollLabel"),
}
