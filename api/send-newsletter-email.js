// Newsletter subscription notification — the footer signup chip only.
// Fail-silent by design per the owner: the footer always shows success to the
// visitor; delivery failures are logged here and never surface to the UI.

const TO_EMAIL = 'moaaz@rightspc.com';
const FROM_EMAIL = 'noreply@web.elradd.com';
const FROM_NAME = 'موقع الرد';

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
    const { email, source } = req.body || {};
    // honeypot: bots fill invisible fields — silently pretend success, send nothing
    if (String(req.body?._hp || '').trim()) {
      return res.status(200).json({ success: true, dropped: true });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
      return res.status(400).json({ error: 'A valid email is required' });
    }

    const apiKey = process.env.TELNYX_API_KEY;
    if (!apiKey) {
      console.error('TELNYX_API_KEY is not configured');
      return res.status(500).json({ error: 'Email service misconfigured' });
    }

    const html = `
      <div style="font-family: Cairo, system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #1c2b33; direction: rtl;">
        <h2 style="color: #0b4f43;">مشترك جديد في النشرة — موقع الرد</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; width: 150px;">الإيميل</td>
            <td style="padding: 8px 0;">${escapeHtml(String(email).trim())}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">التاريخ</td>
            <td style="padding: 8px 0;">${new Date().toISOString()}</td>
          </tr>
        </table>
        <p style="margin-top: 16px; color: #64748b; font-size: 14px;">
          المصدر: ${escapeHtml(source || 'فورم النشرة في فوتر موقع الرد')}.
        </p>
      </div>
    `;

    const telnyxRes = await fetch('https://api.telnyx.com/v2/email_messages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: { email: FROM_EMAIL, name: FROM_NAME },
        to: [{ email: TO_EMAIL }],
        reply_to: { email: String(email).trim() },
        subject: 'مشترك جديد في النشرة — موقع الرد',
        html_body: html,
      }),
    });

    if (!telnyxRes.ok) {
      const detail = await telnyxRes.text();
      console.error('Newsletter email send failed:', telnyxRes.status, detail);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    const data = await telnyxRes.json();
    return res.status(200).json({ success: true, id: data?.data?.id });
  } catch (err) {
    console.error('Newsletter email error:', err);
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
