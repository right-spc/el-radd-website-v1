import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext.jsx'
import Section from '../components/landing/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import termsAr from '../content/website-terms-ar.md?raw'
import termsEn from '../content/website-terms-en.md?raw'

// renders inline **bold** and *italic* exactly as written
function inline(text, keyBase) {
  const parts = []
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g
  let last = 0
  let m
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1]) parts.push(<strong key={`${keyBase}-b${k++}`} className="font-extrabold text-ink">{m[1]}</strong>)
    else parts.push(<em key={`${keyBase}-i${k++}`} className="font-bold text-primary-2">{m[2]}</em>)
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

// renders the terms markdown VERBATIM — no rewording, no summarizing
function MarkdownTerms({ md }) {
  const blocks = []
  let bullets = []
  const flushBullets = () => {
    if (bullets.length) {
      blocks.push({ type: 'ul', items: [...bullets] })
      bullets = []
    }
  }
  md.split('\n').forEach((raw, li) => {
    const line = raw.trim()
    if (!line) {
      flushBullets()
      return
    }
    if (line.startsWith('**تنويه') || line.startsWith('**Disclaimer')) {
      // draft-status note — kept in the source file, not rendered publicly
      return
    }
    if (line === '---') {
      flushBullets()
      blocks.push({ type: 'hr', key: `hr-${li}` })
      return
    }
    if (line.startsWith('### ')) {
      flushBullets()
      blocks.push({ type: 'h3', key: `h3-${li}`, text: line.slice(4) })
      return
    }
    if (line.startsWith('## ')) {
      flushBullets()
      blocks.push({ type: 'h2', key: `h2-${li}`, text: line.slice(3) })
      return
    }
    if (line.startsWith('# ')) {
      // document title — rendered in the page header above
      return
    }
    if (line.startsWith('- ')) {
      bullets.push(line.slice(2))
      return
    }
    flushBullets()
    blocks.push({ type: 'p', key: `p-${li}`, text: line })
  })
  flushBullets()

  return (
    <div className="flex flex-col">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h3':
            return (
              <h2 key={block.key} className="mt-12 flex items-center gap-3 text-2xl font-extrabold text-primary">
                <span className="h-6 w-1.5 rounded-full bg-primary-2" />
                {inline(block.text, `h3-${i}`)}
              </h2>
            )
          case 'h2':
            return (
              <p key={block.key} className="mt-8 text-lg font-extrabold text-primary-2">
                {inline(block.text, `h2-${i}`)}
              </p>
            )
          case 'hr':
            return <hr key={block.key} className="my-10 border-ink/10" />
          case 'ul':
            return (
              <ul key={`ul-${i}`} className="mt-4 flex flex-col gap-2.5 ps-5">
                {block.items.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-2.5 leading-relaxed text-ink/85">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-2" />
                    <span className="text-[15px]">{inline(item, `ul${i}-${ii}`)}</span>
                  </li>
                ))}
              </ul>
            )
          default:
            return (
              <p key={block.key} className="mt-4 leading-relaxed text-ink/85">
                {inline(block.text, `p-${i}`)}
              </p>
            )
        }
      })}
    </div>
  )
}

export default function WebsiteOfferTerms() {
  const { t, lang } = useLang()
  const terms = t.websiteOfferTerms
  const md = lang === 'en' ? termsEn : termsAr

  return (
    <>
      <section className="bg-night py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <span className="inline-flex rounded-full bg-highlight px-3 py-1 text-xs font-extrabold text-ink">
              {terms.partnership}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">{terms.title}</h1>
            <p className="mt-4 text-sm font-bold leading-relaxed text-white/60">{terms.publisher}</p>
            <p className="mt-1 text-sm font-bold leading-relaxed text-white/60">{terms.effective}</p>
          </Reveal>
        </div>
      </section>

      <Section className="min-h-[50vh]">
        <div className="mx-auto max-w-3xl">
          <MarkdownTerms md={md} />

          <Reveal className="mt-14 rounded-card border border-ink/10 bg-white p-6 shadow-soft">
            <p className="text-sm font-bold leading-relaxed text-ink/70">{terms.note}</p>
            <Link
              to="/website"
              className="mt-4 inline-flex min-h-[44px] items-center font-bold text-primary-2 underline underline-offset-4 transition hover:text-primary"
            >
              {terms.backToSite}
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
