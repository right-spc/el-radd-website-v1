import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext.jsx'
import Logo from './Logo.jsx'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" aria-label="Elradd" className="inline-block">
              <Logo light />
            </Link>
            <p className="mt-4 text-lg font-bold text-highlight">{t.footer.tagline}</p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3" aria-label="Footer">
            {t.footer.links.map((item) => (
              <Link
                key={item.to + item.label}
                to={item.to}
                className="py-1.5 text-[15px] font-bold text-white/75 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/60">{t.footer.company}</div>
      </div>
    </footer>
  )
}
