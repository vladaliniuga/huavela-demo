import BookingForm from '../BookingForm';
import { CheckboxField, DateField, SelectField } from '../Fields';
import { CAR_LOCATION_OPTIONS } from '../options';
import { latestDate, TIME_OPTIONS } from '../dateTime';
import useDemoForm from '../useDemoForm';

export default function CarsForm() {
  const form = useDemoForm('cars');
  const values = form.values;

  return (
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

        <DateField
          {...form.field('pickupDate')}
          label="Pickup date"
          min={form.minDate}
        />

        <SelectField
          {...form.field('pickupTime')}
          label="Pickup time · HST"
          options={TIME_OPTIONS}
        />

        <DateField
          {...form.field('returnDate')}
          label="Return date"
          min={latestDate(form.minDate, values.pickupDate)}
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
  );
}
