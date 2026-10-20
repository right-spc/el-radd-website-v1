import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PlaceholderPageProps {
  titleKey: string;
}

export default function PlaceholderPage({ titleKey }: PlaceholderPageProps) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  // Mirror the current path across languages ('/pricing' <-> '/en/pricing').
  const langTarget =
    i18n.language === 'ar'
      ? pathname === '/'
        ? '/en'
        : `/en${pathname}`
      : pathname.replace(/^\/en/, '') || '/';

  return (
    <main className="placeholder-page">
      <span className="brand">
        <span className="brand-dot" aria-hidden="true" />
        {t('nav.brand')}
      </span>
      <h1>{t(titleKey)}</h1>
      <p className="placeholder-soon">{t('common.soon')}</p>
      <a
        className="lang-pill"
        href={langTarget}
        onClick={() =>
          sessionStorage.setItem('lang-switch-scroll', JSON.stringify(null))
        }
      >
        {t('nav.brand')}
      </a>
    </main>
  );
}
