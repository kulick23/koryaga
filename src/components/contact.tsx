import { type FormEvent, useState } from "react"
import { Send, Phone, MapPin, Clock } from "lucide-react"

import { CONTACT_FORM, CONTACT_INFO, CONTACT_SECTION } from "@/constants/contact"

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              {CONTACT_SECTION.label}
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">
              {CONTACT_SECTION.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {CONTACT_SECTION.description}
            </p>

            <div className="mt-10 flex flex-col gap-6">
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{CONTACT_INFO.phone.label}</p>
                  <p className="text-lg font-semibold text-foreground">{CONTACT_INFO.phone.value}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{CONTACT_INFO.address.label}</p>
                  <p className="text-lg font-semibold text-foreground">{CONTACT_INFO.address.value}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{CONTACT_INFO.hours.label}</p>
                  <p className="text-lg font-semibold text-foreground">{CONTACT_INFO.hours.value}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
            <h3 className="font-serif text-2xl font-bold text-foreground">{CONTACT_FORM.title}</h3>
            <p className="mt-2 text-muted-foreground">{CONTACT_FORM.description}</p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                  {CONTACT_FORM.fields.name.label}
                </label>
                <input
                  id="name"
                  type="text"
                  required={CONTACT_FORM.fields.name.required}
                  placeholder={CONTACT_FORM.fields.name.placeholder}
                  className="w-full rounded-xl border border-border bg-secondary px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                  {CONTACT_FORM.fields.phone.label}
                </label>
                <input
                  id="phone"
                  type="tel"
                  required={CONTACT_FORM.fields.phone.required}
                  placeholder={CONTACT_FORM.fields.phone.placeholder}
                  className="w-full rounded-xl border border-border bg-secondary px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                  {CONTACT_FORM.fields.message.label}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder={CONTACT_FORM.fields.message.placeholder}
                  className="w-full resize-none rounded-xl border border-border bg-secondary px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] disabled:opacity-50 disabled:hover:scale-100"
              >
                {submitted ? (
                  CONTACT_FORM.submit.success
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    {CONTACT_FORM.submit.idle}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
