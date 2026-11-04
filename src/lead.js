// Lead pipeline stub — the frozen schema every intake path submits.
// The onboarding wizard (/signup) builds this payload; ردود is trained to
// collect the same fields conversationally.
//
// NOTE: nothing is transmitted yet — the email destination is decided later.
// When the backend is built, replace the body of submitLead(); validation,
// the UI, and every caller stay untouched.
export function submitLead(payload) {
  // payload shape (source of truth — keep in sync with the wizard and ردود):
  // {
  //   source: 'onboarding' | 'website-offer' | 'contact' | 'raddod-chat',
  //   lang: 'ar' | 'en',
  //   name, phone, email?, preferredChannel, bestTime?,
  //   businessName, industry, city?, businessSize?, hasWebsite?, websiteUrl?,
  //   currentChannels: [],
//   plan, channelsWanted: [], volume?, notes, questions?,
//   marketingConsent,
//   submittedAt,
  // }
  return Promise.resolve({ ok: true })
}
