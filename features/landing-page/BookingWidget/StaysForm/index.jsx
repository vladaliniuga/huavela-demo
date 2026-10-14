import BookingForm from '../BookingForm';
import { DateField, SelectField } from '../Fields';
import {
  ADULT_OPTIONS,
  CHILD_OPTIONS,
  ISLAND_OPTIONS,
  ROOM_OPTIONS,
} from '../options';
import { addDays, latestDate } from '../dateTime';
import useDemoForm from '../useDemoForm';

export default function StaysForm() {
  const form = useDemoForm('stays');

  return (
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

        <DateField
          {...form.field('checkIn')}
          label="Check-in"
          min={form.minDate}
        />

        <DateField
          {...form.field('checkOut')}
          label="Check-out"
          min={latestDate(form.minDate, addDays(form.values.checkIn, 1))}
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
  );
}
