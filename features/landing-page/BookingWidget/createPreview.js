import {
  ACTIVITY_OPTIONS,
  AIRPORT_OPTIONS,
  CABIN_OPTIONS,
  CAR_LOCATION_OPTIONS,
  ISLAND_OPTIONS,
  TRIP_OPTIONS,
  optionLabel,
} from './options';
import {
  dayCount,
  formatDate,
  formatDuration,
  formatTime,
  localDateTimeValue,
} from './dateTime';

function count(value, singular, plural = `${singular}s`) {
  return `${value} ${Number(value) === 1 ? singular : plural}`;
}

function party(values) {
  return `${count(values.adults, 'adult')}, ${count(
    values.children,
    'child',
    'children',
  )}`;
}

export default function createPreview(category, values) {
  if (category === 'cars') {
    const returnLocation = values.differentReturn
      ? values.returnLocation
      : values.pickupLocation;

    const minutes =
      (localDateTimeValue(values.returnDate, values.returnTime) -
        localDateTimeValue(values.pickupDate, values.pickupTime)) /
      60_000;

    return {
      title: 'Car rental search preview',
      details: [
        [
          'Pickup location',
          optionLabel(CAR_LOCATION_OPTIONS, values.pickupLocation),
        ],
        ['Return location', optionLabel(CAR_LOCATION_OPTIONS, returnLocation)],
        [
          'Pickup',
          `${formatDate(values.pickupDate)} · ${formatTime(
            values.pickupTime,
          )} HST`,
        ],
        [
          'Return',
          `${formatDate(values.returnDate)} · ${formatTime(
            values.returnTime,
          )} HST`,
        ],
        ['Rental length', formatDuration(minutes)],
      ],
    };
  }

  if (category === 'stays') {
    return {
      title: 'Stay search preview',
      details: [
        ['Island', optionLabel(ISLAND_OPTIONS, values.destination)],
        ['Check-in', formatDate(values.checkIn)],
        ['Check-out', formatDate(values.checkOut)],
        [
          'Length of stay',
          count(dayCount(values.checkIn, values.checkOut), 'night'),
        ],
        ['Guests', party(values)],
        ['Rooms', values.rooms],
      ],
    };
  }

  if (category === 'flights') {
    return {
      title: 'Flight search preview',
      details: [
        ['Trip type', optionLabel(TRIP_OPTIONS, values.tripType)],
        ['From', optionLabel(AIRPORT_OPTIONS, values.from)],
        ['To', optionLabel(AIRPORT_OPTIONS, values.to)],
        ['Departure', formatDate(values.departureDate)],
        ...(values.tripType === 'roundTrip'
          ? [['Return', formatDate(values.returnDate)]]
          : []),
        ['Travelers', values.travelers],
        ['Cabin', optionLabel(CABIN_OPTIONS, values.cabin)],
      ],
    };
  }

  return {
    title: 'Activity search preview',
    details: [
      ['Island', optionLabel(ISLAND_OPTIONS, values.destination)],
      ['Experience', optionLabel(ACTIVITY_OPTIONS, values.activityType)],
      ['Date', formatDate(values.date)],
      ['Guests', party(values)],
    ],
  };
}
