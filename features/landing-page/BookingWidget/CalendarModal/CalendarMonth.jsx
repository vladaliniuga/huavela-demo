import { useId, useMemo } from 'react';
import { cn, FOCUS } from '../../theme';
import {
  buildMonthCells,
  isInRange,
  monthLabel,
  WEEKDAY_LABELS,
} from '../calendarUtils';
import { formatDate } from '../dateTime';

export default function CalendarMonth({
  monthKey,
  minDate,
  today,
  draftDate,
  pickupDate,
  mode,
  startLabel = 'Pickup',
  endLabel = 'Return',
  onSelect,
}) {
  const headingId = useId();
  const cells = useMemo(() => {
    const days = buildMonthCells(monthKey);

    // Keep both months aligned and avoid height jumps while navigating.
    return [...days, ...Array(Math.max(0, 42 - days.length)).fill(null)];
  }, [monthKey]);

  return (
    <section aria-labelledby={headingId} className="min-w-0">
      <h3
        id={headingId}
        aria-live="polite"
        aria-atomic="true"
        className="mb-4 flex h-11 items-center justify-center px-12 text-sm font-semibold text-ink sm:text-base"
      >
        {monthLabel(monthKey)}
      </h3>

      <div className="mb-2 grid grid-cols-7 text-center text-[11px] font-medium text-muted">
        {WEEKDAY_LABELS.map((weekday) => (
          <span key={weekday} className="py-2">
            {weekday}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, index) => {
          if (!cell) {
            return (
              <span
                key={`empty-${index}`}
                aria-hidden="true"
                className="h-11 sm:h-12"
              />
            );
          }

          const date = cell.dateKey;
          const disabled = date < minDate;
          const selected = date === draftDate;
          const isPickup = mode === 'pickup' ? selected : date === pickupDate;
          const isReturn = mode === 'return' && selected;
          const endpoint = isPickup || isReturn;
          const inRange =
            mode === 'return' && isInRange(date, pickupDate, draftDate);
          const marker =
            isPickup && isReturn
              ? 'Both'
              : isPickup
                ? startLabel
                : isReturn
                  ? endLabel
                  : '';

          const accessibleLabel = [
            formatDate(date),
            isPickup && startLabel,
            isReturn && endLabel,
            disabled && 'Unavailable',
          ]
            .filter(Boolean)
            .join(', ');

          return (
            <button
              key={date}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              aria-label={accessibleLabel}
              aria-pressed={selected}
              aria-current={date === today ? 'date' : undefined}
              className={cn(
                'flex h-11 w-full min-w-0 flex-col items-center justify-center rounded-xl border border-transparent text-sm transition sm:h-12',
                endpoint
                  ? 'bg-ink font-semibold text-white'
                  : disabled
                    ? 'text-ink/25'
                    : inRange
                      ? 'bg-mist font-medium text-ink hover:bg-ocean/20'
                      : 'text-ink hover:border-ocean/30 hover:bg-mist',
                date === today &&
                  !endpoint &&
                  !disabled &&
                  'ring-1 ring-inset ring-ocean/45',
                FOCUS,
              )}
            >
              <span className="leading-5">{cell.day}</span>
              {marker && (
                <span className="max-w-full truncate px-0.5 text-[8px] font-semibold leading-3 sm:text-[9px]">
                  {marker}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
