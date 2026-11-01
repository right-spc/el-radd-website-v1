import { useLang } from '../i18n/LangContext.jsx'
import Section from '../components/landing/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import MarkdownTerms from '../components/MarkdownTerms.jsx'
import termsAr from '../content/terms-of-service-ar.md?raw'
import termsEn from '../content/terms-of-service-en.md?raw'

export default function Terms() {
  const { t, lang } = useLang()
  const p = t.termsPage
  const md = lang === 'en' ? termsEn : termsAr

  return (
    <>
      <section className="bg-night py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <h1 className="text-3xl font-extrabold text-white md:text-4xl">{p.title}</h1>
            <p className="mt-4 text-sm font-bold leading-relaxed text-white/60">{p.publisher}</p>
          </Reveal>
        </div>
      </section>

      <Section className="min-h-[50vh]">
        <div className="mx-auto max-w-3xl">
          <MarkdownTerms md={md} bigLevel={2} />
        </div>
      </Section>
    </>
  )
}
