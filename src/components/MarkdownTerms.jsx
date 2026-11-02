// renders terms markdown VERBATIM — no rewording, no summarizing.
// bigLevel: which markdown heading level gets the large section treatment
// (website-offer terms use `###` for articles; standard documents use `##`).

// renders inline **bold**, *italic*, and [text](url) links exactly as written
function inline(text, keyBase) {
  const parts = []
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\)/g
  let last = 0
  let m
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1]) parts.push(<strong key={`${keyBase}-b${k++}`} className="font-extrabold text-ink">{m[1]}</strong>)
    else if (m[3]) {
      parts.push(
        <a
          key={`${keyBase}-a${k++}`}
          href={m[4]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-extrabold text-primary-2 underline underline-offset-2 transition hover:text-primary"
        >
          {m[3]}
        </a>,
      )
    } else parts.push(<em key={`${keyBase}-i${k++}`} className="font-bold text-primary-2">{m[2]}</em>)
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

export default function MarkdownTerms({ md, bigLevel = 3 }) {
  const blocks = []
  let bullets = []
  let tableLines = []
  const flushBullets = () => {
    if (bullets.length) {
      blocks.push({ type: 'ul', items: [...bullets] })
      bullets = []
    }
  }
  // markdown table: consecutive `|` lines; the |---| separator row is syntax, not content
  const flushTable = () => {
    if (tableLines.length) {
      const rows = tableLines
        .filter((l) => !/^\|[\s:|-]+\|?$/.test(l.trim()))
        .map((l) =>
          l
            .trim()
            .replace(/^\|/, '')
            .replace(/\|$/, '')
            .split('|')
            .map((c) => c.trim()),
        )
      blocks.push({ type: 'table', rows })
      tableLines = []
    }
  }
  const flushAll = () => {
    flushTable()
    flushBullets()
  }
  md.split('\n').forEach((raw, li) => {
    const line = raw.trim()
    if (!line) {
      flushAll()
      return
    }
    if (line.startsWith('**تنويه') || line.startsWith('**Disclaimer')) {
      // draft-status note — kept in the source file, not rendered publicly
      return
    }
    if (line === '---') {
      flushAll()
      blocks.push({ type: 'hr', key: `hr-${li}` })
      return
    }
    if (line.startsWith('|')) {
      flushBullets()
      tableLines.push(line)
      return
    }
    if (line.startsWith('### ')) {
      flushAll()
      blocks.push({ type: 'h3', level: 3, key: `h3-${li}`, text: line.slice(4) })
      return
    }
    if (line.startsWith('## ')) {
      flushAll()
      blocks.push({ type: 'h2', level: 2, key: `h2-${li}`, text: line.slice(3) })
      return
    }
    if (line.startsWith('# ')) {
      // document title — rendered in the page header above
      return
    }
    if (line.startsWith('- ')) {
      flushTable()
      bullets.push(line.slice(2))
      return
    }
    flushAll()
    blocks.push({ type: 'p', key: `p-${li}`, text: line })
  })
  flushAll()

  const heading = (level) => (level === bigLevel ? 'big' : 'sub')

  return (
    <div className="flex flex-col">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h3':
          case 'h2':
            return heading(block.level) === 'big' ? (
              <h2 key={block.key} className="mt-12 flex items-center gap-3 text-2xl font-extrabold text-primary">
                <span className="h-6 w-1.5 rounded-full bg-primary-2" />
                {inline(block.text, `h-${i}`)}
              </h2>
            ) : (
              <p key={block.key} className="mt-8 text-lg font-extrabold text-primary-2">
                {inline(block.text, `h-${i}`)}
              </p>
            )
          case 'hr':
            return <hr key={block.key} className="my-10 border-ink/10" />
          case 'table':
            return (
              <div key={`tbl-${i}`} className="mt-6 overflow-x-auto rounded-xl border border-ink/10">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary-soft">
                      {block.rows[0].map((cell, ci) => (
                        <th key={ci} className="px-3.5 py-2.5 text-start text-[13px] font-extrabold text-primary">
                          {inline(cell, `th${i}-${ci}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.slice(1).map((row, ri) => (
                      <tr key={ri} className="border-t border-ink/10 align-top">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-3.5 py-2.5 leading-relaxed text-ink/85">
                            {inline(cell, `td${i}-${ri}-${ci}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
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
