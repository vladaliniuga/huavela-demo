export const HAWAII_TIME_ZONE = 'Pacific/Honolulu';
const DAY_MS = 24 * 60 * 60 * 1000;

export function parseDateKey(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (!Number.isFinite(date.getTime())) return null;

  return date.toISOString().slice(0, 10) === value ? date : null;
}

export function isDateKey(value) {
  return parseDateKey(value) !== null;
}

export function addDays(value, amount) {
  const date = parseDateKey(value);

  if (!date || !Number.isInteger(amount)) return '';

  date.setUTCDate(date.getUTCDate() + amount);

  return date.toISOString().slice(0, 10);
}

export function getZonedNow(now = new Date(), timeZone = HAWAII_TIME_ZONE) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );

  return {
    date: `${values.year}-${values.month}-${values.day}`,
    time: `${values.hour}:${values.minute}`,
  };
}

export function getToday(timeZone = HAWAII_TIME_ZONE, now = new Date()) {
  return getZonedNow(now, timeZone).date;
}

export function latestDate(...values) {
  return values.filter(isDateKey).sort().at(-1) || '';
}

export function isTime(value) {
  return typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

// A comparison value for two wall-clock selections in the SAME time zone.
// This is not a UTC timestamp to send to a future booking API.
export function localDateTimeValue(date, time) {
  const parsed = parseDateKey(date);

  if (!parsed || !isTime(time)) return NaN;

  const [hours, minutes] = time.split(':').map(Number);

  return parsed.getTime() + (hours * 60 + minutes) * 60_000;
}

export function dayCount(start, end) {
  const first = parseDateKey(start);
  const last = parseDateKey(end);

  return first && last ? Math.round((last - first) / DAY_MS) : 0;
}

export function formatDate(value) {
  const date = parseDateKey(value);

  if (!date) return '—';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatTime(value) {
  if (!isTime(value)) return '—';

  const [hours, minutes] = value.split(':').map(Number);

  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${
    hours < 12 ? 'AM' : 'PM'
  }`;
}

export function formatDuration(minutes) {
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const remaining = minutes % 60;

  return [
    days ? `${days} ${days === 1 ? 'day' : 'days'}` : '',
    hours ? `${hours} ${hours === 1 ? 'hour' : 'hours'}` : '',
    remaining ? `${remaining} min` : '',
  ]
    .filter(Boolean)
    .join(', ');
}

export const TIME_OPTIONS = Array.from({ length: 48 }, (_, index) => {
  const hours = String(Math.floor(index / 2)).padStart(2, '0');
  const minutes = index % 2 ? '30' : '00';
  const value = `${hours}:${minutes}`;

  return { value, label: formatTime(value) };
});
