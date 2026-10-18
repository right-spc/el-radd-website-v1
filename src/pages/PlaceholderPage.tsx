import { Link } from 'react-router-dom';
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
      <Link className="lang-pill" to={i18n.language === 'ar' ? '/' : '/en'}>
        {t('nav.brand')}
      </Link>
    </main>
  );
}
