import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLang } from '../i18n/LangContext.jsx'
import Section from '../components/landing/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { submitLead } from '../lead.js'
import { whatsAppLink } from '../config.js'
import { IconCheck, IconWhatsApp } from '../components/Icons.jsx'

// Egyptian mobile: 11 digits starting 01, optional +20/20 country code, spaces/dashes tolerated
const isEgyptianMobile = (value) => /^(?:\+?20)?01[0125]\d{8}$/.test(value.replace(/[\s-]/g, ''))

const inputCls =
  'min-h-[48px] w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[16px] text-ink transition placeholder:text-ink/40 focus:border-primary-2 focus:outline-none'

const errCls = 'mt-1 text-xs font-bold text-red-600'

function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-[1.5px] px-4 py-2 text-sm font-bold transition active:scale-[0.98] ${
        active
          ? 'border-primary bg-primary-soft text-primary'
          : 'border-ink/15 bg-white text-ink/75 hover:border-primary/40'
      }`}
    >
      {children}
    </button>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-extrabold text-ink">{label}</label>
      {children}
      {error && <p className={errCls}>{error}</p>}
    </div>
  )
}

export default function Signup() {
  const { t, lang } = useLang()
  const s = t.signupPage
  const [params] = useSearchParams()
  const planParam = params.get('plan')

  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [consents, setConsents] = useState({ step1Terms: false, marketing: false, terms: false, acknowledge: false, privacy: false })
  const [consentErr, setConsentErr] = useState(false)
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    email: '',
    preferredChannel: '',
    bestTime: '',
    businessName: '',
    industry: '',
    city: '',
    businessSize: '',
    hasWebsite: 'no',
    websiteUrl: '',
    currentChannels: [],
    plan: ['guard', 'agent', 'istiqbal'].includes(planParam) ? planParam : 'unsure',
    channelsWanted: [],
    questions: '',
  })

  const setField = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }))
  const toggleItem = (key, value) =>
    setFields((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }))

  const validateStep = (idx) => {
    const errs = {}
    if (idx === 0) {
      if (!fields.name.trim()) errs.name = s.contact.nameErr
      if (!isEgyptianMobile(fields.phone)) errs.phone = s.contact.phoneErr
      if (!fields.preferredChannel) errs.preferredChannel = s.contact.channelErr
      if (!consents.step1Terms || !consents.marketing) errs.s1Consent = s.consents.s1Err
    } else if (idx === 1) {
      if (!fields.businessName.trim()) errs.businessName = s.business.businessNameErr
      if (!fields.industry) errs.industry = s.business.industryErr
    } else if (idx === 2) {
      if (!fields.plan) errs.plan = s.request.planErr
      if (!fields.channelsWanted.length) errs.channelsWanted = s.request.channelsWantedErr
    }
    setErrors(errs)
    return !Object.keys(errs).length
  }

  const goNext = () => {
    if (!validateStep(step)) return
    setStep((v) => Math.min(v + 1, 2))
    window.scrollTo(0, 0)
  }
  const goBack = () => {
    setErrors({})
    setStep((v) => Math.max(v - 1, 0))
    window.scrollTo(0, 0)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validateStep(2)) return
    if (!(consents.terms && consents.acknowledge && consents.privacy)) {
      setConsentErr(true)
      return
    }
    setConsentErr(false)
    submitLead({
      source: 'onboarding',
      lang,
      ...fields,
      marketingConsent: consents.marketing,
      submittedAt: new Date().toISOString(),
    })
    // NOTE: nothing transmitted yet — submission destination pending (see src/lead.js)
    setSubmitted(true)
    window.scrollTo(0, 0)
  }

  const planLabel = s.request.plans[fields.plan]
  const waMessage = s.success.waTemplate
    .replace('{name}', fields.name)
    .replace('{business}', fields.businessName)
    .replace('{plan}', planLabel)

  const stepLabels = s.steps

  return (
    <>
      <Section className="pb-0 md:pb-0">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold leading-tight text-primary md:text-5xl">{s.h1}</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/75">{s.sub}</p>
        </Reveal>
      </Section>

      <Section className="pt-4 md:pt-6">
        <Reveal className="mx-auto max-w-xl rounded-card border border-ink/10 bg-white p-6 shadow-soft md:p-8">
          {submitted ? (
            <div className="py-8 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
                <IconCheck className="h-7 w-7" />
              </span>
              <h2 className="mt-5 text-2xl font-extrabold text-primary">{s.success.h2}</h2>
              <p className="mx-auto mt-4 max-w-sm text-[15px] font-semibold leading-relaxed text-ink/70">{s.success.body}</p>
              <a
                href={whatsAppLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-wa px-6 font-extrabold text-primary shadow-sm transition hover:brightness-95 active:scale-[0.98]"
              >
                <IconWhatsApp className="h-5 w-5" />
                {s.success.whatsapp}
              </a>
              <Link
                to="/#pricing"
                className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center font-bold text-primary-2 underline underline-offset-4 transition hover:text-primary"
              >
                {s.success.backToPricing}
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
              {/* progress */}
              <div className="flex items-center justify-center gap-2 pb-1">
                {stepLabels.map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold transition ${
                        i < step
                          ? 'bg-primary text-white'
                          : i === step
                            ? 'bg-primary-soft text-primary ring-2 ring-primary'
                            : 'bg-page text-ink/40'
                      }`}
                    >
                      {i < step ? <IconCheck className="h-4 w-4" /> : i + 1}
                    </span>
                    <span className={`hidden text-sm font-extrabold sm:inline ${i === step ? 'text-primary' : 'text-ink/40'}`}>
                      {label}
                    </span>
                    {i < stepLabels.length - 1 && <span className="h-0.5 w-5 rounded bg-ink/15" />}
                  </div>
                ))}
              </div>

              {step === 0 && (
                <>
                  <Field label={s.contact.name} error={errors.name}>
                    <input
                      id="su-name"
                      type="text"
                      value={fields.name}
                      onChange={setField('name')}
                      placeholder={s.contact.namePh}
                      className={`min-h-[48px] w-full rounded-xl border bg-white px-4 py-3 text-[16px] text-ink transition placeholder:text-ink/40 focus:outline-none ${
                        errors.name ? 'border-red-400' : 'border-ink/15 focus:border-primary-2'
                      }`}
                    />
                  </Field>
                  <Field label={s.contact.phone} error={errors.phone}>
                    <input
                      id="su-phone"
                      type="tel"
                      dir="ltr"
                      inputMode="numeric"
                      value={fields.phone}
                      onChange={setField('phone')}
                      placeholder={s.contact.phonePh}
                      className={`min-h-[48px] w-full rounded-xl border bg-white px-4 py-3 text-right text-[16px] text-ink transition placeholder:text-ink/40 focus:outline-none ${
                        errors.phone ? 'border-red-400' : 'border-ink/15 focus:border-primary-2'
                      }`}
                    />
                  </Field>
                  <Field label={s.contact.email}>
                    <input
                      id="su-email"
                      type="email"
                      dir="ltr"
                      value={fields.email}
                      onChange={setField('email')}
                      placeholder={s.contact.emailPh}
                      className={`${inputCls} text-right`}
                    />
                  </Field>
                  <Field label={s.contact.channel} error={errors.preferredChannel}>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(s.contact.channels).map(([key, label]) => (
                        <Pill key={key} active={fields.preferredChannel === key} onClick={() => setFields((f) => ({ ...f, preferredChannel: key }))}>
                          {label}
                        </Pill>
                      ))}
                    </div>
                  </Field>
                  <Field label={s.contact.bestTime}>
                    <input
                      id="su-best-time"
                      type="text"
                      value={fields.bestTime}
                      onChange={setField('bestTime')}
                      placeholder={s.contact.bestTimePh}
                      className={inputCls}
                    />
                  </Field>
                  <div className="mt-1 flex flex-col gap-2.5 border-t border-ink/10 pt-4">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={consents.step1Terms}
                        onChange={() => setConsents((c) => ({ ...c, step1Terms: !c.step1Terms }))}
                        className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
                      />
                      <span className="text-sm font-semibold leading-relaxed text-ink/80">
                        {s.consents.termsRead}{' '}
                        <Link to="/terms" target="_blank" rel="noopener noreferrer" className="font-extrabold text-primary-2 underline underline-offset-2 transition hover:text-primary">
                          {s.consents.agreeLink}
                        </Link>{' '}
                        {s.consents.andJoin}
                        <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="font-extrabold text-primary-2 underline underline-offset-2 transition hover:text-primary">
                          {s.consents.privacyLink}
                        </Link>
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={consents.marketing}
                        onChange={() => setConsents((c) => ({ ...c, marketing: !c.marketing }))}
                        className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
                      />
                      <span className="text-sm font-semibold leading-relaxed text-ink/80">{s.consents.marketing}</span>
                    </label>
                    {errors.s1Consent && <p className={errCls}>{errors.s1Consent}</p>}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <Field label={s.business.businessName} error={errors.businessName}>
                    <input
                      id="su-business"
                      type="text"
                      value={fields.businessName}
                      onChange={setField('businessName')}
                      placeholder={s.business.businessNamePh}
                      className={`min-h-[48px] w-full rounded-xl border bg-white px-4 py-3 text-[16px] text-ink transition placeholder:text-ink/40 focus:outline-none ${
                        errors.businessName ? 'border-red-400' : 'border-ink/15 focus:border-primary-2'
                      }`}
                    />
                  </Field>
                  <Field label={s.business.industry} error={errors.industry}>
                    <div className="flex flex-wrap gap-2">
                      {s.business.industries.map((label) => (
                        <Pill key={label} active={fields.industry === label} onClick={() => setFields((f) => ({ ...f, industry: label }))}>
                          {label}
                        </Pill>
                      ))}
                    </div>
                  </Field>
                  <Field label={s.business.city}>
                    <input
                      id="su-city"
                      type="text"
                      value={fields.city}
                      onChange={setField('city')}
                      placeholder={s.business.cityPh}
                      className={inputCls}
                    />
                  </Field>
                  <Field label={s.business.size}>
                    <div className="flex flex-wrap gap-2">
                      {s.business.sizes.map((label) => (
                        <Pill key={label} active={fields.businessSize === label} onClick={() => setFields((f) => ({ ...f, businessSize: label }))}>
                          {label}
                        </Pill>
                      ))}
                    </div>
                  </Field>
                  <Field label={s.business.hasWebsite}>
                    <div className="flex flex-wrap gap-2">
                      <Pill active={fields.hasWebsite === 'no'} onClick={() => setFields((f) => ({ ...f, hasWebsite: 'no', websiteUrl: '' }))}>
                        {s.business.websiteOptions.no}
                      </Pill>
                      <Pill active={fields.hasWebsite === 'yes'} onClick={() => setFields((f) => ({ ...f, hasWebsite: 'yes' }))}>
                        {s.business.websiteOptions.yes}
                      </Pill>
                    </div>
                  </Field>
                  {fields.hasWebsite === 'yes' && (
                    <Field label={s.business.websiteUrl}>
                      <input
                        id="su-url"
                        type="url"
                        dir="ltr"
                        value={fields.websiteUrl}
                        onChange={setField('websiteUrl')}
                        placeholder={s.business.websiteUrlPh}
                        className={`${inputCls} text-right`}
                      />
                    </Field>
                  )}
                  <Field label={s.business.currentChannels}>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(s.business.currentChannelsOptions).map(([key, label]) => (
                        <Pill key={key} active={fields.currentChannels.includes(key)} onClick={() => toggleItem('currentChannels', key)}>
                          {label}
                        </Pill>
                      ))}
                    </div>
                  </Field>
                </>
              )}

              {step === 2 && (
                <>
                  <Field label={s.request.plan} error={errors.plan}>
                    <div className="flex flex-col gap-2">
                      {Object.entries(s.request.plans).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setFields((f) => ({ ...f, plan: key }))}
                          className={`flex min-h-[48px] items-center gap-3 rounded-xl border-[1.5px] px-4 py-2.5 text-start text-[15px] font-bold transition ${
                            fields.plan === key
                              ? 'border-primary bg-primary-soft text-primary'
                              : 'border-ink/15 bg-white text-ink/75 hover:border-primary/40'
                          }`}
                        >
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${fields.plan === key ? 'border-primary bg-primary' : 'border-ink/25'}`}>
                            {fields.plan === key && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </span>
                          {label}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label={s.request.channelsWanted} error={errors.channelsWanted}>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(s.request.channelsWantedOptions).map(([key, label]) => (
                        <Pill key={key} active={fields.channelsWanted.includes(key)} onClick={() => toggleItem('channelsWanted', key)}>
                          {label}
                        </Pill>
                      ))}
                    </div>
                  </Field>
                  <Field label={s.request.questions}>
                    <textarea
                      id="su-questions"
                      value={fields.questions}
                      onChange={setField('questions')}
                      placeholder={s.request.questionsPh}
                      rows={3}
                      className="resize-y rounded-xl border border-ink/15 bg-white px-4 py-3 text-[16px] leading-relaxed text-ink transition placeholder:text-ink/40 focus:border-primary-2 focus:outline-none"
                    />
                  </Field>

                  {/* consents */}
                  <div className="mt-1 flex flex-col gap-2.5 border-t border-ink/10 pt-4">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" checked={consents.terms} onChange={() => setConsents((c) => ({ ...c, terms: !c.terms }))} className="mt-0.5 h-5 w-5 shrink-0 accent-primary" />
                      <span className="text-sm font-semibold leading-relaxed text-ink/80">
                        {s.consents.agree}{' '}
                        <Link to="/terms" target="_blank" rel="noopener noreferrer" className="font-extrabold text-primary-2 underline underline-offset-2 transition hover:text-primary">
                          {s.consents.agreeLink}
                        </Link>
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="checkbox" checked={consents.acknowledge} onChange={() => setConsents((c) => ({ ...c, acknowledge: !c.acknowledge }))} className="mt-0.5 h-5 w-5 shrink-0 accent-primary" />
                      <span className="text-sm font-semibold leading-relaxed text-ink/80">{s.consents.acknowledge}</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="checkbox" checked={consents.privacy} onChange={() => setConsents((c) => ({ ...c, privacy: !c.privacy }))} className="mt-0.5 h-5 w-5 shrink-0 accent-primary" />
                      <span className="text-sm font-semibold leading-relaxed text-ink/80">
                        {s.consents.privacyPre}{' '}
                        <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="font-extrabold text-primary-2 underline underline-offset-2 transition hover:text-primary">
                          {s.consents.privacyLink}
                        </Link>
                      </span>
                    </label>
                    {consentErr && <p className={errCls}>{s.consents.consentErr}</p>}
                  </div>
                </>
              )}

              {/* nav */}
              <div className={`flex gap-3 ${step === 0 ? 'justify-end' : 'justify-between'}`}>
                {step > 0 && (
                  <button type="button" onClick={goBack} className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-ink/15 bg-white px-6 font-extrabold text-ink/70 transition hover:bg-page">
                    {s.back}
                  </button>
                )}
                {step < 2 ? (
                  <button type="button" onClick={goNext} className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-primary px-8 text-lg font-extrabold text-white shadow-sm transition hover:bg-primary-2 active:scale-[0.98]">
                    {s.next}
                  </button>
                ) : (
                  <button type="submit" className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-white shadow-sm transition hover:bg-primary-2 active:scale-[0.98]">
                    {s.submit}
                  </button>
                )}
              </div>
            </form>
          )}
        </Reveal>
      </Section>
    </>
  )
}
