import { useState } from 'react';
import BookingForm from '../BookingForm';
import CalendarModal from '../CalendarModal';
import { ButtonField, SelectField } from '../Fields';
import {
  ADULT_OPTIONS,
  CHILD_OPTIONS,
  ISLAND_OPTIONS,
  ROOM_OPTIONS,
  optionLabel,
} from '../options';
import { addDays, formatDate, latestDate } from '../dateTime';
import useDemoForm from '../useDemoForm';

export default function StaysForm() {
  const form = useDemoForm('stays');
  const values = form.values;
  const [calendarMode, setCalendarMode] = useState(null);
  const isCheckOut = calendarMode === 'check-out';
  const destinationLabel = values.destination
    ? optionLabel(ISLAND_OPTIONS, values.destination)
    : '';
  const minimumCheckOut = latestDate(form.minDate, addDays(values.checkIn, 1));

  function closeCalendar() {
    setCalendarMode(null);
  }

  function confirmDate(nextDate) {
    if (calendarMode === 'check-in') {
      form.update({ checkIn: nextDate });
    } else if (calendarMode === 'check-out') {
      form.update({ checkOut: nextDate });
    }

    closeCalendar();
  }

  return (
    <>
      <BookingForm
        form={form}
        eyebrow="Somewhere to slow down"
        title="Where would you like to stay?"
        submitLabel="Search stays"
        note="Choose an island, your dates, and who is coming along."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <SelectField
            {...form.field('destination')}
            label="Destination"
            placeholder="Choose an island"
            icon="pin"
            options={ISLAND_OPTIONS}
          />
          <ButtonField
            label="Check-in"
            value={values.checkIn ? formatDate(values.checkIn) : ''}
            placeholder="Select check-in date"
            icon="calendar"
            error={form.errors.checkIn}
            disabled={!form.ready}
            onClick={() => setCalendarMode('check-in')}
          />
          <ButtonField
            label="Check-out"
            value={values.checkOut ? formatDate(values.checkOut) : ''}
            placeholder="Select check-out date"
            icon="calendar"
            error={form.errors.checkOut}
            disabled={!form.ready}
            onClick={() => setCalendarMode('check-out')}
          />
          <SelectField
            {...form.field('adults')}
            label="Adults"
            options={ADULT_OPTIONS}
          />
          <SelectField
            {...form.field('children')}
            label="Children"
            options={CHILD_OPTIONS}
          />
          <SelectField
            {...form.field('rooms')}
            label="Rooms"
            options={ROOM_OPTIONS}
          />
        </div>
      </BookingForm>

      <CalendarModal
        open={calendarMode !== null}
        mode={calendarMode || 'check-in'}
        value={isCheckOut ? values.checkOut : values.checkIn}
        startDate={values.checkIn}
        minDate={isCheckOut ? minimumCheckOut : form.minDate}
        locationLabel={destinationLabel}
        onClose={closeCalendar}
        onConfirm={confirmDate}
      />
    </>
  );
}
