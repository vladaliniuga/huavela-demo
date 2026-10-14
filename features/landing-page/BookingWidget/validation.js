import {
  ACTIVITY_OPTIONS,
  ADULT_OPTIONS,
  AIRPORT_OPTIONS,
  CABIN_OPTIONS,
  CAR_LOCATION_OPTIONS,
  CHILD_OPTIONS,
  ISLAND_OPTIONS,
  ROOM_OPTIONS,
  TRAVELER_OPTIONS,
  TRIP_OPTIONS,
  hasOption,
} from './options';
import {
  getToday,
  getZonedNow,
  isDateKey,
  localDateTimeValue,
  TIME_OPTIONS,
} from './dateTime';
import { formTimeZone } from './formState';

export default function validateSearch(category, values, now = new Date()) {
  const errors = {};
  const today = getToday(formTimeZone(category, values), now);

  function choice(name, options, message = 'Select an option.') {
    if (!hasOption(options, values[name])) {
      errors[name] = message;
    }
  }

  function date(name, minimum = today) {
    if (!isDateKey(values[name])) {
      errors[name] = 'Select a valid date.';
    } else if (minimum && values[name] < minimum) {
      errors[name] = 'Choose a date on or after the earliest allowed date.';
    }
  }

  function party() {
    choice('adults', ADULT_OPTIONS, 'Select the number of adults.');
    choice('children', CHILD_OPTIONS, 'Select the number of children.');
  }

  if (category === 'cars') {
    choice('pickupLocation', CAR_LOCATION_OPTIONS, 'Choose a pickup location.');

    if (values.differentReturn) {
      choice(
        'returnLocation',
        CAR_LOCATION_OPTIONS,
        'Choose a return location.',
      );

      if (
        values.returnLocation &&
        values.returnLocation === values.pickupLocation
      ) {
        errors.returnLocation =
          'Choose a different location or uncheck this option.';
      }
    }

    date('pickupDate');
    date('returnDate');
    choice('pickupTime', TIME_OPTIONS, 'Select a pickup time.');
    choice('returnTime', TIME_OPTIONS, 'Select a return time.');

    const current = getZonedNow(now);
    const start = localDateTimeValue(values.pickupDate, values.pickupTime);
    const end = localDateTimeValue(values.returnDate, values.returnTime);

    if (
      !errors.pickupDate &&
      !errors.pickupTime &&
      start <= localDateTimeValue(current.date, current.time)
    ) {
      errors.pickupTime =
        'Choose a future pickup time in Hawaii Standard Time.';
    }

    if (
      !errors.returnDate &&
      isDateKey(values.pickupDate) &&
      values.returnDate < values.pickupDate
    ) {
      errors.returnDate = 'Return cannot be before pickup.';
    }

    if (
      !errors.returnDate &&
      !errors.returnTime &&
      Number.isFinite(start) &&
      Number.isFinite(end) &&
      end <= start
    ) {
      errors.returnTime = 'Return must be later than pickup.';
    }
  }

  if (category === 'stays') {
    choice('destination', ISLAND_OPTIONS, 'Choose an island.');
    date('checkIn');
    date('checkOut');

    if (
      !errors.checkOut &&
      isDateKey(values.checkIn) &&
      values.checkOut <= values.checkIn
    ) {
      errors.checkOut = 'Check-out must be after check-in.';
    }

    party();
    choice('rooms', ROOM_OPTIONS, 'Select the number of rooms.');
  }

  if (category === 'flights') {
    choice('tripType', TRIP_OPTIONS);
    choice('from', AIRPORT_OPTIONS, 'Choose a departure airport.');
    choice('to', AIRPORT_OPTIONS, 'Choose a destination airport.');

    if (values.from && values.from === values.to) {
      errors.to = 'Choose a different destination airport.';
    }

    date('departureDate');

    if (values.tripType === 'roundTrip') {
      date('returnDate');

      if (
        !errors.returnDate &&
        isDateKey(values.departureDate) &&
        values.returnDate < values.departureDate
      ) {
        errors.returnDate = 'Return cannot be before departure.';
      }
    }

    choice('travelers', TRAVELER_OPTIONS, 'Select the number of travelers.');
    choice('cabin', CABIN_OPTIONS, 'Select a cabin.');
  }

  if (category === 'activities') {
    choice('destination', ISLAND_OPTIONS, 'Choose an island.');
    choice('activityType', ACTIVITY_OPTIONS);
    date('date');
    party();
  }

  return errors;
}
