import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { cn, FOCUS } from '../../theme';
import BookingForm from '../BookingForm';
import CalendarModal from '../CalendarModal';
import { ButtonField, ChoiceGroup, SelectField } from '../Fields';
import {
  AIRPORT_OPTIONS,
  CABIN_OPTIONS,
  TRAVELER_OPTIONS,
  TRIP_OPTIONS,
  optionLabel,
} from '../options';
import { formatDate, latestDate } from '../dateTime';
import { formTimeZone } from '../formState';
import useDemoForm from '../useDemoForm';

export default function FlightsForm() {
  const form = useDemoForm('flights');
  const values = form.values;
  const roundTrip = values.tripType === 'roundTrip';
  const [calendarMode, setCalendarMode] = useState(null);
  const isReturnCalendar = calendarMode === 'return';

  const origin = values.from
    ? optionLabel(AIRPORT_OPTIONS, values.from)
    : 'Departure airport';

  const destination = values.to
    ? optionLabel(AIRPORT_OPTIONS, values.to)
    : 'Destination airport';

  const calendarCaption = isReturnCalendar
    ? `${destination} → ${origin}`
    : `${origin} → ${destination}`;

  const calendarHelp = isReturnCalendar
    ? 'The highlighted dates show your trip. Return cannot be before departure. Your date is applied only after confirmation.'
    : 'Choose your departure date. Your date is applied only after confirmation.';

  function openCalendar(mode) {
    if (!form.ready) return;
    setCalendarMode(mode);
  }

  function closeCalendar() {
    setCalendarMode(null);
  }

  function confirmDate(nextDate) {
    const fieldName = isReturnCalendar ? 'returnDate' : 'departureDate';

    form.update({ [fieldName]: nextDate });
    closeCalendar();
  }

  return (
    <>
      <BookingForm
        form={form}
        eyebrow="A new perspective awaits"
        title="Where are you flying?"
        submitLabel="Search flights"
        note="Flight dates are calendar selections only. Airline schedules and fares are not connected."
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ChoiceGroup
            {...form.field('tripType')}
            label="Trip type"
            options={TRIP_OPTIONS}
          />

          <button
            type="button"
            disabled={!values.from || !values.to}
            onClick={() =>
              form.update({
                from: values.to,
                to: values.from,
              })
            }
            className={cn(
              'inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-xs font-semibold text-ink',
              'hover:bg-mist disabled:opacity-40',
              FOCUS,
            )}
          >
            <Icon name="swap" className="size-4" />
            Swap airports
          </button>
        </div>

        <div
          className={cn(
            'grid gap-4 md:grid-cols-2',
            roundTrip ? 'xl:grid-cols-6' : 'xl:grid-cols-5',
          )}
        >
          <SelectField
            {...form.field('from')}
            label="From"
            placeholder="Departure airport"
            options={AIRPORT_OPTIONS}
          />

          <SelectField
            {...form.field('to')}
            label="To"
            placeholder="Destination airport"
            options={AIRPORT_OPTIONS}
          />

          <ButtonField
            label="Departure date"
            value={values.departureDate ? formatDate(values.departureDate) : ''}
            placeholder="Select departure date"
            icon="calendar"
            error={form.errors.departureDate}
            disabled={!form.ready}
            onClick={() => openCalendar('departure')}
          />

          {roundTrip && (
            <ButtonField
              label="Return date"
              value={values.returnDate ? formatDate(values.returnDate) : ''}
              placeholder="Select return date"
              icon="calendar"
              error={form.errors.returnDate}
              disabled={!form.ready}
              onClick={() => openCalendar('return')}
            />
          )}

          <SelectField
            {...form.field('travelers')}
            label="Travelers"
            options={TRAVELER_OPTIONS}
          />

          <SelectField
            {...form.field('cabin')}
            label="Cabin"
            options={CABIN_OPTIONS}
          />
        </div>
      </BookingForm>

      <CalendarModal
        open={Boolean(calendarMode) && (!isReturnCalendar || roundTrip)}
        mode={isReturnCalendar ? 'return' : 'pickup'}
        value={isReturnCalendar ? values.returnDate : values.departureDate}
        pickupDate={values.departureDate}
        minDate={
          isReturnCalendar
            ? latestDate(form.minDate, values.departureDate)
            : form.minDate
        }
        timeZone={formTimeZone('flights', values)}
        startLabel="Departure"
        endLabel="Return"
        caption={calendarCaption}
        helpText={calendarHelp}
        onClose={closeCalendar}
        onConfirm={confirmDate}
      />
    </>
  );
}
