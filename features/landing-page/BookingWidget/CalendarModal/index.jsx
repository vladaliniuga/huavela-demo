import { useId, useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
import { cn, FOCUS, PRIMARY_BUTTON, SECONDARY_BUTTON } from '../../theme';
import { monthStartKey, shiftMonth } from '../calendarUtils';
import {
  formatDate,
  formatTime,
  getToday,
  HAWAII_TIME_ZONE,
  isDateKey,
  isTime,
  latestDate,
} from '../dateTime';
import CalendarMonth from './CalendarMonth';
import useCalendarDialog from './useCalendarDialog';

function CalendarContent({
  mode,
  value,
  pickupDate,
  minDate,
  locationLabel,
  timeValue,
  startLabel = 'Pickup',
  endLabel = 'Return',
  caption,
  helpText,
  timeZone = HAWAII_TIME_ZONE,
  onClose,
  onConfirm,
}) {
  const id = useId();
  const { dialogRef, titleRef } = useCalendarDialog();
  const backdropPointerDown = useRef(false);
  const today = getToday(timeZone);
  const minimumDate = latestDate(
    today,
    minDate,
    mode === 'return' ? pickupDate : '',
  );
  const initialDate =
    isDateKey(value) && value >= minimumDate ? value : minimumDate;
  const [draftDate, setDraftDate] = useState(initialDate);
  const [visibleMonth, setVisibleMonth] = useState(monthStartKey(initialDate));

  const isReturn = mode === 'return';
  const activeLabel = isReturn ? endLabel : startLabel;
  const title = `${activeLabel} date`;
  const confirmLabel = `Confirm ${activeLabel.toLowerCase()} date`;
  const minimumMonth = monthStartKey(minimumDate);
  const canGoPrev = visibleMonth > minimumMonth;
  const canConfirm = isDateKey(draftDate) && draftDate >= minimumDate;
  const calendarCaption =
    caption ??
    (locationLabel && locationLabel !== '—'
      ? `${locationLabel} · Hawaii time (HST)`
      : 'Hawaii time (HST)');
  const summary = [
    formatDate(draftDate),
    isTime(timeValue) ? `${formatTime(timeValue)} HST` : '',
  ]
    .filter(Boolean)
    .join(' · ');
  const helperText =
    helpText ??
    (isReturn
      ? 'The highlighted dates show your rental. Choose the time using the dropdown on the page. Your date is applied only after confirmation.'
      : 'Choose the time using the dropdown on the page. Your date is applied only after confirmation.');
  const navigationClass = cn(
    'pointer-events-auto grid size-11 place-items-center rounded-full border border-line bg-white text-ink transition',
    'enabled:hover:border-ocean/50 enabled:hover:bg-mist disabled:opacity-30',
    FOCUS,
  );
  const monthProps = {
    minDate: minimumDate,
    today,
    draftDate,
    pickupDate,
    mode,
    startLabel,
    endLabel,
    onSelect: setDraftDate,
  };

  function isBackdrop(event) {
    if (event.target !== event.currentTarget) return false;
    const bounds = event.currentTarget.getBoundingClientRect();

    return (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    );
  }

  function confirmDate() {
    // Recheck the current day in case the dialog was left open overnight.
    const currentMinimum = latestDate(minimumDate, getToday(timeZone));
    if (!isDateKey(draftDate) || draftDate < currentMinimum) {
      setDraftDate(currentMinimum);
      setVisibleMonth(monthStartKey(currentMinimum));
      return;
    }

    onConfirm(draftDate);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-caption ${id}-help`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={(event) => {
        backdropPointerDown.current = isBackdrop(event);
      }}
      onClick={(event) => {
        if (backdropPointerDown.current && isBackdrop(event)) onClose();
        backdropPointerDown.current = false;
      }}
      className={cn(
        'fixed inset-0 m-auto w-[calc(100%_-_1.5rem)] max-w-[960px]',
        'max-h-[calc(100dvh_-_1.5rem)] overflow-hidden rounded-3xl border border-line bg-white p-0 text-ink shadow-2xl',
        'open:flex open:flex-col backdrop:bg-ink/50 backdrop:backdrop-blur-[2px]',
        'sm:w-[calc(100%_-_3rem)] sm:max-h-[calc(100dvh_-_3rem)]',
      )}
    >
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-line bg-white px-4 py-3 sm:px-6 sm:py-4">
        <h2
          ref={titleRef}
          id={`${id}-title`}
          tabIndex={-1}
          className="text-base font-semibold text-ink outline-none"
        >
          {title}
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close calendar"
          className={cn(
            'grid size-10 shrink-0 place-items-center rounded-full border border-line text-ink transition hover:bg-mist',
            FOCUS,
          )}
        >
          <Icon name="close" className="size-4" />
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:py-6">
        <p id={`${id}-caption`} className="mb-4 text-xs leading-5 text-muted">
          {calendarCaption}
        </p>

        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between">
            <button
              type="button"
              disabled={!canGoPrev}
              aria-label="Previous month"
              onClick={() => {
                if (canGoPrev) setVisibleMonth(shiftMonth(visibleMonth, -1));
              }}
              className={navigationClass}
            >
              <Icon name="chevron-left" className="size-4" />
            </button>

            <button
              type="button"
              aria-label="Next month"
              onClick={() => setVisibleMonth(shiftMonth(visibleMonth, 1))}
              className={navigationClass}
            >
              <Icon name="chevron-right" className="size-4" />
            </button>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
            <CalendarMonth {...monthProps} monthKey={visibleMonth} />
            <div className="hidden min-w-0 md:block">
              <CalendarMonth
                {...monthProps}
                monthKey={shiftMonth(visibleMonth, 1)}
              />
            </div>
          </div>
        </div>

        <p id={`${id}-help`} className="mt-5 text-xs leading-6 text-muted">
          {helperText}
        </p>
      </div>

      <footer className="shrink-0 border-t border-line bg-white px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-xs leading-5 text-muted"
          >
            {summary}
          </p>

          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className={SECONDARY_BUTTON}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!canConfirm}
              onClick={confirmDate}
              className={cn(
                PRIMARY_BUTTON,
                'min-w-0 flex-1 px-4 sm:flex-none sm:px-6',
              )}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </footer>
    </dialog>
  );
}

export default function CalendarModal({ open, ...props }) {
  // Remount on opening so Cancel never saves an unconfirmed selection.
  if (!open) return null;

  return <CalendarContent key={props.mode} {...props} />;
}
