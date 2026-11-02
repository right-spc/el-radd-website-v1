import { useLang } from '../i18n/LangContext.jsx'
import Section from '../components/landing/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import MarkdownTerms from '../components/MarkdownTerms.jsx'
import privacyAr from '../content/privacy-policy-ar.md?raw'
import privacyEn from '../content/privacy-policy-en.md?raw'

export default function Privacy() {
  const { t, lang } = useLang()
  const p = t.privacyPage
  const md = lang === 'en' ? privacyEn : privacyAr

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
