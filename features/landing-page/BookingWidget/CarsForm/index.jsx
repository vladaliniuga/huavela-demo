import { useState } from 'react';
import BookingForm from '../BookingForm';
import CalendarModal from '../CalendarModal';
import { ButtonField, CheckboxField, SelectField } from '../Fields';
import { CAR_LOCATION_OPTIONS, optionLabel } from '../options';
import { formatDate, latestDate, TIME_OPTIONS } from '../dateTime';
import useDemoForm from '../useDemoForm';

export default function CarsForm() {
  const form = useDemoForm('cars');
  const values = form.values;
  const [calendarMode, setCalendarMode] = useState(null);

  const locationLabel =
    optionLabel(CAR_LOCATION_OPTIONS, values.pickupLocation) ||
    'Selected location';

  function openPickupCalendar() {
    setCalendarMode('pickup');
  }

  function openReturnCalendar() {
    setCalendarMode('return');
  }

  function closeCalendar() {
    setCalendarMode(null);
  }

  function confirmPickupDate(nextDate) {
    form.update({ pickupDate: nextDate });
    setCalendarMode(null);
  }

  function confirmReturnDate(nextDate) {
    form.update({ returnDate: nextDate });
    setCalendarMode(null);
  }

  return (
    <>
      <BookingForm
        form={form}
        eyebrow="Take the scenic route"
        title="Where are you picking up?"
        submitLabel="Search vehicles"
        note="Pickup and return times are Hawaii Standard Time. Location choices are illustrative."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <SelectField
            {...form.field('pickupLocation')}
            label="Pickup location"
            placeholder="Choose a pickup location"
            icon="pin"
            options={CAR_LOCATION_OPTIONS}
            className="md:col-span-2"
          />

          <ButtonField
            label="Pickup date"
            value={formatDate(values.pickupDate)}
            placeholder="Select pickup date"
            icon="calendar"
            error={form.errors.pickupDate}
            onClick={openPickupCalendar}
          />

          <SelectField
            {...form.field('pickupTime')}
            label="Pickup time · HST"
            options={TIME_OPTIONS}
          />

          <ButtonField
            label="Return date"
            value={formatDate(values.returnDate)}
            placeholder="Select return date"
            icon="calendar"
            error={form.errors.returnDate}
            onClick={openReturnCalendar}
          />

          <SelectField
            {...form.field('returnTime')}
            label="Return time · HST"
            options={TIME_OPTIONS}
          />
        </div>

        <CheckboxField
          label="Return to a different location"
          checked={values.differentReturn}
          onChange={(event) =>
            form.update({ differentReturn: event.target.checked })
          }
        />

        {values.differentReturn && (
          <div className="grid animate-reveal gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SelectField
              {...form.field('returnLocation')}
              label="Return location"
              placeholder="Choose a return location"
              icon="pin"
              options={CAR_LOCATION_OPTIONS}
              className="md:col-span-2 xl:col-span-1"
            />
          </div>
        )}
      </BookingForm>

      <CalendarModal
        open={calendarMode === 'pickup'}
        mode="pickup"
        value={values.pickupDate}
        pickupDate={values.pickupDate}
        minDate={form.minDate}
        locationLabel={locationLabel}
        timeValue={values.pickupTime}
        onClose={closeCalendar}
        onConfirm={confirmPickupDate}
      />

      <CalendarModal
        open={calendarMode === 'return'}
        mode="return"
        value={values.returnDate}
        pickupDate={values.pickupDate}
        minDate={latestDate(form.minDate, values.pickupDate)}
        locationLabel={locationLabel}
        timeValue={values.returnTime}
        onClose={closeCalendar}
        onConfirm={confirmReturnDate}
      />
    </>
  );
}
