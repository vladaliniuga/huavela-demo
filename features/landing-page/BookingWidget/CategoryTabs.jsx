import { useRef } from 'react';
import Icon from '@/components/ui/Icon';
import { CATEGORIES } from '../content';
import { cn, FOCUS } from '../theme';

export default function CategoryTabs({ id, activeCategory, onChange }) {
  const tabRefs = useRef([]);

  function handleKeyDown(event, index) {
    const last = CATEGORIES.length - 1;
    let next = index;

    switch (event.key) {
      case 'ArrowRight':
        next = index === last ? 0 : index + 1;
        break;
      case 'ArrowLeft':
        next = index === 0 ? last : index - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    onChange(CATEGORIES[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="border-b border-line/75">
      <div
        role="tablist"
        aria-label="Choose a travel category"
        aria-orientation="horizontal"
        className="huavela-tabs flex items-center gap-2 overflow-x-auto px-4 py-4 sm:px-6"
      >
        {CATEGORIES.map((category, index) => {
          const selected = category.id === activeCategory;

          return (
            <button
              key={category.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`${id}-tab-${category.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel-${category.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(category.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                'inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-5',
                selected
                  ? 'bg-ink text-white shadow-sm'
                  : 'text-muted hover:bg-mist hover:text-ink',
                FOCUS,
              )}
            >
              <Icon name={category.icon} className="size-[18px]" />
              {category.label}
            </button>
          );
        })}
      </div>

      <p
        aria-hidden="true"
        className="px-5 pb-3 text-[11px] text-muted sm:hidden"
      >
        Swipe the tabs to explore every category.
      </p>
    </div>
  );
}
