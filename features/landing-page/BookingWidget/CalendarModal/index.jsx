import { useId, useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
import { cn, FOCUS, PRIMARY_BUTTON, SECONDARY_BUTTON } from '../../theme';
import { monthStartKey, shiftMonth } from '../calendarUtils';
import {
  formatDate,
  formatTime,
  getToday,
  isDateKey,
  isTime,
  latestDate,
} from '../dateTime';
import CalendarMonth from './CalendarMonth';
import useCalendarDialog from './useCalendarDialog';
import styles from './CalendarModal.module.css';

function CalendarContent({
  mode,
  value,
  pickupDate,
  minDate,
  locationLabel,
  timeValue,
  onClose,
  onConfirm,
}) {
  const id = useId();
  const { dialogRef, titleRef } = useCalendarDialog();
  const backdropPointerDown = useRef(false);
  const today = getToday();

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
  const title = isReturn ? 'Return date' : 'Pickup date';
  const canGoPrev = visibleMonth > monthStartKey(minimumDate);
  const canConfirm = isDateKey(draftDate) && draftDate >= minimumDate;

  const cleanLocation =
    typeof locationLabel === 'string' ? locationLabel.trim() : '';

  const caption =
    cleanLocation && cleanLocation !== '—'
      ? `${cleanLocation} · Hawaii time (HST)`
      : 'Hawaii time (HST)';

  const summary = [
    formatDate(draftDate),
    isTime(timeValue) ? `${formatTime(timeValue)} HST` : '',
  ]
    .filter(Boolean)
    .join(' · ');

  const helperText = isReturn
    ? 'The highlighted dates show your rental. Choose the time using the dropdown on the page. Your date is applied only after confirmation.'
    : 'Choose the time using the dropdown on the page. Your date is applied only after confirmation.';

  const navigationClass = cn(
    'pointer-events-auto grid size-11 place-items-center rounded-full',
    'border border-line bg-white text-ink transition',
    'enabled:hover:border-ocean/50 enabled:hover:bg-mist',
    'disabled:opacity-30',
    FOCUS,
  );

  const monthProps = {
    minDate: minimumDate,
    today,
    draftDate,
    pickupDate,
    mode,
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
    const currentMinimum = latestDate(minimumDate, getToday());

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
      onPointerCancel={() => {
        backdropPointerDown.current = false;
      }}
      onClick={(event) => {
        if (backdropPointerDown.current && isBackdrop(event)) {
          onClose();
        }

        backdropPointerDown.current = false;
      }}
      className={cn(
        styles.dialog,
        'rounded-3xl border border-line bg-white font-sans text-ink shadow-2xl',
      )}
    >
      <header className="flex min-w-0 items-center justify-between gap-4 border-b border-line bg-white px-4 py-3 sm:px-6 sm:py-4">
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
            'grid size-10 shrink-0 place-items-center rounded-full',
            'border border-line text-ink transition hover:bg-mist',
            FOCUS,
          )}
        >
          <Icon name="close" className="size-4" />
        </button>
      </header>

      <div className={cn(styles.scrollBody, 'px-4 py-5 sm:px-6 sm:py-6')}>
        <p id={`${id}-caption`} className="mb-4 text-xs leading-5 text-muted">
          {caption}
        </p>

        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between">
            <button
              type="button"
              disabled={!canGoPrev}
              aria-label="Previous month"
              onClick={() => {
                if (canGoPrev) {
                  setVisibleMonth(shiftMonth(visibleMonth, -1));
                }
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

          <div className="grid items-start gap-7 md:grid-cols-2">
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

      <footer className="min-w-0 border-t border-line bg-white px-4 py-4 sm:px-6 sm:py-5">
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
              {isReturn ? 'Confirm return date' : 'Confirm pickup date'}
            </button>
          </div>
        </div>
      </footer>
    </dialog>
  );
}

export default function CalendarModal({ open, ...props }) {
  if (!open) return null;

  return <CalendarContent key={props.mode} {...props} />;
}
