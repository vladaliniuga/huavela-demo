import Icon from '@/components/ui/Icon';
import { cn, FOCUS } from '../../theme';
import BookingForm from '../BookingForm';
import { ChoiceGroup, DateField, SelectField } from '../Fields';
import {
  AIRPORT_OPTIONS,
  CABIN_OPTIONS,
  TRAVELER_OPTIONS,
  TRIP_OPTIONS,
} from '../options';
import { latestDate } from '../dateTime';
import useDemoForm from '../useDemoForm';

export default function FlightsForm() {
  const form = useDemoForm('flights');
  const values = form.values;
  const roundTrip = values.tripType === 'roundTrip';

  return (
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

        <DateField
          {...form.field('departureDate')}
          label="Departure date"
          min={form.minDate}
        />

        {roundTrip && (
          <DateField
            {...form.field('returnDate')}
            label="Return date"
            min={latestDate(form.minDate, values.departureDate)}
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
  );
}
