import { useState } from 'react'
import { isWhatsAppConfigured, whatsAppLink } from '../config.js'
import { useLang } from '../i18n/LangContext.jsx'
import Section from '../components/landing/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { IconWhatsApp } from '../components/Icons.jsx'

export default function Contact() {
  const { t } = useLang()
  const c = t.contactPage
  const [name, setName] = useState('')
  const [type, setType] = useState(c.form.types[0])
  const [message, setMessage] = useState('')
  const [feedback, setFeedback] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
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
    <Section className="min-h-[60vh]">
      <Reveal className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold text-primary md:text-4xl">{c.h1}</h1>

        {isWhatsAppConfigured && (
          <a
            href={whatsAppLink(c.whatsappPrefill)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-full bg-wa px-8 text-lg font-extrabold text-primary shadow-soft transition hover:brightness-95 active:scale-[0.98] sm:w-auto"
          >
            <IconWhatsApp className="h-6 w-6" />
            {c.whatsappCta}
          </a>
        )}

        <p className="mt-10 text-sm font-extrabold uppercase tracking-wide text-ink/45">{c.or}</p>

        <form onSubmit={onSubmit} className="mt-4 rounded-card border border-ink/10 bg-white p-6 text-start shadow-soft md:p-7" noValidate>
          <label htmlFor="cf-name" className="block text-sm font-extrabold text-ink">
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

          <label htmlFor="cf-type" className="mt-5 block text-sm font-extrabold text-ink">
            {c.form.type}
          </label>
          <select id="cf-type" value={type} onChange={(e) => setType(e.target.value)} className={`mt-1.5 ${inputCls}`}>
            {c.form.types.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

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

          <button
            type="submit"
            className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-lg font-bold text-white shadow-sm transition hover:bg-primary-2 active:scale-[0.98]"
          >
            <IconWhatsApp className="h-5 w-5" />
            {c.form.submit}
          </button>
        </form>

        <p className="mt-8 text-lg font-bold text-ink/70">{c.nudge}</p>
        <p className="mt-6 text-sm text-ink/50">{c.identity}</p>
      </Reveal>
    </Section>
  )
}
