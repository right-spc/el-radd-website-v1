import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isWhatsAppConfigured, whatsAppLink } from '../config.js'
import { useLang } from '../i18n/LangContext.jsx'
import Section from '../components/landing/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { openElradd } from '../chat.js'
import { IconWhatsApp, IconChatBubble, IconGlobe, IconCalendar } from '../components/Icons.jsx'

export default function Contact() {
  const { t } = useLang()
  const c = t.contactPage
  const [fields, setFields] = useState({ name: '', phone: '', email: '', message: '' })
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const setField = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }))

  // Egyptian mobile: 11 digits starting 01, optional +20/20 country code, spaces/dashes tolerated
  const isEgyptianMobile = (value) => /^(?:\+?20)?01[0125]\d{8}$/.test(value.replace(/[\s-]/g, ''))

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!fields.name.trim()) errs.name = c.form.nameErr
    if (!isEgyptianMobile(fields.phone)) errs.phone = c.form.phoneErr
    if (!fields.message.trim()) errs.message = c.form.messageErr
    if (!consent) errs.consent = c.form.consentErr
    setErrors(errs)
    if (Object.keys(errs).length) return
    // NOTE: nothing transmitted yet — submission destination pending
    setSubmitted(true)
  }

  const inputCls =
    'min-h-[48px] w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[16px] text-ink transition placeholder:text-ink/40 focus:border-primary-2 focus:outline-none'

  return (
    <>
      <Section className="pb-0 md:pb-0">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold leading-tight text-primary md:text-5xl">{c.h1}</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/75">{c.sub}</p>
        </Reveal>
      </Section>

      <Section className="pt-4 md:pt-6">
        <div className="mx-auto grid max-w-5xl items-start gap-6 md:grid-cols-[1fr_1.15fr]">
          {/* contact paths */}
          <div className="flex flex-col gap-4">
            <Reveal className="rounded-card border border-primary/25 bg-white p-6 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <IconChatBubble className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-extrabold text-primary">
                  {c.askChip}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-ink">{c.askTitle}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{c.askBody}</p>
              <button
                type="button"
                onClick={openElradd}
                className="mt-5 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-6 font-extrabold text-white shadow-sm transition hover:bg-primary-2 active:scale-[0.98] w-full"
              >
                <IconChatBubble className="h-5 w-5" />
                {c.askCta}
              </button>
            </Reveal>

            {isWhatsAppConfigured && (
              <Reveal className="rounded-card border border-ink/10 bg-white p-6 shadow-soft">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-wa/10 text-wa">
                  <IconWhatsApp className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-extrabold text-ink">{c.waTitle}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{c.waBody}</p>
                <a
                  href={whatsAppLink(c.whatsappPrefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-wa px-6 font-extrabold text-primary shadow-sm transition hover:brightness-95 active:scale-[0.98]"
                >
                  <IconWhatsApp className="h-5 w-5" />
                  {c.waCta}
                </a>
              </Reveal>
            )}

            <Reveal className="rounded-card border border-ink/10 bg-white p-6 shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <IconGlobe className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-xl font-extrabold text-ink">{c.rsTitle}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{c.rsBody}</p>
              <a
                href="https://rightspc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex text-sm font-extrabold text-primary-2 underline underline-offset-2 transition hover:text-primary"
              >
                {c.rsLink}
              </a>
            </Reveal>
          </div>

          {/* intake form — data stays local until submission is wired up */}
          <Reveal delay={100} className="rounded-card border border-ink/10 bg-white p-6 shadow-soft md:p-7">
            {submitted ? (
              <div className="py-12 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-2xl text-primary">✓</span>
                <p className="mt-5 text-lg font-extrabold text-primary">{c.form.success}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
                <div>
                  <label htmlFor="cf-name" className="block text-sm font-extrabold text-ink">
                    {c.form.name}
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    value={fields.name}
                    onChange={setField('name')}
                    placeholder={c.form.namePh}
                    className={`mt-1.5 min-h-[48px] w-full rounded-xl border bg-white px-4 py-3 text-[16px] text-ink transition placeholder:text-ink/40 focus:outline-none ${
                      errors.name ? 'border-red-400 focus:border-red-500' : 'border-ink/15 focus:border-primary-2'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs font-bold text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="cf-phone" className="block text-sm font-extrabold text-ink">
                    {c.form.phone}
                  </label>
                  <input
                    id="cf-phone"
                    type="tel"
                    dir="ltr"
                    inputMode="numeric"
                    value={fields.phone}
                    onChange={setField('phone')}
                    placeholder={c.form.phonePh}
                    className={`mt-1.5 min-h-[48px] w-full rounded-xl border bg-white px-4 py-3 text-right text-[16px] text-ink transition placeholder:text-ink/40 focus:outline-none ${
                      errors.phone ? 'border-red-400 focus:border-red-500' : 'border-ink/15 focus:border-primary-2'
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-xs font-bold text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="cf-email" className="block text-sm font-extrabold text-ink">
                    {c.form.email}
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    dir="ltr"
                    value={fields.email}
                    onChange={setField('email')}
                    placeholder={c.form.emailPh}
                    className="mt-1.5 min-h-[48px] w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-right text-[16px] text-ink transition placeholder:text-ink/40 focus:border-primary-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="cf-msg" className="block text-sm font-extrabold text-ink">
                    {c.form.message}
                  </label>
                  <textarea
                    id="cf-msg"
                    value={fields.message}
                    onChange={setField('message')}
                    placeholder={c.form.messagePh}
                    rows={4}
                    className={`mt-1.5 resize-y min-h-[48px] w-full rounded-xl border bg-white px-4 py-3 text-[16px] text-ink transition placeholder:text-ink/40 focus:outline-none ${
                      errors.message ? 'border-red-400 focus:border-red-500' : 'border-ink/15 focus:border-primary-2'
                    }`}
                  />
                  {errors.message && <p className="mt-1 text-xs font-bold text-red-600">{errors.message}</p>}
                </div>

                <label className="mt-2 flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={() => setConsent((v) => !v)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
                  />
                  <span className="text-sm font-semibold leading-relaxed text-ink/80">
                    {c.form.consent}{' '}
                    <Link
                      to="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-extrabold text-primary-2 underline underline-offset-2 transition hover:text-primary"
                    >
                      {c.form.consentTerms}
                    </Link>
                  </span>
                </label>
                {errors.consent && <p className="text-xs font-bold text-red-600">{errors.consent}</p>}

                <button
                  type="submit"
                  className="mt-2 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-sm transition hover:bg-primary-2 active:scale-[0.98]"
                >
                  {c.form.submit}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </Section>
    </>
  )
}
