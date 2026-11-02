import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MobileBottomBar from './components/MobileBottomBar.jsx'
import PreLaunchBanner from './components/PreLaunchBanner.jsx'
import Landing from './pages/Landing.jsx'
import Website from './pages/Website.jsx'
import WebsiteOfferTerms from './pages/WebsiteOfferTerms.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import { useLang } from './i18n/LangContext.jsx'

function ScrollAndSeo() {
  const { pathname, hash } = useLocation()
  const { t } = useLang()

  useEffect(() => {
    const key = pathname === '/' ? 'home' : pathname.replace(/^\//, '')
    const meta = t.meta[key] || t.meta.home
    document.title = meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', meta.desc)
  }, [pathname, t])

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = hash.slice(1)
    let attempts = 0
    let timer
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView()
      } else if (attempts < 12) {
        attempts += 1
        timer = setTimeout(tryScroll, 60)
      }
    }
    timer = setTimeout(tryScroll, 60)
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <ScrollAndSeo />
      <PreLaunchBanner />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/website" element={<Website />} />
          <Route path="/legal/website-2026-offer" element={<WebsiteOfferTerms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  )
}
