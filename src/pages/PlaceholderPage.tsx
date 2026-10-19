import { useTranslation } from 'react-i18next';

interface PlaceholderPageProps {
  titleKey: string;
}

export default function PlaceholderPage({ titleKey }: PlaceholderPageProps) {
  const { t, i18n } = useTranslation();

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
        href={i18n.language === 'ar' ? '/' : '/en'}
        onClick={() =>
          sessionStorage.setItem('lang-switch-scroll', String(window.scrollY))
        }
      >
        {t('nav.brand')}
      </a>
    </main>
  );
}
