import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext.jsx'
import Section from '../components/landing/Section.jsx'
import Reveal from '../components/Reveal.jsx'

export default function WebsiteOfferTerms() {
  const { t } = useLang()
  const terms = t.websiteOfferTerms

  return (
    <>
      <section className="bg-night py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <span className="inline-flex rounded-full bg-highlight px-3 py-1 text-xs font-extrabold text-ink">
              {terms.partnership}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">{terms.title}</h1>
            <p className="mt-4 text-sm font-bold leading-relaxed text-white/60">{terms.publisher}</p>
            <p className="mt-1 text-sm font-bold leading-relaxed text-white/60">{terms.effective}</p>
          </Reveal>
        </div>
      </section>

      <Section className="min-h-[50vh]">
        <div className="mx-auto max-w-3xl">
          {terms.groups.map((group, gi) => (
            <Reveal key={group.title} delay={Math.min(gi * 40, 160)} className={gi > 0 ? 'mt-10' : ''}>
              <h2 className="flex items-center gap-2.5 text-xl font-extrabold text-primary">
                {group.title}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.items.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-3 leading-relaxed text-ink/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-2" />
                    <span className="text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal className="mt-12 rounded-card border border-ink/10 bg-white p-6 shadow-soft">
            <p className="text-sm font-bold leading-relaxed text-ink/70">{terms.note}</p>
            <Link
              to="/website"
              className="mt-4 inline-flex min-h-[44px] items-center font-bold text-primary-2 underline underline-offset-4 transition hover:text-primary"
            >
              {terms.backToSite}
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
