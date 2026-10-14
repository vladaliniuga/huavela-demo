export function cn(...values) {
  return values.filter(Boolean).join(' ');
}

export const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2';

export const PRIMARY_BUTTON = cn(
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full',
  'bg-ink px-6 py-3 text-sm font-semibold text-white transition',
  'hover:bg-ink/90 disabled:opacity-45 disabled:hover:bg-ink',
  FOCUS,
);

export const SECONDARY_BUTTON = cn(
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full',
  'border border-line bg-white/80 px-5 py-2.5 text-sm font-semibold text-ink',
  'transition hover:border-ink/30 hover:bg-white',
  FOCUS,
);

export const EYEBROW =
  'text-[10px] font-semibold uppercase tracking-[0.24em] text-muted';
