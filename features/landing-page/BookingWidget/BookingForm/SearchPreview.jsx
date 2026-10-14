import { useId } from 'react';
import Icon from '@/components/ui/Icon';
import { cn, FOCUS } from '../../theme';

export default function SearchPreview({ preview, previewRef, onClose }) {
  const id = useId();

  if (!preview) return null;

  return (
    <section
      ref={previewRef}
      tabIndex={-1}
      aria-labelledby={id}
      className={cn(
        'animate-reveal rounded-2xl border border-ocean/25 bg-mist p-5',
        FOCUS,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            Demonstration only
          </p>

          <h3 id={id} className="mt-2 text-base font-semibold text-ink">
            {preview.title}
          </h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close search preview"
          className={cn(
            'grid size-10 shrink-0 place-items-center rounded-full hover:bg-white',
            FOCUS,
          )}
        >
          <Icon name="close" className="size-4" />
        </button>
      </div>

      <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {preview.details.map(([label, value]) => (
          <div key={label} className="min-w-0">
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="mt-1 break-words text-sm font-medium text-ink">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 border-t border-ocean/20 pt-4 text-xs leading-5 text-muted">
        These are your selections, not search results. No availability or prices
        have been checked, and no booking has been created.
      </p>
    </section>
  );
}
