import { useTranslation } from 'react-i18next';

interface ChatContentProps {
  compact?: boolean;
}

export default function ChatContent({ compact = false }: ChatContentProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="chat-header">
        <span className="chat-avatar" aria-hidden="true">
          رد
        </span>
        <div>
          <div className="chat-header-name">{t('chat.header_name')}</div>
          <div className="chat-header-sub">{t('chat.header_sub')}</div>
        </div>
      </div>
      <div className="chat-body">
        <div className="bubble bubble-in">{t('chat.in1')}</div>
        <div className="bubble bubble-out">{t('chat.out1')}</div>
        {!compact && (
          <>
            <div className="bubble bubble-in">{t('chat.in2')}</div>
            <div className="bubble bubble-out">{t('chat.out2')}</div>
          </>
        )}
        <div className="typing" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </>
  );
}
