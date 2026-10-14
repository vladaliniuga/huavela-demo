import { useEffect, useRef, useState } from 'react';
import { getDemoReply, MAX_MESSAGE_LENGTH } from './demoReplies';

export default function useDemoChat() {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const timerRef = useRef(null);
  const pendingRef = useRef(false);
  const sequenceRef = useRef(0);

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, []);

  function send(raw = draft) {
    const text = String(raw || '')
      .trim()
      .slice(0, MAX_MESSAGE_LENGTH);

    if (!text || pendingRef.current) return false;

    pendingRef.current = true;
    const id = ++sequenceRef.current;

    setDraft('');
    setPending(true);
    setMessages((previous) => [
      ...previous,
      { id: `user-${id}`, role: 'user', text },
    ]);

    // A visual delay only. No request is made to an AI or booking service.
    timerRef.current = window.setTimeout(() => {
      const reply = getDemoReply(text);

      setMessages((previous) => [
        ...previous,
        { id: `expert-${id}`, role: 'assistant', ...reply },
      ]);
      pendingRef.current = false;
      timerRef.current = null;
      setPending(false);
    }, 650);

    return true;
  }

  function reset() {
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
    pendingRef.current = false;
    setDraft('');
    setMessages([]);
    setPending(false);
  }

  return {
    draft,
    messages,
    pending,
    setDraft,
    send,
    reset,
  };
}
