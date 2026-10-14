import BrandLogo from '@/components/BrandLogo';
import BookingWidget from '../BookingWidget';
import Backdrop from './Backdrop';
import Copy from './Copy';

export default function Hero({
  category,
  onCategoryChange,
  onNavigate,
  widgetRef,
}) {
  return (
    <section className="relative isolate min-h-[calc(100svh-6rem)] bg-mist">
      <Backdrop key={category.id} category={category} />

      <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <BookingWidget
          containerRef={widgetRef}
          activeCategory={category.id}
          onCategoryChange={onCategoryChange}
          onNavigate={onNavigate}
        />

        <Copy key={category.id} category={category} onNavigate={onNavigate} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 right-8 hidden px-3 py-1 lg:flex"
      >
        <BrandLogo size="compact" decorative />
      </div>
    </section>
  );
}
