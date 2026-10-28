import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext.jsx'
import Section from '../components/landing/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import WhatsAppCta from '../components/WhatsAppCta.jsx'
import { askElradd, openElradd } from '../chat.js'
import { IconArrow, IconCheck, IconChatBubble } from '../components/Icons.jsx'

function MiniBrowser({ url }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.45),0_0_80px_rgba(14,124,102,0.25)] overflow-hidden">
      <div className="flex items-center gap-1.5 bg-ink/80 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="flex-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[9px] font-bold text-white/40" dir="ltr">
          {url}
        </span>
      </div>
      <div className="relative bg-white p-4 pb-9">
        <div className="flex items-center gap-1.5 pb-3">
          <span className="h-3 w-9 rounded bg-primary" />
          <span className="ms-auto h-2 w-6 rounded bg-ink/10" />
          <span className="h-2 w-5 rounded bg-ink/10" />
          <span className="h-2 w-5 rounded bg-ink/10" />
        </div>
        <div className="h-3 w-3/4 rounded-md bg-ink/70" />
        <div className="mt-1.5 h-2.5 w-2/5 rounded-md bg-highlight" />
        <div className="mt-2.5 h-1.5 w-full rounded bg-ink/10" />
        <div className="mt-1 h-1.5 w-3/5 rounded bg-ink/10" />
        <div className="mt-3 flex gap-2">
          <span className="h-5 w-16 rounded-full bg-primary" />
          <span className="h-5 w-12 rounded-full border border-ink/20" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-ink/10 bg-page p-2">
              <div className="h-3 w-3 rounded bg-primary-2" />
              <div className="mt-1.5 h-1.5 w-4/5 rounded bg-ink/25" />
              <div className="mt-1 h-1 w-full rounded bg-ink/10" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 start-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-[0_6px_16px_rgba(11,79,67,0.4)]">
          <IconChatBubble className="h-4 w-4" />
          <span className="absolute -top-0.5 -end-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-wa" />
        </div>
      </div>
    </div>
  )
}

export default function Website() {
  const { t } = useLang()
  const w = t.websitePage

  // offer lead form — data stays in this component only (no transmission yet)
  const [fields, setFields] = useState({ name: '', business: '', phone: '', email: '' })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [acknowledge, setAcknowledge] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [formError, setFormError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const setField = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const valid =
      fields.name.trim() && fields.phone.trim() && fields.email.trim() && agreeTerms && acknowledge && agreePrivacy
    if (!valid) {
      setFormError(true)
      return
    }
    setFormError(false)
    // NOTE: nothing is transmitted — submission destination to be decided
    setSubmitted(true)
  }

  return (
    <>
      {/* dark hero with the glowing site mockup */}
      <section id="site-hero" className="relative overflow-hidden bg-night">
        <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-4 pb-14 pt-14 md:pt-20 lg:grid-cols-2 lg:gap-y-0">
          <Reveal className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
            <h1 className="text-4xl font-extrabold leading-[1.2] text-white md:text-5xl">{w.h1}</h1>
            <p className="mt-5 text-xl font-extrabold text-highlight md:text-2xl">{w.priceLine}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <WhatsAppCta label={w.ctaWhatsapp} />
            </div>
          </Reveal>
          <Reveal className="order-2 flex justify-center lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-end">
            <div className="w-full max-w-md">
              <MiniBrowser url={w.mockUrl} />
            </div>
          </Reveal>
          <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2">
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">{w.sub2}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <WhatsAppCta label={w.ctaWhatsapp} />
            </div>
          </div>
        </div>
      </section>

      {/* offer checklist + total card */}
      <Section className="bg-white/60">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{w.offerHeader}</h2>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-4xl items-start gap-6 md:grid-cols-[1fr_300px]">
          <Reveal className="rounded-card border border-ink/10 bg-white p-6 shadow-soft md:p-7">
            <ul className="flex flex-col gap-4">
              {w.offer.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <IconCheck className="mt-1 h-5 w-5 shrink-0 text-primary-2" />
                  <span className="text-[15.5px] font-bold leading-relaxed text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-4 rounded-card border-2 border-primary/25 bg-white p-6 shadow-soft">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-highlight px-3 py-1 text-xs font-extrabold text-ink">
              {w.offerMarketNote}
            </span>
            <p className="text-lg font-extrabold leading-relaxed text-ink">{w.offerTotalLabel}</p>
            <p className="text-4xl font-extrabold tracking-tight text-primary">{w.offerTotal}</p>
          </Reveal>
        </div>
      </Section>

      {/* process */}
      <Section>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{w.processHeader}</h2>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-4">
          {w.process.map((step, i) => (
            <Reveal key={i} delay={i * 70} className="flex flex-col items-center gap-3 rounded-card border border-ink/10 bg-white p-5 text-center shadow-soft">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-lg font-extrabold text-primary">
                {i + 1}
              </span>
              <p className="font-extrabold leading-snug text-ink">{step}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* lead form — data stays local until submission is wired up */}
      <Section id="offer-form" className="bg-white/60">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{w.offerFormHeader}</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink/75">{w.offerFormSub}</p>
        </Reveal>
        <Reveal className="mx-auto mt-8 max-w-xl rounded-card border border-ink/10 bg-white p-6 shadow-soft md:p-7">
          {submitted ? (
            <div className="py-10 text-center">
              <IconCheck className="mx-auto h-12 w-12 text-primary-2" />
              <p className="mt-5 text-lg font-extrabold text-primary">{w.form.success}</p>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-extrabold text-ink" htmlFor="of-name">{w.form.name}</label>
                <input
                  id="of-name"
                  type="text"
                  value={fields.name}
                  onChange={setField('name')}
                  placeholder={w.form.namePh}
                  className="min-h-[46px] w-full rounded-xl border border-ink/15 bg-white px-4 text-[15px] font-semibold text-ink outline-none transition placeholder:text-ink/35 focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-extrabold text-ink" htmlFor="of-business">{w.form.business}</label>
                <input
                  id="of-business"
                  type="text"
                  value={fields.business}
                  onChange={setField('business')}
                  placeholder={w.form.businessPh}
                  className="min-h-[46px] w-full rounded-xl border border-ink/15 bg-white px-4 text-[15px] font-semibold text-ink outline-none transition placeholder:text-ink/35 focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-extrabold text-ink" htmlFor="of-phone">{w.form.phone}</label>
                <input
                  id="of-phone"
                  type="tel"
                  dir="ltr"
                  value={fields.phone}
                  onChange={setField('phone')}
                  placeholder={w.form.phonePh}
                  className="min-h-[46px] w-full rounded-xl border border-ink/15 bg-white px-4 text-right text-[15px] font-semibold text-ink outline-none transition placeholder:text-ink/35 focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-extrabold text-ink" htmlFor="of-email">{w.form.email}</label>
                <input
                  id="of-email"
                  type="email"
                  dir="ltr"
                  value={fields.email}
                  onChange={setField('email')}
                  placeholder={w.form.emailPh}
                  className="min-h-[46px] w-full rounded-xl border border-ink/15 bg-white px-4 text-right text-[15px] font-semibold text-ink outline-none transition placeholder:text-ink/35 focus:border-primary"
                />
              </div>

              <div className="mt-2 flex flex-col gap-3 border-t border-ink/10 pt-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms((v) => !v)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
                  />
                  <span className="text-sm font-semibold leading-relaxed text-ink/80">
                    {w.agree1Pre}{' '}
                    <Link
                      to="/legal/website-2026-offer"
                      target="_blank"
                      className="font-extrabold text-primary-2 underline underline-offset-2 transition hover:text-primary"
                    >
                      {w.agree1Link}
                    </Link>
                  </span>
                </label>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={acknowledge}
                    onChange={() => setAcknowledge((v) => !v)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
                  />
                  <span className="text-sm font-semibold leading-relaxed text-ink/80">{w.agree2}</span>
                </label>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={() => setAgreePrivacy((v) => !v)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
                  />
                  <span className="text-sm font-semibold leading-relaxed text-ink/80">
                    {w.agree3Pre}{' '}
                    <Link to="/privacy" className="font-extrabold text-primary-2 underline underline-offset-2 transition hover:text-primary">
                      {w.agree3Privacy}
                    </Link>{' '}
                    {w.agree3And}{' '}
                    <Link to="/terms" className="font-extrabold text-primary-2 underline underline-offset-2 transition hover:text-primary">
                      {w.agree3Terms}
                    </Link>
                  </span>
                </label>
              </div>

              {formError && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-extrabold text-red-700">
                  {w.form.error}
                </p>
              )}

              <button
                type="submit"
                className="mt-2 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-primary text-base font-extrabold text-white shadow-soft transition hover:bg-primary-2 active:scale-[0.98]"
              >
                {w.form.submit}
              </button>
            </form>
          )}
        </Reveal>
      </Section>

      {/* ask pills */}
      <Section id="site-ask" className="bg-primary-soft/40">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{w.ask.header}</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink/75">{w.ask.sub}</p>
        </Reveal>
        <Reveal className="mt-7 flex flex-wrap justify-center gap-2.5">
          {w.ask.pills.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => askElradd(pill)}
              className="inline-flex items-center rounded-full border-[1.5px] border-primary/20 bg-white px-[18px] py-[11px] text-[15px] font-bold text-primary shadow-sm transition hover:border-primary/45 hover:bg-primary-soft active:scale-[0.97]"
            >
              {pill}
            </button>
          ))}
        </Reveal>
        <Reveal className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={openElradd}
            className="inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-primary px-8 text-[17px] font-extrabold text-white shadow-soft transition hover:bg-primary-2 active:scale-[0.98]"
          >
            <IconChatBubble className="h-5 w-5" />
            {w.ask.cta}
          </button>
        </Reveal>
      </Section>

      {/* closing band */}
      <div className="px-4 pb-16">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-[24px] bg-gradient-to-l from-primary to-primary-2 px-6 py-12 text-center text-white shadow-soft">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <WhatsAppCta label={w.ctaWhatsapp} />
          </div>
          <Link
            to="/#pricing"
            className="mt-2 inline-flex min-h-[44px] items-center gap-2 font-bold text-white/85 underline underline-offset-4 transition hover:text-white"
          >
            {w.backToPricing}
            <IconArrow className="h-5 w-5 rotate-180 rtl:rotate-0" />
          </Link>
        </Reveal>
      </div>
    </>
  )
}
