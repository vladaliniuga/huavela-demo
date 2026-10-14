import { useId } from 'react';
import { CATEGORIES } from '../content';
import { cn } from '../theme';
import CategoryTabs from './CategoryTabs';
import TravelExpert from './TravelExpert';
import CarsForm from './CarsForm';
import StaysForm from './StaysForm';
import FlightsForm from './FlightsForm';
import ActivitiesForm from './ActivitiesForm';

const PANELS = {
  expert: TravelExpert,
  cars: CarsForm,
  stays: StaysForm,
  flights: FlightsForm,
  activities: ActivitiesForm,
};

export default function BookingWidget({
  activeCategory,
  onCategoryChange,
  onNavigate,
  containerRef,
}) {
  const id = useId();

  return (
    <section
      ref={containerRef}
      id="booking-widget"
      aria-label="Plan your island trip"
      className="relative z-10 min-w-0 scroll-mt-5 rounded-[1.5rem] border border-white/80 bg-white shadow-widget"
    >
      <CategoryTabs
        id={id}
        activeCategory={activeCategory}
        onChange={onCategoryChange}
      />

      {CATEGORIES.map((category) => {
        const Panel = PANELS[category.id];
        const selected = activeCategory === category.id;

        return (
          <div
            key={category.id}
            id={`${id}-panel-${category.id}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${category.id}`}
            hidden={!selected}
            className={cn('p-4 sm:p-6', !selected && 'hidden')}
          >
            {/* Keep panels mounted so changing tabs does not reset inputs. */}
            <Panel isActive={selected} onNavigate={onNavigate} />
          </div>
        );
      })}
    </section>
  );
}
