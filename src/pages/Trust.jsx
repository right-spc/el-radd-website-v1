import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext.jsx'
import Reveal from '../components/Reveal.jsx'
import { IconArrow } from '../components/Icons.jsx'

export default function Trust() {
  const { t } = useLang()
  const p = t.trustPage

  return (
    <>
      <section className="bg-night py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-extrabold text-highlight">
              {p.badge}
            </span>
            <h1 className="mt-5 text-3xl font-extrabold text-white md:text-4xl">{p.h1}</h1>
            <p className="mt-4 text-sm font-bold leading-relaxed text-white/60">{p.sub}</p>
            <p className="mt-3 text-xs font-bold text-white/40">{p.lawBadge}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-page py-14 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-extrabold text-primary md:text-3xl">{p.docsHeader}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {p.docs.map((d) => (
              <Reveal key={d.to} className="h-full">
                <Link
                  to={d.to}
                  className="group flex h-full flex-col rounded-card border border-ink/10 bg-white p-6 shadow-soft transition hover:-translate-y-1"
                >
                  <h3 className="text-lg font-extrabold text-primary">{d.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">{d.desc}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-extrabold text-primary-2">
                    <IconArrow className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-extrabold text-primary md:text-3xl">{p.channelsHeader}</h2>
          <p className="mt-2 text-sm text-ink/60">{p.channelsSub}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {p.channels.map((c) => (
              <a
                key={c.url}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 rounded-card border border-ink/10 bg-white p-5 shadow-soft transition hover:-translate-y-0.5"
              >
                <span className="font-extrabold text-ink">{c.title}</span>
                <span className="shrink-0 text-sm font-bold text-ink/35">↗</span>
              </a>
            ))}
          </div>

          <Reveal className="mt-14 rounded-card border border-primary/15 bg-primary-soft p-6 text-center">
            <p className="text-sm font-bold leading-relaxed text-ink/70">{p.contact}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
