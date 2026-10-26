import { useCallback, useEffect, useRef, useState } from 'react'
import { useLang } from '../../i18n/LangContext.jsx'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import Section from './Section.jsx'
import Reveal from '../Reveal.jsx'
import { ChatMessages } from '../ChatView.jsx'
import { IconClock, IconWhatsApp, IconMoon, IconUserExit } from '../Icons.jsx'

const cardIcons = { whatsapp: IconWhatsApp, moon: IconMoon, exit: IconUserExit }

function SimPhone({ label, tone, script, playing, onDone, caption }) {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)
  const doneRef = useRef(false)

  useEffect(() => {
    if (!playing) {
      setShown(0)
      setTyping(false)
      doneRef.current = false
      return
    }
    if (reduced) {
      setShown(script.length)
      if (!doneRef.current) {
        doneRef.current = true
        onDone()
      }
      return
    }
    let cancelled = false
    let timer
    const step = (i) => {
      if (cancelled) return
      if (i >= script.length) {
        if (!doneRef.current) {
          doneRef.current = true
          onDone()
        }
        return
      }
      const item = script[i]
      const isBot = item.from === 'bot'
      if (isBot) setTyping(true)
      const delay = item.status ? 1150 : isBot ? 950 : 800
      timer = setTimeout(() => {
        if (cancelled) return
        setTyping(false)
        setShown(i + 1)
        timer = setTimeout(() => step(i + 1), item.status ? 550 : 650)
      }, delay)
    }
    step(0)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [playing, reduced, script, onDone])

  const tones = {
    muted: 'border-ink/15 bg-ink/[0.03]',
    good: 'border-primary/25 bg-primary-soft/60',
  }

  return (
    <figure className="flex flex-col">
      <div className={`rounded-[26px] border-2 bg-white shadow-glow ${tones[tone]}`}>
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
          <span
            className={`rounded-full px-3.5 py-1 text-sm font-extrabold ${
              tone === 'good' ? 'bg-primary text-white' : 'bg-ink/10 text-ink/70'
            }`}
          >
            {label}
          </span>
          <IconClock className="h-5 w-5 text-ink/40" />
        </div>
        <ChatMessages items={script} shown={shown} typing={typing} className="h-[352px] p-4" />
      </div>
      <figcaption className="mt-3 text-center text-[15px] font-bold text-white/70">{caption}</figcaption>
    </figure>
  )
}

export default function Pain() {
  const { t } = useLang()
  const [phase, setPhase] = useState('idle')
  const doneCount = useRef(0)
  const simAreaRef = useRef(null)

  const onPhoneDone = useCallback(() => {
    doneCount.current += 1
    if (doneCount.current >= 2) setPhase('done')
  }, [])

  // Start the simulation automatically the first time it scrolls into view
  useEffect(() => {
    const el = simAreaRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setPhase('playing')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('playing')
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Loop: once both phones finish, hold 15s, then run it again
  useEffect(() => {
    if (phase !== 'done') return
    const timer = setTimeout(() => {
      doneCount.current = 0
      setPhase('idle')
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase('playing')))
    }, 15000)
    return () => clearTimeout(timer)
  }, [phase])

  // Mobile carousel: when a full story finishes, glide to the other phone —
  // until the visitor swipes or taps, then they drive
  const scrollRef = useRef(null)
  const userDrove = useRef(false)
  const cardIndex = useRef(0)
  const [activeCard, setActiveCard] = useState(0)

  const jumpTo = (i) => {
    userDrove.current = true
    const el = scrollRef.current
    const cards = el?.querySelectorAll('[data-card]')
    cards?.[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  useEffect(() => {
    if (phase !== 'done' || userDrove.current) return
    const el = scrollRef.current
    if (!el || window.innerWidth >= 768) return
    const next = cardIndex.current === 0 ? 1 : 0
    el.querySelectorAll('[data-card]')[next]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
    cardIndex.current = next
  }, [phase])

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const cards = [...el.querySelectorAll('[data-card]')]
    const center = el.getBoundingClientRect().left + el.clientWidth / 2
    const idx = cards.findIndex((c) => {
      const r = c.getBoundingClientRect()
      return center >= r.left && center < r.right
    })
    if (idx >= 0) setActiveCard(idx)
  }

  return (
    <Section className="relative overflow-hidden bg-night">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 start-0 select-none text-[7rem] font-extrabold leading-none text-white/[0.04] md:text-[11rem]"
      >
        {t.pain.ghostTime}
      </div>
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-white md:text-4xl">{t.pain.header}</h2>
        <p className="mt-4 text-lg leading-relaxed text-white/70 md:text-xl">{t.pain.lead}</p>
      </Reveal>

      <Reveal className="mt-10">
        <div className="mx-auto max-w-3xl" ref={simAreaRef}>
          <div
            ref={scrollRef}
            onScroll={onScroll}
            onTouchStart={() => (userDrove.current = true)}
            className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0"
          >
            <div data-card className="min-w-[86%] shrink-0 snap-center md:min-w-0">
              <SimPhone
                label={t.pain.without.tab}
                tone="muted"
                script={t.pain.without.messages}
                playing={phase !== 'idle'}
                onDone={onPhoneDone}
                caption={t.pain.without.caption}
              />
            </div>
            <div data-card className="min-w-[86%] shrink-0 snap-center md:min-w-0">
              <SimPhone
                label={t.pain.with.tab}
                tone="good"
                script={t.pain.with.messages}
                playing={phase !== 'idle'}
                onDone={onPhoneDone}
                caption={t.pain.with.caption}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2 md:hidden">
            {[0, 1].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={i === 0 ? t.pain.without.tab : t.pain.with.tab}
                aria-current={activeCard === i}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  activeCard === i ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {t.pain.cards.map((card, i) => {
          const Icon = cardIcons[card.icon]
          return (
            <Reveal
              key={i}
              delay={i * 90}
              className="flex items-center gap-4 rounded-card border border-white/10 bg-white/[0.05] p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-highlight/15 text-highlight">
                {Icon && <Icon className="h-6 w-6" />}
              </span>
              <h3 className="text-lg font-extrabold leading-snug text-white">{card.title}</h3>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
