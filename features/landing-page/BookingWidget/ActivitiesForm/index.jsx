import BookingForm from '../BookingForm';
import { DateField, SelectField } from '../Fields';
import {
  ACTIVITY_OPTIONS,
  ADULT_OPTIONS,
  CHILD_OPTIONS,
  ISLAND_OPTIONS,
} from '../options';
import useDemoForm from '../useDemoForm';

export default function ActivitiesForm() {
  const form = useDemoForm('activities');

  return (
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

        <DateField {...form.field('date')} label="Date" min={form.minDate} />

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
  );
}
