import { t } from "@/i18n"

export const CONTACT_INFO = {
  phone: {
    label: t("contact.info.phoneLabel"),
    value: t("contact.info.phoneValue"),
  },
  address: {
    label: t("contact.info.addressLabel"),
    value: t("contact.info.addressValue"),
  },
  hours: {
    label: t("contact.info.hoursLabel"),
    value: t("contact.info.hoursValue"),
  },
}

export const CONTACT_SECTION = {
  label: t("contact.section.label"),
  title: t("contact.section.title"),
  description: t("contact.section.description"),
}

export const CONTACT_FORM = {
  title: t("contact.form.title"),
  description: t("contact.form.description"),
  submit: {
    idle: t("contact.form.submitIdle"),
    success: t("contact.form.submitSuccess"),
  },
  fields: {
    name: {
      label: t("contact.form.fields.name"),
      placeholder: t("contact.form.fields.namePlaceholder"),
      required: true,
    },
    phone: {
      label: t("contact.form.fields.phone"),
      placeholder: t("contact.form.fields.phonePlaceholder"),
      required: true,
    },
    message: {
      label: t("contact.form.fields.message"),
      placeholder: t("contact.form.fields.messagePlaceholder"),
    },
  },
}
