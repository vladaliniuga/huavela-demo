import { useRef } from 'react';
import Icon from '@/components/ui/Icon';
import { cn, FOCUS } from '../../theme';
import { SUGGESTED_PROMPTS } from './demoReplies';
import useDemoChat from './useDemoChat';
import Composer from './Composer';
import Transcript from './Transcript';

export default function TravelExpert({ isActive, onNavigate }) {
  const chat = useDemoChat();
  const inputRef = useRef(null);

  function newChat() {
    chat.reset();
    inputRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mist text-ocean">
            <Icon name="sparkles" className="size-5" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-ink">
              Your next adventure starts here.
            </h2>
            <p className="mt-0.5 text-xs leading-5 text-muted">
              Plan, discover, and explore your trip in one place.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {chat.messages.length > 0 && (
            <button
              type="button"
              onClick={newChat}
              className={cn(
                'min-h-10 rounded-full px-3 text-xs font-semibold text-ink hover:bg-mist',
                FOCUS,
              )}
            >
              New chat
            </button>
          )}
        </div>
      </div>

      <Transcript
        messages={chat.messages}
        pending={chat.pending}
        isActive={isActive}
        onNavigate={onNavigate}
      />

      <Composer
        draft={chat.draft}
        onDraftChange={chat.setDraft}
        onSend={chat.send}
        pending={chat.pending}
        inputRef={inputRef}
      />

      {!chat.messages.length && (
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => chat.send(prompt)}
              className={cn(
                'min-h-10 rounded-full border border-line px-3 py-2 text-left text-xs text-muted transition hover:border-ocean/50 hover:bg-mist hover:text-ink',
                FOCUS,
              )}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
