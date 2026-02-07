import { t } from "@/i18n"

export const CART_LABELS = {
  buttonAria: t("cart.buttonAria"),
  title: t("cart.title"),
  closeAria: t("cart.closeAria"),
  empty: t("cart.empty"),
  decreaseAria: t("cart.decreaseAria"),
  increaseAria: t("cart.increaseAria"),
  total: t("cart.total"),
  clear: t("cart.clear"),
  checkout: t("cart.checkout"),
  checkoutTitle: t("cart.checkoutTitle"),
  backToCart: t("cart.backToCart"),
  submit: t("cart.submit"),
  fields: {
    name: {
      label: t("cart.fields.name"),
      placeholder: t("cart.fields.namePlaceholder"),
    },
    phone: {
      label: t("cart.fields.phone"),
      placeholder: t("cart.fields.phonePlaceholder"),
    },
    comment: {
      label: t("cart.fields.comment"),
      placeholder: t("cart.fields.commentPlaceholder"),
    },
  },
}
