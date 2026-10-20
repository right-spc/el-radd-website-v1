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

// After a language switch (full page load), bring the reader back to the
// point they were at. Lazy sections grow the page after mount, so the
// position is re-applied while the document is still settling.
function ScrollRestore() {
  useEffect(() => {
    const saved = sessionStorage.getItem('lang-switch-scroll');
    if (saved === null) return;
    let anchor: { id: string; offset: number } | null = null;
    try {
      anchor = JSON.parse(saved);
    } catch {
      sessionStorage.removeItem('lang-switch-scroll');
      return;
    }
    if (!anchor || !anchor.id) {
      sessionStorage.removeItem('lang-switch-scroll');
      return;
    }
    const restore = () => {
      const el = document.getElementById(anchor.id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      // (x, y) form + inline override: html has scroll-behavior: smooth and
      // some engines reject the 'instant' enum value.
      const html = document.documentElement;
      const previous = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, top + anchor.offset);
      html.style.scrollBehavior = previous;
    };
    restore();
    // Lazy sections grow the page after mount and fonts swap in late, so the
    // position is re-applied while the document settles. The key is consumed
    // only by the last timer — StrictMode's double-mounted effect must still
    // find it on its second run.
    const timers = [200, 500, 1000, 1500, 2500].map((ms) =>
      window.setTimeout(restore, ms),
    );
    const done = window.setTimeout(
      () => sessionStorage.removeItem('lang-switch-scroll'),
      3000,
    );
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(done);
    };
  }, []);

  return null;
}

export default function App() {
  const location = useLocation();
  // Remount the route tree on language switch so every section renders
  // in the active language even if an i18n change event is missed.
  const lang = location.pathname.startsWith('/en') ? 'en' : 'ar';

  return (
    <>
      <LanguageSync />
      <ScrollRestore />
      <Routes key={lang}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PlaceholderPage titleKey="nav.pricing" />} />
        <Route path="/terms" element={<PlaceholderPage titleKey="footer.terms" />} />
        <Route path="/privacy" element={<PlaceholderPage titleKey="footer.privacy" />} />
        {/* English mirrors of every Arabic route */}
        <Route path="/en" element={<HomePage />} />
        <Route path="/en/pricing" element={<PlaceholderPage titleKey="nav.pricing" />} />
        <Route path="/en/terms" element={<PlaceholderPage titleKey="footer.terms" />} />
        <Route path="/en/privacy" element={<PlaceholderPage titleKey="footer.privacy" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
