import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LangContext.jsx'
import Reveal from '../Reveal.jsx'
import WhatsAppCta from '../WhatsAppCta.jsx'

export default function CtaBand() {
  const { t } = useLang()
  return (
    <div className="px-4 py-14 md:py-20">
      <Reveal className="mx-auto max-w-5xl rounded-[24px] bg-gradient-to-l from-primary to-primary-2 px-6 py-14 text-center text-white shadow-soft md:py-16">
        <h2 className="text-3xl font-extrabold md:text-4xl">{t.ctaBand.heading}</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/#demo"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-7 text-lg font-bold text-primary shadow-sm transition hover:bg-highlight active:scale-[0.98]"
          >
            {t.ctaBand.primary}
          </Link>
          <WhatsAppCta label={t.ctaBand.secondary} />
        </div>
      </Reveal>
    </div>
  )
}
