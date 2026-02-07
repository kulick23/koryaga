import { type ComponentType } from "react"
import { Award, Clock, Leaf, Truck } from "lucide-react"

import { BRAND_NAME } from "@/constants/brand"
import { t } from "@/i18n"

export type AboutFeature = {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}

export const ABOUT_CONTENT = {
  label: t("about.label"),
  title: t("about.title"),
  description:
    t("about.description").replace("KORYAGA", BRAND_NAME),
  experience: {
    value: t("about.experienceValue"),
    label: t("about.experience.label"),
    title: t("about.experience.title"),
  },
}

export const ABOUT_FEATURES: AboutFeature[] = [
  {
    icon: Leaf,
    title: t("about.features.fresh.title"),
    description: t("about.features.fresh.description"),
  },
  {
    icon: Clock,
    title: t("about.features.fast.title"),
    description: t("about.features.fast.description"),
  },
  {
    icon: Award,
    title: t("about.features.author.title"),
    description: t("about.features.author.description"),
  },
  {
    icon: Truck,
    title: t("about.features.care.title"),
    description: t("about.features.care.description"),
  },
]
