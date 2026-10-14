import { AIRPORT_OPTIONS } from './options';
import {
  addDays,
  getToday,
  HAWAII_TIME_ZONE,
  isDateKey,
  localDateTimeValue,
} from './dateTime';

const EMPTY_VALUES = {
  cars: {
    pickupLocation: '',
    returnLocation: '',
    differentReturn: false,
    pickupDate: '',
    pickupTime: '09:00',
    returnDate: '',
    returnTime: '09:00',
  },
  stays: {
    destination: '',
    checkIn: '',
    checkOut: '',
    adults: '2',
    children: '0',
    rooms: '1',
  },
  flights: {
    tripType: 'roundTrip',
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    travelers: '1',
    cabin: 'economy',
  },
  activities: {
    destination: '',
    activityType: 'all',
    date: '',
    adults: '2',
    children: '0',
  },
};

export function emptyValues(category) {
  if (!EMPTY_VALUES[category]) {
    throw new Error(`Unknown demo category: ${category}`);
  }

  return { ...EMPTY_VALUES[category] };
}

export function formTimeZone(category, values) {
  if (category !== 'flights') return HAWAII_TIME_ZONE;

  return (
    AIRPORT_OPTIONS.find((option) => option.value === values.from)?.timeZone ||
    HAWAII_TIME_ZONE
  );
}

export function initialValues(category, now = new Date()) {
  const values = emptyValues(category);
  const start = addDays(getToday(formTimeZone(category, values), now), 7);

  const dates = {
    cars: {
      pickupDate: start,
      returnDate: addDays(start, 1),
    },
    stays: {
      checkIn: start,
      checkOut: addDays(start, 3),
    },
    flights: {
      departureDate: start,
      returnDate: addDays(start, 7),
    },
    activities: {
      date: start,
    },
  };

  return { ...values, ...dates[category] };
}

export function updateValues(category, previous, patch) {
  const next = { ...previous, ...patch };

  if (category === 'cars') {
    if (!next.differentReturn) {
      next.returnLocation = next.pickupLocation;
    }

    if (
      patch.differentReturn === true &&
      next.returnLocation === next.pickupLocation
    ) {
      next.returnLocation = '';
    }

    if ('pickupDate' in patch || 'pickupTime' in patch) {
      const start = localDateTimeValue(next.pickupDate, next.pickupTime);
      const end = localDateTimeValue(next.returnDate, next.returnTime);

      if (Number.isFinite(start) && Number.isFinite(end) && end <= start) {
        next.returnDate = addDays(next.pickupDate, 1);
        next.returnTime = next.pickupTime;
      }
    }
  }

  if (
    category === 'stays' &&
    'checkIn' in patch &&
    isDateKey(next.checkIn) &&
    isDateKey(next.checkOut) &&
    next.checkOut <= next.checkIn
  ) {
    next.checkOut = addDays(next.checkIn, 1);
  }

  if (
    category === 'flights' &&
    ('departureDate' in patch || patch.tripType === 'roundTrip') &&
    isDateKey(next.departureDate) &&
    (!isDateKey(next.returnDate) || next.returnDate < next.departureDate)
  ) {
    next.returnDate = addDays(next.departureDate, 7);
  }

  return next;
}
