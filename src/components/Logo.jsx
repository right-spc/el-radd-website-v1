import { useLang } from '../i18n/LangContext.jsx'
import markDoor from '../assets/logo/mark-door.svg'
import mark from '../assets/logo/mark.svg'

export default function Logo({ light = false, small = false }) {
  const { t } = useLang()
  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src={small ? mark : markDoor}
        alt=""
        className={small ? 'h-6 w-auto' : 'h-[30px] w-auto'}
        width="26"
        height="30"
      />
      <span className={`text-2xl font-extrabold leading-none ${light ? 'text-white' : 'text-primary'}`}>
        {t.brand.wordmark}
      </span>
    </span>
  )
}
