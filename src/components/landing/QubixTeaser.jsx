import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LangContext.jsx'
import Reveal from '../Reveal.jsx'

export default function QubixTeaser() {
  const { t } = useLang()
  return (
    <div className="px-4">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-2 rounded-card bg-gradient-to-l from-primary to-primary-2 p-6 text-center text-white shadow-soft md:flex-row md:justify-between md:text-start">
        <div>
          <p className="text-lg font-extrabold">{t.qubix.line1}</p>
          <p className="mt-1 text-[15px] font-bold text-white/85">{t.qubix.line2}</p>
        </div>
        <Link
          to="/website"
          className="mt-2 inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-white px-5 font-bold text-primary transition hover:bg-highlight active:scale-[0.98] md:mt-0"
        >
          {t.qubix.cta}
        </Link>
      </Reveal>
    </div>
  )
}
