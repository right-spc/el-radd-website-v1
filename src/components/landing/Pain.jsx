import { useCallback, useEffect, useRef, useState } from 'react'
import { useLang } from '../../i18n/LangContext.jsx'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import Section from './Section.jsx'
import Reveal from '../Reveal.jsx'
import { ChatMessages } from '../ChatView.jsx'
import { IconClock } from '../Icons.jsx'

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
      <div className={`rounded-[26px] border-2 bg-white shadow-soft ${tones[tone]}`}>
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
      <figcaption className="mt-3 text-center text-[15px] font-bold text-ink/70">{caption}</figcaption>
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

  return (
    <Section className="bg-white/60">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{t.pain.header}</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink/80 md:text-xl">{t.pain.lead}</p>
      </Reveal>

      <Reveal className="mt-10">
        <div className="mx-auto max-w-3xl" ref={simAreaRef}>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <SimPhone
              label={t.pain.without.tab}
              tone="muted"
              script={t.pain.without.messages}
              playing={phase !== 'idle'}
              onDone={onPhoneDone}
              caption={t.pain.without.caption}
            />
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
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {t.pain.cards.map((card, i) => (
          <Reveal key={i} delay={i * 90} className="rounded-card border border-ink/10 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-extrabold text-ink">{card.title}</h3>
            <p className="mt-2 leading-relaxed text-ink/70">{card.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
