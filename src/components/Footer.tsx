import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand">
              <span className="brand-dot" aria-hidden="true" />
              {t('nav.brand')}
            </span>
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>
          <ul className="footer-links">
            <li>
              <Link to="/pricing">{t('footer.pricing')}</Link>
            </li>
            <li>
              <Link to="/terms">{t('footer.terms')}</Link>
            </li>
            <li>
              <Link to="/privacy">{t('footer.privacy')}</Link>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">{t('footer.copyright')}</div>
      </div>
    </footer>
  );
}
