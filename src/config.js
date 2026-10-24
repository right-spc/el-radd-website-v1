// OWNER: replace before deploy. If still placeholder, hide all WhatsApp CTAs.
export const WHATSAPP_NUMBER = '20XXXXXXXXXX'

export const isWhatsAppConfigured = !/X/i.test(WHATSAPP_NUMBER)

export const whatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
