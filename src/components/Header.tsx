import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isArabic = i18n.language === 'ar';
  // Preserve the current path across the language switch ('/' <-> '/en...')
  const langTarget = isArabic
    ? pathname === '/'
      ? '/en'
      : `/en${pathname}`
    : pathname.replace(/^\/en/, '') || '/';

  const switchLanguage = () => {
    // Anchor to the section nearest the viewport top (either direction) with
    // the offset from its top — section heights differ slightly between
    // languages, so raw pixels would drift.
    const y = window.scrollY;
    let anchor: { id: string; offset: number } | null = null;
    let bestDistance = Number.POSITIVE_INFINITY;
    document.querySelectorAll('main section[id]').forEach((section) => {
      const top = section.getBoundingClientRect().top + y;
      const distance = Math.abs(top - y);
      if (distance < bestDistance) {
        bestDistance = distance;
        anchor = { id: section.id, offset: y - top };
      }
    });
    sessionStorage.setItem('lang-switch-scroll', JSON.stringify(anchor));
    // full page load, not client-side navigation
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <nav className="navbar" aria-label="Main">
        <div className="container navbar-inner">
          <Link className="brand" to={isArabic ? '/' : '/en'}>
            <span className="brand-dot" aria-hidden="true" />
            {t('nav.brand')}
          </Link>
          <ul className="nav-links">
            <li>
              <a href="#service">{t('nav.service')}</a>
            </li>
            <li>
              <Link to="/pricing">{t('nav.pricing')}</Link>
            </li>
            <li>
              <a href="#questions">{t('nav.questions')}</a>
            </li>
          </ul>
          <div className="nav-actions">
            <a
              className="lang-pill"
              href={langTarget}
              onClick={switchLanguage}
              aria-label="Switch language"
            >
              {t('nav.toggle')}
            </a>
            <a className="cta-small" href="#demo">
              {t('nav.cta')}
            </a>
            <button
              className="hamburger"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
        {open && (
          <div className="mobile-panel">
            <a href="#service" onClick={() => setOpen(false)}>
              {t('nav.service')}
            </a>
            <Link to="/pricing" onClick={() => setOpen(false)}>
              {t('nav.pricing')}
            </Link>
            <a href="#questions" onClick={() => setOpen(false)}>
              {t('nav.questions')}
            </a>
            <a
              className="panel-cta"
              href="#demo"
              onClick={() => setOpen(false)}
            >
              {t('nav.cta')}
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
