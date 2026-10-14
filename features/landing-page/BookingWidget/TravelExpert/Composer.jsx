import { useEffect, useId } from 'react';
import Icon from '@/components/ui/Icon';
import { cn, FOCUS } from '../../theme';
import { MAX_MESSAGE_LENGTH } from './demoReplies';

export default function Composer({
  draft,
  onDraftChange,
  onSend,
  pending,
  inputRef,
}) {
  const id = useId();
  const canSend = Boolean(draft.trim()) && !pending;

  useEffect(() => {
    const element = inputRef.current;

    if (!element) return;

    element.style.height = 'auto';
    element.style.height = `${Math.min(
      Math.max(element.scrollHeight, 48),
      160,
    )}px`;
  }, [draft, inputRef]);

  function submit(event) {
    event.preventDefault();

    if (canSend) {
      onSend();
    }
  }

  function handleKeyDown(event) {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing &&
      event.keyCode !== 229
    ) {
      event.preventDefault();

      if (canSend) {
        onSend();
      }
    }
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor={id} className="sr-only">
        Ask the Huavela Travel expert
      </label>

      <div
        className={cn(
          'flex items-center gap-3 rounded-[2rem]  p-2',
          'border-2 border-ocean/60 bg-white shadow-sm',
          'transition hover:border-ocean/85',
          'focus-within:border-ocean',
          'focus-within:ring-4 focus-within:ring-ocean/15',
        )}
      >
        <textarea
          ref={inputRef}
          id={id}
          name="travelMessage"
          rows={1}
          value={draft}
          maxLength={MAX_MESSAGE_LENGTH}
          onChange={(event) => onDraftChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about your island escape…"
          aria-describedby={`${id}-help`}
          className={cn(
            'min-h-12 min-w-0 flex-1 resize-none',
            'cursor-text bg-transparent py-3 pl-3',
            'text-xs md:text-base leading-6 text-ink',
            'outline-none placeholder:text-muted',
          )}
        />

        <button
          type="submit"
          disabled={!canSend}
          aria-label={pending ? 'Preparing a demo reply' : 'Send message'}
          className={cn(
            'grid size-12 shrink-0 place-items-center',
            'rounded-full bg-ink text-white transition',
            'hover:bg-ink/90 disabled:opacity-40',
            FOCUS,
          )}
        >
          <Icon
            name={pending ? 'sparkles' : 'arrow-up'}
            className={cn('size-5', pending && 'animate-pulse')}
          />
        </button>
      </div>

      <p id={`${id}-help`} className="mt-2 text-[11px] leading-5 text-muted">
        Messages are not sent to an AI or booking service.
        <span className="ml-1 hidden sm:inline">
          Enter to send · Shift + Enter for a new line.
        </span>
      </p>
    </form>
  );
}
