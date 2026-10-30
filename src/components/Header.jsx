import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LangContext.jsx'
import Logo from './Logo.jsx'
import { IconClose, IconMenu } from './Icons.jsx'
import { openElradd } from '../chat.js'

export default function Header() {
  const { t, toggle } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (to) => !to.includes('#') && location.pathname === to

  // NOTE: the overlay must be a sibling of <header>, not a child — the header's
  // backdrop-blur makes it a containing block, which would trap position:fixed.
  return (
    <>
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-white/95 shadow-soft backdrop-blur' : 'bg-page/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-3 px-4">
        <Link to="/" aria-label="Elradd" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {t.header.nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-full px-3.5 py-2.5 text-[15px] font-bold transition hover:bg-primary-soft hover:text-primary ${
                isActive(item.to) ? 'text-primary' : 'text-ink/75'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-ink/15 bg-white px-3 text-sm font-extrabold text-primary transition hover:bg-primary-soft"
          >
            {t.langToggle}
          </button>
          <button
            type="button"
            onClick={openElradd}
            className="hidden min-h-[44px] items-center justify-center rounded-full bg-primary px-5 font-bold text-white shadow-sm transition hover:bg-primary-2 active:scale-[0.98] sm:inline-flex"
          >
            {t.header.cta}
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.header.openMenu}
            aria-expanded={open}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-ink/15 bg-white text-primary transition hover:bg-primary-soft lg:hidden"
          >
            <IconMenu />
          </button>
        </div>
      </div>
    </header>

    {open && (
      <div className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden" role="dialog" aria-modal="true">
          <div className="flex h-[72px] items-center justify-between px-4">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.header.closeMenu}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-ink/15 text-primary transition hover:bg-primary-soft"
            >
              <IconClose />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6" aria-label="Mobile">
            {t.header.nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-card px-4 py-4 text-xl font-bold text-ink transition hover:bg-primary-soft hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={openElradd}
              className="mt-4 inline-flex min-h-[52px] items-center justify-center rounded-full bg-primary px-6 text-lg font-bold text-white shadow-sm transition hover:bg-primary-2"
            >
              {t.header.cta}
            </button>
          </nav>
      </div>
    )}
    </>
  )
}
