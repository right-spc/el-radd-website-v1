// Lead intake endpoint — receives the frozen lead schema (see src/lead.js)
// and notifies moaaz@rightspc.com via the Telnyx email API.
//
// stage: 'partial' (wizard step-0 safety net) | 'complete' (final submission)
// source: 'onboarding' | 'website-offer' | 'contact'
//
// TELNYX_API_KEY comes from the Vercel environment (registered 2026-11-22).

const TO_EMAIL = 'moaaz@rightspc.com';
const FROM_EMAIL = 'noreply@web.elradd.com';
const FROM_NAME = 'موقع الرد';

const AR_LABELS = {
  source: { onboarding: 'فورم التسجيل', 'website-offer': 'طلب موقع', contact: 'فورم التواصل' },
  fields: {
    name: 'الاسم',
    phone: 'التليفون',
    email: 'الإيميل',
    preferredChannel: 'قناة التواصل المفضلة',
    bestTime: 'الوقت المناسب',
    businessName: 'اسم النشاط',
    industry: 'النشاط',
    city: 'المحافظة',
    businessSize: 'حجم النشاط',
    hasWebsite: 'عنده موقع',
    websiteUrl: 'الموقع',
    websiteOfferInterest: 'مهتم بعرض المواقع',
    currentChannels: 'قنوات حالية',
    plan: 'الخطة',
    channelsWanted: 'قنوات مطلوبة',
    questions: 'أسئلة',
    message: 'الرسالة',
  },
  values: {
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
  },
};

export function subjectFor(stage, lead) {
  const name = (lead.name || '').trim();
  if (stage === 'partial') return `عميل بدأ التسجيل وماكملش — ${name}`;
  if (lead.source === 'onboarding') return `عميل جديد أكمل التسجيل — ${(lead.businessName || name).trim()}`;
  if (lead.source === 'website-offer') return `طلب موقع جديد — ${name}`;
  if (lead.source === 'contact') return `رسالة تواصل جديدة — ${name}`;
  return `رسالة جديدة من موقع الرد — ${name}`;
}

function translate(value) {
  if (value === null || value === undefined) return '';
  const raw = String(value).trim();
  return AR_LABELS.values[raw] || raw;
}

function row(label, value) {
  const v = value === null || value === undefined ? '' : String(value).trim();
  if (!v) return '';
  return `<tr>
    <td style="padding: 8px 0; font-weight: 600; width: 150px;">${escapeHtml(label)}</td>
    <td style="padding: 8px 0;">${escapeHtml(v)}</td>
  </tr>`;
}

export function buildHtml(lead, stage) {
  const channels = (arr) => (Array.isArray(arr) ? arr.map(translate).filter(Boolean).join(' + ') : '');
  const sourceLabel = AR_LABELS.source[lead.source] || lead.source || 'غير معروف';

  const rows = [
    row(AR_LABELS.fields.name, lead.name),
    row(AR_LABELS.fields.phone, lead.phone),
    row(AR_LABELS.fields.email, lead.email),
    row(AR_LABELS.fields.preferredChannel, translate(lead.preferredChannel)),
    row(AR_LABELS.fields.bestTime, lead.bestTime),
    row(AR_LABELS.fields.businessName, lead.businessName),
    row(AR_LABELS.fields.industry, translate(lead.industry)),
    row(AR_LABELS.fields.city, lead.city),
    row(AR_LABELS.fields.businessSize, translate(lead.businessSize)),
    row(AR_LABELS.fields.hasWebsite, lead.hasWebsite ? translate(lead.hasWebsite) : ''),
    row(AR_LABELS.fields.websiteUrl, lead.websiteUrl),
    row(AR_LABELS.fields.websiteOfferInterest, lead.websiteOfferInterest),
    row(AR_LABELS.fields.currentChannels, channels(lead.currentChannels)),
    row(AR_LABELS.fields.plan, translate(lead.plan)),
    row(AR_LABELS.fields.channelsWanted, channels(lead.channelsWanted)),
    row(AR_LABELS.fields.questions, lead.questions),
    row(AR_LABELS.fields.message, lead.message),
  ].join('');

  const partialNote =
    stage === 'partial'
      ? `<p style="margin: 16px 0 0; padding: 12px; background: #fef3c7; border-radius: 8px; color: #1c2b33;">
          <strong>عميل بدأ التسجيل ولم يُكمل.</strong> دي بيانات الجزء الأول بس — ممكن يكمل بعد كده أو تتابعه بنفسك.
        </p>`
      : '';

  const consents = [
    lead.privacyAccepted ? 'وافق على الشروط وسياسة الخصوصية' : '',
    lead.marketingConsent ? 'وافق على التواصل التسويقي' : '',
  ]
    .filter(Boolean)
    .join(' · ');

  return `
    <div style="font-family: Cairo, system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #1c2b33; direction: rtl;">
      <h2 style="color: #0b4f43;">${escapeHtml(subjectFor(stage, lead))}</h2>
      <table style="width: 100%; border-collapse: collapse;">${rows}</table>
      ${partialNote}
      <div style="margin-top: 16px; padding: 12px; background: #e3efec; border-radius: 8px;">
        <p style="margin: 0; font-size: 14px;">
          <strong>المصدر:</strong> ${escapeHtml(sourceLabel)} — موقع الرد
        </p>
        ${consents ? `<p style="margin: 8px 0 0; font-size: 14px;"><strong>الموافقات:</strong> ${escapeHtml(consents)}</p>` : ''}
        <p style="margin: 8px 0 0; font-size: 14px; color: #64748b;">${escapeHtml(lead.submittedAt || new Date().toISOString())}</p>
      </div>
    </div>
  `;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { stage, lead } = req.body || {};
    // honeypot: bots fill invisible fields — silently pretend success, send nothing
    if (String(req.body?._hp || '').trim()) {
      return res.status(200).json({ success: true, dropped: true });
    }
    if (stage !== 'partial' && stage !== 'complete') {
      return res.status(400).json({ error: 'stage must be partial or complete' });
    }
    if (!lead || typeof lead !== 'object') {
      return res.status(400).json({ error: 'lead payload is required' });
    }
    if (!String(lead.name || '').trim() || !String(lead.phone || '').trim()) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }
    if (!lead.privacyAccepted) {
      return res.status(400).json({ error: 'Privacy consent is required' });
    }

    const apiKey = process.env.TELNYX_API_KEY;
    if (!apiKey) {
      console.error('TELNYX_API_KEY is not configured');
      return res.status(500).json({ error: 'Email service misconfigured' });
    }

    const telnyxRes = await fetch('https://api.telnyx.com/v2/email_messages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: { email: FROM_EMAIL, name: FROM_NAME },
        to: [{ email: TO_EMAIL }],
        ...(String(lead.email || '').trim() ? { reply_to: { email: String(lead.email).trim() } } : {}),
        subject: subjectFor(stage, lead),
        html_body: buildHtml(lead, stage),
      }),
    });

    if (!telnyxRes.ok) {
      const detail = await telnyxRes.text();
      console.error('Email send failed:', telnyxRes.status, detail);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    const data = await telnyxRes.json();
    return res.status(200).json({ success: true, id: data?.data?.id });
  } catch (err) {
    console.error('Lead email error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
