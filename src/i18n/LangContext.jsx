import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { widget } from '../chat.js'
import ar from './ar.js'
import en from './en.js'

const LangContext = createContext(null)
const dicts = { ar, en }

// Owner decision 2026-11-13: Arabic-only while the EN version is not a focus.
// Flip to true to bring the AR/EN toggle back (language persistence resumes).
export const LANG_TOGGLE_VISIBLE = false

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (!LANG_TOGGLE_VISIBLE) return 'ar'
    try {
      return localStorage.getItem('elradd-lang') || 'ar'
    } catch {
      return 'ar'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try {
      localStorage.setItem('elradd-lang', lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  // Keep the Horus Desk chat widget in the site's language, on load and on
  // toggle. The widget script loads async (retry up to 20s) and its language
  // is gated by the org's enabled languages — until Arabic is enabled in the
  // HorusDesk dashboard this call resolves to English.
  useEffect(() => {
    let tries = 0
    const apply = () => {
      const hd = widget()
      if (hd && typeof hd.setLanguage === 'function') {
        hd.setLanguage(lang)
        return true
      }
      return false
    }
    if (apply()) return
    const iv = setInterval(() => {
      tries += 1
      if (apply() || tries >= 40) clearInterval(iv)
    }, 500)
    return () => clearInterval(iv)
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      isAr: lang === 'ar',
      t: dicts[lang],
      toggle: () => setLang((l) => (l === 'ar' ? 'en' : 'ar')),
    }),
    [lang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
