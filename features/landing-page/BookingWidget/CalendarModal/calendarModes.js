const CONFIRM_HELP = 'Your date is applied only after confirmation.';
const TIME_HELP = 'Choose the time using the dropdown on the page.';

const CALENDAR_MODES = {
  pickup: {
    title: 'Pickup date',
    confirmLabel: 'Confirm pickup date',
    selectedLabel: 'Pickup',
    context: 'Hawaii time (HST)',
    showTime: true,
    helperText: `${TIME_HELP} ${CONFIRM_HELP}`,
  },
  return: {
    title: 'Return date',
    confirmLabel: 'Confirm return date',
    selectedLabel: 'Return',
    rangeStartLabel: 'Pickup',
    minimumDays: 0,
    context: 'Hawaii time (HST)',
    showTime: true,
    helperText: `The highlighted dates show your rental. ${TIME_HELP} ${CONFIRM_HELP}`,
  },
  'check-in': {
    title: 'Check-in date',
    confirmLabel: 'Confirm check-in date',
    selectedLabel: 'Check-in',
    context: 'Hawaiʻi',
    helperText: `Choose the first day of your stay. ${CONFIRM_HELP}`,
  },
  'check-out': {
    title: 'Check-out date',
    confirmLabel: 'Confirm check-out date',
    selectedLabel: 'Check-out',
    rangeStartLabel: 'Check-in',
    minimumDays: 1,
    context: 'Hawaiʻi',
    helperText: `The highlighted dates show your stay. Check-out must be after check-in. ${CONFIRM_HELP}`,
  },
  activity: {
    title: 'Activity date',
    confirmLabel: 'Confirm activity date',
    selectedLabel: 'Selected',
    context: 'Hawaiʻi',
    helperText: `Choose the day for your experience. ${CONFIRM_HELP}`,
  },
};

export function getCalendarMode(mode) {
  return CALENDAR_MODES[mode] || CALENDAR_MODES.pickup;
}
