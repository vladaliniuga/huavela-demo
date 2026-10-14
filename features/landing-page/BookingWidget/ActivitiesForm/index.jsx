import { useState } from 'react';
import BookingForm from '../BookingForm';
import CalendarModal from '../CalendarModal';
import { ButtonField, SelectField } from '../Fields';
import {
  ACTIVITY_OPTIONS,
  ADULT_OPTIONS,
  CHILD_OPTIONS,
  ISLAND_OPTIONS,
  optionLabel,
} from '../options';
import { formatDate } from '../dateTime';
import useDemoForm from '../useDemoForm';

export default function ActivitiesForm() {
  const form = useDemoForm('activities');
  const values = form.values;
  const [calendarOpen, setCalendarOpen] = useState(false);
  const destinationLabel = values.destination
    ? optionLabel(ISLAND_OPTIONS, values.destination)
    : '';

  function closeCalendar() {
    setCalendarOpen(false);
  }

  function confirmDate(nextDate) {
    form.update({ date: nextDate });
    closeCalendar();
  }

  return (
    <>
      <BookingForm
        form={form}
        eyebrow="Make room for a little wonder"
        title="What would you like to experience?"
        submitLabel="Explore activities"
        note="Choose an island and a date to preview your next adventure."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <SelectField
            {...form.field('destination')}
            label="Destination"
            placeholder="Choose an island"
            icon="pin"
            options={ISLAND_OPTIONS}
          />
          <SelectField
            {...form.field('activityType')}
            label="Experience type"
            options={ACTIVITY_OPTIONS}
          />
          <ButtonField
            label="Date"
            value={values.date ? formatDate(values.date) : ''}
            placeholder="Select activity date"
            icon="calendar"
            error={form.errors.date}
            disabled={!form.ready}
            onClick={() => setCalendarOpen(true)}
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
        </div>
      </BookingForm>

      <CalendarModal
        open={calendarOpen}
        mode="activity"
        value={values.date}
        minDate={form.minDate}
        locationLabel={destinationLabel}
        onClose={closeCalendar}
        onConfirm={confirmDate}
      />
    </>
  );
}
