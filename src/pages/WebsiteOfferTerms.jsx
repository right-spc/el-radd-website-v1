import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext.jsx'
import Section from '../components/landing/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import MarkdownTerms from '../components/MarkdownTerms.jsx'
import termsAr from '../content/website-terms-ar.md?raw'
import termsEn from '../content/website-terms-en.md?raw'

export default function WebsiteOfferTerms() {
  const { t, lang } = useLang()
  const terms = t.websiteOfferTerms
  const md = lang === 'en' ? termsEn : termsAr

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
          <MarkdownTerms md={md} />

          <Reveal className="mt-14 rounded-card border border-ink/10 bg-white p-6 shadow-soft">
            <p className="text-sm font-bold leading-relaxed text-ink/70">{terms.note}</p>
            <p className="mt-3 text-sm font-bold leading-relaxed text-ink/70">
              <Link to="/terms" className="font-extrabold text-primary-2 underline underline-offset-2 transition hover:text-primary">
                {terms.termsLink}
              </Link>
            </p>
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
