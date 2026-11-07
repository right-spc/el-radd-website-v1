import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext.jsx'
import Logo from './Logo.jsx'

function FooterColumn({ label, links }) {
  return (
    <nav aria-label={label}>
      <p className="text-xs font-extrabold tracking-widest text-white/45">{label}</p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.to + link.label}>
            <Link
              to={link.to}
              className="text-[15px] font-bold text-white/75 transition hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  const { t } = useLang()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState(false)
  const n = t.footer.newsletter
  const submit = (e) => {
    e.preventDefault()
    // stub — same as the rest of the forms: validates locally, transmits nothing yet
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(true)
      return
    }
    setError(false)
    setSubscribed(true)
  }
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.6fr]">
          {/* brand */}
          <div>
            <Link to="/" aria-label="Elradd" className="inline-block">
              <Logo light />
            </Link>
            <p className="mt-4 text-lg font-extrabold text-highlight">{t.footer.tagline}</p>
            <p className="mt-2 text-sm font-bold text-white/60">{t.footer.serviceLine}</p>
          </div>

          {/* explore */}
          <FooterColumn label={t.footer.exploreLabel} links={t.footer.explore} />

          {/* legal */}
          <FooterColumn label={t.footer.legalLabel} links={t.footer.legal} />

          {/* newsletter */}
          <div className="rounded-card border border-white/10 bg-white/5 p-5 md:p-6">
            <h3 className="text-lg font-extrabold text-white">{n.header}</h3>
            <p className="mt-1 text-sm text-white/70">{n.sub}</p>
            <form onSubmit={submit} noValidate className="mt-4 flex flex-col gap-3">
              <input
                type="email"
                dir="ltr"
                aria-label={n.cta}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError(false)
                  setSubscribed(false)
                }}
                placeholder={n.placeholder}
                className={`h-11 w-full rounded-full border bg-white/10 px-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-highlight ${error ? 'border-highlight' : 'border-white/20'}`}
              />
              <button
                type="submit"
                className={`h-11 w-full rounded-full text-sm font-extrabold text-ink transition ${subscribed ? 'bg-white' : 'bg-highlight hover:opacity-90'}`}
              >
                {subscribed ? n.done : n.cta}
              </button>
            </form>
            {error && <p className="mt-2 text-xs font-bold text-highlight">{n.error}</p>}
            <p className="mt-3 text-xs text-white/40">
              {n.consentPre}
              <Link to="/privacy" className="underline underline-offset-2 transition hover:text-white/70">
                {n.consentLink}
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-sm text-white/60">
          <span>{t.footer.copyright}</span>
        </div>
      </div>
    </footer>
  )
}
