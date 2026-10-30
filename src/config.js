// OWNER: replace before deploy. If still placeholder, hide all WhatsApp CTAs.
export const WHATSAPP_NUMBER = '201002583190'

export const isWhatsAppConfigured = !/X/i.test(WHATSAPP_NUMBER)

export const whatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
