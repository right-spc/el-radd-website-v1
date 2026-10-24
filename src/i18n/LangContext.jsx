import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import ar from './ar.js'
import en from './en.js'

const LangContext = createContext(null)
const dicts = { ar, en }

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
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
