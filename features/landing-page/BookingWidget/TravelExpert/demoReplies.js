export const MAX_MESSAGE_LENGTH = 1200;

export const SUGGESTED_PROMPTS = [
  'Show me a sample island itinerary',
  'Help me find a rental car',
  'Explore ocean adventures',
];

const SAMPLE_ITINERARY = {
  title: 'An easygoing island escape',
  days: [
    {
      label: 'Day 1',
      title: 'Arrive. Settle in. Exhale.',
      description:
        'Leave room for your arrival, a relaxed check-in, and an easy dinner. Keep the first evening open.',
    },
    {
      label: 'Day 2',
      title: 'Take the scenic route.',
      description:
        'Build a flexible day around a coastal drive, a beach stop, and somewhere new for lunch.',
    },
    {
      label: 'Day 3',
      title: 'Make a little room for wonder.',
      description:
        'Choose an experience that fits your interests, then leave time to unwind before the journey home.',
    },
  ],
};

function action(category, label) {
  return { category, label };
}

export function getDemoReply(message) {
  const text = String(message || '').toLowerCase();

  if (/\b(itinerary|schedule|weekend)\b/.test(text)) {
    return {
      text: 'Here is a fixed three-day sample to show how trip planning could look. It is not personalized to your request, and nothing is booked. Use the buttons below to explore the booking forms.',
      itinerary: SAMPLE_ITINERARY,
      actions: [
        action('stays', 'Explore stays'),
        action('cars', 'Find a car'),
        action('activities', 'Explore experiences'),
      ],
    };
  }

  if (
    /\b(car|cars|drive|driving|rental|rentals|vehicle|vehicles)\b/.test(text)
  ) {
    return {
      text: 'Try the car-search preview: choose pickup and return locations, dates, and times. You can also try a different return location. No vehicles, prices, or availability are connected yet.',
      actions: [action('cars', 'Open car search')],
    };
  }

  if (/\b(stay|stays|hotel|hotels|room|rooms|resort|resorts)\b/.test(text)) {
    return {
      text: 'Explore the stay-search preview by choosing an island, check-in and check-out dates, guests, and rooms. It shows your selections without looking up properties or rates.',
      actions: [action('stays', 'Open stay search')],
    };
  }

  if (/\b(flight|flights|fly|flying|airport|airports|airline)\b/.test(text)) {
    return {
      text: 'Try a round-trip or one-way flight search, swap the airports, and choose travelers and a cabin. This prototype does not look up flights, schedules, or airline fares.',
      actions: [action('flights', 'Open flight search')],
    };
  }

  if (
    /\b(activity|activities|adventure|adventures|ocean|snorkel|tour|tours)\b/.test(
      text,
    )
  ) {
    return {
      text: 'Choose an island, date, experience type, and guest count to preview an activity search. The form demonstrates the planned experience; it is not connected to an activity catalog.',
      actions: [action('activities', 'Explore activities')],
    };
  }

  if (/\b(plan|planning|trip|travel|vacation|holiday|escape)\b/.test(text)) {
    return {
      text: 'This demo can show a fixed sample itinerary or take you to a category search. A connected Travel expert would use your dates, interests, and budget to help bring the pieces together.',
      itinerary: SAMPLE_ITINERARY,
      actions: [
        action('stays', 'Start with a stay'),
        action('flights', 'Explore flights'),
      ],
    };
  }

  return {
    text: 'This is a scripted preview, so I cannot answer unrestricted questions yet. Try asking for a sample itinerary, a rental car, a stay, flights, or activities to explore the demo.',
    actions: [
      action('cars', 'Cars'),
      action('stays', 'Stays'),
      action('flights', 'Flights'),
      action('activities', 'Activities'),
    ],
  };
}
