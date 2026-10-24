import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { isWhatsAppConfigured, whatsAppLink } from '../config.js'
import { useLang } from '../i18n/LangContext.jsx'
import { IconWhatsApp } from './Icons.jsx'

export default function MobileBottomBar() {
  const { t } = useLang()
  const { pathname } = useLocation()
  const [pastHero, setPastHero] = useState(false)
  const [bubbleThere, setBubbleThere] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero')
      const limit = hero ? hero.offsetTop + hero.offsetHeight : 480
      setPastHero(window.scrollY > limit - 90)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // hide the bar if the external chat bubble mounts in the bottom corner
  useEffect(() => {
    const detect = () => {
      try {
        for (const node of Array.from(document.body.children)) {
          if (node.id === 'root' || node.nodeType !== 1) continue
          const cs = getComputedStyle(node)
          if (cs.position !== 'fixed' && cs.position !== 'absolute') continue
          const r = node.getBoundingClientRect()
          if (r.height > 0 && window.innerHeight - r.top < 220) {
            setBubbleThere(true)
            return
          }
        }
      } catch {
        /* detection is best-effort */
      }
    }
    const timer = setTimeout(detect, 2500)
    const obs = new MutationObserver(() => {
      setTimeout(detect, 300)
    })
    obs.observe(document.body, { childList: true })
    return () => {
      clearTimeout(timer)
      obs.disconnect()
    }
  }, [])

  if (!isWhatsAppConfigured) return null
  if (pathname === '/contact') return null
  if (!pastHero || bubbleThere) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-bar backdrop-blur md:hidden">
      <div className="flex gap-3">
        <Link
          to="/#demo"
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-primary font-bold text-white transition active:scale-[0.98]"
        >
          {t.bottomBar.try}
        </Link>
        <a
          href={whatsAppLink(t.contactPage.whatsappPrefill)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-wa font-bold text-primary transition active:scale-[0.98]"
        >
          <IconWhatsApp className="h-5 w-5" />
          {t.bottomBar.whatsapp}
        </a>
      </div>
    </div>
  )
}
