import { useId, useMemo } from 'react';
import { cn, FOCUS } from '../../theme';
import {
  buildMonthCells,
  isInRange,
  monthLabel,
  WEEKDAY_LABELS,
} from '../calendarUtils';
import { formatDate } from '../dateTime';
import styles from './CalendarModal.module.css';

export default function CalendarMonth({
  monthKey,
  minDate,
  today,
  draftDate,
  rangeStartDate = '',
  rangeStartLabel = '',
  selectedLabel = 'Selected',
  onSelect,
}) {
  const headingId = useId();

  const cells = useMemo(() => {
    const days = buildMonthCells(monthKey);

    // Keep the fixed six-row layout from the iPhone calendar fix.
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

      <div
        aria-hidden="true"
        className={cn(
          styles.weekdays,
          'mb-2 text-center text-[11px] font-medium text-muted',
        )}
      >
        {WEEKDAY_LABELS.map((weekday) => (
          <span key={weekday} className="py-2">
            {weekday}
          </span>
        ))}
      </div>

      <div className={styles.days}>
        {cells.map((cell, index) => {
          if (!cell) {
            return (
              <span
                key={`empty-${index}`}
                aria-hidden="true"
                className={styles.emptyDay}
              />
            );
          }

          const date = cell.dateKey;
          const disabled = date < minDate;
          const selected = date === draftDate;
          const isRangeStart =
            Boolean(rangeStartDate) && date === rangeStartDate;
          const endpoint = selected || isRangeStart;
          const inRange = isInRange(date, rangeStartDate, draftDate);
          const marker =
            isRangeStart && selected
              ? 'Both'
              : isRangeStart
                ? rangeStartLabel
                : selected
                  ? selectedLabel
                  : '';
          const accessibleLabel = [
            formatDate(date),
            isRangeStart && rangeStartLabel,
            selected && selectedLabel,
            disabled && 'Unavailable',
          ]
            .filter(Boolean)
            .join(', ');

          return (
            <button
              key={date}
              type="button"
              disabled={disabled}
              data-calendar-date={date}
              data-endpoint={endpoint ? 'true' : undefined}
              data-in-range={inRange ? 'true' : undefined}
              onClick={() => onSelect(date)}
              aria-label={accessibleLabel}
              aria-pressed={selected}
              aria-current={date === today ? 'date' : undefined}
              className={cn(
                styles.day,
                'flex flex-col items-center justify-center rounded-xl',
                'border border-transparent text-sm transition',
                endpoint ? 'font-semibold' : 'font-medium',
                'disabled:cursor-not-allowed',
                date === today &&
                  !endpoint &&
                  !disabled &&
                  'ring-1 ring-inset ring-ocean/45',
                FOCUS,
              )}
            >
              <span className="block leading-5">{cell.day}</span>
              {marker && (
                <span className="block text-[8px] font-semibold leading-3 sm:text-[9px]">
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
