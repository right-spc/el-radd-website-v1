import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext.jsx'
import Section from '../components/landing/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import WhatsAppCta from '../components/WhatsAppCta.jsx'
import { Accordion } from '../components/landing/Faq.jsx'
import { IconArrow, IconCheck } from '../components/Icons.jsx'

export default function Website() {
  const { t } = useLang()
  const w = t.websitePage

  return (
    <>
      <section id="hero" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 end-[-10%] h-[420px] w-[420px] rounded-full bg-primary-2/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-4 pb-14 pt-14 text-center md:pt-20">
          <Reveal>
            <h1 className="text-4xl font-extrabold leading-[1.2] text-primary md:text-5xl">{w.h1}</h1>
            <p className="mt-5 text-xl font-extrabold text-ink md:text-2xl">{w.sub1}</p>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink/75">{w.sub2}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <WhatsAppCta label={w.ctaWhatsapp} />
              <span className="text-sm font-bold text-ink/60">{w.ctaBot}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <Section className="bg-white/60 pt-0 md:pt-0">
        <Reveal className="mx-auto max-w-xl overflow-hidden rounded-card border border-ink/10 bg-white shadow-soft">
          {w.stack.map((row, i) => (
            <div
              key={i}
              className={`flex items-center justify-between gap-4 px-6 py-5 ${
                i < w.stack.length - 1 ? 'border-b border-ink/10' : 'bg-primary-soft/60'
              }`}
            >
              <div>
                <p className="font-extrabold text-ink">{row.label}</p>
                {row.note && <p className="mt-0.5 text-sm text-ink/55">{row.note}</p>}
              </div>
              <p className={`shrink-0 font-extrabold ${i === w.stack.length - 1 ? 'text-xl text-primary' : 'text-lg text-ink'}`}>
                {row.value}
              </p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section className="pt-0 md:pt-0">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{w.featuresHeader}</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {w.features.map((f, i) => (
            <Reveal key={i} delay={i * 70} className="rounded-card border border-ink/10 bg-white p-6 shadow-soft">
              <h3 className="flex items-start gap-2.5 text-lg font-extrabold text-ink">
                <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary-2" />
                {f.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink/70">{f.body}</p>
              {f.coBrand && (
                <p className="mt-3 text-sm font-bold text-ink/55">
                  {f.coBrandPre}{' '}
                  <a
                    href="https://qubix.agency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-2 underline underline-offset-4 transition hover:text-primary"
                  >
                    {f.coBrand}
                  </a>
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-white/60">
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

      <Section>
        <Reveal className="mx-auto max-w-2xl rounded-card border-2 border-primary/25 bg-white p-7 shadow-soft md:p-8">
          <h2 className="text-2xl font-extrabold text-primary">{w.termsHeader}</h2>
          <ul className="mt-5 space-y-4">
            {w.terms.map((term, i) => (
              <li key={i} className="flex items-start gap-3 leading-relaxed text-ink/80">
                <IconCheck className="mt-1 h-5 w-5 shrink-0 text-primary-2" />
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section className="bg-white/60">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{w.faqHeader}</h2>
        </Reveal>
        <Reveal className="mx-auto mt-8 max-w-3xl">
          <Accordion items={w.faq} defaultOpen={-1} />
        </Reveal>
      </Section>

      <div className="px-4 pb-16">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-[24px] bg-gradient-to-l from-primary to-primary-2 px-6 py-12 text-center text-white shadow-soft">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <WhatsAppCta label={w.ctaWhatsapp} />
            <span className="text-sm font-bold text-white/85">{w.ctaBot}</span>
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
