import { CreditCard, Gift, MapPin, Clock } from "lucide-react"
import type { ComponentType } from "react"

import { t } from "@/i18n"

export type DeliveryStep = {
  icon: ComponentType<{ className?: string }>
  step: string
  title: string
  description: string
}

export const DELIVERY_STEPS: DeliveryStep[] = [
  {
    icon: Gift,
    step: "01",
    title: t("delivery.steps.choose.title"),
    description: t("delivery.steps.choose.description"),
  },
  {
    icon: CreditCard,
    step: "02",
    title: t("delivery.steps.order.title"),
    description: t("delivery.steps.order.description"),
  },
  {
    icon: Clock,
    step: "03",
    title: t("delivery.steps.wait.title"),
    description: t("delivery.steps.wait.description"),
  },
  {
    icon: MapPin,
    step: "04",
    title: t("delivery.steps.enjoy.title"),
    description: t("delivery.steps.enjoy.description"),
  },
]

export const DELIVERY_HIGHLIGHT = {
  label: t("delivery.label"),
  header: t("delivery.header"),
  subheader: t("delivery.subheader"),
  title: t("delivery.highlight.title"),
  description: t("delivery.highlight.description"),
  stats: [
    { value: t("delivery.highlight.statValues.time"), label: t("delivery.highlight.stats.time") },
    { value: t("delivery.highlight.statValues.free"), label: t("delivery.highlight.stats.free") },
    { value: t("delivery.highlight.statValues.schedule"), label: t("delivery.highlight.stats.schedule") },
  ],
}
