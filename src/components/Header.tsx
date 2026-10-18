import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WA_URL =
  'https://wa.me/201000000000?text=' +
  encodeURIComponent('أهلاً، عايز أعرف تفاصيل عرض التأسيس');

export default function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const isArabic = i18n.language === 'ar';
  const langTarget = isArabic ? '/en' : '/';

  return (
    <header className="site-header">
      <a className="founding-banner" href={WA_URL} target="_blank" rel="noreferrer">
        {t('banner.text')}
      </a>
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
            <Link className="lang-pill" to={langTarget} aria-label="Switch language">
              {t('nav.toggle')}
            </Link>
            <a className="cta-small" href={WA_URL} target="_blank" rel="noreferrer">
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
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
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
