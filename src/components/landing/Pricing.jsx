import { useRef, useState } from 'react'
import { useLang } from '../../i18n/LangContext.jsx'
import Section from './Section.jsx'
import Reveal from '../Reveal.jsx'
import { IconCheck, IconShield, IconWhatsApp, IconBolt, IconInstagram, IconMail, IconGlobe, IconWallet } from '../Icons.jsx'
import { askElradd } from '../../chat.js'
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

export default function Pricing() {
  const { t } = useLang()
  const p = t.pricing

  // mobile carousel state (dots + swipe tracking)
  const scrollRef = useRef(null)
  const [activeCard, setActiveCard] = useState(0)

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
                {plan.badge}
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-tight text-ink">{plan.price}</span>
              <span className="text-lg font-bold text-ink/40 line-through">{plan.oldPrice}</span>
              <span className="text-[15px] font-bold text-ink/55">{p.perMonth}</span>
            </div>

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

            <button
              type="button"
              onClick={() => askElradd(plan.ask)}
              className={`mt-5 inline-flex min-h-[50px] w-full items-center justify-center rounded-full text-base font-extrabold text-white transition active:scale-[0.98] ${
                plan.id === 'agent' ? 'bg-primary-2 hover:bg-primary' : 'bg-primary hover:bg-primary-2'
              }`}
            >
              {plan.cta}
            </button>

            <p className="mt-3 text-center text-xs font-bold leading-relaxed text-ink/50">
              {p.addons.map((addon) => `${addon.name} ${addon.price}`).join(' · ')}
            </p>
          </Reveal>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2 md:hidden">
        {p.plans.map((plan, i) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => jumpTo(i)}
            aria-label={plan.name}
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
