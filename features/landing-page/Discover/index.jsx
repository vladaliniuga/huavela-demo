import Icon from '@/components/ui/Icon';
import { CATEGORIES, photoUrl } from '../content';
import { cn, EYEBROW, FOCUS } from '../theme';

export default function Discover({ onNavigate }) {
  return (
    <section
      id="discover"
      aria-labelledby="discover-heading"
      className="scroll-mt-6 bg-soft py-14 sm:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className={EYEBROW}>Your island escape, all together</p>

            <h2
              id="discover-heading"
              className="mt-3 font-display text-4xl tracking-[-0.04em] text-ink sm:text-5xl"
            >
              One trip. Every possibility.
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-6 text-muted">
            Start with one piece of your trip. Let the rest fall into place.
          </p>
        </div>

        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.filter((category) => category.id !== 'expert').map(
            (category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onNavigate(category.id)}
                className={cn(
                  'group flex h-full w-full min-w-0 flex-col items-stretch justify-start',
                  'overflow-hidden rounded-2xl border border-line bg-white p-0 text-left',
                  'transition hover:-translate-y-1 hover:shadow-lg',
                  FOCUS,
                )}
              >
                <div
                  className="relative aspect-[4/3] w-full shrink-0 overflow-hidden"
                  style={{ background: category.fallback }}
                >
                  <img
                    src={photoUrl(category, 720)}
                    alt=""
                    width="720"
                    height="540"
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.style.visibility = 'hidden';
                    }}
                    className="absolute inset-0 block h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold text-ink">
                    <Icon name={category.icon} className="size-4" />
                    {category.label}
                  </span>
                </div>

                <div className="flex w-full flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3 sm:min-h-[3.75rem]">
                    <h3 className="min-w-0 flex-1 font-display text-2xl leading-tight text-ink">
                      {category.cardTitle}
                    </h3>

                    <Icon
                      name="arrow-up-right"
                      className="mt-1 size-4 shrink-0 text-muted"
                    />
                  </div>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    {category.cardDescription}
                  </p>
                </div>
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
