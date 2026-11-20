import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext.jsx'
import Reveal from '../components/Reveal.jsx'
import { openElradd } from '../chat.js'

export default function NotFound() {
  const { t } = useLang()
  const p = t.notFoundPage

  return (
    <section className="bg-night py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <Reveal>
          <p className="text-7xl font-extrabold text-highlight md:text-8xl">{p.code}</p>
          <h1 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">{p.title}</h1>
          <p className="mt-4 text-sm font-bold leading-relaxed text-white/60">{p.sub}</p>
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-sm rounded-card border border-white/10 bg-white/5 p-4 text-start shadow-glow">
          <p className="text-xs font-extrabold text-highlight">{p.botName}</p>
          <p className="mt-1 text-sm leading-relaxed text-white/75">{p.bubble}</p>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-highlight px-7 text-[15px] font-extrabold text-ink transition hover:opacity-90 active:scale-[0.98]"
          >
            {p.homeCta}
          </Link>
          <button
            type="button"
            onClick={openElradd}
            className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/25 px-7 text-[15px] font-extrabold text-white transition hover:border-highlight hover:text-highlight"
          >
            {p.askCta}
          </button>
        </Reveal>
      </div>
    </section>
  )
}
