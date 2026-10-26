import { useEffect, useRef, useState } from 'react'
import { useLang } from '../../i18n/LangContext.jsx'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import WhatsAppCta from '../WhatsAppCta.jsx'
import { ChatMessages } from '../ChatView.jsx'
import { openElradd, askElradd } from '../../chat.js'
import { IconMoon, IconReceipt, IconAudioLines, IconClock, IconBolt } from '../Icons.jsx'
import mark from '../../assets/logo/mark.svg'

const askIcons = { moon: IconMoon, receipt: IconReceipt, tone: IconAudioLines }
const badgeIcons = [IconClock, IconBolt, IconAudioLines]

function HeroChatCard() {
  const { t } = useLang()
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const [inView, setInView] = useState(true)
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)
  const messages = t.hero.chat

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (reduced) {
      setShown(messages.length)
      setTyping(false)
      return
    }
    if (!inView) return
    let cancelled = false
    let timer
    const step = (i) => {
      if (cancelled) return
      if (i >= messages.length) {
        timer = setTimeout(() => {
          if (cancelled) return
          setShown(0)
          setTyping(false)
          timer = setTimeout(() => step(0), 900)
        }, 2500)
        return
      }
      const msg = messages[i]
      if (msg.from === 'bot') {
        setTyping(true)
        timer = setTimeout(() => {
          if (cancelled) return
          setTyping(false)
          setShown(i + 1)
          timer = setTimeout(() => step(i + 1), 700)
        }, 950)
      } else {
        timer = setTimeout(() => {
          if (cancelled) return
          setShown(i + 1)
          timer = setTimeout(() => step(i + 1), 750)
        }, 800)
      }
    }
    step(shown >= messages.length ? 0 : shown)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [inView, reduced, messages])

  return (
    <div ref={ref} className="w-full max-w-md rounded-card border border-ink/10 bg-white shadow-soft">
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3.5">
        <span className="inline-flex items-center gap-2">
          <img src={mark} alt="" className="h-5 w-auto" width="18" height="21" />
          <span className="text-sm font-extrabold text-primary">{t.brand.wordmark}</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-ink/50">
            <span className="relative flex h-2 w-2">
              {!reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-75" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-wa" />
            </span>
            {t.hero.liveNow}
          </span>
        </span>
      </div>
      <ChatMessages items={messages} shown={shown} typing={typing} className="h-[320px] p-4" />
      <div className="border-t border-ink/10 p-3">
        <div className="grid grid-cols-3 gap-2">
          {t.hero.quickAsks.map((ask) => {
            const Icon = askIcons[ask.icon]
            return (
              <button
                key={ask.text}
                type="button"
                onClick={() => askElradd(ask.text)}
                className="inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-xl border border-primary/20 bg-primary-soft/50 px-2 py-2 text-center text-[12.5px] font-bold leading-tight text-primary transition hover:border-primary/45 hover:bg-primary-soft active:scale-[0.97]"
              >
                {Icon && <Icon className="h-4 w-4 shrink-0 text-primary-2" />}
                {ask.text}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const { t } = useLang()
  const h1 = t.hero.h1
  const lastSpace = h1.lastIndexOf(' ')
  const h1a = lastSpace > 0 ? h1.slice(0, lastSpace) : h1
  const h1b = lastSpace > 0 ? h1.slice(lastSpace + 1) : ''

  return (
    <section id="hero" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 end-[-10%] h-[480px] w-[480px] rounded-full bg-primary-2/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30%] start-[-12%] h-[420px] w-[420px] rounded-full bg-wa/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 md:pt-16 lg:grid-cols-2 lg:pb-24 lg:pt-20">
        <div>
          <h1 className="text-4xl font-extrabold leading-[1.2] text-primary md:text-5xl lg:text-[3.3rem]">
            {h1a}{' '}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 -z-10 h-4 rounded bg-highlight/70 md:h-5" aria-hidden="true" />
              {h1b}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80 md:text-xl">{t.hero.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openElradd}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-primary px-7 text-lg font-bold text-white shadow-soft transition hover:bg-primary-2 active:scale-[0.98]"
            >
              {t.hero.primary}
            </button>
            <WhatsAppCta label={t.hero.secondary} />
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {t.hero.badges.map((b, i) => {
              const BIcon = badgeIcons[i]
              return (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary-soft px-4 py-2 text-[13px] font-extrabold text-primary"
                >
                  {BIcon && <BIcon className="h-4 w-4 text-primary-2" />}
                  {b}
                </span>
              )
            })}
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <HeroChatCard />
        </div>
      </div>
    </section>
  )
}
