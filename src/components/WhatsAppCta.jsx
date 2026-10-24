import { isWhatsAppConfigured, whatsAppLink } from '../config.js'
import { useLang } from '../i18n/LangContext.jsx'
import { IconWhatsApp } from './Icons.jsx'

export default function WhatsAppCta({ label, message, className = '' }) {
  const { t } = useLang()
  if (!isWhatsAppConfigured) return null
  const text = message || t.contactPage.whatsappPrefill
  return (
    <a
      href={whatsAppLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-wa px-6 font-bold text-primary shadow-sm transition hover:brightness-95 active:scale-[0.98] ${className}`}
    >
      <IconWhatsApp className="h-5 w-5" />
      {label}
    </a>
  )
}
