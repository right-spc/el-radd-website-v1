import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LangContext.jsx'
import Section from './Section.jsx'
import Reveal from '../Reveal.jsx'
import { IconCheck, IconShield } from '../Icons.jsx'

export default function Pricing() {
  const { t } = useLang()
  const p = t.pricing

  return (
    <Section id="pricing">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{p.header}</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink/80">{p.sub}</p>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        {p.plans.map((plan, i) => (
          <Reveal
            key={plan.id}
            delay={i * 90}
            className={`flex flex-col rounded-card bg-white p-7 shadow-soft ${
              plan.id === 'plus' ? 'border-2 border-primary' : 'border border-ink/10'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-2xl font-extrabold text-primary">{plan.name}</h3>
              <span className="rounded-full bg-highlight/60 px-3 py-1 text-xs font-extrabold text-ink">
                {plan.badge}
              </span>
            </div>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight text-ink">{plan.price}</span>
              <span className="text-lg font-bold text-ink/60">{p.perMonth}</span>
            </div>
            <p className="mt-1 text-sm font-bold text-primary-2">{plan.note}</p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-2.5">
                <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary-2" />
                <span className="font-bold leading-relaxed text-ink">{plan.feature}</span>
              </li>
            </ul>
            {plan.credits && (
              <p className="mt-4 rounded-xl bg-page p-4 text-[15px] font-bold leading-relaxed text-ink/75">
                {plan.credits}
              </p>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-10 max-w-4xl">
        <h3 className="text-center text-xl font-extrabold text-primary">{p.addonsTitle}</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {p.addons.map((addon, i) => (
            <div key={i} className="flex flex-col rounded-card border border-ink/10 bg-white p-5 shadow-soft">
              <p className="font-extrabold leading-snug text-ink">{addon.name}</p>
              <p className="mt-2 text-xl font-extrabold text-primary">
                {addon.price}
                {addon.note && <span className="ms-2 text-sm font-bold text-ink/55">— {addon.note}</span>}
              </p>
              {addon.linkLabel && (
                <Link
                  to="/website"
                  className="mt-3 inline-flex min-h-[44px] items-center font-bold text-primary-2 underline underline-offset-4 transition hover:text-primary"
                >
                  {addon.linkLabel}
                </Link>
              )}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10 flex flex-col items-center gap-3 text-center">
        <p className="inline-flex items-center gap-2.5 text-lg font-extrabold text-primary">
          <IconShield className="h-6 w-6" />
          {p.trust}
        </p>
        <p className="text-[15px] text-ink/60">
          {p.hookPre}{' '}
          <Link to="/contact" className="font-bold text-primary-2 underline underline-offset-4 transition hover:text-primary">
            {p.hookLink}
          </Link>
        </p>
      </Reveal>
    </Section>
  )
}
