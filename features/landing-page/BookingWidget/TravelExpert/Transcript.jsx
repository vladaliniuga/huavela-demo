import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/Icon';
import { cn, FOCUS } from '../../theme';
import ItineraryPreview from './ItineraryPreview';

export default function Transcript({
  messages,
  pending,
  isActive,
  onNavigate,
}) {
  const viewportRef = useRef(null);

  useEffect(() => {
    const element = viewportRef.current;

    if (!isActive || !element) return;

    // Scroll the conversation, not the entire landing page.
    element.scrollTo({
      top: element.scrollHeight,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  }, [messages, pending, isActive]);

  if (!messages.length) return null;

  return (
    <div
      ref={viewportRef}
      role="log"
      aria-label="Travel expert demonstration conversation"
      aria-live={isActive ? 'polite' : 'off'}
      aria-relevant="additions"
      tabIndex={0}
      className={cn(
        'max-h-[380px] space-y-5 overflow-y-auto overscroll-contain rounded-2xl border border-line/70 bg-soft/60 p-3 sm:p-5',
        FOCUS,
      )}
    >
      {messages.map((message) => {
        const isUser = message.role === 'user';

        return (
          <div
            key={message.id}
            className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
          >
            <div
              className={cn(
                'min-w-0 max-w-[94%] rounded-2xl px-4 py-3 sm:max-w-[85%]',
                isUser
                  ? 'bg-ink text-white'
                  : 'border border-line bg-white text-ink',
              )}
            >
              <p
                className={cn(
                  'mb-2 text-[10px] font-semibold uppercase tracking-[0.15em]',
                  isUser ? 'text-white/75' : 'text-muted',
                )}
              >
                {isUser ? 'You' : 'Travel expert · Scripted demo'}
              </p>

              <p className="whitespace-pre-wrap break-words text-sm leading-6">
                {message.text}
              </p>

              {message.itinerary && (
                <ItineraryPreview itinerary={message.itinerary} />
              )}

              {message.actions?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {message.actions.map((action) => (
                    <button
                      key={action.category}
                      type="button"
                      onClick={() => onNavigate(action.category)}
                      className={cn(
                        'inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-mist px-3 py-2 text-xs font-semibold text-ink transition hover:border-ocean/50',
                        FOCUS,
                      )}
                    >
                      {action.label}
                      <Icon name="arrow-up-right" className="size-3.5" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {pending && (
        <div className="flex items-center gap-2 text-xs text-muted">
          <Icon name="sparkles" className="size-4 animate-pulse text-ocean" />
          Preparing a demo reply…
        </div>
      )}
    </div>
  );
}
