import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LangContext.jsx'
import Section from './Section.jsx'
import Reveal from '../Reveal.jsx'
import { IconCheck, IconShield, IconWhatsApp, IconBolt, IconInstagram, IconMail, IconGlobe, IconWallet, IconCalendar } from '../Icons.jsx'
import { carouselCenterDelta } from '../../carousel.js'

const creditIcons = {
  whatsapp: IconWhatsApp,
  messenger: IconBolt,
  instagram: IconInstagram,
  email: IconMail,
  webchat: IconGlobe,
}

// simplified payment marks — swap for official vector logos if assets arrive
function MastercardMark() {
  return (
    <svg viewBox="0 0 36 22" className="h-[22px] w-9" aria-hidden="true">
      <circle cx="13" cy="11" r="10" fill="#EB001B" />
      <circle cx="23" cy="11" r="10" fill="#F79E1B" />
      <path d="M18 3.5a10 10 0 0 1 0 15 10 10 0 0 1 0-15z" fill="#FF5F00" />
    </svg>
  )
}
function VisaMark() {
  return (
    <span className="text-[17px] font-black italic tracking-tight text-[#1a1f71]" style={{ fontFamily: 'system-ui' }}>
      VISA
    </span>
  )
}
function MezaMark() {
  return <span className="text-[15px] font-black lowercase text-[#5d2e8c]">meza</span>
}
function PaymobMark() {
  return <span className="text-[15px] font-black text-[#3b3b98]">paymob</span>
}
function InstaPayMark() {
  return <span className="text-[14px] font-black italic text-[#6a1b9a]">InstaPay</span>
}

const paymentMarks = {
  cash: () => <IconWallet className="h-5 w-5 text-primary" />,
  mastercard: MastercardMark,
  visa: VisaMark,
  meza: MezaMark,
  paymob: PaymobMark,
  instapay: InstaPayMark,
}

// badge: actual discount vs list rate, rounded — computed so it stays
// honest if prices change (e.g. 3,199 vs 5,000 -> 36%)
function badgeText(billing, plan, lang) {
  const rate =
    billing === 'monthly' ? plan.price
    : billing === 'quarterly' ? plan.quarterlyPrice
    : plan.annualPrice
  const pct = Math.round((1 - priceToNum(rate) / priceToNum(plan.oldPrice)) * 100)
  const pctStr = lang === 'ar' ? String(pct).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]) : String(pct)
  if (lang === 'ar') {
    return `خصم ${pctStr}٪ ${billing === 'annual' ? '+ شهرين مجانا' : 'لفترة محدودة'}`
  }
  return `${pct}% off ${billing === 'annual' ? '+ 2 months free' : '— limited time'}`
}

// Arabic-Indic digits and thousands separator -> number
function priceToNum(s) {
  return Number(String(s).replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[٬,]/g, ''))
}

export default function Pricing() {
  const { t, lang } = useLang()
  const p = t.pricing
  const [billing, setBilling] = useState('annual')

  // mobile carousel state (dots + swipe tracking) — defaults to the Agent card
  const scrollRef = useRef(null)
  const [activeCard, setActiveCard] = useState(1)

  useEffect(() => {
    const el = scrollRef.current
    if (!el || window.innerWidth >= 768) return
    const card = el.querySelectorAll('[data-card]')[1]
    if (!card) return
    el.scrollLeft = el.scrollLeft + carouselCenterDelta(el, card)
  }, [])

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const cards = [...el.querySelectorAll('[data-card]')]
    const center = el.getBoundingClientRect().left + el.clientWidth / 2
    const idx = cards.findIndex((c) => {
      const r = c.getBoundingClientRect()
      return center >= r.left && center < r.right
    })
    if (idx >= 0) setActiveCard(idx)
  }

  const jumpTo = (i) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelectorAll('[data-card]')[i]
    if (!card) return
    // instant jump — smooth scrolling is unreliable in embedded panes
    el.scrollLeft = el.scrollLeft + carouselCenterDelta(el, card)
    setActiveCard(i)
  }

  return (
    <Section id="pricing">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{p.header}</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink/75">{p.sub}</p>
      </Reveal>

      <Reveal className="mt-6 flex justify-center">
        <div className="inline-flex rounded-full border border-ink/10 bg-white p-1 shadow-sm" role="group" aria-label={p.billing.groupLabel}>
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            aria-pressed={billing === 'monthly'}
            className={`min-h-[44px] rounded-full px-6 text-[15px] font-extrabold transition ${
              billing === 'monthly' ? 'bg-primary text-white shadow-sm' : 'text-ink/60 hover:text-primary'
            }`}
          >
            {p.billing.monthly}
          </button>
          <button
            type="button"
            onClick={() => setBilling('quarterly')}
            aria-pressed={billing === 'quarterly'}
            className={`min-h-[44px] rounded-full px-6 text-[15px] font-extrabold transition ${
              billing === 'quarterly' ? 'bg-primary text-white shadow-sm' : 'text-ink/60 hover:text-primary'
            }`}
          >
            {p.billing.quarterly}
          </button>
          <button
            type="button"
            onClick={() => setBilling('annual')}
            aria-pressed={billing === 'annual'}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 text-[15px] font-extrabold transition ${
              billing === 'annual' ? 'bg-primary text-white shadow-sm' : 'text-ink/60 hover:text-primary'
            }`}
          >
            {p.billing.annual}
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
              billing === 'annual' ? 'bg-highlight text-primary' : 'bg-highlight/50 text-ink'
            }`}>
              {p.billing.annualTag}
            </span>
          </button>
        </div>
      </Reveal>

      <div
        ref={scrollRef}
        onScroll={onScroll}
        onTouchStart={() => setActiveCard(activeCard)}
        className="no-scrollbar mx-auto mt-6 flex max-w-4xl snap-x snap-mandatory gap-4 overflow-x-auto pb-1 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:pb-0"
      >
        {p.plans.map((plan, i) => (
          <div key={plan.id} data-card className="w-[86%] shrink-0 snap-center md:w-auto">
            <Reveal
              delay={i * 90}
              className={`flex h-full flex-col rounded-[20px] bg-white p-6 shadow-soft ${
                plan.id === 'agent' ? 'border-2 border-primary' : 'border border-ink/10'
              }`}
            >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-extrabold text-primary">{plan.name}</h3>
                <p className="mt-0.5 text-[13px] font-bold text-ink/55">{plan.role}</p>
              </div>
              <span className="shrink-0 rounded-full bg-highlight px-3 py-1 text-xs font-extrabold text-ink">
                {badgeText(billing, plan, lang)}
              </span>
            </div>

            {(() => {
              const big =
                billing === 'monthly' ? plan.price
                : billing === 'quarterly' ? plan.quarterlyPrice
                : plan.annualPrice
              const bulk =
                billing === 'quarterly' ? plan.quarterlyBulk
                : billing === 'annual' ? plan.annualBulk
                : ''
              return (
                <>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold tracking-tight text-ink">{big}</span>
                    <span className="text-lg font-bold text-ink/40 line-through">{plan.oldPrice}</span>
                    <span className="text-[15px] font-bold text-ink/55">{p.perMonth}</span>
                  </div>
                  {bulk && (
                    <p className="mt-0.5 text-sm font-extrabold text-primary-2">{bulk}</p>
                  )}
                </>
              )
            })()}

            <div className="mt-4 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary-soft/70 px-4 py-3">
              <span className="text-2xl font-black leading-none text-primary-2" aria-hidden="true">∞</span>
              <div>
                <p className="text-sm font-extrabold text-primary">{p.unlimitedLabel}</p>
                <p className="mt-0.5 text-xs font-bold leading-snug text-ink/55">{plan.unlimitedCap}</p>
              </div>
            </div>

            <ul className="mt-4 flex flex-col gap-2.5">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  <IconCheck className="mt-1 h-[18px] w-[18px] shrink-0 text-primary-2" />
                  <span className="text-[15px] font-bold leading-relaxed text-ink">{f}</span>
                </li>
              ))}
            </ul>

            {plan.credits && (
              <div className="mt-4 flex flex-wrap gap-2 rounded-xl bg-page p-3">
                {plan.credits.map((c) => {
                  const CIcon = creditIcons[c.icon]
                  return (
                    <span
                      key={c.icon}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-extrabold text-ink/75"
                    >
                      {CIcon && <CIcon className="h-[13px] w-[13px] text-primary-2" />}
                      {c.label} <b className="text-primary">{c.value}</b>
                    </span>
                  )
                })}
              </div>
            )}

            <p className="mt-auto pt-4 text-center text-xs font-bold leading-relaxed text-ink/50">
              {billing === 'annual'
                ? [p.annualSetupLine, ...plan.extras.filter((extra) => extra.id !== 'setup').map((extra) => `${extra.name} ${extra.price}`)].join(' · ')
                : plan.extras.map((extra) => `${extra.name} ${extra.price}`).join(' · ')}
            </p>

            <Link
              to={`/signup?plan=${plan.id}`}
              className={`mt-3 inline-flex min-h-[50px] w-full items-center justify-center rounded-full text-base font-extrabold text-white transition active:scale-[0.98] ${
                plan.id === 'agent' ? 'bg-primary-2 hover:bg-primary' : 'bg-primary hover:bg-primary-2'
              }`}
            >
              {plan.cta}
            </Link>
          </Reveal>
          </div>
        ))}

        <div data-card className="w-[86%] shrink-0 snap-center md:col-span-2 md:w-auto">
          <div className="flex flex-col gap-4 rounded-[20px] border-2 border-highlight bg-gradient-to-b from-highlight/10 to-white p-6 shadow-soft md:h-full md:flex-row md:items-center">
            <div>
              <span className="inline-flex rounded-full bg-highlight px-3 py-1 text-xs font-extrabold text-ink">
                {p.siteOffer.type}
              </span>
              <h3 className="mt-2.5 text-2xl font-extrabold text-primary">{p.siteOffer.name}</h3>
              <p className="mt-0.5 text-[13px] font-bold text-ink/55">
                {p.siteOffer.role.split('Qubix Agency').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <a
                        href="https://www.qubix.agency/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-2 underline underline-offset-2 transition hover:text-primary"
                      >
                        Qubix Agency
                      </a>
                    )}
                  </span>
                ))}
              </p>
              <p className="mt-2 text-2xl font-extrabold text-ink">
                {p.siteOffer.price} <span className="text-sm font-bold text-ink/50">{p.siteOffer.unit}</span>
              </p>
              <Link
                to="/legal/website-2026-offer"
                className="mt-1 inline-flex text-xs font-bold text-ink/50 underline underline-offset-2 transition hover:text-primary"
              >
                {p.siteOffer.termsApply}
              </Link>
            </div>
            <div className="flex flex-col gap-4 md:items-end">              <ul className="flex flex-col gap-2">
                {p.siteOffer.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <IconCheck className="mt-1 h-[18px] w-[18px] shrink-0 text-primary-2" />
                    <span className="text-[15px] font-bold leading-relaxed text-ink">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/website"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border-2 border-primary bg-white px-6 text-[15px] font-extrabold text-primary transition hover:border-highlight hover:bg-highlight active:scale-[0.98] md:w-full"
              >
                {p.siteOffer.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2 md:hidden">
        {[...p.plans.map((plan) => plan.name), p.siteOffer.name].map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => jumpTo(i)}
            aria-label={name}
            aria-current={activeCard === i}
            className={`h-2.5 w-2.5 rounded-full transition ${
              activeCard === i ? 'bg-primary' : 'bg-ink/20'
            }`}
          />
        ))}
      </div>

      <Reveal className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        {p.payments.map((method) => {
          const Mark = paymentMarks[method.id]
          return (
            <span
              key={method.id}
              aria-label={method.name}
              title={method.name}
              className="inline-flex h-10 min-w-[64px] items-center justify-center rounded-xl border border-ink/10 bg-white px-3 shadow-sm"
            >
              {Mark && <Mark />}
            </span>
          )
        })}
      </Reveal>

      <Reveal className="mt-5 flex flex-wrap items-center justify-center text-center">
        <p className="inline-flex items-center gap-2 text-[15px] font-extrabold text-primary">
          <IconShield className="h-[18px] w-[18px]" />
          {p.trust}
        </p>
      </Reveal>
    </Section>
  )
}
