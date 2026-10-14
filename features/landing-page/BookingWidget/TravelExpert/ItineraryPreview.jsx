import { useId } from 'react';

export default function ItineraryPreview({ itinerary }) {
  const id = useId();

  return (
    <section
      aria-labelledby={id}
      className="mt-4 rounded-2xl border border-line bg-white p-4 sm:p-5"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
        Fixed three-day example
      </p>
      <h3 id={id} className="mt-2 font-display text-2xl leading-tight text-ink">
        {itinerary.title}
      </h3>

      <ol className="mt-5 space-y-5">
        {itinerary.days.map((day, index) => (
          <li key={day.label} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-full bg-mist text-xs font-semibold text-ink"
            >
              {index + 1}
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                {day.label}
              </p>
              <h4 className="mt-1 text-sm font-semibold text-ink">
                {day.title}
              </h4>
              <p className="mt-1 text-sm leading-6 text-muted">
                {day.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-5 border-t border-line pt-3 text-xs leading-5 text-muted">
        Illustrative ideas only. No availability, transport, stays, or
        activities have been arranged.
      </p>
    </section>
  );
}
