import { useLang } from '../i18n/LangContext.jsx'

// Pre-launch status banner shown above the header on every page.
// OWNER: set SHOW to false when the service fully launches.
const SHOW = true

export default function PreLaunchBanner() {
  const { t } = useLang()
  if (!SHOW) return null
  return (
    <div role="status" className="bg-red-700 px-4 py-2.5 text-center text-[13px] font-bold leading-relaxed text-white md:text-sm">
      {t.prelaunchBanner}
    </div>
  )
}
