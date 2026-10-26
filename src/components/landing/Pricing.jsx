import { useLang } from '../../i18n/LangContext.jsx'
import Section from './Section.jsx'
import Reveal from '../Reveal.jsx'
import { IconCheck, IconShield, IconWhatsApp, IconBolt, IconInstagram, IconMail, IconGlobe } from '../Icons.jsx'
import { askElradd } from '../../chat.js'

const creditIcons = {
  whatsapp: IconWhatsApp,
  messenger: IconBolt,
  instagram: IconInstagram,
  email: IconMail,
  webchat: IconGlobe,
}

export default function Pricing() {
  const { t } = useLang()
  const p = t.pricing

  return (
    <Section id="pricing">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{p.header}</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink/75">{p.sub}</p>
      </Reveal>

      <div className="mx-auto mt-6 grid max-w-4xl gap-4 md:grid-cols-2">
        {p.plans.map((plan, i) => (
          <Reveal
            key={plan.id}
            delay={i * 90}
            className={`flex flex-col rounded-[20px] bg-white p-6 shadow-soft ${
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
              <span className="text-[15px] font-bold text-ink/55">{p.perMonth}</span>
            </div>
            <p className="mt-0.5 text-sm font-extrabold text-primary-2">{plan.note}</p>

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
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        <span className="text-sm font-extrabold text-ink/55">{p.addonsLabel}</span>
        {p.addons.map((addon, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-bold text-ink/75 shadow-sm"
          >
            {addon.name} — <b className="text-primary">{addon.price}</b>
          </span>
        ))}
      </Reveal>

      <Reveal className="mt-5 flex flex-wrap items-center justify-center gap-4 text-center">
        <p className="inline-flex items-center gap-2 text-[15px] font-extrabold text-primary">
          <IconShield className="h-[18px] w-[18px]" />
          {p.trust}
        </p>
        <button
          type="button"
          onClick={() => askElradd(p.askMsg)}
          className="inline-flex items-center rounded-full border border-primary/15 bg-primary-soft px-5 py-2 text-sm font-extrabold text-primary transition hover:border-primary/35 active:scale-[0.98]"
        >
          {p.askPill}
        </button>
      </Reveal>
    </Section>
  )
}
