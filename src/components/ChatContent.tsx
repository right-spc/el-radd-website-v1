import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

// How long each message waits after the previous one: the customer takes
// their time, El Radd answers in seconds. First message shows shortly
// after load so the chat never looks broken on arrival.
const SCHEDULE_MS = [1200, 2000, 10000, 2000];

interface ChatMessage {
  key: string;
  cls: string;
}

const MESSAGES: ChatMessage[] = [
  { key: 'chat.in1', cls: 'bubble-in' },
  { key: 'chat.out1', cls: 'bubble-out' },
  { key: 'chat.in2', cls: 'bubble-in' },
  { key: 'chat.out2', cls: 'bubble-out' },
];

export default function ChatContent() {
  const { t } = useTranslation();
  const [shown, setShown] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(MESSAGES.length);
      return;
    }

    let at = 0;
    timers.current = SCHEDULE_MS.map((delay, index) => {
      at += delay;
      return window.setTimeout(() => setShown(index + 1), at);
    });

    return () => timers.current.forEach((id) => clearTimeout(id));
  }, []);

  const done = shown >= MESSAGES.length;
  // typing dots while the AI's reply is due, and forever after the last one
  const aiTyping = done || (shown > 0 && MESSAGES[shown].cls === 'bubble-out');

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
        {MESSAGES.map((message, index) => (
          <div
            className={`bubble ${message.cls}${index >= shown ? ' msg--pending' : ''}`}
            key={message.key}
          >
            {t(message.key)}
          </div>
        ))}
        <div className={`typing${aiTyping ? '' : ' msg--pending'}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </>
  );
}
