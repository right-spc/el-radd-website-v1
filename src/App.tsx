import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomePage from './pages/HomePage';
import PlaceholderPage from './pages/PlaceholderPage';

function LanguageSync() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const lang = location.pathname.startsWith('/en') ? 'en' : 'ar';
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang === 'ar' ? 'ar-EG' : 'en';
  }, [location.pathname, i18n]);

  return null;
}

export default function App() {
  return (
    <>
      <LanguageSync />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/en" element={<HomePage />} />
        <Route path="/pricing" element={<PlaceholderPage titleKey="nav.pricing" />} />
        <Route path="/terms" element={<PlaceholderPage titleKey="footer.terms" />} />
        <Route path="/privacy" element={<PlaceholderPage titleKey="footer.privacy" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
