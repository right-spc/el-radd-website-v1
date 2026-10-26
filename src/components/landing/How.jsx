import { useLang } from '../../i18n/LangContext.jsx'
import Section from './Section.jsx'
import Reveal from '../Reveal.jsx'
import { IconBolt } from '../Icons.jsx'

export default function How() {
  const { t, lang } = useLang()
  const nf = new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US', { useGrouping: false })

  return (
    <Section id="how" className="bg-white/60">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{t.how.header}</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink/75 md:text-xl">{t.how.sub}</p>
      </Reveal>

      <Reveal className="relative mt-9">
        <div aria-hidden="true" className="absolute top-[26px] hidden w-full md:block">
          <div className="mx-[11%] border-t-2 border-dashed border-primary/25" />
        </div>
        <div className="relative grid gap-6 md:grid-cols-4 md:gap-3.5">
          {t.how.steps.map((step, i) => (
            <div key={i} className="flex w-full items-center gap-4 md:flex-col md:text-center">
              <span
                className={`inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-[5px] border-primary-soft text-xl font-extrabold text-white ${
                  step.ours ? 'bg-primary' : 'bg-primary-2'
                }`}
              >
                {nf.format(i + 1)}
              </span>
              <div className="flex flex-col items-start md:items-center">
                <h3 className="text-[17px] font-extrabold leading-snug text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm font-semibold leading-relaxed text-ink/65 md:max-w-[230px]">
                  {step.body}
                </p>
                <p className="mt-2 text-[11px] font-extrabold tracking-wide text-ink/45">{step.who}</p>
                <span
                  className={`mt-2.5 inline-flex items-center rounded-full border px-3 py-1 text-xs font-extrabold ${
                    step.ours
                      ? 'border-primary/20 bg-primary-soft text-primary'
                      : 'border-highlight/70 bg-highlight/35 text-primary'
                  }`}
                >
                  {step.chip}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-3.5 rounded-card border border-ink/10 bg-white px-6 py-4 text-center shadow-soft">
        <span className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-highlight text-primary">
          <IconBolt className="h-5 w-5" />
        </span>
        <p className="text-[17px] font-extrabold leading-relaxed text-primary">
          {t.how.promise.strong}{' '}
          <span className="text-sm font-bold text-ink/60">{t.how.promise.light}</span>
        </p>
      </Reveal>
    </Section>
  )
}
