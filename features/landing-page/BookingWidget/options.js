// Demo choices only. These do not represent connected suppliers or inventory.
export const ISLAND_OPTIONS = [
  { value: 'oahu', label: 'Oʻahu' },
  { value: 'maui', label: 'Maui' },
  { value: 'hawaii', label: 'Island of Hawaiʻi' },
  { value: 'kauai', label: 'Kauaʻi' },
];

export const CAR_LOCATION_OPTIONS = [
  { value: 'hnl', label: 'Honolulu airport (HNL)' },
  { value: 'waikiki', label: 'Waikīkī, Oʻahu' },
];

export const AIRPORT_OPTIONS = [
  { value: 'HNL', label: 'Honolulu (HNL)', timeZone: 'Pacific/Honolulu' },
  { value: 'OGG', label: 'Kahului (OGG)', timeZone: 'Pacific/Honolulu' },
  { value: 'KOA', label: 'Kona (KOA)', timeZone: 'Pacific/Honolulu' },
  { value: 'LIH', label: 'Līhuʻe (LIH)', timeZone: 'Pacific/Honolulu' },
  { value: 'LAX', label: 'Los Angeles (LAX)', timeZone: 'America/Los_Angeles' },
  {
    value: 'SFO',
    label: 'San Francisco (SFO)',
    timeZone: 'America/Los_Angeles',
  },
  { value: 'SEA', label: 'Seattle (SEA)', timeZone: 'America/Los_Angeles' },
];

export const TRIP_OPTIONS = [
  { value: 'roundTrip', label: 'Round trip' },
  { value: 'oneWay', label: 'One way' },
];

export const CABIN_OPTIONS = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium', label: 'Premium economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First' },
];

export const ACTIVITY_OPTIONS = [
  { value: 'all', label: 'All experiences' },
  { value: 'ocean', label: 'Ocean adventures' },
  { value: 'outdoors', label: 'Outdoor adventures' },
  { value: 'culture', label: 'Food & culture' },
  { value: 'sightseeing', label: 'Sightseeing' },
];

function countOptions(min, max) {
  return Array.from({ length: max - min + 1 }, (_, index) => {
    const value = String(min + index);
    return { value, label: value };
  });
}

// Prototype control limits, not supplier booking policies.
export const ADULT_OPTIONS = countOptions(1, 8);
export const CHILD_OPTIONS = countOptions(0, 6);
export const ROOM_OPTIONS = countOptions(1, 5);
export const TRAVELER_OPTIONS = countOptions(1, 9);

export function hasOption(options, value) {
  return options.some((option) => option.value === value);
}

export function optionLabel(options, value) {
  return options.find((option) => option.value === value)?.label || '—';
}
