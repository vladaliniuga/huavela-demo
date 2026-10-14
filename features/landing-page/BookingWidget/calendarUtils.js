import { parseDateKey } from './dateTime';

export const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function utcDate(year, monthIndex, day) {
  return new Date(Date.UTC(year, monthIndex, day));
}

export function monthStartFromDateKey(dateKey) {
  const date = parseDateKey(dateKey);

  if (!date) return null;

  return utcDate(date.getUTCFullYear(), date.getUTCMonth(), 1);
}

export function monthStartKey(dateKey) {
  const date = monthStartFromDateKey(dateKey);

  return date ? date.toISOString().slice(0, 10) : '';
}

export function shiftMonth(monthKey, amount) {
  const base = parseDateKey(monthKey);

  if (!base) return '';

  const shifted = utcDate(
    base.getUTCFullYear(),
    base.getUTCMonth() + amount,
    1,
  );

  return shifted.toISOString().slice(0, 10);
}

export function monthLabel(monthKey) {
  const date = parseDateKey(monthKey);

  if (!date) return '';

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function buildMonthCells(monthKey) {
  const first = parseDateKey(monthKey);

  if (!first) return [];

  const year = first.getUTCFullYear();
  const month = first.getUTCMonth();
  const firstWeekday = first.getUTCDay();
  const daysInMonth = utcDate(year, month + 1, 0).getUTCDate();

  const cells = [];

  for (let index = 0; index < firstWeekday; index += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = utcDate(year, month, day);

    cells.push({
      dateKey: date.toISOString().slice(0, 10),
      day,
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

export function isInRange(dateKey, start, end) {
  if (!dateKey || !start || !end) return false;

  return dateKey > start && dateKey < end;
}
