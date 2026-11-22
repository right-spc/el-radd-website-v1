// Lead pipeline — every intake path submits through here. The onboarding
// wizard (/signup) builds the full frozen schema; contact and the website-offer
// form map their fields into it; ردود is trained to collect the same fields.
//
// Success path: POST /api/send-lead-email (Vercel function) → Telnyx email →
// moaaz@rightspc.com. Failure path (final submissions only): the details are
// auto-submitted through the chat widget (ردود runs on a separate system) —
// see sendViaRaddod(). The wizard's step-0 partial email fails silently.
//
// payload shape (source of truth — keep in sync with the wizard and ردود):
// {
//   source: 'onboarding' | 'website-offer' | 'contact' | 'raddod-chat',
//   lang: 'ar' | 'en',
//   name, phone, email?, preferredChannel, bestTime?,
//   businessName, industry, city?, businessSize?, hasWebsite?, websiteUrl?,
//   websiteOfferInterest?,
//   currentChannels: [], plan, channelsWanted: [], questions?,
//   message? (contact form),
//   privacyAccepted, marketingConsent?,
//   submittedAt,
// }

const LEAD_ENDPOINT = '/api/send-lead-email'
const NEWSLETTER_ENDPOINT = '/api/send-newsletter-email'

async function postJson(url, body) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return { ok: res.ok, status: res.status }
  } catch {
    return { ok: false, status: 0 }
  }
}

export function submitLead(lead) {
  return postJson(LEAD_ENDPOINT, { stage: 'complete', lead })
}

// Wizard step-0 safety net — fire-and-forget; callers never await or surface it.
export function submitLeadPartial(lead) {
  return postJson(LEAD_ENDPOINT, { stage: 'partial', lead })
}

export function submitNewsletter(email, source) {
  return postJson(NEWSLETTER_ENDPOINT, { email, source })
}

// ---------------------------------------------------------------------------
// Chat fallback — on submission failure the details are auto-sent through the
// chat widget (ردود, separate system). The first ask names the failed form so
// the inbox shows WHY the details arrived through chat.
// ---------------------------------------------------------------------------

const FALLBACK_FORM_NAMES = {
  ar: { onboarding: 'فورم التسجيل', 'website-offer': 'طلب الموقع', contact: 'فورم التواصل' },
  en: { onboarding: 'the signup form', 'website-offer': 'the website request form', contact: 'the contact form' },
}

const FALLBACK_FIELD_LABELS = {
  ar: {
    name: 'الاسم', phone: 'التليفون', email: 'الإيميل', preferredChannel: 'القناة المفضلة',
    businessName: 'النشاط', industry: 'النشاط', city: 'المحافظة', businessSize: 'الحجم',
    hasWebsite: 'عنده موقع', websiteUrl: 'الموقع', websiteOfferInterest: 'مهتم بعرض المواقع',
    currentChannels: 'قنوات حالية', plan: 'الخطة', channelsWanted: 'قنوات مطلوبة',
    questions: 'أسئلة', message: 'الرسالة',
  },
  en: {
    name: 'Name', phone: 'Phone', email: 'Email', preferredChannel: 'Preferred channel',
    businessName: 'Business', industry: 'Industry', city: 'City', businessSize: 'Size',
    hasWebsite: 'Has website', websiteUrl: 'Website', websiteOfferInterest: 'Website offer interest',
    currentChannels: 'Current channels', plan: 'Plan', channelsWanted: 'Wanted channels',
    questions: 'Questions', message: 'Message',
  },
}

// Compact one-line rendering of the lead, skipping empty fields. The visitor
// sees this as their own chat message, so enum tokens are translated to Arabic
// (EN language keeps tokens as-is — it's unreachable while AR-only).
const FALLBACK_VALUE_LABELS = {
  guard: 'الحارس',
  agent: 'الوكيل',
  istiqbal: 'موظف الاستقبال',
  unsure: 'غير محدد',
  whatsapp: 'واتساب',
  messenger: 'ماسنجر',
  facebook: 'فيسبوك',
  instagram: 'انستجرام',
  email: 'إيميل',
  website: 'الموقع',
  phone: 'تليفون',
  yes: 'أيوه',
  no: 'لا',
}

function translateToken(value) {
  return FALLBACK_VALUE_LABELS[String(value).trim()] || String(value).trim()
}

function buildCompactDetails(lead) {
  const lang = lead.lang === 'en' ? 'en' : 'ar'
  const labels = FALLBACK_FIELD_LABELS[lang]
  const tr = (v) => (lang === 'ar' ? translateToken(v) : v)
  const parts = []
  const push = (key, value) => {
    if (value === null || value === undefined) return
    const v = Array.isArray(value)
      ? value.map((item) => tr(String(item).trim())).filter(Boolean).join(' + ')
      : tr(String(value).trim())
    if (v) parts.push(`${labels[key]}: ${v}`)
  }
  push('name', lead.name)
  push('phone', lead.phone)
  push('email', lead.email)
  push('preferredChannel', lead.preferredChannel)
  push('businessName', lead.businessName)
  push('industry', lead.industry)
  push('city', lead.city)
  push('businessSize', lead.businessSize)
  push('hasWebsite', lead.hasWebsite && lead.hasWebsite !== '' ? lead.hasWebsite : null)
  push('websiteUrl', lead.websiteUrl)
  push('websiteOfferInterest', lead.websiteOfferInterest)
  push('currentChannels', lead.currentChannels)
  push('plan', lead.plan && lead.plan !== 'unsure' ? lead.plan : null)
  push('channelsWanted', lead.channelsWanted)
  push('questions', lead.questions)
  push('message', lead.message)
  // hard insurance against the widget's 500-char cap — the compact schema
  // normally lands ~350-400 chars
  return parts.join(' | ').slice(0, 480)
}

export function buildFallbackMessage(lead) {
  const lang = lead.lang === 'en' ? 'en' : 'ar'
  const formName = FALLBACK_FORM_NAMES[lang][lead.source] || FALLBACK_FORM_NAMES[lang].contact
  const notice =
    lang === 'ar'
      ? `${formName} فشل — دي بياناتي بدل منه:`
      : `${formName} failed — here are my details instead:`
  const details = buildCompactDetails(lead)
  const single = `${notice}\n${details}`
  // owner spec: over 400 chars → two asks fired together; the widget queues
  // the second and auto-sends it after ردود replies to the first
  if (single.length <= 400) return [single]
  return [notice, details]
}

// Tiered failure path for FINAL submissions. Returns:
//   'asked'   — details pushed through the widget (opened + sent)
//   'down'    — no widget available; UI must show the system-down notice
//               with an open-ردود button (openElradd())
export function sendViaRaddod(lead) {
  const messages = buildFallbackMessage(lead)
  try {
    const hd = typeof window !== 'undefined' && window.horusDesk
    const cw = typeof window !== 'undefined' && window.chatWidget
    const widgetApi = [hd, cw].find((c) => c && typeof c.ask === 'function')
    if (!widgetApi) return 'down'
    for (const msg of messages) widgetApi.ask(msg)
    return 'asked'
  } catch {
    return 'down'
  }
}
