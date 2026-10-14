import Icon from '@/components/ui/Icon';
import { cn, EYEBROW, FOCUS } from '../theme';

export default function Copy({ category, onNavigate }) {
  return (
    <div className="my-12 max-w-[900px] animate-reveal lg:my-16">
      <p className={cn(EYEBROW, 'max-w-md leading-5')}>{category.eyebrow}</p>

      <h1 className="mt-5 font-display text-[clamp(2.75rem,5.7vw,5.5rem)] leading-[1.04] tracking-[-0.045em] text-ink">
        <span className="block">{category.title}</span>
        <span className="block text-ink">{category.accent}</span>
      </h1>

      <svg
        viewBox="0 0 180 24"
        fill="none"
        aria-hidden="true"
        className="mt-5 h-6 w-36 text-ocean sm:w-44"
      >
        <path
          d="M2 19C45-3 109-2 170 16M54 21c43-12 81-10 122-5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <p className="mt-5 max-w-[470px] text-base leading-7 text-ink/80 sm:text-lg sm:leading-8">
        {category.subtitle}
      </p>

      <button
        type="button"
        onClick={() => onNavigate(category.id)}
        className={cn(
          'mt-7 inline-flex min-h-11 items-center gap-3 rounded-full pr-4 text-sm font-semibold text-ink',
          FOCUS,
        )}
      >
        <span className="grid size-10 place-items-center rounded-full border border-ink/20 bg-white/50">
          <Icon name="arrow-up" className="size-4" />
        </span>
        {category.cta}
      </button>
    </div>
  );
}
