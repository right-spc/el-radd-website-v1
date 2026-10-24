import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext.jsx'
import Section from '../components/landing/Section.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Terms() {
  const { t } = useLang()
  const p = t.termsPage
  return (
    <Section className="min-h-[55vh]">
      <Reveal className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-extrabold text-primary md:text-4xl">{p.h1}</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/80">{p.body}</p>
        <Link
          to="/contact"
          className="mt-8 inline-flex min-h-[44px] items-center font-bold text-primary-2 underline underline-offset-4 transition hover:text-primary"
        >
          {p.link}
        </Link>
      </Reveal>
    </Section>
  )
}
