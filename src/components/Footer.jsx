import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext.jsx'
import Logo from './Logo.jsx'
import WhatsAppCta from './WhatsAppCta.jsx'

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
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* brand */}
          <div>
            <Link to="/" aria-label="Elradd" className="inline-block">
              <Logo light />
            </Link>
            <p className="mt-4 text-lg font-extrabold text-highlight">{t.footer.tagline}</p>
            <p className="mt-1 text-sm font-bold leading-relaxed text-white/60">{t.footer.subTagline}</p>
            <div className="mt-6">
              <WhatsAppCta label={t.footer.whatsappCta} />
            </div>
          </div>

          {/* explore */}
          <FooterColumn label={t.footer.exploreLabel} links={t.footer.explore} />

          {/* legal */}
          <FooterColumn label={t.footer.legalLabel} links={t.footer.legal} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.company}</span>
        </div>
      </div>
    </footer>
  )
}
