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
  const [name, setName] = useState('')
  const [type, setType] = useState(c.form.types[0])
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [feedback, setFeedback] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim() || !consent) {
      setFeedback(c.form.required)
      return
    }
    if (!isWhatsAppConfigured) {
      setFeedback(c.form.noWhatsapp)
      return
    }
    const text = `${c.form.composeIntro} ${name.trim()}. ${c.form.composeType} ${type}. ${message.trim()}`
    window.open(whatsAppLink(text), '_blank', 'noopener,noreferrer')
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

          {/* intake form */}
          <Reveal delay={100} className="rounded-card border border-ink/10 bg-white p-6 shadow-soft md:p-7">
            <form onSubmit={onSubmit} noValidate className="flex flex-col">
              <label className="block text-sm font-extrabold text-ink">{c.form.type}</label>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {c.form.types.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setType(opt)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition active:scale-[0.97] ${
                      type === opt
                        ? 'bg-primary text-white shadow-sm'
                        : 'border border-ink/15 bg-white text-ink/70 hover:border-primary/40'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <label htmlFor="cf-name" className="mt-6 block text-sm font-extrabold text-ink">
                {c.form.name}
              </label>
              <input
                id="cf-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={c.form.namePh}
                className={`mt-1.5 ${inputCls}`}
              />

              <label htmlFor="cf-msg" className="mt-5 block text-sm font-extrabold text-ink">
                {c.form.message}
              </label>
              <textarea
                id="cf-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={c.form.messagePh}
                rows={4}
                className={`mt-1.5 resize-y ${inputCls}`}
              />

              {feedback && (
                <p className="mt-4 rounded-xl bg-highlight/40 px-4 py-3 text-sm font-bold text-ink" role="status">
                  {feedback}
                </p>
              )}

              <label className="mt-5 flex items-start gap-3">
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
                    className="font-extrabold text-primary-2 underline underline-offset-2 transition hover:text-primary"
                  >
                    {c.form.consentTerms}
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-lg font-bold text-white shadow-sm transition hover:bg-primary-2 active:scale-[0.98]"
              >
                <IconWhatsApp className="h-5 w-5" />
                {c.form.submit}
              </button>
            </form>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
